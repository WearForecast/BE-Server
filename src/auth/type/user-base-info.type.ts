export type UserBaseInfo = {
  id: number;
  name: string;
  email: string;
  password: string;
  birthyear: number;
  region: string;
  gender: string;
  refreshToken: string | null;
  isEmailVerified: boolean;
};
