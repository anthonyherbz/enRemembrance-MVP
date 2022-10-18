import Head from "next/head";
import ButtonText from "../components/button/ButtonText";
import Header from "../components/header/Header";
import Nav from "../components/Nav";
import styles from "../page_sass/editor.module.scss";
import StoryCreator from "../components/StoryCreator";
import Layout from "../components/Layout";

const Editor = () => {
	return (
		<Layout>
			<Head>
				<title>enRemembrance | Editor</title>
				<link rel='icon' href='/favicon.ico' />
				<meta name='description' content='summary of website' />
			</Head>
			<Header show shadow/>
			<div className={styles.editor}>
				<div className={styles.menuSection}>
					<Nav />
					{/* buttons to save changes or delete book; not implemented; not useable until database is implemented */}
					<div className={styles.buttons}>
						<ButtonText
							expand
							fill='true'
							label='SaveV'
							color='green'
						/>
						<ButtonText
							expand
							fill='true'
							label='DeleteT'
							color='red'
						/>
					</div>
				</div>
				<div className={styles.bookSection}>
					<StoryCreator/>
				</div>
			</div>
		</Layout>
	);
};
export default Editor;
