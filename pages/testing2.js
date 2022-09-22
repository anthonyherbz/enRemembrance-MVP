import { useState } from "react";
const Testing2 = () => {
	let date = new Date().toJSON();
	console.log(date);
	return (
		<div>
			<form
				name='createUser'
				method='post'
				style={{ display: "flex", flexDirection: "column" }}
			>
				<label htmlFor='username'>Username</label>
				<input
					required
					type='string'
					name='username'
					placeholder='username'
					minLength="4"
					maxLength="24"
				></input>
				<label htmlFor='password'>Password</label>
				<input
					required
					type='string'
					name='password'
					placeholder='password'
					minLength="16"
					maxLength="64"
				></input>
				<button type="submit" >Submit</button>
			</form>
		</div>
	);
};
export default Testing2;

function validate(){

}
