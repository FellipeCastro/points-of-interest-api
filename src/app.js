// import "express-async-errors";
import express from "express";
import cors from "cors";
import router from "./routes.js";
import errorMiddleware from "./middleware/error.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);
app.use(errorMiddleware);

const PORT = 5000;
app.listen(PORT, () => {
    console.log("Servidor rodando em: http://localhost:" + PORT);
});
