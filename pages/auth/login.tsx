import { NextPage } from "next";
import NavBarGuest from "/components/navbar/NavBarGuest";

import Login from "/components/auth/Login";

const LoginPage: NextPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between animate-fade-in-up">
        <NavBarGuest />
        <Login />
    </div>
  );
};

export default LoginPage;
