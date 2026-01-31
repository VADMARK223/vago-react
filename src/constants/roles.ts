export const ROLE = {
    user: 'user',
    moderator: 'moderator',
    admin: 'admin',
} as const;

export type Role = typeof ROLE[keyof typeof ROLE];