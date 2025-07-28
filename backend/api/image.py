import base64
import logging
from io import BytesIO
from os import getenv
from typing import Annotated

import aiohttp
from aiogram import Bot
from aiogram.types import BufferedInputFile
from fastapi import APIRouter, Depends, FastAPI, HTTPException, Request, UploadFile
from fastapi.responses import StreamingResponse

logger = logging.getLogger(__name__)


async def lifespan(app: FastAPI):
    logger.info("Starting bot...")
    async with Bot(token=getenv("TELEGRAM_TOKEN")) as bot:
        logger.info("Bot started...")
        app.state.bot = bot
        yield


router = APIRouter(prefix="/image", lifespan=lifespan)


async def get_bot(request: Request):
    return request.app.state.bot


@router.post("/upload")
async def save_image(
    file: UploadFile,
    bot: Annotated[Bot, Depends(get_bot)],
):
    file_data = await file.read()

    image = await bot.send_photo(
        chat_id=510369981,
        photo=BufferedInputFile(file_data, file.filename),
    )
    tele_file = await bot.get_file(image.photo[-1].file_id)

    downlod_link = "https://api.telegram.org/file/bot{token}/{path}".format(
        token=getenv("TELEGRAM_TOKEN"),
        path=tele_file.file_path,
    )

    async with aiohttp.ClientSession() as session, session.get(downlod_link) as response:
        if not response.ok:
            raise HTTPException(status_code=404, detail="Image not found")

        return {
            "file_id": image.photo[-1].file_id,
            "image_url": f"/v1/image/download/{base64.urlsafe_b64encode(image.photo[-1].file_id.encode()).decode()}",  # noqa: E501
        }


@router.get("/download/{file_id}")
async def download_image(
    file_id: str,
    bot: Annotated[Bot, Depends(get_bot)],
):
    tele_file = await bot.get_file(base64.urlsafe_b64decode(file_id).decode())
    downlod_link = "https://api.telegram.org/file/bot{token}/{path}".format(
        token=getenv("TELEGRAM_TOKEN"),
        path=tele_file.file_path,
    )

    async with aiohttp.ClientSession() as session, session.get(downlod_link) as response:
        if not response.ok:
            raise HTTPException(status_code=404, detail="Image not found")

        content = await response.read()
        content_type = response.headers.get("Content-Type", "image/jpeg")
        return StreamingResponse(BytesIO(content), media_type=content_type)
