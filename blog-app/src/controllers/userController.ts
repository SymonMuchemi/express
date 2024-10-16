import { PrismaClient, User } from "@prisma/client";

const prisma: PrismaClient = new PrismaClient();


/**
 * Retrieves all users from the database.
 *
 * @returns {Promise<Array>} A promise that resolves to an array of user objects.
 */
export const fetchAllUsers = async () => {
    const users: User[] = await prisma.user.findMany();

    return users
}

/**
 * Fetches a user by their unique ID.
 *
 * @param id - The unique identifier of the user to fetch.
 * @returns A promise that resolves to the user object if found, or null if not found.
 */
export const fetchUserById = async (id: number) => {
    const user: User | null = await prisma.user.findUnique({
        where: { id: id }
    });

    return user;
}
