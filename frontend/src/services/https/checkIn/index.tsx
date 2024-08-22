import { CheckInInterface } from "../../../interface/ICheckIn";

const apiUrl = "http://localhost:8080";

async function GetAllCheckIn() {
	const requestOptions = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	};

	let res = await fetch(`${apiUrl}/CheckIn`, requestOptions)
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

async function GetCheckInById(id: Number | undefined) {
	const requestOptions = {
		method: "GET",
	};

	let res = await fetch(`${apiUrl}/CheckIn/byId/${id}`, requestOptions)
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

async function CreateCheckIn(data: CheckInInterface) {
	const requestOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	};

	let res = await fetch(`${apiUrl}/CheckIn`, requestOptions)
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

async function UpdateCheckIn(data: CheckInInterface) {
	const requestOptions = {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	};

	let res = await fetch(`${apiUrl}/CheckIn`, requestOptions)
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

async function DeleteCheckInByID(id: Number | undefined) {
	const requestOptions = {
		method: "DELETE",
	};

	let res = await fetch(`${apiUrl}/CheckIn/${id}`, requestOptions)
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

async function GetBookPlanByDate(date: string | undefined) {
	const requestOptions = {
		method: "GET",
	};

	let res = await fetch(`${apiUrl}/BookPlan/byDate/${date}`, requestOptions)
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

export { GetAllCheckIn, GetCheckInById, CreateCheckIn, DeleteCheckInByID, UpdateCheckIn, GetBookPlanByDate };
