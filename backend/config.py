from os import getenv

from dotenv import load_dotenv

load_dotenv()


ACCESS_TOKEN_SECRET_KEY = getenv("ACCESS_TOKEN_SECRET_KEY")
REFRESH_TOKEN_SECRET_KEY = getenv("REFRESH_TOKEN_SECRET_KEY")
MONGODB_URI = getenv("MONGODB_URI", "mongodb://localhost:27017/alumni")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 1
REFRESH_TOKEN_EXPIRE_DAYS = 30
WEB_HOST = getenv("WEB_HOST", "localhost")
WEB_SESSION_DOMAIN = getenv("WEB_SESSION_DOMAIN")
