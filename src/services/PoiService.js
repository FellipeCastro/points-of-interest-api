import PoiRepository from "../repositories/PoiRepository.js";

class PoiService {
    async ListByProximity(xRef, yRef, maxDistance) {
        try {
            const pois = await PoiRepository.List();
            const filteredPois = [];

            if (!xRef) {
                throw new Error("A coordenada X é obrigatória!");
            }

            if (typeof xRef !== "number" || !Number.isInteger(xRef)) {
                throw new Error("A coordenada X deve ser um número inteiro!");
            }

            if (xRef < 0) {
                throw new Error("A coordenada X não pode ser negativa!");
            }

            if (!yRef) {
                throw new Error("A coordenada Y é obrigatória!");
            }

            if (typeof yRef !== "number" || !Number.isInteger(yRef)) {
                throw new Error("A coordenada Y deve ser um número inteiro!");
            }

            if (yRef < 0) {
                throw new Error("A coordenada Y não pode ser negativa!");
            }

            if (!maxDistance) {
                throw new Error("A distância máxima é obrigatória!");
            }

            if (
                typeof maxDistance !== "number" ||
                !Number.isInteger(maxDistance)
            ) {
                throw new Error(
                    "A distância máxima deve ser um número inteiro!"
                );
            }

            if (maxDistance < 0) {
                throw new Error("A distância máxima não pode ser negativa!");
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
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async FindById(id) {
        try {
            return await PoiRepository.FindById(id);
        } catch (error) {
            throw new Error(error.message);
        }
    }

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

            if (!coordinateX) {
                throw new Error("A coordenada X é obrigatória!");
            }

            if (
                typeof coordinateX !== "number" ||
                !Number.isInteger(coordinateX)
            ) {
                throw new Error("A coordenada X deve ser um número inteiro!");
            }

            if (coordinateX < 0) {
                throw new Error("A coordenada X não pode ser negativa!");
            }

            if (!coordinateY) {
                throw new Error("A coordenada Y é obrigatória!");
            }

            if (
                typeof coordinateY !== "number" ||
                !Number.isInteger(coordinateY)
            ) {
                throw new Error("A coordenada Y deve ser um número inteiro!");
            }

            if (coordinateY < 0) {
                throw new Error("A coordenada Y não pode ser negativa!");
            }

            const existingPoi = await PoiRepository.FindByCoordinatesOrName(
                coordinateX,
                coordinateY,
                name
            );

            if (existingPoi) {
                if (existingPoi.name === name) {
                    throw new Error("Já existe um POI com este nome!");
                }
                if (
                    existingPoi.coordinate_x === coordinateX &&
                    existingPoi.coordinate_y === coordinateY
                ) {
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
