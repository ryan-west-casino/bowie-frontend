import cn from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faPlus } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

type Props = {
  handleTransferClick: () => void;
  loading: boolean;
};

const BalanceTransferSubmit = (props: Props) => {
  const { handleTransferClick, loading } = props;

  return (
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
          "Transfer processing..."
        )}
      </button>
  );
};

export default BalanceTransferSubmit;
