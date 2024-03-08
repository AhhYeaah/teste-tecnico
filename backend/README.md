## Esse não é o melhor que eu posso fazer!!!

Tive apenas dois dias para realizar o frontend e o backend deste projeto, então algumas funcionalidades que eu sei implementar ficaram de fora (como cache e paginação, por exemplo).

## Considerações Iniciais

Algumas considerações em relação ao meu projeto é que eu tomei como uma chance de demonstrar o que eu sei. Então pode haver funcionalidades (como a factory dentro do getKnights) que estão prolixas, nesse caso eu estava utilizando da oportunidade pra mostrar algum conceito que tenho conhecimento.

Em relação aos testes, tratei de incluir alguns deles para dtos, mas nem todos eles tem por um motivo: testes demais diminuem consideravelmente o tempo de desenvolvimento.

## Descrição

Uma pequena API que utiliza Nestjs.

- Validação com joi
- Documentos da API com Swagger
- Design pattern
- Databases não relacionais com mongodb
- Serviços de loggers, jwt e hashing com injeção de dependências
- Testes automatizados com jest
- Guardas, decoradores, pipes e muito mais!
- Middlewares de segurança com helmet
- Compressão de respostas com compression

## Installation

```bash
$ npm install
```

## Setting enviroment variables

```
Change the name of the .env.example file to .env
```

## Setting up Docker (use sudo if you're using linux)

```bash
docker compose up
```

## Running the app

```bash
$ npm run start
```
