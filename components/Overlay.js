import styles from "./overlay.module.scss";

const Overlay = ({type, signInShow}) => {
	const showHide = signInShow ? "overlay display-block" : "overlay display-none"
	console.log(type);
	if (typeof(type)==="undefined"){
		return <p>Overlay requires type of "signin" or "signup"</p>
	} else{
		return (
			
		<div className={showHide}>
			<div className={styles.overlay}>
				Overlay, blocking
			</div>
		</div>
	)
	}
	
}
export default Overlay;