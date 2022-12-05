import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import AuthIndex from "components/auth/AuthIndex";
import NavBarGuest from "components/navbar/NavBarGuest";

const AuthPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
          <div className="min-h-screen animate-fade-in-up">
              <NavBarGuest />
              <AuthIndex />
        </div>
  );
};
const getServerSideProps = async () => {
  return {
    props: {},
  };
};
export default AuthPage;
export {getServerSideProps};