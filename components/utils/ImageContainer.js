import Image from "next/image";
import styles from './imagecontainer.module.scss';
import classNames from "classnames/bind";
let cx = classNames.bind(styles);

const ImageContainer = ({src, alt="alt text", sizes}) => {


	let imageContainer = cx({
		imageContainer : true,
		fill : true
	})
	return (
		<div className={imageContainer}>
			<Image src={src} fill="true" object-fit="cover" alt={alt} sizes={sizes}/>
		</div>
	)
}
export default ImageContainer;