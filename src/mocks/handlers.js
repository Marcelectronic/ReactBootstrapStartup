import { rest } from "msw";

const urlLogin =
	process.env.REACT_APP_API_AUTH_URL + process.env.REACT_APP_API_AUTH_LOGIN;

const urlChangePassword =
	process.env.REACT_APP_API_AUTH_URL + process.env.REACT_APP_API_AUTH_PASSWORD;

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
	rest.post(urlChangePassword, (req, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.json({
				localId: "dummyemail@email.test",
				email: "dummyemail@email.test",
				passwordHash: "testinghash",
				providerUserInfo: [
					{
						providerId: "password",
						federatedId: "dummyemail@email.test",
					},
				],
				idToken: "testingtoken",
				refreshToken: "testingtoken",
				expiresIn: "3600",
			})
		);
	}),
];
