import PoiService from "../services/PoiService.js";

class RoiController {
    async Insert(req, res) {
        try {
            const { name, coordinateX, coordinateY } = req.body;

            const result = await PoiService.Insert(name, coordinateX, coordinateY);
            return res.status(201).json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export default new RoiController();
