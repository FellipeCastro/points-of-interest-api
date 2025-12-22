import PoiService from "../services/PoiService.js";

class PoiController {
    async ListByProximity(req, res) {
        const { xRef, yRef, maxDistance } = req.body;

        const result = await PoiService.ListByProximity(
            xRef,
            yRef,
            maxDistance
        );
        return res.status(200).json(result);
    }

    async List(req, res) {
        const result = await PoiService.List();
        return res.status(200).json(result);
    }

    async Insert(req, res) {
        const { name, coordinateX, coordinateY } = req.body;

        const result = await PoiService.Insert(name, coordinateX, coordinateY);
        return res.status(201).json(result);
    }

    async Delete(req, res) {
        const id = req.params.id;

        const result = await PoiService.Delete(id);
        return res.status(200).json(result);
    }
}

export default new PoiController();
