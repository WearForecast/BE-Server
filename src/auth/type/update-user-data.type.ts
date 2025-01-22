export type UpdateUserData = {
  name?: string;
  email?: string;
  password?: string;
  birthday?: Date | null;
  region?: string;
  gender?: string;
  refreshToken?: string | null;
};
