import { consult } from "../database/connection.js";

class PoiRepository {
    async FindByCoordinatesOrName(x, y, name) {
        try {
            const sql = `
                SELECT * FROM points_of_interest 
                WHERE name = ? 
                   OR (coordinate_x = ? AND coordinate_y = ?)
                LIMIT 1
            `;
            const [poi] = await consult(sql, [name, x, y]);
            return poi || null;
        } catch (error) {
            console.error("Erro ao buscar POI existente: ", error);
            throw new Error("Erro ao buscar POI existente: " + error.message);
        }
    }

    async FindById(id) {
        try {
            const sql = "SELECT * FROM points_of_interest WHERE id = ? LIMIT 1";
            const [poi] = await consult(sql, [id]);
            return poi || null;
        } catch (error) {
            console.error("Erro ao buscar POI por ID: ", error);
            throw new Error("Erro ao buscar POI: " + error.message);
        }
    }

    async List() {
        try {
            const sql = "SELECT * FROM points_of_interest";
            const result = await consult(sql);
            return result;
        } catch (error) {
            console.error("Erro ao listar POI's: ", error);
            throw new Error("Erro ao listar POI's: " + error.message);
        }
    }

    async Insert(name, coordinateX, coordinateY) {
        try {
            const sql =
                "INSERT INTO points_of_interest (name, coordinate_x, coordinate_y) VALUES (?, ?, ?)";
            const result = await consult(sql, [name, coordinateX, coordinateY]);

            const [newPoi] = await consult(
                "SELECT * FROM points_of_interest WHERE id = ?",
                [result.insertId]
            );
            
            return newPoi;
        } catch (error) {
            console.error("Erro ao inserir POI: ", error);
            throw new Error("Erro ao inserir POI: " + error.message);
        }
    }

    async Delete(id) {
        try {
            const sql = "DELETE FROM points_of_interest WHERE id = ?";
            await consult(sql, [id]);
        } catch (error) {
            console.error("Erro ao deletar POI: ", error);
            throw new Error("Erro ao deletar POI: " + error.message);
        }
    }
}

export default new PoiRepository();
