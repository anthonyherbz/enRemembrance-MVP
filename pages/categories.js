import Link from "next/link";

const Categories = ({categories}) => {
	let cats = categories.categories;
	console.log(cats)
	return (
		<div>
			<h1>Categories Available</h1>
			{cats.map((category) => {
				return(<div key={category.id}>
					<Link href={`category/${category.name}`}>
						<a>
							{category.name}
						</a>
					</Link>

				</div>)
			})}
		</div>
	)
}
// export async function getStaticPaths(){
	
// }


export async function getStaticProps(){
	const apiUrlEndpoint = "http://localhost:3000/api/getcategories-lib";
	const response = await fetch(apiUrlEndpoint);
	const categories = await response.json()
	console.log(categories)
	return{
		props:{
			categories,
		},
	}
}
export default Categories;
