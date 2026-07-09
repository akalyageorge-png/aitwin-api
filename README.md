# aitwin-api
<!-- Backend access and add records to the Solutions table. -->
# aitwin-api

This project demonstrates a small API that connects to a PostgreSQL database hosted on Aiven and exposes CRUD endpoints for a "Products" resource. The API supports adding, listing, retrieving, and deleting products from the `products` table.

## Features
- Connects to a PostgreSQL instance on Aiven
- API endpoints for Products: create, list, get by id, delete

## Requirements
- Node.js (16+ recommended) or the runtime used by the project
- Access to an Aiven PostgreSQL instance

## Database
Create a `products` table with a simple schema. Example SQL:

```sql
CREATE TABLE products (
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	name TEXT NOT NULL,
	description TEXT,
	price NUMERIC(10,2) NOT NULL DEFAULT 0.00,
	created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

Note: If your Aiven Postgres does not include the `pgcrypto` extension (for `gen_random_uuid()`), enable it or use another UUID generation method:

```sql
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
```

## Configuration
Provide the Aiven Postgres connection via environment variables. Common variables:

- DATABASE_URL (preferred): postgres://user:password@host:port/dbname
- PGHOST, PGPORT, PGUSER, PGPASSWORD, PGDATABASE (optional individual vars)

Example .env:

```
DATABASE_URL=postgres://username:password@your-host.aivencloud.com:5432/yourdb
```

## API Endpoints
Assuming the server runs on http://localhost:3000 (adjust as needed):

- POST /products
	- Create a new product
	- Body (JSON): { "name": "Product A", "description": "...", "price": 9.99 }

- GET /products
	- List all products

- GET /products/:id
	- Get a single product by id

- DELETE /products/:id
	- Delete a product by id

Example curl requests:

Create:
```
curl -X POST http://localhost:3000/products \
	-H "Content-Type: application/json" \
	-d '{"name":"Widget","description":"Small widget","price":4.99}'
```

List:
```
curl http://localhost:3000/products
```

Get:
```
curl http://localhost:3000/products/<id>
```

Delete:
```
curl -X DELETE http://localhost:3000/products/<id>
```

## Implementation notes
- Use a PostgreSQL client (pg for Node.js) or an ORM/Query builder (Knex, Prisma) to connect using DATABASE_URL.
- Validate incoming requests and handle database errors appropriately.
- Use connection pooling and proper SSL settings required by Aiven (typically require SSL and a CA certificate). See Aiven docs for connection parameters.

## Testing
- Ensure your DATABASE_URL points to a test/dev database
- Run the server and exercise the endpoints with curl or a tool like Postman

## License
This project/demo has no license specified.

---
Generated README for Products API connecting to Aiven PostgreSQL.