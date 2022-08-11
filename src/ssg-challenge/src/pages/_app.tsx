import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';

import styles from '../styles/app.module.scss';

import 'react-toastify/dist/ReactToastify.css';
import '../styles/global.scss';

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>SMS Analyser</title>
			</Head>

			<div className={styles.container}>
				<Component {...pageProps} />
			</div>

			<ToastContainer />
		</>
	);
}
