import { consult } from "../database/connection.js";

class PoiRepository {
    async Insert(name, coordinateX, coordinateY) {
        try {
            const sql =
                "INSERT INTO points_of_interest (name, coordinate_x, coordinate_y) VALUES (?, ?, ?)";
            const result = await consult(sql, [name, coordinateX, coordinateY]);

            // Busca o POI recém-criado para retornar todos os dados
            const [newPoi] = await consult(
                "SELECT * FROM points_of_interest WHERE id = ?",
                [result.insertId]
            );

            return {
                success: true,
                message: "POI criado com sucesso",
                data: newPoi,
            };
        } catch (error) {
            console.error("Erro ao inserir POI: ", error);
            throw new Error("Erro ao inserir POI: " + error.message);
        }
    }
}

export default new PoiRepository();
