import { checkSchema } from 'express-validator'

export const userSchema = checkSchema({
    email: {
        isEmail: {
            errorMessage: 'User email must be a valid email address!'
        },
        isLength: {
            options: { min: 10, max: 50 },
            errorMessage: "User email must be a string of 10-50 characters!"
        }
    },
    name: {
        isString: {
            errorMessage: 'Username must be a string!'
        },
        isLength: {
            options: { min: 5, max: 20 },
            errorMessage: 'Username must be a string of 5-20 characters!'
        }
    }
})
