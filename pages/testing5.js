import profUrl, { ReactComponent as Prof } from '../public/images/Profile.svg'

const Testing5 = () => {
	console.log({Prof})
	console.log(profUrl)
	return (
			<img src={profUrl}/>
	)
}
export default Testing5
