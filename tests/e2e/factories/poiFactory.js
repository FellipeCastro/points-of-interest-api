import { consult } from "../../../src/database/connection.js";

export const buildPoi = (overrides = {}) => {
    const defaultPoi = {
        name: `POI_${Date.now() % 100000}`,
        coordinateX: 10,
        coordinateY: 20,
    };
    return { ...defaultPoi, ...overrides };
};

export const createPoi = async (overrides = {}) => {
    const poi = buildPoi(overrides);
    const result = await consult(
        "INSERT INTO points_of_interest (name, coordinate_x, coordinate_y) VALUES (?, ?, ?)",
        [poi.name, poi.coordinateX, poi.coordinateY]
    );

    // result may contain insertId
    const insertId = result.insertId;
    const [created] = await consult(
        "SELECT * FROM points_of_interest WHERE id = ?",
        [insertId]
    );
    return created;
};
