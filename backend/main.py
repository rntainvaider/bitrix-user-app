from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from bitrix import get_user_info
import uvicorn

app = FastAPI()

# CORS - разрешаем запросы к react
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get(
    "/api/user",
    tags=["Пользователи"],
    summary="Получает данные пользователя с Bitrix",
)
async def get_user():
    try:
        user = await get_user_info()
        return user
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    uvicorn.run(app=app, host="127.0.0.1", port=8000)
