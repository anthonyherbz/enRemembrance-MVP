import { useState } from "react"
import update from "immutability-helper"
const Testing4 = () => {
	let story = {
		id: 0,
		pages: [
			{
				number: 0,
				templateName: "cover",
				quadrants: [
					{
						number: 1,
						type: "image",
						span: null,
						content: "/images/placeholders/cover.jpg",
					},
				],
			},
			{
				number: 1,
				templateName: "splitTop",
				quadrants: [
					{
						number: 1,
						type: "image",
						span: false,
						content: "/images/placeholders/cover.jpg",
					},
					{
						number: 2,
						type: "image",
						span: false,
						content: "/images/placeholders/cover.jpg",
					},
					{
						number: 3,
						type: "image",
						span: true,
						content: "/images/placeholders/cover.jpg",
					},
				],
			},
			{
				number: 2,
				templateName: "splitTop",
				quadrants: [
					{
						number: 1,
						type: "image",
						span: false,
						content: "/images/placeholders/cover.jpg",
					},
					{
						number: 2,
						type: "image",
						span: false,
						content: "/images/placeholders/cover.jpg",
					},
					{
						number: 3,
						type: "image",
						span: true,
						content: "/images/placeholders/cover.jpg",
					},
				],
			},
			{
				number: 3,
				templateName: "splitTop",
				quadrants: [
					{
						number: 1,
						type: "image",
						span: false,
						content: "/images/placeholders/cover.jpg",
					},
					{
						number: 2,
						type: "image",
						span: false,
						content: "/images/placeholders/cover.jpg",
					},
					{
						number: 3,
						type: "image",
						span: true,
						content: "/images/placeholders/cover.jpg",
					},
				],
			},
		],
	}
	let page = 3
	const [storyState, setStoryState] = useState(story)

	// function updatestory() {
	// 	let state2 = update(storyState, {
	// 		//specify property:{$command: value}
	// 		id: { $set: 7 },
	// 		//specify object:{[array index]:{property of array:{$command: "value"}}}
	// 		pages:{[page]: {templateName :{$set: "splitBottom"}}}
	// 	})
	// 	console.log("state2", state2)
	// 	setStoryState(state2)
	// }

	// console.log("storyState", storyState)
	const span = [1, 2, 3, 4]

	function test(span) {
		function subfunction(span) {
			let testarray = []
			for (let i = 0; i < span.length; i++) {
				testarray.push(i)
				console.log(i)
			}
			return testarray
		}
		let result = subfunction(span)
		console.log(result)
	}

	return <div onClick={() => test(span)}>click</div>
}
export default Testing4
