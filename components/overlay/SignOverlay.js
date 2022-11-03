import styles from "./signoverlay.module.scss";
// import TextInput from "./TextInput";
import ButtonText from "../button/ButtonText";
import FormCreateUser1 from "../signin/FormCreateUser1"
import FormLogInUser from "../signin/FormLogInUser";

//Name: Overlay
//Purpose: displays one of two overlays on the landing page
//Props: signInShow/signUpShow track state, set props control state
//Mobile ready: yes
//To do: change styles for form elements

//Details: setXShow props are called when clicking outside of the .inside div (AKA on .closeZone) or when clicking on the x
//Opportunities for improvement: reduce duplicates by checking once if the type is sign in or sign up and using vars accordingly

const SignOverlay = ({ signInShow, setSignInShow, signUpShow, setSignUpShow }) => {
	// console.log("signInShow state: ", signInShow);
	function handleSignInClick() {
		setSignInShow(!signInShow);
		// console.log("signInShow changed to: ", signInShow);
	}
	function handleSignUpClick() {
		setSignUpShow(!signUpShow);
		// console.log("signUpShow changed to: ", signUpShow);
	}
	const signUpOverlay = (
		<div className={styles.topLevel}>
			<div className={styles.closeZone} onClick={handleSignUpClick}></div>
			<div className={styles.overlay}>
				<div className={styles.inside}>
					<div onClick={handleSignUpClick} className={styles.close}>
						x
					</div>
					<FormCreateUser1/>
				</div>
			</div>
		</div>
	);
	const signInOverlay = (
		<div className={styles.topLevel}>
			<div className={styles.closeZone} onClick={handleSignInClick}></div>
			<div className={styles.overlay}>
				<div className={styles.inside}>
					<div onClick={handleSignInClick} className={styles.close}>
						x
					</div>
					<FormLogInUser/>
				</div>
			</div>
		</div>
	);
	if (signInShow === !null) {
		return <>{signInShow ? signInOverlay : null}</>;
	}
	if (signUpShow === !null) {
		return <>{signUpShow ? signUpOverlay : null}</>;
	}
};
export default SignOverlay;
