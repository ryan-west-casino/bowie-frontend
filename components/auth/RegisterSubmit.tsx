import cn from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faPlus } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

type Props = {
  handleSignupClick: () => void;
  loading: boolean;
};

const RegisterSubmit = (props: Props) => {
  const { handleSignupClick, loading } = props;

  return (
    <footer className="px-24 py-4 w-[54rem] flex gap-4">
      <button
        className={cn("btn w-0 flex-grow gap-2", {
          loading: loading,
        })}
        onClick={() => handleSignupClick()}
      >
        {!loading ? (
          <>
            <FontAwesomeIcon icon={faPlus} className="text-primary" />
            Create Account
          </>
        ) : (
          "Creating..."
        )}
      </button>
    </footer>
  );
};

export default RegisterSubmit;
