import type { NextPage } from "next";
import LobbyList from "components/LobbyList";
import NavBarAuthenticated from "components/navbar/NavBarAuthenticated";
import { useEffect, useState } from "react";

const HomePage: NextPage = () => {

  return (
    <div className="min-h-screen animate-fade-in-up">
        <NavBarAuthenticated />
        <LobbyList />
    </div>
  );
};

export default HomePage;
