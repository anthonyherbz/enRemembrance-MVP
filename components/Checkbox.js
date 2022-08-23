//Clickable checkbox button to be used in forms
//Reqs: Icon
//Params: corner-radius, fill-color, border-color, fill-separation, check-icon
import styles from "./checkbox.module.scss";

const Checkbox = () => {
	return (
		<div className={styles.checkbox}>
			<label className={styles.formcontrol}>
				Content <input type='checkbox' name='unchecked' required />
			</label>
			<label className={styles.formcontrol}>
				Content <input type='checkbox' name='checked' checked required />
			</label>
		</div>
	);
};
export default Checkbox;
