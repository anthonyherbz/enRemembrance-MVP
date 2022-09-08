function makeBooks(quantity, pagecount) {
	quantity ? null : quantity=10;
	pagecount ? null : pagecount=10;
	const books = new Array();
	for (let i = 0; i < 10; i++) {
		let published, visible, monetized = false;
		i % 3 ? published=true : published=false;
		i % 2 ? visible=true: visible=false;
		i % 4 ? monetized=true: monetized=false;
		// let days = (Math.floor(Math.random() * ((31 - 1) + 1)))
		// console.log(days)
		books.push({
			id: i,
			title: `title${i}`,
			author: `author${i}`,
			coverName: `placeholder${i}.jpg`,
			slug: `slug`,
			date: `2022, 8, ${i+15}`,
			pages: [],
			postId: 0,
			published: published,
			visible: visible,
			monetized: monetized,
			expressionsListId: 0,
			commentsListId: 0,
			description: `book description`,
		});
		let book = books[i];
		for (let a = 0; a < 10; a++) {
			book.pages.push({
				number: a,
				template: {
					templateName: `1`,
					positions: [
						{
						quad: 1,
						type: `text`,
						content: `content`,
						span: `false`
					},
					{
						quad: 2,
						type : `img`,
						content: `placeholder${a}.jpg`,
						span: `false`,
					},
					{
						quad: 3,
						type : `img`,
						content: `placeholder${a+1}.jpg`,
						span: `true`
					},
				]
					
				},
			});
		}
	}
	console.log(books);

	return books;
}
export { makeBooks };
