import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
// async function testPrisma() {
// 	try {
// 		const allUsers = await prisma.user.findMany(); // Change this to a valid query in your schema
// 		console.log(allUsers, prisma);
// 	} catch (error) {
// 		console.error("Error while accessing database:", error);
// 	} finally {
// 		await prisma.$disconnect();
// 	}
// }
// testPrisma();
export default prisma;
//# sourceMappingURL=client.js.map