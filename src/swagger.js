export default {
    openapi: "3.0.0",
    info: {
        title: "Points of Interest API",
        version: "1.0.0",
        description: "API for registering and querying points of interest",
    },
    servers: [{ url: "http://localhost:5000" }],
    components: {
        schemas: {
            Poi: {
                type: "object",
                properties: {
                    id: {
                        type: "integer",
                        example: 1,
                        description: "Identificador único do POI",
                    },
                    name: {
                        type: "string",
                        example: "Snack Bar",
                        description: "Nome do ponto de interesse",
                    },
                    coordinate_x: {
                        type: "integer",
                        example: 27,
                        description:
                            "Coordenada X (sistema de referência do domínio)",
                    },
                    coordinate_y: {
                        type: "integer",
                        example: 12,
                        description:
                            "Coordenada Y (sistema de referência do domínio)",
                    },
                },
            },
            PoiWithDistance: {
                allOf: [
                    { $ref: "#/components/schemas/Poi" },
                    {
                        type: "object",
                        properties: {
                            distance: {
                                type: "number",
                                format: "float",
                                example: 3.16,
                            },
                        },
                    },
                ],
            },
            ErrorResponse: {
                type: "object",
                properties: {
                    message: { type: "string" },
                },
            },
            ProximityRequest: {
                type: "object",
                properties: {
                    xRef: {
                        type: "integer",
                        example: 20,
                        description:
                            "Coordenada X de referência (inteiro não-negativo)",
                    },
                    yRef: {
                        type: "integer",
                        example: 10,
                        description:
                            "Coordenada Y de referência (inteiro não-negativo)",
                    },
                    maxDistance: {
                        type: "integer",
                        example: 10,
                        description: "Distância máxima (inteiro não-negativo)",
                    },
                },
                required: ["xRef", "yRef", "maxDistance"],
            },
            InsertPoiRequest: {
                type: "object",
                properties: {
                    name: {
                        type: "string",
                        example: "Snack Bar",
                        description: "Nome do POI (string não vazia)",
                    },
                    coordinateX: {
                        type: "integer",
                        example: 27,
                        description: "Coordenada X (inteiro não-negativo)",
                    },
                    coordinateY: {
                        type: "integer",
                        example: 12,
                        description: "Coordenada Y (inteiro não-negativo)",
                    },
                },
                required: ["name", "coordinateX", "coordinateY"],
            },
        },
    },
    paths: {
        "/health": {
            get: {
                summary: "Health check",
                responses: { 200: { description: "OK" } },
            },
        },
        "/poi": {
            get: {
                summary: "List all POIs",
                responses: {
                    200: {
                        description: "List of POIs",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: { $ref: "#/components/schemas/Poi" },
                                },
                            },
                        },
                    },
                },
            },
            post: {
                summary: "Create a POI",
                requestBody: {
                    description: "Objeto com os dados do POI a ser criado",
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/InsertPoiRequest",
                            },
                            example: {
                                name: "Lanchonete",
                                coordinateX: 27,
                                coordinateY: 12,
                            },
                        },
                    },
                },
                responses: {
                    201: {
                        description: "Created",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/Poi" },
                            },
                        },
                    },
                    400: {
                        description: "Bad Request",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ErrorResponse",
                                },
                            },
                        },
                    },
                    409: {
                        description: "Conflict",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ErrorResponse",
                                },
                            },
                        },
                    },
                },
            },
        },
        "/poi/{id}": {
            delete: {
                summary: "Delete a POI",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        description: "ID do ponto de interesse a ser removido",
                        schema: { type: "integer", example: 1, minimum: 1 },
                    },
                ],
                responses: {
                    200: {
                        description: "Deleted",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: { id: { type: "integer" } },
                                },
                            },
                        },
                    },
                    404: {
                        description: "Not Found",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ErrorResponse",
                                },
                            },
                        },
                    },
                },
            },
        },
        "/nextpois": {
            post: {
                summary: "List POIs by proximity",
                requestBody: {
                    description:
                        "Parâmetros para buscar POIs próximos à referência",
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/ProximityRequest",
                            },
                            example: { xRef: 20, yRef: 10, maxDistance: 10 },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "List of POIs within distance",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: {
                                        $ref: "#/components/schemas/PoiWithDistance",
                                    },
                                },
                            },
                        },
                    },
                    400: {
                        description: "Bad Request",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ErrorResponse",
                                },
                            },
                        },
                    },
                },
            },
        },
    },
};
