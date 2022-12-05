import type { NextPage } from "next";

import WalletOverview from "components/wallet/WalletOverview";
import NavBar from "components/NavBar";
import { useEffect, useState } from "react";

const WalletPage: NextPage = () => {
  return (
    <div>
        <NavBar />
        <WalletOverview />
    </div>
  );
};

export default WalletPage;
