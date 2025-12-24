import request from "supertest";
import app from "../../src/app.js";

test("GET /health returns 200", async () => {
    const response = await request(app).get("/health");
    expect(response.status).toBe(200);
});
