import styles from '/styles/rockpaperscissors.module.scss';
interface ModalProps{
    toggleModal: () => void;
    showModal: boolean;
}
export function RockPaperScissorsRules({toggleModal, showModal}: ModalProps){
    return(
            <div className={styles.modalContainer}
                style={showModal ? {visibility:"visible"} : {visibility:"hidden"} }
                >
                <div className={`${styles.rulesContainer} ${showModal ? styles.modalAnimationShowUp : styles.modalAnimationClose}`}>
                    <p>RULES</p>
                    <img src="/game_assets/rockpaperscissors/image-rules.svg" alt="Rules"/>
                    <button type="button" onClick={toggleModal}>
                        <img src="/game_assets/icon-close.svg" alt="Close"/>
                    </button>
                </div>
            </div>
            )
}
export default RockPaperScissorsRules;
