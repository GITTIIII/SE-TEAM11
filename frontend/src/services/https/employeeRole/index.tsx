import { EmployeeRoleInterface } from "../../../interface/IEmployeeRole";

const apiUrl = "http://localhost:8080";

async function GetAllEmployeeRole() {
	const requestOptions = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	};

	let res = await fetch(`${apiUrl}/EmployeeRole`, requestOptions)
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

async function GetEmployeeRoleById(id: Number | undefined) {
	const requestOptions = {
		method: "GET",
	};

	let res = await fetch(`${apiUrl}/EmployeeRole/byId/${id}`, requestOptions)
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

async function CreateEmployeeRole(data: EmployeeRoleInterface) {
	const requestOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	};

	let res = await fetch(`${apiUrl}/EmployeeRole`, requestOptions)
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

async function UpdateEmployeeRole(data: EmployeeRoleInterface) {
	const requestOptions = {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	};

	let res = await fetch(`${apiUrl}/EmployeeRole`, requestOptions)
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

async function DeleteEmployeeRoleByID(id: Number | undefined) {
	const requestOptions = {
		method: "DELETE",
	};

	let res = await fetch(`${apiUrl}/EmployeeRole/${id}`, requestOptions)
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

export { GetAllEmployeeRole, GetEmployeeRoleById, CreateEmployeeRole, DeleteEmployeeRoleByID, UpdateEmployeeRole };
