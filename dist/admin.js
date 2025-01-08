var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Router } from "express";
import AdminJS from "adminjs";
import Connect from "connect-pg-simple";
import session from "express-session";
import AdminJSExpress from "@adminjs/express";
import { Database, Resource, getModelByName } from "@adminjs/prisma";
import prisma from "./prisma/client.js";
AdminJS.registerAdapter({ Database, Resource });
const adminOptions = {
    resources: [
        {
            resource: { model: getModelByName("User"), client: prisma },
            options: {},
        },
        {
            resource: { model: getModelByName("Profile"), client: prisma },
            options: {},
        },
        {
            resource: { model: getModelByName("Book"), client: prisma },
            options: {},
        },
    ],
};
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
const authenticate = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
        return Promise.resolve(DEFAULT_ADMIN);
    }
    return null;
});
const adminRouter = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
    authenticate,
    cookieName: "adminjs",
    cookiePassword: "sessionsecret",
}, null, {
    store: sessionStore,
    resave: true,
    saveUninitialized: true,
    secret: "sessionsecret",
    cookie: {
        httpOnly: process.env.NODE_ENV === "production",
        secure: process.env.NODE_ENV === "production",
    },
    name: "adminjs",
});
const router = Router();
router.use(adminJs.options.rootPath, adminRouter);
export default router;
//# sourceMappingURL=admin.js.map