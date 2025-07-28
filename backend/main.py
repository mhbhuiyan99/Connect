import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import config
from api import router
from models import init_db

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)

logger = logging.getLogger(__name__)


async def lifespan(_: FastAPI):
    await init_db()
    yield
    logger.info("Shutting down...")


def get_app():
    app = FastAPI(
        title="Alumni API",
        description="API for Alumni",
        version="1.0.0",
        lifespan=lifespan,
    )
    app.include_router(router=router)
    origins = ["http://localhost:3000", "http://127.0.0.1:3000"]
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    return app


app = get_app()

if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host=config.WEB_HOST, port=8000, reload=True)
