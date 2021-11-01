import useFetchAPI from "../../hooks/useFetchAPI/useFetchAPI";
import Loading from "../../UI/Loading/Loading";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Table from "../../components/Table/Table";

const ListData = () => {
	const token = useSelector((state) => state.auth.token);

	const columns = [
		{
			Header: "Contact Forms Received",
			columns: [
				{
					Header: "Key",
					accessor: "key",
				},
				{
					Header: "Email",
					accessor: "data.email",
				},
				{
					Header: "Message",
					accessor: "data.message",
				},
			],
		},
	];

	const parameters = {
		url: process.env.REACT_APP_API_URL + "/contacts.json?auth=" + token,
	};

	const handleData = (data) => {
		const arrayData = [];

		for (const key in data) {
			arrayData.push({
				key: key,
				data: {
					email: data[key].Email,
					message: data[key].Message,
				},
			});
		}
		return arrayData;
	};
	const { data, isloading, iserror, request } = useFetchAPI(
		parameters,
		handleData,
		false,
		null,
		null
	);

	useEffect(() => {
		request();
	}, [request]);

	return (
		<div className="flex flex-column w-100 mx-0 px-0">
			<div className="mb-4">
				<h3>Fetch Data from the Backend</h3>
				<span>Fetch the contact form data from the backend</span>
			</div>
			<div>
				<button onClick={() => request()} className="btn btn-primary mb-5">
					Refresh Data
				</button>
			</div>
			<div>
				{isloading && !iserror && <Loading message="Loading"></Loading>}
				{iserror && <p>There is an error</p>}
				{!isloading && !iserror && data.length === 0 && (
					<p>No Contact Forms sent yet!</p>
				)}
				{!isloading && data.length > 0 && (
					<Table
						columns={columns}
						data={data}
						colFilter="data.message"
						colFilterText="Search messages ..."
					></Table>
				)}
			</div>
		</div>
	);
};

export default ListData;
