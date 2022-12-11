import BalanceTransferForm from "components/wallet/BalanceTransferForm";
import BalanceTransferSubmit from "components/wallet/BalanceTransferSubmit";
import { useRouter } from "next/router";
import { useState } from "react";
import { useCookies } from "react-cookie"
import styles from '/styles/balancetransfer.module.scss';

import Error from "components/Error";
import sleep from "utils/sleep";
interface ModalProps{
    toggleModal: () => void;
    showModal: boolean;
    Balance: Balance;
}
const BalanceTransferModal = ({toggleModal, showModal}: ModalProps) => {
  const router = useRouter();

  const [balanceInplay, setBalanceInplay] = useState("");
  const [balanceWallet, setBalanceWallet] = useState("");
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<Array<string>>([]);

  const handleTransferClick = async () => {
    setLoading(true);
    setErrors([]);

    const response = await fetch(`/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        email,
        password,
      }),
    });

    await sleep(150);

    if (response.ok) {
      const data = await response.json();
      const access_token = data.access_token;

      router.push(`/?login=true`);
    } else {
      try {
        const errorResponse = await response.json();
        const errorsObj = {error: errorResponse.message};
        setErrors(Object.values(errorsObj));
      } catch(err) {
        const errorsObj = {error: "Something went wrong.."};
        setErrors(Object.values(errorsObj));
      }
      setLoading(false);
    }
  };

  return (
            <div className={styles.modalContainer}
                style={showModal ? {visibility:"visible"} : {visibility:"hidden"} }
                >
                    <button type="button" onClick={toggleModal}>
                        <img src="/game_assets/icon-close.svg" alt="Close"/>
                    </button>
                <div className={`${styles.balanceTransferContainer} ${showModal ? styles.modalAnimationShowUp : styles.modalAnimationClose}`}>
				      <BalanceTransferForm
				        setBalanceInplay={setBalanceInplay}
				        setBalanceWallet={setBalanceWallet}
				      />
				      <BalanceTransferSubmit
				        handleTransferClick={handleTransferClick}
				        loading={loading}
				      />
                </div>
            </div>
  );
};

export default BalanceTransferModal;
