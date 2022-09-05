import styles from "./signoverlay.module.scss";
// import TextInput from "./TextInput";
import ButtonText from "../button/ButtonText";

//Name: Overlay
//Purpose: displays one of two overlays on the landing page
//Props: signInShow/signUpShow track state, set props control state
//Mobile ready: yes
//To do: change styles for form elements

//Details: setXShow props are called when clicking outside of the .inside div (AKA on .closeZone) or when clicking on the x
//Opportunities for improvement: reduce duplicates by checking once if the type is sign in or sign up and using vars accordingly

const SignOverlay = ({ signInShow, setSignInShow, signUpShow, setSignUpShow }) => {
	console.log("signInShow state: ", signInShow);
	function handleSignInClick() {
		setSignInShow(!signInShow);
		console.log("signInShow changed to: ", signInShow);
	}
	function handleSignUpClick() {
		setSignUpShow(!signUpShow);
		console.log("signUpShow changed to: ", signUpShow);
	}
	const signUpOverlay = (
		<div className={styles.topLevel}>
			<div className={styles.closeZone} onClick={handleSignUpClick}></div>
			<div className={styles.overlay}>
				<div className={styles.inside}>
					<div onClick={handleSignUpClick} className={styles.close}>
						x
					</div>
					<form action=''>
						<label htmlFor='name'>Name</label>
						<input type='text' name='name' id='name' />
						<label htmlFor='nickname'>Nickname</label>
						<input type='text' name='nickname' id='nickname' />
						<label htmlFor='email'>Email</label>
						<input type='text' name='email' id='email' />
						<label htmlFor='age'>Age</label>
						<input
							type='number'
							name='age'
							id='age'
							min='13'
							max='120'
						/>
						<label htmlFor='password'>Password</label>
						<input type='password' name='password' id='password' />
						<div className={styles.checkbox}>
							<label htmlFor='readtc'>
								I have read and agreed to the Terms and
								Conditions
							</label>
							<input required type='checkbox' name='readtc' />
						</div>
						<div className={styles.button}>
							<ButtonText
								color='yellow'
								size='small'
								label='Sign Up'
								// path='/'
							/>
						</div>
					</form>
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
					<form>
						<label htmlFor='email'>Email</label>
						<input type='text' name='email' id='email' />
						<label htmlFor='password'>Password</label>
						<input type='password' name='password' id='password' />
						<div className={styles.button}>
							<ButtonText
								color='blue'
								size='small'
								label='Sign In'
								// path='/'
							/>
						</div>
					</form>
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
