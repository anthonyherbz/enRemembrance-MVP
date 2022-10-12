import styles from './blockingoverlay.module.scss'
import ButtonText from '../button/ButtonText';

const BlockingOverlay = ({children, buttonText, buttonColor, state, setState, passedFunction}) => {
	function closeOverlay(){
		setState(false);
	}
	function handleDelete(){
		closeOverlay();
		if (passedFunction != undefined){
			passedFunction()
			// window.location.reload()
		}
	}
	return (
		<div className={styles.blockingOverlay}>
			<div className={styles.background} onClick={closeOverlay}></div>
			<div className={styles.foreground}>
				{children} <div onClick={handleDelete}><ButtonText size="small" fill="true" label={buttonText} color={buttonColor}/></div>
				<div className={styles.close} onClick={closeOverlay}>X</div>
			</div>
		</div>
	)
}
export default BlockingOverlay;