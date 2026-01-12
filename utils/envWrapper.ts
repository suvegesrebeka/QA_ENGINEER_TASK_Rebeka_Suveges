export const env = {
    uiBaseUrl: process.env.uiBaseUrl as string,
    homePageUrl: process.env.homePageUrl as string,
    cartPageUrl: process.env.cartPageUrl as string,
    apiBaseUrl: process.env.apiBaseUrl as string,
    firstName: process.env.firstName as string,
    lastName: process.env.lastName as string,
    zipCode: process.env.zipCode as string,
    users: {
        standard: {
            username: process.env.STANDARD_USER_USERNAME as string,
            password: process.env.STANDARD_USER_PASSWORD as string
        },
        locked: {
            username: process.env.LOCKED_USER_USERNAME as string,
            password: process.env.LOCKED_USER_PASSWORD as string
        },
        invalid: {
            username: process.env.INVALID_USER_USERNAME as string,
            password: process.env.INVALID_USER_PASSWORD as string
        }
    }
}