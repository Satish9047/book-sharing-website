import dotenv from "dotenv";
dotenv.config();

const config: { serverPort: number } = {
    serverPort: Number(process.env.PORT) || 8000
};

export default config;