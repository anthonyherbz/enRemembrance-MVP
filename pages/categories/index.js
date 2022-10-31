import Link from "next/link"
import { query } from "../../lib/db"
export async function getStaticProps() {
	const querySql = "SELECT id, name FROM categories"
	try {
		const valuesParams = []
		const data = await query({ query: querySql, values: valuesParams })
		return { props: { data } }
	} catch (error) {
		const data = error
		return { props: { data } }
	}
}

const Categories = ({ data }) => {
	let cats = data
	return (
		<div>
			<h1>Categories Available</h1>
			{cats.map((category) => {
				return (
					<div key={category.id}>
						<Link href={`categories/${category.name}`}>
							 {category.name} 
						</Link>
					</div>
				)
			})}
		</div>
	)
}

export default Categories
