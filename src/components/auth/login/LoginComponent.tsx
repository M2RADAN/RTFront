import { FC, useEffect, useState } from "react";
export const Login: FC = () => {
  return (
    <div>
      <h2>Авторизация</h2>
      <form className="Form">
        <label>email</label>
        <input type="text" placeholder="Введите ваш email"></input>
        <label>пароль</label>
        <input type="text" placeholder="Пароль"></input>
      </form>
    </div>
  );
};
