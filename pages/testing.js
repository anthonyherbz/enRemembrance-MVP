import Checkbox from "../components/Checkbox";
import ButtonText from "../components/ButtonText";
import ButtonIcon from "../components/ButtonIcon";
import Author from "../components/Author";
import Logo from "../components/Logo";
import Post from "../components/Post";
import ExpandingText from "../components/ExpandingText";

const Testing = () => {
	return (
		<div>
			<ExpandingText backgroundColor='green_landing'>
				Lorem, ipsum dolor sit amet consectetur adipisicing elit.
				Delectus nihil pariatur laboriosam modi ullam aliquid nobis,
				officiis quidem, omnis, aut consectetur est dolore expedita?
				Dignissimos cupiditate aliquid commodi exercitationem quisquam!
			</ExpandingText>
			<Logo />
			<Author />
			<ButtonIcon
				label='test button'
				alt='test button'
				path='/welcome'
				icon='logo_temp'
			/>
			{/* <Checkbox/> */}
			<Post />
		</div>
	);
};
export default Testing;
