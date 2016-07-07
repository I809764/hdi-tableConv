/*eslint no-console: 0, no-unused-vars: 0*/
"use strict";
module.exports = {
	initExpress: function() {
		var xsenv = require("sap-xsenv");
		var passport = require("passport");
		var xssec = require("sap-xssec");
		var xsHDBConn = require("sap-hdbext");
		var express = require("express");

		//Initialize Express App for XS UAA and HDBEXT Middleware
		var app = express();
		passport.use("JWT", new xssec.JWTStrategy(xsenv.getServices({
			uaa: {
				tag: "xsuaa"
			}
		}).uaa));
		app.use(passport.initialize());

		app.use(
			passport.authenticate("JWT", {
				session: false
			}),
			xsHDBConn.middleware());
		return app;
	}
};