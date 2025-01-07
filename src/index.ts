import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import express from "express";
import Connect from "connect-pg-simple";
import session from "express-session";
import routers from "./routers/index.js";
import { Database, Resource, getModelByName } from "@adminjs/prisma";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

AdminJS.registerAdapter({ Database, Resource });

const PORT = process.env.NODE_ENV || 5000;
const DEFAULT_ADMIN = {
	email: "admin@example.com",
	password: "theunique12345",
};
const authenticate = async (email: string, password: string) => {
	if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
		return Promise.resolve(DEFAULT_ADMIN);
	}
	return null;
};

const start = async () => {
	const app = express();

	const adminOptions = {
		resources: [
			{
				resource: { model: getModelByName("Post"), client: prisma },
				options: {},
			},
			{
				resource: { model: getModelByName("User"), client: prisma },
				options: {},
			},
			// {
			// 	resource: { model: getModelByName("Publisher"), client: prisma },
			// 	options: {},
			// },
		],
	};
	const admin = new AdminJS(adminOptions);

	const ConnectSession = Connect(session);
	const sessionStore = new ConnectSession({
		conObject: {
			connectionString: process.env.DATABASE_URL,
			ssl: process.env.NODE_ENV === "production",
		},
		tableName: "session",
		createTableIfMissing: true,
	});

	const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
		admin,
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
	app.use(admin.options.rootPath, adminRouter);
	app.use("/api", routers);

	app.listen(PORT, () => {
		console.log(`AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`);
	});
};

start();
