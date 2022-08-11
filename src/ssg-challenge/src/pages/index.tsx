import axios, { AxiosError } from 'axios';
import type { NextPage } from 'next';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';

import { notifyError } from '../utils';

import styles from './home.module.scss';

interface Message {
	phone: string;
	message: string;
}

interface AnalysedMessage {
	prefix: number;
	operator: string | null;
	country: string;
	region: string | null;
	body: string;
}

interface ErrorResponse {
	error: string;
}

const FORM_INITIAL_STATE = Object.freeze({ phone: '', message: '' });

const Home: NextPage = () => {
	const phoneRef = useRef<HTMLInputElement>(null);
	const [formData, setFormData] = useState<Message>(FORM_INITIAL_STATE);
	const [message, setMessage] = useState<AnalysedMessage>({} as AnalysedMessage);
	const [analysisError, setAnalysisError] = useState('');

	useEffect(() => {
		if (analysisError) {
			notifyError(analysisError);
		}
	}, [analysisError]);

	function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		const { name, value } = event.target;
		setFormData({ ...formData, [name]: value });
	}

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setAnalysisError('');
		try {
			const { data: analysedMessage } = await axios.post('/api/analyse', formData);
			setMessage(analysedMessage);
			setFormData(FORM_INITIAL_STATE);
			phoneRef.current?.focus();
		} catch (error) {
			const axiosError = error as AxiosError<ErrorResponse>;
			setAnalysisError(axiosError.response?.data.error || '');
		}
	}

	const noInfo = <i>No information</i>;

	return (
		<main className={styles.container}>
			<form onSubmit={handleSubmit}>
				<h2>New Message</h2>

				<label htmlFor="phone">Phone</label>
				<input
					autoFocus
					required
					ref={phoneRef}
					type="number"
					id="phone"
					name="phone"
					placeholder="Numbers only"
					value={formData.phone}
					onChange={handleChange}
				/>

				<label htmlFor="message">Message</label>
				<textarea
					required
					id="message"
					name="message"
					placeholder="Enter your message here..."
					rows={5}
					value={formData.message}
					onChange={handleChange}
				/>

				<button type="submit">Send</button>
			</form>

			{!!message.body && (
				<>
					<h2 className={styles.secondHeading}>Analysed Message</h2>

					<table>
						<thead>
							<tr>
								<th>Prefix</th>
								<th>Operator</th>
								<th>Country</th>
								<th>Region</th>
								<th>Message</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>{message.prefix || noInfo}</td>
								<td>{message.operator || noInfo}</td>
								<td>{message.country || noInfo}</td>
								<td>{message.region || noInfo}</td>
								{/* eslint-disable-next-line react/no-danger */}
								<td dangerouslySetInnerHTML={{ __html: message.body }} />
							</tr>
						</tbody>
					</table>
				</>
			)}
		</main>
	);
};

export default Home;
