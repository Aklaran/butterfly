import React from 'react';

import styles from './footer.module.css';

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<p className={styles.text}>
				Made by{' '}
				<a className={styles.link} href="https://github.com/aklaran">
					Bo Tembunkiart
				</a>
			</p>
		</footer>
	);
}
