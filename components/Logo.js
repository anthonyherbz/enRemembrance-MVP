//Logo component to display SVG next to text in chosen font
//reqs: Icon, link,
//props: color, backgroundcolor, clickbehavior
import Icon from "../components/Icon";
import Text from "../components/Text";

function goHome(){
	
}

const Logo = () => {
	return (
		<div onClick={goHome}>
			<Icon
				name='logo_temp'
				color='blue'
				alt='enRemembrance icon'
				width='100'
				height='100'
			/>
			<Text color="blue" size="3rem" fontWeight="bold" >enRemembrance</Text>
		</div>
	);
};
export default Logo;
