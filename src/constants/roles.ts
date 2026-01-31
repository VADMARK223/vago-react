export const ROLES = {
    user: 'user',
    moderator: 'moderator',
    admin: 'admin',
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];