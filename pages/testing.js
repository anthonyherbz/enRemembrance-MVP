import Router from "next/router"
const Testing = () => {
	async function handleClick(){
		await fetch('/api/unauth')
		Router.push({pathname: "/testpage"})
	}
	
	return (
		<>
		<button onClick={handleClick}>Logout</button>
		</>
	)
}
export default Testing;