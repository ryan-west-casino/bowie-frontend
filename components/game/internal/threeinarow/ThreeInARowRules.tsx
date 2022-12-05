import styles from '/styles/threeinarow.module.scss';
interface ModalProps{
    toggleModal: () => void;
    showModal: boolean;
}
export function ThreeInARowRules({toggleModal, showModal}: ModalProps){
    return(
            <div className={styles.modalContainer}
                style={showModal ? {visibility:"visible"} : {visibility:"hidden"} }
                >
                <div className={`${styles.rulesContainer} ${showModal ? styles.modalAnimationShowUp : styles.modalAnimationClose}`}>
                    <p>RULES</p>
                    <span>Get three in a row and win 12x your bet.
                        <br/><br/>Each symbol is individually generated, with 4 symbol options.
                        <br/><br/>Game only has a single winning line.
                        <br/><br/>The chance of winning is 1 in 16.</span>
                    <button type="button" onClick={toggleModal}>
                        <img src="/game_assets/icon-close.svg" alt="Close"/>
                    </button>
                </div>
            </div>
            )
}
export default ThreeInARowRules;
