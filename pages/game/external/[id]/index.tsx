import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loader from "components/Loader";
import sleep from "utils/sleep";
import Game from "./game.tsx"
import { useCookies } from "react-cookie"
import Script from "next/script";

const ExternalGameInit: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [InitDatas, setInitDatas] = useState<Object<InitData>>('-1');
  const [tryCatch, setTryCatch] = useState('-1');
  const [cookie, setCookie] = useCookies(["token"]) ?? '0';
  const [PreloadComplete, setPreloadComplete] = useState(false);
  const [loadText, setLoadText] = useState('Contacting game server..');
  function togglePreload(){
	 setLoadText('Load complete, goodluck!');
     setTimeout(() => setPreloadComplete(true), 550);
  }
  useEffect(() => {
    const fetchCommand = async () => {
          const response = await fetch(`/api/game/init`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
		          "Authorization": "Bearer " +  Object.values(cookie),
              },
              body: new URLSearchParams({
                  'game': id,
                  'currency': 'USD'
              }),
          });
		  setLoadText('Requesting game session..');
          await sleep(200);
          if (response.ok) {
                const data = await response.json();
			    setLoadText('Loading assets..');
        		setTimeout(() => togglePreload(), 2750);
                setInitDatas(data);
      	  }
    };
    fetchCommand();
  }, []);


  if (InitDatas === '-1') {
    return <Loader loadText={loadText} />;
  }

  return (
	    <div className="min-h-screen flex flex-col justify-between animate-fade-in-up">
			{PreloadComplete === false ? <Loader loadText={loadText} /> : null}
	        <Game InitData={InitDatas} />
	    </div>
  );
};

const getServerSideProps = async () => {
  return {
    props: {},
  };
};

export default ExternalGameInit;
export { getServerSideProps };
