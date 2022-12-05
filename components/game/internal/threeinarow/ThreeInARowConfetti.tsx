import styles from '/styles/threeinarow.module.scss';
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';
interface ModalProps{
    toggleConfetti: () => void;
    showConfetti: boolean;
}
export function ThreeInARowConfetti({toggleConfetti, showConfetti}: ModalProps){
    const { width, height } = useWindowSize();

    return(
            <div 
                style={showConfetti ? {visibility:"visible"} : {visibility:"hidden"} }
                >
                <Confetti width={width} height={height} />
            </div>
            )
}
export default ThreeInARowConfetti;