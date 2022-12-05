import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

type Props = {
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
};

const LoginForm = (props: Props) => {
  const { setEmail, setPassword } = props;

  return (
    <div className="px-24 py-4 w-[54rem]">
      <div className="form-control">
        <Link className="link link-hover text-sm w-fit mb-2 inline-flex gap-2 items-center" href={`/auth`}>
            <FontAwesomeIcon icon={faAngleLeft} className="text-primary" />
            Auth Overview
        </Link>
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          className="input input-bordered bg-base-300 text-neutral-content"
          placeholder="Enter email.."
          onChange={(event) => setEmail(event.target.value)}
        />
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input
          type="password"
          className="input input-bordered bg-base-300 text-neutral-content"
          placeholder="Enter password.."
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
    </div>
  );
};

export default LoginForm;
