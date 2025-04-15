import PoiService from "../services/PoiService.js";

class PoiController {
    async ListByProximity(req, res) {
        try {
            const { xRef, yRef, maxDistance } = req.body;

            const result = await PoiService.ListByProximity(xRef, yRef, maxDistance);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    
    async List(req, res) {
        try {
            const result = await PoiService.List();
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async Insert(req, res) {
        try {
            const { name, coordinateX, coordinateY } = req.body;

            const result = await PoiService.Insert(name, coordinateX, coordinateY);
            return res.status(201).json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async Delete(req, res) {
        try {
            const id = req.params.id;

            const poiExists = await PoiService.FindById(id);

            if (!poiExists) {
                return res.status(404).json({ error: "O ID fornecido não foi encontrado." });
            }

            const result = await PoiService.Delete(id);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export default new PoiController();
