# NestJS + Sequilize + PostgreSQL + Docker

## Description

Sample of code, where was shown approach of development, using NestJS + TypeScript + Sequilize + PostgreSQL + Docker. There are realized simple validation, decorators, guards (from NestJS) and exceptions, developed simple DB with several entities with different relations between them and simple authentication (access token).

## Installation

```bash
$ npm install
```

## Running the app
### Before run
Before run you should create file .development.env (or .production.env) and fill it as provided sample .env-example file.

### Run the Docker 
The app wrapped by Docker. Command below launch application and database simultaneously.  
```bash
$ docker-compose up
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).


## License

Nest is [MIT licensed](LICENSE).
