import { Router } from "express";
import AdminJS from "adminjs";
import Connect from "connect-pg-simple";
import session from "express-session";
import AdminJSExpress from "@adminjs/express";
import { Database, Resource } from "@adminjs/prisma";
import { adminOptions } from "./config/admin_config.js";

AdminJS.registerAdapter({ Database, Resource });

const adminJs = new AdminJS(adminOptions);

const ConnectSession = Connect(session);
const sessionStore = new ConnectSession({
	conObject: {
		connectionString: process.env.DATABASE_URL,
		ssl: process.env.NODE_ENV === "production",
	},
	tableName: "session",
	createTableIfMissing: true,
});

const DEFAULT_ADMIN = {
	email: "admin@deepbooks.com",
	password: "password12345",
};
const authenticate = async (email: string, password: string) => {
	if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
		return Promise.resolve(DEFAULT_ADMIN);
	}
	return null;
};
const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
	adminJs,
	{
		authenticate,
		cookieName: "adminjs",
		cookiePassword: "sessionsecret",
	},
	null,
	{
		store: sessionStore,
		resave: true,
		saveUninitialized: true,
		secret: "sessionsecret",
		cookie: {
			httpOnly: process.env.NODE_ENV === "production",
			secure: process.env.NODE_ENV === "production",
		},
		name: "adminjs",
	}
);

const router = Router();
router.use(adminJs.options.rootPath, adminRouter);

export default router;
