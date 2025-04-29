import httpx
import os
from dotenv import load_dotenv

_ = load_dotenv()

BITRIX_WEBHOOK = os.getenv("WEBHOOK")


async def get_user_info():
    async with httpx.AsyncClient() as client:
        response = await client.get(BITRIX_WEBHOOK)
        response.raise_for_status()
        return response.json()["result"]
