import styles from './entercomment.module.scss'

const EnterComment = (showComment, setShowComment, toggleComment) => {
	return (
		<div className={styles.enterComment}>
			<div className={styles.form}>
				<form action="POST">
					<label htmlFor="commentext">Leave the author a comment!</label>
					<textarea  name="commentext" type="textarea">
					</textarea>
					<button onClick={toggleComment} htmlFor="commenttext">Submit</button>
				</form>
			</div>
		</div>
	)
}
export default EnterComment;