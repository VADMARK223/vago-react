export const ROLE = {
  user: 'user',
  moderator: 'moderator',
  admin: 'admin',
} as const;

export const ROLE_ENUM = {
  user: 'user',
  moderator: 'moderator',
  admin: 'admin',
};

export type Role = (typeof ROLE)[keyof typeof ROLE];
