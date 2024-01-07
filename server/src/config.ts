import dotenv from "dotenv";
dotenv.config();

type TConfig = {
    SERVER_PORT: number,
    ACCESS_TOKEN_SECRET: string,
    REFRESH_TOKEN_SECRET: string
};

const config: TConfig = {
    SERVER_PORT: Number(process.env.PORT) || 8000,
    ACCESS_TOKEN_SECRET: `${process.env.ACCESS_TOKEN_SECRET}`,
    REFRESH_TOKEN_SECRET: `${process.env.REFRESH_TOKEN_SECRET}`
};

export default config;