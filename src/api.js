const APIURL = '/api/ticks/';

export async function getTicks() {
	return fetch(APIURL)
		.then(resp => {
			if (!resp.ok) {
				if (resp.status >= 400 && resp.status < 500) {
					return resp.json().then(data => {
						let err = { errorMessage: data.message };
						throw err;
					})
				} else {
					let err = { errorMessage: 'PLease try again later, server is off' }
					throw err;
				}
			}
			return resp.json();
		})
}

//Sending a post request to the api, must include headers to tell it that it will be a json file,
//body in this case is the name, then we just reused all the error handling
//then we updated the state of ticks to reflect new items
export async function createTick(val) {
	return fetch(APIURL, {
		method: 'post',
		headers: new Headers({
			'Content-type': 'application/json'
		}),
		body: JSON.stringify({ name: val })
	})
		.then(resp => {
			if (!resp.ok) {
				if (resp.status >= 400 && resp.status < 500) {
					return resp.json().then(data => {
						let err = { errorMessage: data.message };
						throw err;
					})
				} else {
					let err = { errorMessage: 'PLease try again later, server is off' }
					throw err;
				}
			}
			return resp.json();
		})
}

export async function removeTick(id) {
	const deleteURL = APIURL + id;
	return fetch(deleteURL, {
		method: 'delete'
	})
		.then(resp => {
			if (!resp.ok) {
				if (resp.status >= 400 && resp.status < 500) {
					return resp.json().then(data => {
						let err = { errorMessage: data.message };
						throw err;
					})
				} else {
					let err = { errorMessage: 'PLease try again later, server is off' }
					throw err;
				}
			}
			return resp.json();
		})
}

export async function updateTick(tick) {
	const updateURL = APIURL + tick._id;
	return fetch(updateURL, {
		method: 'put',
		headers: new Headers({
			'Content-type': 'application/json'
		}),
		body: JSON.stringify({ completed: !tick.completed })
	})
		.then(resp => {
			if (!resp.ok) {
				if (resp.status >= 400 && resp.status < 500) {
					return resp.json().then(data => {
						let err = { errorMessage: data.message };
						throw err;
					})
				} else {
					let err = { errorMessage: 'PLease try again later, server is off' }
					throw err;
				}
			}
			console.log(resp)
			return resp.json();
		})
}