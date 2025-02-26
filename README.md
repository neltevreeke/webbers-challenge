### Run project

1. Clone project
2. Run `pnpm i`
3. Add an .env file in the root of the project, with the following config:

```
MEDUSA_ADMIN_ONBOARDING_TYPE=default
STORE_CORS=http://localhost:8000,https://docs.medusajs.com
ADMIN_CORS=http://localhost:5173,http://localhost:9000,https://docs.medusajs.com
AUTH_CORS=http://localhost:5173,http://localhost:9000,http://localhost:8000,https://docs.medusajs.com
REDIS_URL=redis://localhost:6379
JWT_SECRET=supersecret
COOKIE_SECRET=supersecret
DATABASE_URL=postgres://postgres:password@localhost/medusa
```

3. Run `docker compose up` (make sure Docker for Desktop has been installed)
4. Run migrations: `pnpm medusa db:migrate`
5. Create a test user: `pnpm medusa user --email <email> --password <password>`
6. Seed with some dummy data: `pnpm seed`
7. Start dev server: `pnpm dev`
8. Open the Medusa Admin at http://localhost:9000/app
