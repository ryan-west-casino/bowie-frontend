import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LobbyBalanceInplay from "components/LobbyBalanceInplay";
import BalanceTransferModal from "components/wallet/BalanceTransferModal";
import LobbyBalance from "components/LobbyBalance";
import LobbyListing from "components/LobbyListing";
import Loader from "components/Loader";
import { useCookies } from "react-cookie"

import sleep from "utils/sleep";

const LobbyList = () => {
    const router = useRouter();
    const [Commands, setCommands] = useState<Array<Command>>([]);
    const [Balances, setBalances] = useState<Array<Balance>>([]);
    const [cookie, setCookie] = useCookies(["token"]) ?? '0';
    useEffect(() => {
        const fetchCommands = async () => {
            const response = await fetch("/api/lobby", {
                method: "GET",
		        headers: {
		          "Authorization": "Bearer " +  Object.values(cookie),
		        },
            });
            await sleep(125);
            if (response.ok) {
                const lobbyresponse = await response.json();
                setCommands(lobbyresponse.data);
                console.log(lobbyresponse);
                setBalances(lobbyresponse.balances);

            } else if (response.status === 401) {
                router.push('/auth/logout');
            }
        };
        fetchCommands();
        }, []);

    if (Commands.length === 0) {
        return <Loader />;
    }

    return (
            <div className="min-h-screen p-12 flex flex-col gap-6 animate-fade-in-up items-center">
                <div className="stats shadow">
                    {Balances.map((Balance) => (
                            <LobbyBalance key={Balance.id} Balance={Balance} />
                        ))}
                </div>
                {Commands.map((Command) => (
                        <LobbyListing key={Command.id} Command={Command} />
                        ))}
            </div>
            );
};

export default LobbyList;
