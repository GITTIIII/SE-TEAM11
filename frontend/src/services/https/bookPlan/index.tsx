import { BookPlanInterface } from "../../../interface/IBookPlan";

const apiUrl = "http://localhost:8080";

async function CreateBookPlan(data: BookPlanInterface) {
	const requestOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	};

	let res = await fetch(`${apiUrl}/BookPlan`, requestOptions)
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

async function GetAllBookPlan() {
	const requestOptions = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	};

	let res = await fetch(`${apiUrl}/BookPlan`, requestOptions)
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

async function GetBookPlanById(id: Number | undefined) {
	const requestOptions = {
		method: "GET",
	};

	let res = await fetch(`${apiUrl}/BookPlan/byId/${id}`, requestOptions)
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

async function GetBookPlanByTouristId(id: Number | undefined) {
	const requestOptions = {
		method: "GET",
	};

	let res = await fetch(`${apiUrl}/BookPlan/byTouristId/${id}`, requestOptions)
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

async function UpdateBookPlan(data: BookPlanInterface) {
	const requestOptions = {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	};

	let res = await fetch(`${apiUrl}/BookPlan`, requestOptions)
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

async function DeleteBookPlanByID(id: Number | undefined) {
	const requestOptions = {
		method: "DELETE",
	};

	let res = await fetch(`${apiUrl}/BookPlan/${id}`, requestOptions)
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

async function UpdateCheckInStatus(id: Number | undefined) {
	const requestOptions = {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ id: id }),
	};

	let res = await fetch(`${apiUrl}/CheckInStatus/${id}`, requestOptions)
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

export {
	GetAllBookPlan,
	GetBookPlanByTouristId,
	GetBookPlanById,
	CreateBookPlan,
	DeleteBookPlanByID,
	UpdateBookPlan,
	UpdateCheckInStatus,
	GetBookPlanByDate,
};
