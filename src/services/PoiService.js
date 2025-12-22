import PoiRepository from "../repositories/PoiRepository.js";
import { BadRequestError, ConflictError } from "../helpers/apiError.js";

class PoiService {
    async ListByProximity(xRef, yRef, maxDistance) {
        const pois = await PoiRepository.List();
        const filteredPois = [];

        if (!xRef) {
            throw new BadRequestError("A coordenada X é obrigatória!");
        }

        if (typeof xRef !== "number" || !Number.isInteger(xRef)) {
            throw new BadRequestError(
                "A coordenada X deve ser um número inteiro!"
            );
        }

        if (xRef < 0) {
            throw new BadRequestError("A coordenada X não pode ser negativa!");
        }

        if (!yRef) {
            throw new BadRequestError("A coordenada Y é obrigatória!");
        }

        if (typeof yRef !== "number" || !Number.isInteger(yRef)) {
            throw new BadRequestError(
                "A coordenada Y deve ser um número inteiro!"
            );
        }

        if (yRef < 0) {
            throw new BadRequestError("A coordenada Y não pode ser negativa!");
        }

        if (!maxDistance) {
            throw new BadRequestError("A distância máxima é obrigatória!");
        }

        if (typeof maxDistance !== "number" || !Number.isInteger(maxDistance)) {
            throw new BadRequestError(
                "A distância máxima deve ser um número inteiro!"
            );
        }

        if (maxDistance < 0) {
            throw new BadRequestError(
                "A distância máxima não pode ser negativa!"
            );
        }

        pois.forEach((poi) => {
            const xPoi = poi.coordinate_x;
            const yPoi = poi.coordinate_y;
            const distance = Math.sqrt(
                Math.pow(xPoi - xRef, 2) + Math.pow(yPoi - yRef, 2)
            );
            if (distance <= maxDistance) {
                filteredPois.push({
                    ...poi,
                    distance: Number(distance.toFixed(2)),
                });
            }
        });

        return filteredPois;
    }

    async FindById(id) {
        return await PoiRepository.FindById(id);
    }

    async List() {
        return await PoiRepository.List();
    }

    async Insert(name, coordinateX, coordinateY) {
        if (!name || name.trim() === "") {
            throw new BadRequestError("O nome do POI é obrigatório!");
        }

        if (!coordinateX) {
            throw new BadRequestError("A coordenada X é obrigatória!");
        }

        if (typeof coordinateX !== "number" || !Number.isInteger(coordinateX)) {
            throw new BadRequestError(
                "A coordenada X deve ser um número inteiro!"
            );
        }

        if (coordinateX < 0) {
            throw new BadRequestError("A coordenada X não pode ser negativa!");
        }

        if (!coordinateY) {
            throw new BadRequestError("A coordenada Y é obrigatória!");
        }

        if (typeof coordinateY !== "number" || !Number.isInteger(coordinateY)) {
            throw new BadRequestError(
                "A coordenada Y deve ser um número inteiro!"
            );
        }

        if (coordinateY < 0) {
            throw new BadRequestError("A coordenada Y não pode ser negativa!");
        }

        const existingPoi = await PoiRepository.FindByCoordinatesOrName(
            coordinateX,
            coordinateY,
            name
        );

        if (existingPoi) {
            if (existingPoi.name === name) {
                throw new ConflictError("Já existe um POI com este nome!");
            }
            if (
                existingPoi.coordinate_x === coordinateX &&
                existingPoi.coordinate_y === coordinateY
            ) {
                throw new ConflictError(
                    "Já existe um POI com estas coordenadas!"
                );
            }
        }

        return await PoiRepository.Insert(name, coordinateX, coordinateY);
    }

    async Delete(id) {
        const poiExists = await PoiService.FindById(id);

        if (!poiExists) {
            throw new NotFoundError("POI não encontrado");
        }

        return await PoiRepository.Delete(id);
    }
}

export default new PoiService();
