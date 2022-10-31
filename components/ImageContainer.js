import Image from "next/image";
import styles from './imagecontainer.module.scss';
import classNames from "classnames/bind";
let cx = classNames.bind(styles);

const ImageContainer = ({src, alt="alt text"}) => {


	let imageContainer = cx({
		imageContainer : true,
		fill : true
	})
	return (
		<div className={imageContainer}>
			<Image src={src} layout="fill" object-fit="cover" width='50' height='50' alt={alt}/>
		</div>
	)
}
export default ImageContainer;