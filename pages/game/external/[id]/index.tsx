import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loader from "components/Loader";
import sleep from "utils/sleep";
import { useCookies } from "react-cookie"

const ExternalGameInit: NextPage = () => {

  const router = useRouter();
  const { id } = router.query;

  const [Command, setCommand] = useState<Command | null>(null);
  const [cookie, setCookie] = useCookies(["token"]) ?? '0';

  useEffect(() => {
    const fetchCommand = async () => {
        const response = await fetch(`/api/game/external/init/${id}`, {
        method: "GET",
        headers: {
            "Authorization": "Bearer " +  Object.values(cookie),
        },
      });
      await sleep(250);
      if (response.ok) {
        const data: Command = await response.json();
        setCommand(data);
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

export default ExternalGameInit;
export { getServerSideProps };
