import styles from '/styles/rockpaperscissors.module.scss';
interface RockPaperScissorsProps{
    startPlay: (choice: 'paper' | 'scissors' | 'rock') => void;
    disable:boolean;
    choice: 'paper' | 'scissors' | 'rock';
    result?:boolean;
}
export function RockPaperScissorsButton({startPlay, disable, choice, result} : RockPaperScissorsProps){
    return(
            <div className="animate-fade-in-up">
                <div className={styles.buttonContainer}>
                    <button
                        disabled = {disable}
                        type="button"
                        className={
                            choice === 'paper' ? styles.paper:
                            choice === 'rock' ? styles.rock :
                            styles.scissors
                        }
                        onClick={() => startPlay(choice)}
                        >
                        <img src={`/game_assets/rockpaperscissors/icon-${choice}.svg`} alt={choice}/>
                    </button>
                    {result && <span/>}
                </div>
            </div>
            )
}

export default RockPaperScissorsButton;
