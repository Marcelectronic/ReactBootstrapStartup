import { rest } from "msw";

const urlLogin =
	process.env.REACT_APP_API_AUTH_URL + process.env.REACT_APP_API_AUTH_LOGIN;

export const handlers = [
	rest.post(urlLogin, (req, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.json({
				idToken: "testingtoken",
				email: "dummyemail@email.test",
				refreshToken: "testingrefreshtoken",
				expiresIn: "3600",
				localId: "testinglocalId",
			})
		);
	}),
];
