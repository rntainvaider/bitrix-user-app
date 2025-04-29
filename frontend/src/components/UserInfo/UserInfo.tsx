import React, { useEffect, useState } from 'react';
import axios from "axios";
import styles from "./styles.module.css";

interface User {
  NAME: string;
  LAST_NAME: string;
  EMAIL: string;
  PERSONAL_PHOTO?: string;
}

const API_URL = "http://localhost:8000/api/user";

export default function UserInfo() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    axios.get(API_URL).then(result => setUser(result.data)).catch(error => console.error("Ошибка:", error));
  }, []);

  if (!user) return <p className={styles["loading"]}>Загрузка...</p>

  return (
    <div className={styles["body"]}>
      <div className={styles["wrapper"]}>
        <h2 className={styles["information"]}>Информация о пользователе</h2>
        <img src={user.PERSONAL_PHOTO} alt="Фото пользователя" className={styles["image"]} />
        <div className={styles["inner"]}>
          <p className={styles["text"]}>Имя: {user.NAME}</p>
          <p className={styles["text"]}>Фамилия: {user.LAST_NAME}</p>
          <p className={styles["text"]}>Email: {user.EMAIL}</p>
        </div>
      </div>
    </div>
  )
}
