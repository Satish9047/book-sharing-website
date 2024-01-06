import dotenv from "dotenv";
dotenv.config();

type TConfig = {
    serverPort: number,
    jwtSecret: string
}

const config: TConfig = {
    serverPort: Number(process.env.PORT) || 8000,
    jwtSecret: "book-sharing-api-jwtSecret",
};

export default config;