import cn from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faPlus } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

type Props = {
  handleTokenLoginClick: () => void;
  loading: boolean;
};

const LoginSubmit = (props: Props) => {
  const { handleTokenLoginClick, loading } = props;

  return (
    <footer className="px-24 py-4 w-[54rem] flex gap-4">
      <button
        className={cn("btn w-0 flex-grow gap-2", {
          loading: loading,
        })}
        onClick={() => handleTokenLoginClick()}
      >
        {!loading ? (
          <>
            <FontAwesomeIcon icon={faPlus} className="text-primary" />
            Login
          </>
        ) : (
          "Login processing..."
        )}
      </button>
    </footer>
  );
};

export default LoginSubmit;
