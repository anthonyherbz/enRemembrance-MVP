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

	console.log("cat", categories)
	// return <div></div>
	return (
		<div className={styles.carousel} onMouseLeave={handleMouseLeave}>
			{categories.map((category, index) => {
				return (
					<Link key={index} href={`/categories/${category.name}`}>
						<a>
							<div className={styles.carouselItem}>
								<ImageContainer src={`/images/categories/${category.name}`} />
								<div>{category.name}</div>
							</div>
						</a>
					</Link>
				)
			})}
		</div>
	)
}
export default Carousel
