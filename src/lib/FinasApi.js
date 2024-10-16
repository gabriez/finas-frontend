import httpClient from "./httpClient";

function handleError(axiosError, result) {
	const message = axiosError.response?.data?.message;

	result.message =
		"Ocurrio un error inesperado. Por favor vuelva a intentar más tarde.";

	if (message) {
		result.message = message;
	}

	return result;
}

class CoreFinasAPI {
	async login(email, password) {
		const result = {
			data: null,
			message: "",
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
				result.data = data;
			}

			result.message = response.data.message;

			return result;
		} catch (error) {
			console.log("> error in login", error);

			return handleError(error, result);
		}
	}

	async getUsers(query) {
		const result = {
			data: null,
			message: "",
			status: false,
		};

		try {
			const response = await httpClient.get({
				url: `/users?rol=${query}`,
			});

			const data = response.data.data;
			const status = response.data.status;

			if (status) {
				result.data = data;
				result.status = true;
			} else {
				result.data = data;
			}

			result.message = response.data.message;

			return result;
		} catch (error) {
			console.log("> error in getUsers", error);

			return handleError(error, result);
		}
	}

	async getRoles() {
		const result = {
			data: null,
			message: "",
			status: false,
		};

		try {
			const response = await httpClient.get({
				url: `/users/roles`,
			});

			const data = response.data.data;
			const status = response.data.status;

			if (status) {
				result.data = data;
				result.status = true;
			} else {
				result.data = data;
			}

			result.message = response.data.message;

			return result;
		} catch (error) {
			console.log("> error in getRoles", error);

			return handleError(error, result);
		}
	}

	async createUsers(form) {
		const result = {
			data: null,
			message: "",
			status: false,
		};

		try {
			const response = await httpClient.post({
				url: `/users`,
				body: form,
			});

			const data = response.data.data;
			const status = response.data.status;

			if (status) {
				result.data = data;
				result.status = true;
			} else {
				result.data = data;
			}

			result.message = response.data.message;

			return result;
		} catch (error) {
			console.log("> error in createUsers", error);

			return handleError(error, result);
		}
	}

	async patchUsers(id, form) {
		const result = {
			data: null,
			message: "",
			status: false,
		};

		try {
			const response = await httpClient.patch({
				url: `/users/${id}`,
				body: form,
			});

			const data = response.data.data;
			const status = response.data.status;

			if (status) {
				result.data = data;
				result.status = true;
			} else {
				result.data = data;
			}

			result.message = response.data.message;

			return result;
		} catch (error) {
			console.log("> error in createUsers", error);

			return handleError(error, result);
		}
	}

	async getProjects() {
		const result = {
			data: null,
			message: "",
			status: false,
		};

		try {
			const response = await httpClient.get({
				url: `/projects`,
			});

			const data = response.data.data;
			const status = response.data.status;

			if (status) {
				result.data = data;
				result.status = true;
			} else {
				result.data = data;
			}

			result.message = response.data.message;

			return result;
		} catch (error) {
			console.log("> error in getProjects", error);

			return handleError(error, result);
		}
	}

	async createProjects(form) {
		const result = {
			data: null,
			message: "",
			status: false,
		};

		try {
			const response = await httpClient.post({
				url: `/projects`,
				body: form,
			});

			const data = response.data.data;
			const status = response.data.status;

			if (status) {
				result.data = data;
				result.status = true;
			} else {
				result.data = data;
			}

			result.message = response.data.message;

			return result;
		} catch (error) {
			console.log("> error in createUsers", error);

			return handleError(error, result);
		}
	}

	async getStates() {
		const result = {
			data: null,
			message: "",
			status: false,
		};

		try {
			const response = await httpClient.get({
				url: `/projects/status`,
			});

			const data = response.data.data;
			const status = response.data.status;

			if (status) {
				result.data = data;
				result.status = true;
			} else {
				result.data = data;
			}

			result.message = response.data.message;

			return result;
		} catch (error) {
			console.log("> error in getStates", error);

			return handleError(error, result);
		}
	}

	async getMunicipios() {
		const result = {
			data: null,
			message: "",
			status: false,
		};

		try {
			const response = await httpClient.get({
				url: `/states/municipio`,
			});

			const data = response.data.data;
			const status = response.data.status;

			if (status) {
				result.data = data;
				result.status = true;
			} else {
				result.data = data;
			}

			result.message = response.data.message;

			return result;
		} catch (error) {
			console.log("> error in getMunicipios", error);

			return handleError(error, result);
		}
	}

	async getParroquia(municipio) {
		const result = {
			data: null,
			message: "",
			status: false,
		};

		try {
			const response = await httpClient.get({
				url: `/states/parroquia?codMunicipio=${municipio}`,
			});

			const data = response.data.data;
			const status = response.data.status;

			if (status) {
				result.data = data;
				result.status = true;
			} else {
				result.data = data;
			}

			result.message = response.data.message;

			return result;
		} catch (error) {
			console.log("> error in getMunicipios", error);

			return handleError(error, result);
		}
	}

	async getSector(municipio, parroquia) {
		const result = {
			data: null,
			message: "",
			status: false,
		};

		try {
			const response = await httpClient.get({
				url: `/states/sector?codMunicipio=${municipio}&codParroquia=${parroquia}`,
			});

			const data = response.data.data;
			const status = response.data.status;

			if (status) {
				result.data = data;
				result.status = true;
			} else {
				result.data = data;
			}

			result.message = response.data.message;

			return result;
		} catch (error) {
			console.log("> error in getMunicipios", error);

			return handleError(error, result);
		}
	}
}

export const FINASAPI = new CoreFinasAPI();
