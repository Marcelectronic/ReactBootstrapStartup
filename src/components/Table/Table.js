import { useTable, useFilters, useSortBy, usePagination } from "react-table";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { IconContext } from "react-icons";
import classes from "./Table.module.css";
import {
	HiChevronDoubleLeft,
	HiChevronLeft,
	HiChevronRight,
	HiChevronDoubleRight,
} from "react-icons/hi";

const Table = ({ columns, data, colFilter, colFilterText }) => {
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		setFilter,
		page,
		canPreviousPage,
		canNextPage,
		pageOptions,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		state: { pageIndex, pageSize },
	} = useTable(
		{
			columns,
			data,
			initialState: { pageIndex: 0, pageSize: 10 },
		},
		useFilters,
		useSortBy,
		usePagination
	);
	const [filterInput, setFilterInput] = useState("");

	const FilterHandler = (event) => {
		const value = event.target.value || "";
		setFilter(colFilter, value);
		setFilterInput(value);
	};

	const handleCleanFilter = () => {
		setFilter(colFilter, "");
		setFilterInput("");
	};

	return (
		<div className="m-0 p-0">
			<div className="d-flex flex-row w-100 justify-content-start align-items-center mb-2">
				<span className="me-2 d-none d-md-block">Search:</span>
				<input
					value={filterInput}
					onChange={FilterHandler}
					placeholder={colFilterText}
					className="flex-grow-1"
				/>
				<button
					className="btn btn-primary btn-sm ms-1 p-1"
					onClick={handleCleanFilter}
				>
					<IconContext.Provider
						value={{ size: "1.5rem", className: "text-white" }}
					>
						<AiOutlineClose />
					</IconContext.Provider>
				</button>
			</div>
			<table
				{...getTableProps()}
				className="table table-striped table-hover table-responsive"
			>
				<thead>
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup.getHeaderGroupProps()} className="table-light">
							{headerGroup.headers.map((column) => (
								<th
									{...column.getHeaderProps(column.getSortByToggleProps())}
									className={
										column.isSorted
											? column.isSortedDesc
												? classes.headerSortUp
												: classes.headerSortDown
											: ""
									}
								>
									{column.render("Header")}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{page.map((row, i) => {
						prepareRow(row);
						return (
							<tr {...row.getRowProps()}>
								{row.cells.map((cell) => {
									return (
										<td {...cell.getCellProps()}>{cell.render("Cell")}</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>

			<div className="d-flex flex-row justify-content-between align-items-center">
				<div className="d-flex flex-row">
					<div className="d-flex flex-row me-2">
						<button
							onClick={() => gotoPage(0)}
							disabled={!canPreviousPage}
							className="btn btn-outline-primary btn-sm me-1"
						>
							<HiChevronDoubleLeft />
						</button>
						<button
							onClick={() => previousPage()}
							disabled={!canPreviousPage}
							className="btn btn-outline-primary btn-sm me-1"
						>
							<HiChevronLeft />
						</button>
						<button
							onClick={() => nextPage()}
							disabled={!canNextPage}
							className="btn btn-outline-primary btn-sm me-1"
						>
							<HiChevronRight />
						</button>
						<button
							onClick={() => gotoPage(pageCount - 1)}
							disabled={!canNextPage}
							className="btn btn-outline-primary btn-sm"
						>
							<HiChevronDoubleRight />
						</button>
					</div>
					<span className="d-flex flex-row align-items-center d-none d-md-block">
						Page{" "}
						<strong>
							{pageIndex + 1} of {pageOptions.length}
						</strong>
					</span>
				</div>
				<select
					className={
						"form-select form-select-sm d-none d-md-block " + classes.pageSize
					}
					value={pageSize}
					onChange={(e) => {
						setPageSize(Number(e.target.value));
					}}
				>
					{[10, 20, 30, 40, 50].map((pageSize) => (
						<option key={pageSize} value={pageSize}>
							Show {pageSize}
						</option>
					))}
				</select>
			</div>
		</div>
	);
};

export default Table;
