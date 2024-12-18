import { ITEMS_PER_PAGE } from "../constants";
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

	async getUsers(query, skip, limit = ITEMS_PER_PAGE) {
		const result = {
			data: null,
			message: "",
			status: false,
		};

		try {
			const response = await httpClient.get({
				url: `/users?rol=${query}&skip=${skip}&limit=${limit}`,
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

	async getProjects(offset) {
		const result = {
			data: null,
			message: "",
			status: false,
		};

		try {
			const response = await httpClient.get({
				url: `/projects?skip=${offset}&limit=${ITEMS_PER_PAGE}`,
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

	async editProjects(form, id) {
		const result = {
			data: null,
			message: "",
			status: false,
		};

		try {
			const response = await httpClient.patch({
				url: `/projects/${id}`,
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

	async deleteProject(id) {
		const result = {
			data: null,
			message: "",
			status: false,
		};

		try {
			const response = await httpClient.deleteR({
				url: `/projects/${id}`,
			});

			const data = response.data.data;
			const status = response.data.status;
			result.status = status;

			result.message = response.data.message;

			return result;
		} catch (error) {
			console.log("> error in deleteProject", error);

			return handleError(error, result);
		}
	}

	async getReport(id) {
		const result = {
			data: null,
			message: "",
			status: false,
		};

		try {
			const response = await httpClient.get(
				{
					url: `/projects/report/${id}`,
				},
				{
					responseType: "arraybuffer",
				}
			);

			if (response.data.status != undefined) {
				result.message = response.data.message;
				return result;
			}
			result.status = true;
			result.data = response.data;

			return result;
		} catch (error) {
			console.log("> error in getReport", error);

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

	async getStatistics() {
		const result = {
			data: null,
			message: "",
			status: false,
		};
		try {
			const response = await httpClient.get({
				url: `/projects/statistics`,
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
			console.log("> error in getStatistics", error);
			result.message = response.data.message;

			return result;
		}
	}
	async exportar(email, password) {
		const result = {
			data: null,
			message: "",
			status: false,
		};

		try {
			const response = await httpClient.post({
				url: `/database/export`,
				body: { email, password },
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
			console.log("> error in export", error);

			return handleError(error, result);
		}
	}

	async importar(data) {
		const result = {
			data: null,
			message: "",
			status: false,
		};

		try {
			const response = await httpClient.post({
				url: `/database/import`,
				body: { ...data },
			});

			if (response.data.status != undefined) {
				result.message = response.data.message;
				return result;
			}
			result.status = true;
			result.data = response.data;

			return result;
		} catch (error) {
			console.log("> error in import", error);

			return handleError(error, result);
		}
	}
}

export const FINASAPI = new CoreFinasAPI();
