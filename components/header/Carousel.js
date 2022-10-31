//Horizontally scrolling item carousel with items decreasing in size from center to give percieved depth
//Movable with arrows on left/right or by dragging
//Reqs: BookCover, Text, Button
//Props: items, backgroundcolor
import ImageContainer from "../ImageContainer"
import Link from "next/link"
import styles from "./carousel.module.scss"
const Carousel = ({ showCarousel, setShowCarousel, categories }) => {
	function handleMouseLeave() {
		setShowCarousel((showCarousel = 0))
	}

	return (
		<div className={styles.carousel} onMouseLeave={handleMouseLeave}>
			{categories.map((category, index) => {
				return (
					<Link key={index} href={`/categories/${category.name}`}>
						 
							<div className={styles.carouselItem}>
								<ImageContainer src={`/images/categories/${category.name}`} />
								<div>{category.name}</div>
							</div>
						 
					</Link>
				)
			})}
		</div>
	)
}
export default Carousel
