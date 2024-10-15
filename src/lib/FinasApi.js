import httpClient from "./httpClient";

function handleError (axiosError, result) {
	const message = axiosError.response?.data?.message;

	result.message = 'Ocurrio un error inesperado. Por favor vuelva a intentar más tarde.';

	if (message) {
		result.message = message;
	}

	return result;
}

class CoreFinasAPI {
    async login(email, password) {
		const result = {
			data: null,
			message: '',
			status: false,
		};

		try {
			const response = await httpClient.post({
				url: `/authentication/login`,
				body: { email, password },
			});

			const data = response.data.data;
			const status = response.data.status;

			if (status) {
				result.data = {
					user: data.user,
					token: data.token,
				};
				result.status = true;
			} else {
                result.data = data
            }

			result.message = response.data.message;

			return result;
		} catch (error) {
			console.log('> error in login', error);

			
			return handleError(error, result);
		}
	}

	async getUsers(query) {
		const result = {
			data: null,
			message: '',
			status: false,
		};

		try {
			const response = await httpClient.get({
				url: `/users?rol=${query}`,
			});

			const data = response.data.data;
			const status = response.data.status;

			if (status) {
				result.data = data
				result.status = true;
			} else {
                result.data = data
            }

			result.message = response.data.message;

			return result;
		} catch (error) {
			console.log('> error in getUsers', error);

			
			return handleError(error, result);
		}
	}
}

export const FINASAPI = new CoreFinasAPI();
