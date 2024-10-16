import { PrismaClient, User } from "@prisma/client";
import { UserBody } from "../types/types";

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

/**
 * Creates a new user in the database.
 *
 * @param userBody - An object containing the user's name and email.
 * @returns A promise that resolves to the created user object.
 */
export const createUser = async (userBody: UserBody) => {
    const { name, email } = userBody;
    const result = await prisma.user.create({
        data: { name, email }
    });

    return result
}
