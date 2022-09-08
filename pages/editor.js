import Head from "next/head";
import ButtonText from "../components/button/ButtonText";
import Header from "../components/header/Header";
import Nav from "../components/Nav";
import styles from "../page_sass/editor.module.scss";
import BookEditor from "../components/book/BookEditor";

const Editor = () => {
	return (
		<>
			<Head>
				<title>enRemembrance | Editor</title>
				<link rel='icon' href='/favicon.ico' />
				<meta name='description' content='summary of website' />
			</Head>
			<Header show shadow/>
			<div className={styles.editor}>
				<div className={styles.menuSection}>
					<Nav />
					<div className={styles.buttons}>
						<ButtonText
							// size='medium'
							expand
							fill='true'
							label='SaveV'
							color='green'
						/>
						<ButtonText
							// size='medium'
							expand
							fill='true'
							label='DeleteT'
							color='red'
						/>
					</div>
				</div>
				<div className={styles.bookSection}>
					<BookEditor />
				</div>
			</div>
		</>
	);
};
export default Editor;
