const Testing = () => {
	async function check (){
		const ep = "/api/checkdb-lib"
		const pd = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				checkVal: "jodeae@gmail.com",
			}),
		}
		const response = await fetch(ep, pd)
		const res = await response.json()
		console.log(res)

	}
	check()
	
	
	return (
		<>

		</>
	)
}
export default Testing;