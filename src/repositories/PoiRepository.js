import { consult } from "../database/connection.js";

class PoiRepository {
    async FindByCoordinatesOrName(x, y, name) {
        const sql = `
                SELECT * FROM points_of_interest 
                WHERE name = ? 
                   OR (coordinate_x = ? AND coordinate_y = ?)
                LIMIT 1
            `;
        const [poi] = await consult(sql, [name, x, y]);
        return poi || null;
    }

    async FindById(id) {
        const sql = "SELECT * FROM points_of_interest WHERE id = ? LIMIT 1";
        const [poi] = await consult(sql, [id]);
        return poi || null;
    }

    async List() {
        const sql = "SELECT * FROM points_of_interest";
        const result = await consult(sql);
        return result;
    }

    async Insert(name, coordinateX, coordinateY) {
        const sql =
            "INSERT INTO points_of_interest (name, coordinate_x, coordinate_y) VALUES (?, ?, ?)";
        const result = await consult(sql, [name, coordinateX, coordinateY]);

        const [newPoi] = await consult(
            "SELECT * FROM points_of_interest WHERE id = ?",
            [result.insertId]
        );

        return newPoi;
    }

    async Delete(id) {
        const sql = "DELETE FROM points_of_interest WHERE id = ?";
        await consult(sql, [id]);
        return { id: id };
    }
}

export default new PoiRepository();
