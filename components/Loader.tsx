import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { themeChange } from 'theme-change';
import { useEffect, useState } from "react";
type Props = {
  loadText: Array<string>;
};

const Loader = (props: Props) => {
  const { loadText } = props;
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="flex items-center gap-4 text-2xl">
        <FontAwesomeIcon
          icon={faSpinner}
          className="animate-spin text-primary"
        />
        <span>{loadText ? loadText : "Connecting.."}</span>
      </div>
    </div>
  );
};

export default Loader;
