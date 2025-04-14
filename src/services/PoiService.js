import PoiRepository from "../repositories/PoiRepository.js";

class PoiService {
    async List() {
        try {
            return await PoiRepository.List();
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async Insert(name, coordinateX, coordinateY) {
        try {
            if (!name || name.trim() === "") {
                throw new Error("O nome do POI é obrigatório!");
            }

            if (typeof coordinateX !== 'number' || !Number.isInteger(coordinateX)) {
                throw new Error("A coordenada X deve ser um número inteiro!");
            }

            if (coordinateX < 0) {
                throw new Error("A coordenada X não pode ser negativa!");
            }

            if (typeof coordinateY !== 'number' || !Number.isInteger(coordinateY)) {
                throw new Error("A coordenada Y deve ser um número inteiro!");
            }

            if (coordinateY < 0) {
                throw new Error("A coordenada Y não pode ser negativa!");
            }

            const existingPoi = await PoiRepository.FindByCoordinatesOrName(coordinateX, coordinateY, name);
            
            if (existingPoi) {
                if (existingPoi.name === name) {
                    throw new Error("Já existe um POI com este nome!");
                }
                if (existingPoi.coordinate_x === coordinateX && existingPoi.coordinate_y === coordinateY) {
                    throw new Error("Já existe um POI com estas coordenadas!");
                }
            }

            return await PoiRepository.Insert(name, coordinateX, coordinateY);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async Delete(id) {
        try {
            return await PoiRepository.Delete(id);
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export default new PoiService();
