import Checkbox from "../components/Checkbox";
import ButtonText from "../components/ButtonText";
import ButtonIcon from "../components/ButtonIcon";
import Author from "../components/Author";
import Logo from "../components/Logo";
import Post from "../components/Post";

const Testing = () => {
	return (
		<div>
			<Logo />
			<Author />
			<ButtonIcon
				label="test button"
				alt="test button"
				path="/welcome"
				icon="logo_temp"
			/>
			<Checkbox/>
			<Post/>
		</div>)
}
export default Testing;