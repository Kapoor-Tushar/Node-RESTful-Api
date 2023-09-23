// Creating a middleware for protecting routes.
// Protected routes is a route which could be accessed by the user, if he/she is authenticated.

// It is required for reading env files.
const dotnev = require("dotenv");
dotnev.config({
	path: `./config.env`,
});
//Importing jwt
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
	try {
		let token = req.headers.authorization.split(" ")[1];
		const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
		req.userData = decoded;
		next();
	} catch (err) {
		return res.status(401).json({
			message: "Auth Failed ",
		});
	}
};
