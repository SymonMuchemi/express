import { PrismaClient } from "@prisma/client";

const prisma: PrismaClient = new PrismaClient();


/**
 * Retrieves all users from the database.
 *
 * @returns {Promise<Array>} A promise that resolves to an array of user objects.
 */
export const getAllUsers = async () => {
    const users = await prisma.user.findMany();

    return users
}
