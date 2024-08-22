import { ReviewInterface } from "../../../interface/IReview";

const apiUrl = "http://localhost:8080";

async function GetAllReview() {
	const requestOptions = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	};

	let res = await fetch(`${apiUrl}/Review`, requestOptions)
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

async function GetReviewById(id: Number | undefined) {
	const requestOptions = {
		method: "GET",
	};

	let res = await fetch(`${apiUrl}/Review/byId/${id}`, requestOptions)
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

async function CreateReview(data: ReviewInterface) {
	const requestOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	};

	let res = await fetch(`${apiUrl}/Review`, requestOptions)
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

async function UpdateReview(data: ReviewInterface) {
	const requestOptions = {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	};

	let res = await fetch(`${apiUrl}/Review`, requestOptions)
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

async function DeleteReviewByID(id: Number | undefined) {
	const requestOptions = {
		method: "DELETE",
	};

	let res = await fetch(`${apiUrl}/Review/${id}`, requestOptions)
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

export { GetAllReview, GetReviewById, CreateReview, DeleteReviewByID, UpdateReview };
