# points-of-interest-api

**API para cadastro e consulta de pontos de interesse**

---

## 🚀 Visão geral

Este repositório contém uma API simples para gerenciar pontos de interesse (POI). Implementa rotas para criar, listar, buscar por proximidade e deletar POIs. O projeto está organizado com camadas de controllers, services, repositories e uma camada de acesso ao banco.

## 🔧 Requisitos

-   Node.js (recomendado: v20)
-   Docker Desktop (para rodar o banco de testes localmente)
-   npm

---

## Getting started (desenvolvimento)

1. Instale dependências:

```bash
npm install
```

2. Configure variáveis de ambiente para desenvolvimento (ex.: `.env`):

```
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=points_of_interest
NODE_ENV=development
```

3. Rode a aplicação em modo dev:

```bash
npm run dev
```

4. Para produção:

```bash
npm start
```

---

## Banco de dados

-   O projeto atualmente usa **MySQL** (`mysql2`).
-   Se quiser executar localmente sem Docker, certifique-se que um MySQL está disponível e que as variáveis em `.env` apontem para ele.
-   Também há um `docker-compose.yml` para subir um MySQL de teste isolado (veja seção **Testes**).

---

## ✅ Testes E2E (end-to-end)

A suíte E2E valida rotas e integração com o banco (HTTP → controllers → services → repositories → DB).

### Requisitos

-   Docker Desktop (para rodar o banco de testes - MySQL)
-   Arquivo `.env.test` com as variáveis de conexão (o projeto já contém um `.env.test` de exemplo)

### Comandos úteis

-   Subir DB de teste (local):

```bash
npm run test:db:up
```

-   Rodar a suíte E2E localmente:

```bash
npm run test:e2e
```

-   Parar/limpar o DB de teste:

```bash
npm run test:db:down
```

### Arquivos relevantes de teste

-   `jest.e2e.config.js` — configuração do Jest para E2E
-   `tests/e2e/setup.cjs` e `tests/e2e/teardown.cjs` — criação e limpeza de schema
-   `tests/e2e/factories/*` — factories para criar dados de teste
-   `tests/e2e/helpers/request.js` — wrapper para `supertest(app)`
-   `tests/e2e/*.test.js` — testes (ex.: `health.test.js`, `poi.test.js`, `proximity.test.js`)

---

## CI (GitHub Actions)

-   O repositório inclui um workflow (se habilitado) que sobe um serviço MySQL, cria `.env.test`, aguarda o serviço e executa `npm run test:e2e`.
-   Se usar migrations, adicione um passo no workflow para executá-las antes dos testes.

---

## Boas práticas e dicas

-   Comece com testes simples (ex.: `GET /health`) para validar a infraestrutura de testes.
-   Mantenha os testes independentes: use `TRUNCATE TABLE` em `beforeEach` ou transações + rollback.
-   Evite testes que dependam de portas fixas (ajuste `docker-compose.yml` se necessário).
-   Em ambientes ESM (imports), Jest pode exigir `NODE_OPTIONS=--experimental-vm-modules` ou configuração adicional.

---

## Contribuindo

-   Abra issues para bugs ou melhorias.
-   Crie PRs pequenas e com descrições claras.

---

## Documentação 🔖

A API agora expõe uma documentação OpenAPI (Swagger UI):

-   **UI interativa**: `GET /docs` → interface visual com todos os endpoints
-   **Spec JSON**: `GET /docs.json` → arquivo OpenAPI em JSON

Abra `http://localhost:5000/docs` após iniciar a aplicação para navegar pelos endpoints e testar requisições.

---

## Licença

Este projeto está licenciado sob a licença padrão do repositório (ver `LICENSE`).
