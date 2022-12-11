import React, { useState, useEffect } from 'react';
import symbolDictionary from './symbolDictionary.json'
import sleep from "utils/sleep";
import { useRouter } from "next/router";
import styles from '/styles/threeinarow.module.scss';
import { ThreeInARowConfetti } from '/components/game/internal/threeinarow/ThreeInARowConfetti';
import { ThreeInARowRules } from '/components/game/internal/threeinarow/ThreeInARowRules';
import Link from "next/link";
interface ThreeInARowProps{
    GameBalance: number;
    betSize: number;
    InitData: Object;
}
export default function Game({GameBalance, betSize, InitData}: ThreeInARowProps) {
  const [spinResult, setSpinResult] = useState("");
  const [threeInARow, setThreeInARow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [spinButtonDisabled, setSpinButtonDisabled] = useState(false);
  const [bet, setBet] = useState('100');
  const [gameBalance, setGameBalance] = useState(GameBalance ?? '-1');
  const router = useRouter();
	const keyDownHandler = (event) => {
		if(event.keyCode == 32 || event.key == " " || event.code == "Space") { //spacebar spin
			if(!spinButtonDisabled) {
			 setSpinButtonDisabled(true);
        		setTimeout(() => spin(), 350);
			}
		}
	};
	useEffect(() => {
	    document.addEventListener("keyup", keyDownHandler);
	    return () => document.removeEventListener("keyup", keyDownHandler);
	}, []);

   function changeBet(newBet) {
		setBet(newBet);
   }

  function toggleModal(){
      setShowModal(!showModal);
  }
    function toggleConfetti(){
      setShowConfetti(!showConfetti);
  }

  const getResult = async () => {
      const placeBet = async () => {
          const response = await fetch(`/api/game/internal/threeinarow`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
              },
              body: new URLSearchParams({
                  'game': 'threeinarow',
                  'bet': bet,
                  'currency': 'USD'
              }),
          });
          await sleep(225);
          if (response.ok) {
              const gameresult = await response.json();
              setSpinResult(gameresult?.data?.print_result.verbose );
              await sleep(125);
              console.log(gameresult);
              setGameBalance(gameresult.data.print_statement.formatted);
              if(gameresult?.data?.print_result.outcome === "win") {
                  setThreeInARow(true);
                  setShowConfetti(true);
              } else {
                  setThreeInARow(false);
              }
          } else if (response.status === 401) { //not authorized on api
              router.push('/auth/logout');
          } else if (response.status === 402) { //insufficient balance
              router.push('/wallet');
          }
      };
      placeBet();
  };
  function spin() {
      setShowConfetti(false);
      setGameBalance((gameBalance - (bet / 100).toFixed(2)).toFixed(2))
	    setSpinButtonDisabled(true);
	    getResult()
    .then(function (response) {
        setSpinResult("");
    })
      .catch(function (error) {
        // handle error
        setSpinResult("");
        setThreeInARow(false);
        console.log(error);
      })
      .finally(function () {
        // always executed
        setTimeout(() => setSpinButtonDisabled(false), 1850);
      });
  }

  function getSpriteOffset(letter) {
    return symbolDictionary[letter].offset;
  }
    return (
            <div>
                <div className={styles.container}>
                    <header>
                        <div className={styles.balanceContainer}>
                            <p>Bet</p>
		                    <div className={styles.balanceContainer + " dropdown dropdown-bottom"}>
		                        <label tabIndex={0} className="btn btn-ghost btn-circle">
                            			 {(bet / 100).toFixed(2)}$
		                        </label>
		                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
					                    {InitData.data.init_meta.betsizes.map((Betsized) => (
					                            <li><a onClick={(e) => setBet(Betsized)}>{(Betsized / 100).toFixed(2)}</a></li>
					                        ))}
		                        </ul>
		                    </div>
						</div>
                        <div className={styles.balanceContainer}>
                            <p>Balance</p>
		                    <div className={styles.balanceContainer + " dropdown"}>
                            			 {gameBalance}$
		                    </div>
						</div>
                    </header>
                    <main>
                        <div className={styles.gamingWrapper}>
                            <div className="row">
                                <div id="card-row" className="card" style={spinResult[0] && { backgroundPositionY: getSpriteOffset(spinResult[0]) }}>
                                </div>
                                <div id="card-row" className="card" style={spinResult[1] && { backgroundPositionY: getSpriteOffset(spinResult[1]) }}>
                                </div>
                                <div id="card-row" className="card" style={spinResult[2] && { backgroundPositionY: getSpriteOffset(spinResult[2]) }}>
                                </div>
                            </div>
                        </div>
                    </main>
                    <footer>
              <button type="button" className="btn rulesButton btn-primary btn-sm w-0 mr-1 flex-grow gap-2" onClick={spin} disabled={spinButtonDisabled}>
                            Play {(bet / 100).toFixed(2)}
              </button>
              <button type="button" className="btn btn-secondary btn-sm w-0 flex-grow gap-2" onClick={toggleModal}>
                  Game Rules
              </button>
          </footer>
                    <ThreeInARowConfetti toggleConfetti={toggleConfetti} showConfetti={showConfetti} />
                    <ThreeInARowRules toggleModal={toggleModal} showModal={showModal}/>
      </div>
      <style jsx>{`
        .row {
          max-width: 95vw;
          margin: auto;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
        }
        .card {
		  height: 125px;
		}
		@media(min-height: 700px) {
	        .card {
			  height: 375px;
			}
		}
        .card {
          background-image: url(/game_assets/threeinarow/symbol.svg);
          background-repeat: repeat-y;
          background-position-x: center;
          background-position-y: 0px;
          width: 215px;
          margin: 4px;
          border: 2px solid rgba(0, 0, 0, 0.10);
          transition: background-position-y 400ms ease-in-out;
        }
        .card:nth-of-type(1) {
          background-position-y: 0px;
          transition-delay: 0ms;
        }
        .card:nth-of-type(2) {
          background-position-y: -500px;
          transition-delay: 125ms;
        }
        .card:nth-of-type(3) {
          background-position-y: -125px;
          transition-delay: 250ms;
        }
      `}</style>
    </div>
    );
}