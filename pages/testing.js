import Checkbox from "../components/Checkbox";
import Button from "../components/Button";
import Author from "../components/Author";
import Logo from "../components/Logo";

const Testing = () => {
	return (
		<div>
			<Logo />
			<Author />
			<Button
				label="test button"
				alt="test button"
				path="/welcome"
				icon="logo_temp"
			/>
			<Checkbox/>
		</div>)
}
export default Testing;