import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

type Props = {
  setBalanceInplay: React.Dispatch<React.SetStateAction<string>>;
  setBalanceWallet: React.Dispatch<React.SetStateAction<string>>;
};

const BalanceTransferForm = (props: Props) => {
  const { setBalanceInplay, setBalanceWallet } = props;

  return (
    <div className="px-24 py-4 w-[54rem]">
      <div className="form-control">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          className="input input-bordered bg-base-300 text-neutral-content"
          placeholder="Enter email.."
          onChange={(event) => setBalanceInplay(event.target.value)}
        />
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input
          type="password"
          className="input input-bordered bg-base-300 text-neutral-content"
          placeholder="Enter password.."
          onChange={(event) => setBalanceWallet(event.target.value)}
        />
      </div>
    </div>
  );
};

export default BalanceTransferForm;
