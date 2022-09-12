//Horizontally scrolling item carousel with items decreasing in size from center to give percieved depth
//Movable with arrows on left/right or by dragging
//Reqs: BookCover, Text, Button
//Props: items, backgroundcolor
import ImageContainer from '../ImageContainer'
import styles from './carousel.module.scss'
const Carousel = ({showCarousel, setShowCarousel}) => {
	function handleMouseLeave(){
		setShowCarousel(showCarousel=0)
	}
	let categories = [{
		name: "category1",
		cover: "placeholder1.jpg"
	},
	{
		name: "category2",
		cover: "placeholder2.jpg"
	},
	{
		name: "category3",
		cover: "placeholder3.jpg"
	},
	{
		name: "category4",
		cover: "placeholder4.jpg"
	},
	{
		name: "category5",
		cover: "placeholder5.jpg"
	},
	{
		name: "category6",
		cover: "placeholder6.jpg"
	},
]
console.log(categories)
	return (
		<div className={styles.carousel} onMouseLeave={handleMouseLeave}>
			{categories.map((category, index)=> {
				return(
					<div className={styles.carouselItem} key={index}>
						{/* Reimplement with standard image component to increase performance. Presently loading full-size images. */}
						<ImageContainer src={`/images/${category.cover}`}/>
						<div>{category.name}</div>
					</div>
				)
			})}
		</div>
	)
}
export default Carousel;