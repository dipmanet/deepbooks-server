import { getModelByName } from "@adminjs/prisma";
import prisma from "../prisma/client.js";

export const adminOptions = {
	resources: [
		{
			resource: { model: getModelByName("User"), client: prisma },
			options: {
				parent: {
					name: "Users",
					icon: "Box",
				},
			},
		},
		{
			resource: { model: getModelByName("Profile"), client: prisma },
			options: {
				parent: {
					name: "Users",
					icon: "Box",
				},
			},
		},
		{
			resource: { model: getModelByName("Book"), client: prisma },
			options: {
				parent: {
					name: "Books",
					icon: "Box",
				},
			},
		},
	],
};
