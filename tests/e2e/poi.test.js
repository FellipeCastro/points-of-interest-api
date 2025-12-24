import { req } from "./helpers/request.js";
import { consult } from "../../src/database/connection.js";
import { buildPoi, createPoi } from "./factories/poiFactory.js";

beforeEach(async () => {
    // clean table
    await consult("TRUNCATE TABLE points_of_interest");
});

describe("POI E2E", () => {
    test("POST /poi creates a POI (201)", async () => {
        const body = buildPoi({ name: "Parque da A" });

        const res = await req().post("/poi").send(body);

        expect(res.status).toBe(201);
        expect(res.body).toMatchObject({
            name: "Parque da A",
            coordinate_x: 10,
            coordinate_y: 20,
        });
        expect(res.body.id).toBeDefined();
    });

    test("POST /poi returns 400 for validation errors (missing name)", async () => {
        const body = { coordinateX: 1, coordinateY: 2 };

        const res = await req().post("/poi").send(body);

        expect(res.status).toBe(400);
        expect(res.body.error).toBeDefined();
    });

    test("POST /poi returns 400 for empty name (trimmed)", async () => {
        const res = await req()
            .post("/poi")
            .send({ name: "   ", coordinateX: 1, coordinateY: 2 });
        expect(res.status).toBe(400);
        expect(res.body.error).toBeDefined();
    });

    test("POST /poi returns 400 for non-integer and string coordinates", async () => {
        let res = await req()
            .post("/poi")
            .send({ name: "P1", coordinateX: 1.5, coordinateY: 2 });
        expect(res.status).toBe(400);

        res = await req()
            .post("/poi")
            .send({ name: "P2", coordinateX: "3", coordinateY: 4 });
        expect(res.status).toBe(400);
    });

    test("POST /poi returns 409 for duplicate name", async () => {
        await createPoi({ name: "DupName", coordinateX: 5, coordinateY: 5 });

        const res = await req()
            .post("/poi")
            .send({ name: "DupName", coordinateX: 10, coordinateY: 10 });

        expect(res.status).toBe(409);
        expect(res.body.error).toBeTruthy();
    });

    test("POST /poi returns 409 for duplicate coordinates", async () => {
        await createPoi({ name: "UniqueName", coordinateX: 8, coordinateY: 9 });

        const res = await req()
            .post("/poi")
            .send({ name: "Another", coordinateX: 8, coordinateY: 9 });

        expect(res.status).toBe(409);
        expect(res.body.error).toBeTruthy();
    });

    test("GET /poi lists POIs", async () => {
        await createPoi({ name: "List1" });
        await createPoi({ name: "List2" });

        const res = await req().get("/poi");

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(2);
    });

    test("DELETE /poi/:id deletes POI", async () => {
        const poi = await createPoi({ name: "ToDelete" });

        const res = await req().delete(`/poi/${poi.id}`);

        expect(res.status).toBe(200);
        expect(Number(res.body.id)).toBe(Number(poi.id));

        const list = await req().get("/poi");
        expect(
            list.body.find((p) => Number(p.id) === Number(poi.id))
        ).toBeUndefined();
    });
});
