type user = {
    ADMIN: string,
    USER: string
}

export const UserRolesEnum: user = {
    ADMIN: "ADMIN",
    USER: "USER"
}

export const availableUserRoles = Object.values(UserRolesEnum);

export const USER_TEMPORARY_TOKEN_EXPIRY = 20 * 60 * 1000;