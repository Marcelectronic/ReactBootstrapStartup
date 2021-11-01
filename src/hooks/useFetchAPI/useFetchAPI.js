import { useState, useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { addError, addInfo } from "../../store/Notification";

const useFetchAPI = (
	props,
	handleData,
	sendNotification = false,
	message = null,
	dataElement = null
) => {
	const [data, setData] = useState([]);
	const [isloading, setIsloading] = useState(false);
	const [iserror, setIserror] = useState(false);
	const dispatch = useDispatch();

	const parameters = useMemo(() => {
		return {
			method: props.method || "GET",
			mode: props.mode || "cors",
			cache: props.cache || "no-cache",
			credentials: props.credentials || "omit",
			headers: props.headers || {
				"Content-Type": "application/json",
			},
			redirect: props.redirect || "follow",
			referrerPolicy: props.referrerPolicy || "no-referrer",
			body: JSON.stringify(props.body) || null,
		};
	}, [
		props.method,
		props.mode,
		props.cache,
		props.credentials,
		props.headers,
		props.redirect,
		props.referrerPolicy,
		props.body,
	]);

	const url = useMemo(() => props.url, [props.url]);

	const request = useCallback(
		(values = null) => {
			parameters.body = values && JSON.stringify(values);
			setIsloading(true);
			setIserror(false);

			fetch(url, parameters)
				.then((response) => {
					if (!response.ok) {
						const errorMsg = response.statusText || response.status;
						throw new Error(errorMsg);
					}
					return response.json();
				})
				.then((data) => {
					if (dataElement) setData(data[dataElement]);
					else setData(data);
					setIsloading(false);
					if (sendNotification) dispatch(addInfo({ message: message }));
				})
				.catch((error) => {
					dispatch(addError({ message: "ERROR: " + error.message }));
					setIsloading(false);
					setIserror(true);
				});
		},
		[url, parameters, dispatch, sendNotification, message, dataElement]
	);

	if (iserror === false)
		return { data: handleData(data), isloading, iserror, request };
	else return { data: null, isloading, iserror, request };
};

export default useFetchAPI;
