import { checkSchema } from "express-validator";

export const postSchema = checkSchema({
    title: {
        isString: {
            errorMessage: 'Post title must be a string!'
        },
        isLength: {
            options: { min: 5 },
            errorMessage: 'Post title must be at least 5 characters long!'
        }
    },
    content: {
        isString: {
            errorMessage: 'Post contenct must be string!'
        },
        isLength: {
            options: { min: 10 },
            errorMessage: 'Post content must be at least 10 characters long!'
        }
    }
})
