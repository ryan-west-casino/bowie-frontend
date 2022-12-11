import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react'
import { RockPaperScissorsButton } from '/components/game/internal/rockpaperscissors/RockPaperScissorsButton';
import { RockPaperScissorsRules } from '/components/game/internal/rockpaperscissors/RockPaperScissorsRules';
import styles from '/styles/rockpaperscissors.module.scss';
import { useRouter } from "next/router";
import sleep from "utils/sleep";
interface RockPaperScissorsProps{
    GameBalance: number;
    betSize: number;
}
export default function Game({GameBalance}: RpsProps, {betSize}: RockPaperScissorsProps) {
    const [gameBalance, setGameBalance] = useState(GameBalance ?? '-1');
    const [bet, setBetSize] = useState('100');
    const [isPlaying, setIsPlaying] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [result, setResult] = useState<'YOU WIN' | 'YOU LOSE' | 'DRAW'>();
    const [playerChoice, setPlayerChoice] = useState<'paper' | 'scissors' | 'rock' | null>();
    const [houseChoice, setHouseChoice] = useState<'paper' | 'scissors' | 'rock' | null>(null);
    const possibleResults = ['paper', 'scissors', 'rock'];
    const router = useRouter();
    function startPlay(choice: 'paper' | 'scissors' | 'rock') {
        setGameBalance((gameBalance - 1).toFixed(2));
        setIsPlaying(true);
        setPlayerChoice(choice);
        getResult(choice);
    }
    const getResult = async (choice: 'paper' | 'scissors' | 'rock' | 'undefined') => {
        const placeBet = async () => {
            const response = await fetch(`/api/game/internal/rockpaperscissors`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    'game': 'rockpaperscissors',
                    choice,
                    bet,
                    'currency': 'USD'
                }),
            });
            await sleep(125);
            if (response.ok) {
                const gameresult = await response.json();
                setHouseChoice(gameresult.data.print_result.verbose);
                setGameBalance(gameresult.data.print_statement.formatted);
                await sleep(75);
                setResult((gameresult.data.print_statement.outcome).toUpperCase());
                setIsFinished(true);
            } else if (response.status === 401) {
                router.push('/auth/logout');
            } else if (response.status === 402) {
                router.push('/wallet');
            }
        };
        placeBet();
    };
    function reMatch(){
        setIsPlaying(false);
        setHouseChoice(null);
        setIsFinished(false);
        setResult("DRAW");
    }
    function toggleModal(){
        setShowModal(!showModal);
    }
    useEffect(()=>{
        if(houseChoice){
        }
    },[houseChoice])
    useEffect(() =>{

        },[gameBalance])
    function matchResults(){
        switch (playerChoice) {
            case "paper":
                if(houseChoice === "rock"){
                    setResult('YOU WIN')
                }else if(houseChoice === "scissors"){
                    setResult('LOSE')
                }else{
                    setResult('DRAW')
                }
            break;
                case "scissors":
                    if(houseChoice === "paper"){
                        setResult('YOU WIN')
                    }else if(houseChoice === "rock"){
                        setResult('YOU LOSE')
                    }else{
                        setResult('DRAW')
                    }
                break;
                    case "rock":
                        if(houseChoice === "scissors"){
                            setResult('YOU WIN')
                        }else if(houseChoice === "paper"){
                            setResult('YOU LOSE')
                        }else{
                            setResult('DRAW')
                        }
                    break;
                        default:
                            break;
        }
        setIsFinished(true)
    }
    return (
            <div className={styles.container}>
                <header>
                    <div className={styles.gameNameContainer}>
                        <span>rock paper scissors</span>
                    </div>
                    <div className={styles.balanceContainer}>
                        <p>Balance</p>
                        <span>{gameBalance}$</span>
                    </div>
                </header>
                <main>
                    {!isPlaying ?
                    <div className={styles.pickContainer}>
                        <RockPaperScissorsButton disable={isPlaying} startPlay={startPlay} choice="paper"/>
                        <RockPaperScissorsButton disable={isPlaying} startPlay={startPlay} choice="scissors"/>
                        <RockPaperScissorsButton disable={isPlaying} startPlay={startPlay} choice="rock"/>
                    </div>
                    :
                    <div className={styles.gamingWrapper}>
                        <div className={styles.gamingContainer}>
                            <div className={styles.playerChoiceContainer}>
                                <RockPaperScissorsButton
                                    disable={isPlaying}
                                    choice={playerChoice}
                                    result={result === 'WIN'}
                                />
                                <p>YOU PICKED</p>
                            </div>
                            {isFinished &&
                            <div className={styles.resultContainer}>
                                <p>{result}</p>
                                <button type="button" className="btn w-0 flex-grow gap-2" onClick={reMatch}>
                                    PLAY AGAIN
                                </button>
                            </div>
                            }
                            <div className={styles.houseChoiceContainer}>
                                {!houseChoice ? <span/>
                                :
                                <RockPaperScissorsButton
                                    disable={isPlaying}
                                    choice={houseChoice}
                                    result={result === 'LOSS'}
                                />
                                }
                                {houseChoice ? <span/>
                                :
                                <p></p>
                                }
                            </div>
                        </div>
                    </div>
                    }
                </main>
                <footer>
                    <button type="button" className="btn btn-secondary btn-md w-0 flex-grow gap-2" onClick={toggleModal}>
                        Game Rules
                    </button>
                </footer>
                <RockPaperScissorsRules toggleModal={toggleModal} showModal={showModal}/>
            </div>
    )
}