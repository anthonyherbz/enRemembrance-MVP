import styles from "./editorbookpages.module.scss";
import ButtonText from "../button/ButtonText";
import Image from "next/image";

const EditorBookPages = ({ pageList, position, setPosition }) => {
	function matchId (searchId){
		let result = pageList.filter(item =>{
			return item.id === searchId
		})
		return result[0].image;
	}
	if (position == 0) {
		return (

				<div className={styles.bookElement}>
					<div className={styles.textbox}>
						<label htmlFor='booktitle'>Book Title</label>
						<input name='booktitle' type='text'></input>
					</div>
					<div className={styles.buttons}>
						<ButtonText
							size='large'
							color='yellow'
							label='Choose Cover'
						/>
						<label htmlFor='cover'>Upload Image</label>
						<input
							type='file'
							name='cover'
							accept='image/png, image/jpg'
						/>
						<ButtonText size='medium' label='pick category' />
					</div>
					<div className={styles.authorText}>
						Author name goes here "author"
					</div>
				</div>

		);
	} else{
		return (
			<div className={styles.bookElement}>
				{console.log(matchId(position))}
				<Image layout="fill" src={`/images/${matchId(position)}`}/>
			</div>
		)
	}
};
export default EditorBookPages;
