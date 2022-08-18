//applies container styles to child items. presently isolates in an 80% width box to highlight the item on screen for development

import styles from './container.module.scss';

const Container = ({children}) => {
	return <div className={styles.container}>{children}</div>
}
export default Container;