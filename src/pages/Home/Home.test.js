import { render, screen } from "@testing-library/react";
import Home from "./Home";

describe("Site Pages", () => {
	test("Home Page", () => {
		//Arrange
		render(<Home></Home>);

		//Act

		//Assert
		const title = screen.queryByRole("heading", {
			level: 3,
			name: /^react startup setup/i,
		});
		expect(title).toBeInTheDocument();
	});
});
