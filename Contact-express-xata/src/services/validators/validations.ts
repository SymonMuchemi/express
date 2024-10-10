import { checkSchema } from "express-validator";

export const activitySchema = checkSchema({
    description: {
        isString: {
            errorMessage: 'Description must be a string!',
        },
        isLength: {
            options: { min: 5, max: 50 },
            errorMessage: "Description must be 5-50 characters!"
        },
    },
    type: {
        isString: {
            errorMessage: "Type must be a string!"
        },
        isLength: {
            options: { min: 2, max: 10 },
            errorMessage: "Type must be a string of 2-10 characters!"
        }
    },
    status: {
        isString: {
            errorMessage: 'Status must be a string!'
        },
        isLength: {
            options: { min: 5, max: 10 },
            errorMessage: "Status must be a string of 5-10 characters!"
        }
    }
})

export const contactSchema = checkSchema({
    name: {
        isString: {
            errorMessage: 'Name must be a string!',
        },
        isLength: {
            options: { min: 5, max: 20 },
            errorMessage: 'Name must be a string of 5-20 characters!'
        },
    },
    email: {
        isEmail: {
            errorMessage: "Email must be a valid email address!"
        },
        isLength: {
            options: {min: 10, max: 50},
            errorMessage: 'Email must be 10-50 characters long!'
        }
    }
});
