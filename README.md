# Points of Interest API ✅

**API simples para cadastro e consulta de pontos de interesse (POIs).**

---

## 📋 Descrição

API criada em Node.js/Express para registrar POIs e buscar os mais próximos de uma referência, com validações de entrada e tratamento de erros.

## 🔧 Tecnologias

-   Node.js
-   Express
-   MySQL (via `mysql2`)
-   `dotenv` para variáveis de ambiente

## ⚙️ Pré-requisitos

-   Node.js >= 18
-   MySQL (ou compatível)

## 🚀 Instalação

1. Clone o repositório:

```bash
git clone <repo-url>
cd points-of-interest-api
```

2. Instale dependências:

```bash
npm install
```

3. Crie um arquivo `.env` na raiz com as variáveis de conexão ao banco (exemplo):

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=senha
DB_NAME=points_db
```

> Observação: a configuração de conexão está em `src/database/connection.js`.

## ▶️ Executar

Inicie em modo de desenvolvimento (recarregamento automático via `node --watch`):

```bash
npm run dev
```

O servidor roda por padrão em: `http://localhost:5000`.

---

## 📡 Endpoints

Todos os endpoints usam JSON no corpo de requisição e resposta.

-   **GET /poi**

    -   Lista todos os POIs
    -   Exemplo:
        ```bash
        curl http://localhost:5000/poi
        ```

-   **POST /poi**

    -   Insere um novo POI
    -   Body (JSON):
        ```json
        {
            "name": "Adega do João",
            "coordinateX": 20,
            "coordinateY": 10
        }
        ```
    -   Resposta: 201 Created com o objeto criado

-   **DELETE /poi/:id**

    -   Remove um POI pelo `id`
    -   Exemplo:
        ```bash
        curl -X DELETE http://localhost:5000/poi/1
        ```

-   **POST /nextpois**
    -   Lista POIs dentro de uma distância máxima a partir de uma referência
    -   Body (JSON):
        ```json
        {
            "xRef": 20,
            "yRef": 10,
            "maxDistance": 10
        }
        ```
    -   Retorna array de POIs com o campo adicional `distance` (número arredondado com 2 casas)

---

## 🗄️ Banco de dados

Exemplo de tabela esperada:

```sql
CREATE TABLE points_of_interest (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  coordinate_x INT NOT NULL,
  coordinate_y INT NOT NULL
);
```

## ⚠️ Observações

-   Validações importantes: coordenadas e distância devem ser números inteiros e não-negativos; o nome do POI é obrigatório.
-   Possíveis códigos de erro: `400` (Bad Request), `404` (Not Found), `409` (Conflict).

---

## 📎 Contribuição

Sinta-se à vontade para abrir issues e PRs com melhorias.

---

© Projeto `points-of-interest-api` — criado como exemplo de API simples em Node.js
