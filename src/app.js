import express from "express";
import cors from "cors";
import router from "./routes.js";
import errorMiddleware from "./middleware/error.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
const HOST = "localhost";
app.listen(PORT, HOST, () => {
    console.log(`Servidor rodando em: http://${HOST}:${PORT}`);
});
