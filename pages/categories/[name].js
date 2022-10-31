import Link from "next/link"
import { query } from "../../lib/db"
export async function getStaticProps({params}) {
	let id = params.name;
	const querySql = "SELECT * FROM categories WHERE name = ?"
	try {
		const valuesParams = [id]
		const data = await query({ query: querySql, values: valuesParams })
		return { props: { data } }
	} catch (error) {
		const data = error
		return { props: { data } }
	}
}
export async function getStaticPaths() {
	const querySql = "SELECT name FROM categories"
	const valuesParams = []
	const data = await query({ query: querySql, values: valuesParams })
	return {
		paths: data.map((data) => ({
			params: { name: data.name.toString() },
		})),
		fallback: false,
	}
}
const Category = ({data}) => {
	let category = data[0]
	return (
		<div>
			<strong>Category</strong>
			<div>
				<Link href='/categories'>
					 Return to Categories List 
				</Link>
			</div>
			{category != undefined ? (
				<div>{category.name}</div>
			) : (
				<div>This category does not exist</div>
			)}
		</div>
	)
}
export default Category
