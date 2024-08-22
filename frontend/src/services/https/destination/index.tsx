import { DestinationInterface } from "../../../interface/IDestination";

const apiUrl = "http://localhost:8080";

async function GetAllDestination() {
	const requestOptions = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	};

	let res = await fetch(`${apiUrl}/Destination`, requestOptions)
		.then((response) => response.json())
		.then((res) => {
			if (res.data) {
				return res.data;
			} else {
				return false;
			}
		});

	return res;
}

async function GetDestinationById(id: Number | undefined) {
	const requestOptions = {
		method: "GET",
	};

	let res = await fetch(`${apiUrl}/Destination/byId/${id}`, requestOptions)
		.then((response) => response.json())
		.then((res) => {
			if (res.data) {
				return res.data;
			} else {
				return false;
			}
		});

	return res;
}

async function CreateDestination(data: DestinationInterface) {
	const requestOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	};

	let res = await fetch(`${apiUrl}/Destination`, requestOptions)
		.then((response) => response.json())
		.then((res) => {
			if (res.data) {
				return { status: true, message: res.data };
			} else {
				return { status: false, message: res.error };
			}
		});

	return res;
}

async function UpdateDestination(data: DestinationInterface) {
	const requestOptions = {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	};

	let res = await fetch(`${apiUrl}/Destination`, requestOptions)
		.then((response) => response.json())
		.then((res) => {
			if (res.data) {
				return { status: true, message: res.data };
			} else {
				return { status: false, message: res.error };
			}
		});

	return res;
}

async function DeleteDestinationByID(id: Number | undefined) {
	const requestOptions = {
		method: "DELETE",
	};

	let res = await fetch(`${apiUrl}/Destination/${id}`, requestOptions)
		.then((response) => response.json())
		.then((res) => {
			if (res.data) {
				return res.data;
			} else {
				return false;
			}
		});

	return res;
}

export { GetAllDestination, GetDestinationById, CreateDestination, DeleteDestinationByID, UpdateDestination };
