import request from "supertest";
import app from "../../../src/app.js";

export const req = () => request(app);
