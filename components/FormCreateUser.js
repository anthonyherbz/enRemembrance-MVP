import { useState } from "react";
import styles from "./formcreateuser.module.scss";
const FormCreateUser = () => {
	const hints = {
		fullname: "Your name",
		handle: "A handle between 4 and 24 characters in length",
		password: "A password between 12 and 54 characters in length",
		email: "An email address between 4 and 48 characters in length",
		phone: "An American phone number",
	};
	return (
		<div>
			<form
				className={styles.form}
				name='createUser'
				method='post'
				action='/api/createuser-lib'
			>
				<div>
					<label htmlFor='fullname' aria-label='required'>
						Your Full Name
					</label>
					<input
						required
						type='string'
						name='fullname'
						pattern='[a-z]+'
						placeholder='Full Name'
						minLength='2'
						maxLength='100'
						title={hints.fullname}
					></input>
					<div className={styles.hint}></div>
				</div>
				<div>
					<label htmlFor='email' aria-label='required'>
						Email
					</label>
					<input
						required
						type='email'
						name='email'
						placeholder='Email Address'
						minLength='4'
						maxLength='48'
						title={hints.email}
					></input>
					<div className={styles.hint}>{hints.email}</div>
				</div>
				<div>
					<label htmlFor='phone_number' aria-label='required'>
						Phone Number
					</label>
					<input
						required
						type='tel'
						pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
						name='phone_number'
						placeholder='000-000-0000'
						minLength='4'
						maxLength='20'
						title={hints.phone}
					></input>
					<div className={styles.hint}>{hints.phone}</div>
				</div>
				<div>
					<label htmlFor='handle' aria-label='required'>
						Handle
					</label>
					<input
						required
						type='string'
						name='handle'
						placeholder='Handle'
						minLength='4'
						maxLength='24'
						title={hints.handle}
					></input>
					<div className={styles.hint}>{hints.handle}</div>
				</div>
				<div>
					<label htmlFor='password' aria-label='required'>
						Password
					</label>
					<input
						required
						type='password'
						name='password'
						pattern='[a-zA-Z0-9_!-2@?]{12,}'
						placeholder='Password'
						minLength='12'
						maxLength='54'
						title={hints.password}
					></input>
					<div className={styles.hint}>{hints.password}</div>
				</div>
				<button type='submit'>Submit</button>
			</form>
		</div>
	);
};
export default FormCreateUser;
