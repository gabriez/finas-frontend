import axios from 'axios';
import { LOCAL_STORAGE_KEYS, URL_API } from '../constants';

const URL_BASE = `${URL_API}`;
/**
 * @param {string}  url url a la cual consultar
 * esta funcion detecta si es una nueva url base (comienza con http:// o https://).
 * en caso de ser asi, retorna la url. en caso contrario, se asume que es un fragmento
 * de path por lo que se concatena con la constante URL_BASE
 **/
const readUrl = (url) => {
	return url.startsWith('http://') || url.startsWith('https://')
		? url
		: `${URL_BASE}${url}`;
};

// Authorization Token
const getToken = () => {
	return {
		token: sessionStorage.getItem(LOCAL_STORAGE_KEYS.accessToken),
	};
};

const HEADERS_DEFAULT = {
	Accept: 'application/json',
	'Content-Type': 'application/json',
	'Access-Control-Allow-Origin': '*',
};



const get = ({ url = '', options = {}, headers = {} }) => {
	const { token } = getToken();

	return axios.get(readUrl(url), {
		headers: {
			...HEADERS_DEFAULT,
			...headers,
			Authorization: `Bearer ${token}`,
		},
		...options,
	});
};

const post = ({ url = '', body = {}, headers = {}, options = {} }) => {
	const { token } = getToken();

	return axios.post(readUrl(url), body, {
		headers: {
			...HEADERS_DEFAULT,
			...headers,
			Authorization: `Bearer ${token}`,
		},
		...options,
	});
};

const put = ({ url = '', body = {}, headers = {}, options = {} }) => {
	const { token } = getToken();

	return axios.put(readUrl(url), body, {
		headers: {
			...HEADERS_DEFAULT,
			...headers,
			Authorization: `Bearer ${token}`,
		},
		...options,
	});
};
export default {
	get,
	post,
	put,
};
