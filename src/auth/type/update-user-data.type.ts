export type UpdateUserData = {
  name?: string;
  email?: string;
  password?: string;
  birthyear?: number | null;
  region?: string;
  gender?: string;
  refreshToken?: string | null;
  isEmailVerified?: boolean;
};
