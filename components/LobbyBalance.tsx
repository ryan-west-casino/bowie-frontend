import Link from "next/link";
import { faUsd } from "@fortawesome/free-solid-svg-icons";
import { faGbp } from "@fortawesome/free-solid-svg-icons";
import { faEur } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
type Props = {
    Balance: Balance;
};

const LobbyBalance = (props: Props) => {
    const { Balance } = props;
    return (
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        {Balance.symbol}
                    </div>
                    <div className="stat-title">{Balance.id}</div>
                    <div className="stat-value">{Balance.formatted}</div>
                    <div className="stat-desc">available</div>
                </div>
            );
};

export default LobbyBalance;
