from datetime import UTC, datetime, timedelta
from typing import Annotated

from fastapi import Depends, HTTPException, Request
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import ExpiredSignatureError, jwt
from jose.exceptions import JWTError

import config


def create_session_token(
    data: dict,
    expires_delta: timedelta = timedelta(days=config.REFRESH_TOKEN_EXPIRE_DAYS),
):
    payload = data.copy()
    payload.update({"exp": datetime.now(tz=UTC) + expires_delta})
    return jwt.encode(payload, config.REFRESH_TOKEN_SECRET_KEY, algorithm=config.ALGORITHM)


def verify_session_token(token: str):
    return jwt.decode(token, config.REFRESH_TOKEN_SECRET_KEY, algorithms=[config.ALGORITHM])


bearer_scheme = HTTPBearer(auto_error=False)


def get_auth_user(
    request: Request,
    credentials: Annotated[HTTPAuthorizationCredentials, Depends(bearer_scheme)],
):
    session_token = credentials.credentials if credentials else request.cookies.get("session")
    if not session_token:
        raise HTTPException(status_code=401, detail="Not authenticated")

    try:
        return verify_session_token(session_token)
    except ExpiredSignatureError as err:
        raise HTTPException(status_code=401, detail="Session expired") from err
    except JWTError as err:
        raise HTTPException(status_code=401, detail="Could not validate credentials") from err
