import { NextPage } from "next";

import Register from "/components/auth/Register";
import NavBarGuest from "/components/navbar/NavBarGuest";

const RegisterPage: NextPage = () => {
  return (
          <div className="min-h-screen flex flex-col justify-between animate-fade-in-up">
              <NavBarGuest />
              <Register />
          </div>
  );
};

export default RegisterPage;
