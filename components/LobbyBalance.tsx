import Link from "next/link";
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react'
import { faUsd } from "@fortawesome/free-solid-svg-icons";
import { faGbp } from "@fortawesome/free-solid-svg-icons";
import { faEur } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Error from "components/Error";
import sleep from "utils/sleep";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie"

type Props = {
    Balance: Balance;
};
const LobbyBalance = (props: Props) => {
	  const router = useRouter();
	  const [errors, setErrors] = useState<Array<string>>([]);
      const { Balance } = props;
  	  const [loading, setLoading] = useState(false);
  	  const [buttonDisabled, setButtonDisabled] = useState(false);
      const [cookie, setCookie] = useCookies(["token"]) ?? '0';
   	  const [buttonText, setButtonText] = useState<'Transfer Wallet' | 'Processing..' | 'Error' | 'Complete'>('Transfer Wallet');

const handleTransferToWalletClick = async () => {
    setLoading(true);
    setButtonText('Processing..');
		setButtonDisabled(true);
	const currencyId = props.Balance.id;
    const response = await fetch(`/api/auth/transferToWallet`, {
        method: "POST",
        headers: {
          "Authorization": "Bearer " +  Object.values(cookie),
        },
      body: new URLSearchParams({
        currencyId,
      }),
    });
    await sleep(350);
    if (response.ok) {
      const data = await response.json();
      const access_token = data.access_token;
    	setButtonText('Complete');
        await sleep(1500);
		router.reload(window.location.pathname);
    } else {
      try {
    	setButtonText('Error');
        await sleep(2225);
		setButtonDisabled(false);
      } catch(err) {
    	setButtonText('Error');
      }
      setLoading(false);
    }
  };
    return (
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        {Balance.symbol}
                    </div>
                    <div className="stat-title">{Balance.id} balances</div>
                    <div className="stat-value">{Balance.formatted}</div>
                    <div className="stat-desc">+ inplay: {Balance.inplay_formatted}</div>
      				{Balance.inplay > 0 ? <div class="stat-actions"><button disabled={buttonDisabled} class="btn btn-xs" onClick={() => handleTransferToWalletClick()}>{buttonText}</button></div> : null}
                </div>
            );
};
export default LobbyBalance;
