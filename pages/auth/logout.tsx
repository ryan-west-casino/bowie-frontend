import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie"

import Loader from "components/Loader";

import sleep from "utils/sleep";

const LogoutPage: NextPage = () => {

  const router = useRouter();
  const { id } = router.query;
  const [cookie, setCookie] = useCookies(["token"]) ?? '0';

  const [Command, setCommand] = useState<Command | null>(null);

  useEffect(() => {
    const fetchCommand = async () => {
      const response = await fetch(`/api/auth/logout`, {
        method: "POST",
        headers: {
          "Authorization": "Bearer " +  Object.values(cookie),
        },
      });

      await sleep(500);
      if (response.ok) {
        setCookie("token", "0", {
          path: "/",
          maxAge: -3600, // Expires after 1hr
          sameSite: true,
        });
        router.push(`/auth`);
      } else if (response.status === 500) {
        setCookie("token", "0", {
          path: "/",
          maxAge: -3600, // Expires after 1hr
          sameSite: true,
        });
        router.push(`/auth`);
      } else {
          setCookie("token", "0", {
              path: "/",
              maxAge: -3600, // Expires after 1hr
              sameSite: true,
          });
      }
    };

    fetchCommand();
  }, []);

  if (!Command) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen flex flex-col justify-between animate-fade-in-up">
    </div>
  );
};

const getServerSideProps = async () => {
  return {
    props: {},
  };
};

export default LogoutPage;
export { getServerSideProps };
