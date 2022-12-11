import Link from "next/link";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
type Props = {
  Command: Command;
};

const LobbyListing = (props: Props) => {
  const { Command } = props;

  return (
    <Link href={Command.link}>
        <div className="card bg-base-300 w-[32rem] text-base-content" id={Command.id}>
          <div className="card-body">
            <h2 className="card-title">{Command.name}</h2>
            <p>{Command.desc}</p>
              <p className="ml-auto">
                  <i>{Command.provider}</i></p>
          </div>
        </div>
    </Link>

  );
};

export default LobbyListing;
