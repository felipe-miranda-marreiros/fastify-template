| Categoria         | Variável                       | Valor Exemplo / Descrição                                               |
| ----------------- | ------------------------------ | ----------------------------------------------------------------------- |
| **Better Auth**   | `BETTER_AUTH_SECRET`           | Chave secreta da autenticação                                           |
|                   | `BETTER_AUTH_URL`              | `http://localhost:3000` – URL base da API de autenticação               |
|                   | `BETTER_AUTH_TRUSTED_ORIGINS`  | `http://localhost:5173` – Frontend confiável autorizado                 |
| **PostgreSQL**    | `POSTGRES_CONTAINER_NAME`      | `tp-db` – Nome do container do banco de dados                           |
|                   | `POSTGRES_USER`                | `myuser` – Nome de usuário do banco                                     |
|                   | `POSTGRES_PASSWORD`            | `mypassword` – Senha do banco                                           |
|                   | `POSTGRES_DB`                  | `mydatabase` – Nome do banco de dados                                   |
|                   | `POSTGRES_PORT`                | `5432` – Porta exposta do PostgreSQL                                    |
| **Conexão DB**    | `DATABASE_URL`                 | `postgresql://myuser:mypassword@tp-db:5432/mydatabase` – URL de conexão |
| **App**           | `APP_CONTAINER_NAME`           | `tp-app` – Nome do container da aplicação                               |
|                   | `APP_ENV`                      | `development` – Ambiente da aplicação                                   |
|                   | `APP_PORT`                     | `3000` – Porta do servidor da aplicação                                 |
| **JWT**           | `JWT_SECRET`                   | `jwt_secrect` – Chave secreta para geração de tokens JWT                |
| **PG Admin**      | `PGADMIN_CONTAINER_NAME`       | `tp-pgadmin` – Nome do container do PGAdmin                             |
|                   | `PGADMIN_DEFAULT_EMAIL`        | `admin@mail.com` – E-mail padrão de acesso                              |
|                   | `PGADMIN_DEFAULT_PASSWORD`     | `admin` – Senha padrão de acesso                                        |
|                   | `PGADMIN_PORT`                 | `5050` – Porta do PGAdmin                                               |
| **Redis**         | `REDIS_CONTAINER_NAME`         | `tp-redis` – Nome do container Redis                                    |
|                   | `REDIS_PORT`                   | `6379` – Porta Redis                                                    |
|                   | `REDIS_URL`                    | `redis://redis:6379` – URL de conexão Redis                             |
| **Redis Insight** | `REDIS_INSIGHT_CONTAINER_NAME` | `tp-insight` – Nome do container Redis Insight                          |
|                   | `REDIS_INSIGHT_PORT`           | `5540` – Porta Redis Insight                                            |
| **Permit.io**     | `PERMIT_CONTAINER_NAME`        | `tp-permit.io` – Nome do container Permit.io                            |
|                   | `PERMIT_TOKEN`                 | `permit_key_...` – Chave de acesso Permit.io                            |
|                   | `PERMIT_PDP`                   | `http://localhost:7766` – Endpoint PDP da autorização                   |
|                   | `PERMIT_PORT`                  | `7766` – Porta Permit.io                                                |
