- [Cross-Cutting Concerns](#cross-cutting-concerns)
    - [Logging:](#logging)
    - [Autenticação:](#autenticação)
    - [Error Handling](#error-handling)
    - [Validação](#validação)
    - [Cache - Lazy loading](#cache---lazy-loading)
    - [Testes (unitários e integração)](#testes-unitários-e-integração)

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


## Cross-Cutting Concerns

São aspectos de um sistema de software que afetam diversas partes do aplicativo e não são específicas de nenhum recurso ou lógica de negócios, mas ainda são essenciais para o comportamento geral do sistema.

#### Logging:

Este projeto utiliza [`Pino`](https://www.npmjs.com/package/pino) para registro.

Isso significa que temos um `Structured Logging` - envolve a captura de mensagens de registro em um formato padronizado, usando um esquema ou formato predefinido, como JSON ou XML.

```ts
export async function updateProductHandler({
  productId,
  values
}: UpdateProduct): Promise<void> {
  const product = await productRepository.findById(productId)

  if (!product) {
    log.warn('Produto com id não foi encontrado', productId)
    throw new NotFoundError('Produto não foi encontrado')
  }

  await productRepository.updateById(productId, values)
}
```

Este exemplo produzirá em formato `JSON`:

```json
{
  "timestamp": "2023-06-22 12:34:56",
  "level": "INFO",
  "message": "User logged in",
  "user_id": "steve_rogers",
  "source": "login-service"
}
```

#### Autenticação:

Verificação da identidade do usuário e controle de acesso em diversas partes do sistema.

- `Método de autenticação`: E-mail e senha; comparação de senhas; Social provider

Este método requer que a senha seja criptografada antes da criação de um usuário.

- `Método de Autorização`: JWT (`jsonwebtoken`) com `Cookie` transporte via HTTPS.

#### Error Handling

Precisamos prestar atenção em duas coisas:

1. `Error Handling` refere-se à forma como o `fastify` captura e processa erros que ocorrem de forma síncrona e assíncrona. O `fastify` vem com um manipulador de erros padrão, o `setErrorHandler`

2. Este projeto utiliza uma classe abstrata que estende a classe Error do JavaScript.

Aqui está um exemplo:

```ts
export abstract class CustomError extends Error {
  abstract statusCode: number

  constructor(message: string) {
    super(message)
  }

  abstract serializeErrors(): ResponseError[]
}
```

Dessa forma podemos criar a classe NotFoundError:

```ts
export class NotFoundError extends CustomError {
  statusCode = 404

  constructor(message: string) {
    super(message)
  }

  serializeErrors() {
    return [{ message: this.message }]
  }
}
```

O uso real:

```ts
export async function updateProductHandler({
  productId,
  values
}: UpdateProduct): Promise<void> {
  const product = await productRepository.findById(productId)

  if (!product) {
    log.warn('Produto com id não foi encontrado', productId)
    throw new NotFoundError('Produto não foi encontrado')
  }

  await productRepository.updateById(productId, values)
}
```

No `setErrorHandler`:

```ts
fastify.setErrorHandler((error, request, reply) => {
  if (error instanceof CustomError) {
    reply.status(error.statusCode).send({ errors: error.serializeErrors() })
  }
  reply.status(500).send({ ok: false })
})
```

#### Validação

Verificando a integridade dos dados ou restrições em vários locais. Decidi usar o Zod. Podemos usar as interfaces ZodInfer e ZodOutput para transformar diretamente a entrada em um modelo de domínio.

#### Cache - Lazy loading

Lazy loading, também conhecido como cache-aside, envolve a tentativa de ler primeiro do cache. Se as informações não estiverem no cache, isso é considerado um `cache miss` e o sistema lê do banco de dados. É chamado de "cache-aside" porque o cache fica ao lado do armazenamento de dados primário (como um banco de dados). A ideia principal é que o cache não gerencia ativamente os dados; em vez disso, o aplicativo é responsável por carregar os dados no cache quando necessário.

Exemplo:

```ts
function getCacheKey(id: number): string {
  return `product:${id}`
}

async function findById(id: number): Promise<Product | null> {
  const cached = await cache.get<Product>(getCacheKey(id))

  if (cached) return cached

  const product = await db.select().from(products).where(eq(products.id, id))

  if (product.length === 0) return null

  await cache.set(getCacheKey(id), product[0], 10 * 60)

  return product[0]
}
```

#### Testes (unitários e integração)

Este projeto utiliza `jest`, `supertest` e `testcontainers`. Podemos utilizar do ciclo de vida de testes do `jest` para iniciar ambientes com diferentes tipos.

Por exemplo, para testes de integração podemos automatizar os processo com `Global Setup` e assim podemos sempre iniciar o `testcontainers`.

Exemplo com `jest.integration.config.ts`

```ts
import config from './jest.config'

config.testMatch = ['**/*.test.ts']
config.globalTeardown = '<rootDir>/src/Tests/Integration/Config/Teardown.ts'
config.globalSetup = '<rootDir>/src/Tests/Integration/Config/GlobalSetup.ts'
config.coverageDirectory = './coverage/integration'

module.exports = config
```

Com testes unitários podemos ter uma configuração mais simples, envolvando apenas mocks:

```ts
it('Should call getUserByEmail with correct values', async () => {
  const { sut, userRepositoryStub } = createSut()
  const getUserByEmailSpy = jest.spyOn(userRepositoryStub, 'getUserByEmail')
  await sut.signIn(signInParamsMock)
  expect(getUserByEmailSpy).toHaveBeenCalledWith(signInParamsMock.email)
})
```
