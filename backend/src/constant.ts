type user = {
    ADMIN: string,
    USER: string
}

export const UserRolesEnum: user = {
    ADMIN: "ADMIN",
    USER: "USER"
}

export const availableUserRoles = Object.values(UserRolesEnum);