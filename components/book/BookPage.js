import styles from "./bookpage.module.scss"
import ImageContainer from "../ImageContainer"
import Image from "next/image"
import classNames from "classnames/bind"
let cx = classNames.bind(styles)
const BookPage = ({ page, hidecount }) => {
	if (page == undefined) {
		return <div className={styles.blank}>There is no next page</div>
	}
	if (page.templateName == "uninitialized") {
		return (
			<div className={styles.blank}>
				Blank Page<div className={styles.pageNum}>{page.number}</div>
			</div>
		)
	}
	if (page.number == 0) {
		return (
			<div className={styles.cover}>
				<ImageContainer src={`${page.quadrants[0].content}`} />
			</div>
		)
	}

	let pageNum = cx({
		pageNum: true,
		hidecount: hidecount,
	})
	return (
		<div className={styles.quadrants}>
			{page.quadrants.map((quadrant, index) => {
				let quadStyles = cx({
					span: quadrant.span,
				})
				return (
					<div className={quadStyles} key={index}>
						{quadrant.type == "text" ? (
							quadrant.content
						) : (
							<ImageContainer src={`/${quadrant.content}`} />
						)}
					</div>
				)
			})}
			<div className={pageNum}>{page.number}</div>
		</div>
	)
}
export default BookPage
