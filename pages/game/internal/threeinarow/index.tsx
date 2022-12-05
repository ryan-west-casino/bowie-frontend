import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import type { NextPage } from "next";
import NavBarAuthenticated from "components/navbar/NavBarAuthenticated";
import Game from "./game.tsx";
import Loader from "components/Loader";
import sleep from "utils/sleep";

const GameInit: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;
  const [GameBalances, setGameBalance] = useState<Number<GameBalance>>('-1');
  const [cookie, setCookie] = useCookies(["token"]) ?? '0';
  const [Balances, setBalances] = useState<Array<UserBalance>>([]);
  useEffect(() => {
    const fetchCommands = async () => {
        const response = await fetch(`/api/auth/balance`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " +  Object.values(cookie),
            },
        });
      await sleep(135);
      if (response.ok) {
          const data = await response.json();
          setGameBalance(data.user.balance.usd.formatted);
      } else if (response.status === 401) {
        router.push('/auth/logout');
      }
    };

    fetchCommands();
  }, []);

  if (GameBalances === '-1') {
    return <Loader />;
  }

  return (
       <div className="animate-fade-in-up">
        <NavBarAuthenticated />
        <Game GameBalance={GameBalances} />
      </div>
  );
};
export default GameInit;