export type UserBaseInfo = {
    id: number;
    name: string;
    email: string;
    password: string;
    birthday: Date;
    region: string;
    gender: string;
    refreshToken: string | null;
};    