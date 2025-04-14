import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Olá mundo")
})

const PORT = 5000;
app.listen(PORT, () => {
    console.log("Servidor rodando em: http://localhost:" + PORT);
});
