import { req } from "./helpers/request.js";
import { consult } from "../../src/database/connection.js";
import { createPoi } from "./factories/poiFactory.js";

beforeEach(async () => {
    await consult("TRUNCATE TABLE points_of_interest");
});

describe("ListByProximity E2E", () => {
    test("returns 400 when xRef is missing", async () => {
        const res = await req()
            .post("/nextpois")
            .send({ yRef: 10, maxDistance: 5 });
        expect(res.status).toBe(400);
        expect(res.body.error).toBeDefined();
    });

    test("returns 400 when coordinates or maxDistance are non-integer or negative", async () => {
        // non-integer xRef
        let res = await req()
            .post("/nextpois")
            .send({ xRef: 3.5, yRef: 2, maxDistance: 5 });
        expect(res.status).toBe(400);

        // negative yRef
        res = await req()
            .post("/nextpois")
            .send({ xRef: 1, yRef: -2, maxDistance: 5 });
        expect(res.status).toBe(400);

        // non-integer maxDistance
        res = await req()
            .post("/nextpois")
            .send({ xRef: 1, yRef: 2, maxDistance: 2.2 });
        expect(res.status).toBe(400);
    });

    test("returns only POIs within maxDistance and includes rounded distances", async () => {
        // reference (10,12)
        await createPoi({ name: "A", coordinateX: 10, coordinateY: 10 }); // distance 2.00
        await createPoi({ name: "B", coordinateX: 13, coordinateY: 14 }); // distance ~3.61
        await createPoi({ name: "C", coordinateX: 20, coordinateY: 20 }); // far

        const res = await req()
            .post("/nextpois")
            .send({ xRef: 10, yRef: 12, maxDistance: 5 });

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        // should contain A and B
        const names = res.body.map((p) => p.name).sort();
        expect(names).toEqual(["A", "B"]);

        // check distances are present and rounded to 2 decimals
        const poiA = res.body.find((p) => p.name === "A");
        const poiB = res.body.find((p) => p.name === "B");
        expect(Number(poiA.distance)).toBeCloseTo(2.0, 2);
        expect(Number(poiB.distance)).toBeCloseTo(3.61, 2);
    });

    test("boundary: maxDistance 0 returns only exact coordinate matches", async () => {
        await createPoi({ name: "Exact", coordinateX: 5, coordinateY: 5 });
        await createPoi({ name: "Near", coordinateX: 6, coordinateY: 5 });

        const res = await req()
            .post("/nextpois")
            .send({ xRef: 5, yRef: 5, maxDistance: 0 });

        expect(res.status).toBe(200);
        expect(res.body.length).toBe(1);
        expect(res.body[0].name).toBe("Exact");
        expect(Number(res.body[0].distance)).toBeCloseTo(0.0, 2);
    });

    test("rejects string values for coordinates", async () => {
        const res = await req()
            .post("/nextpois")
            .send({ xRef: "10", yRef: "12", maxDistance: "5" });
        expect(res.status).toBe(400);
    });
});
