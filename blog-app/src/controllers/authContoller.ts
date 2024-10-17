import { PrismaClient } from "@prisma/client";
import { UserBody } from "../types/types";
import bcrypt from 'bcrypt';
const jwt = require('jsonwebtoken');

const prisma: PrismaClient = new PrismaClient();

export const registerUser = async (user: UserBody) {
    const { name, email, password } = user;

    try {
        // check if usere exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return { code: 400, message: 'User already exists!' }
        }

        // create password hash
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });

        return { code: 201, message: `User created successfully: ${{ newUser }}` }
    } catch (error: any) {
        return { code: 400, message: error.toString() }
    }
}

export const logUser = async (user: UserBody) {
    const { email, password } = user;
    const wrongDetails = { code: 400, message: 'Invalid credentials' }

    try {
        // search for user
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (!existingUser) {
            return wrongDetails;
        }

        const isMatch = await bcrypt.compare(password, existingUser.password);

        if (!isMatch) {
            return wrongDetails;
        }

        // generate JWT
        const token = jwt.sign({ userId: existingUser.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION })

        return { code: 200, message: token }
    } catch (error: any) {
        return { code: 500, message: error.toString() }
    }
}
