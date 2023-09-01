# API Items-extension

Api desenvolvida para ser consumida pela seguinte aplicação: https://github.com/JorgeMalaquias/itens-extension-front.

## Tecnologias empregadas

- Prisma: foi escolhido devido a maior praticidade para criação do banco de dados, além de registro de atualizações no banco com as migrations.

- Docker: foi escolhido para o banco de dados MySql e a api em Node.js por praticidade, de modo que para rodar em uma máquina não é necessário ter estas tecnologias instaladas.

- Typescript: proporciona controle sobre tipagens de variáveis, o que evita erros inesperados, e também facilita o processo de desenvolvimento através do IntelliSense.

As tecnologias (Node.js, Typescript, Jest, MySql) eram requisitos mandatórios deste projeto.

## Rodando a aplicação

### Via Docker (recomendado)

É necessário ter Docker v.23 ou mais recentes instalado!

1. Baixar este repositório para sua máquina.
2. No diretório raíz do projeto, adicione um arquivo `.env`, com as seguintes variáveis de ambiente:  
   MYSQL_PASSWORD= **Pode ser qualquer string de sua preferência**  
   PORT=5000 **Precisa ser um número**    
   DATABASE_URL=mysql://root:`MYSQL_PASSWORD`@db:3306/itens_extension **A senhar logo após "root:" precisa ser igual ao valor da variável "MYSQL_PASSWORD"**    
   JWT_SECRET= **Pode ser qualquer string**
3. Se for a primeira vez que irá executar a aplicação e/ou se o container gerado for excluído em algum momento, para rodar execute primeiro, na pasta raíz do projeto `npm run build:docker`.
4. Agora, execute, ainda na pasta raíz, `npm run start:docker`.
5. Pronto, a API estará no ar e pronta para receber requisições.

### Rodando localmente

É necessário ter Node e Mysql instalados! Preferencialmente as versões mais recentes!

1. Baixar este repositório para sua máquina.
2. Execute o servidor do mysql em sua máquina, ele precisa estar disponível para conexões.
3. No diretório raíz do projeto, adicione um arquivo `.env`, com as seguintes variáveis de ambiente:
   `MYSQL_PASSWORD`= **Precisa ser a senha de acesso do Mysql instalado na sua máquina**  
   `PORT=` **Precisa ser um número**  
   `DATABASE_URL`=mysql://`user`:`password`@`host`:3306/itens_extension **Preencher com as informações de user, password, host de acordo com as configurações do mysql da sua máquina**  
   `JWT_SECRET`= **Pode ser qualquer string**
4. Para instalar as dependências execute o comando `npm i` na pasta raíz.
5. Para criar o banco de dados execute o comando `npx prisma migrate deploy`
6. Agora você pode obter por rodar em modo de desenvolvimento, neste caso execute `npm run dev` sempre que quiser rodar a aplicação. Ou se preferir rodar em produção, será necessário primeiro buildar a api. Para isso execute `npm run build`, e após isso sempre que quiser rodar a aplicação, execute `npm start`.

## Rodando testes

### Via Docker (recomendado)

É necessário ter Docker v.23 ou mais recentes instalado!

1. Baixar este repositório para sua máquina, se já não o tiver feito.
2. No diretório raíz do projeto, adicione um arquivo `.env.test`, com as seguintes variáveis de ambiente:
   `MYSQL_PASSWORD`= **Pode ser qualquer string de sua preferência**  
   `PORT=` **Precisa ser um número**
   `DATABASE_URL`=mysql://root:`MYSQL_PASSWORD`@db:3306/itens\*extension **A senhar logo após "root:" precisa ser igual ao valor da variável `MYSQL_PASSWORD`**  
   `JWT_SECRET`= **Pode ser qualquer string**  
3. Se for a primeira vez que irá executar a aplicação e/ou se o container gerado for excluído em algum momento, para rodar execute primeiro, na pasta raíz do projeto `npm run test:docker:build`.
4. Agora, execute, ainda na pasta raíz, `npm run test:docker`.
5. Pronto, os testes serão executados e exibidos.

### Rodando testes localmente

É necessário ter Node e Mysql instalados! Preferencialmente as versões mais recentes!

1. Baixar este repositório para sua máquina, se já não o tiver feito.
2. Execute o servidor do mysql em sua máquina, ele precisa estar disponível para conexões.
3. No diretório raíz do projeto, adicione um arquivo `.env`, com as seguintes variáveis de ambiente:
   `MYSQL_PASSWORD`= **Precisa ser a senha de acesso do Mysql instalado na sua máquina**  
   `PORT=` **Precisa ser um número**  
   `DATABASE_URL`=mysql://`user`:`password`@`host`:3306/itens\*extension **Preencher com as informações de user, password, host de acordo com as configurações do mysql da sua máquina**  
   `JWT_SECRET`= **Pode ser qualquer string**  
4. Para instalar as dependências execute o comando `npm i` na pasta raíz.
5. Para criar o banco de dados execute o comando `npx prisma migrate deploy`
6. Agora execute `npm test` sempre que quiser rodar os testes.

## Endpoints

### POST "/users"

Body da requisição tem que possuir os seguintes campos "email" e "password". Como exemplo abaixo:

```json
{
  "email": "joao@email.com",
  "password": "camisola"
}
```

### POST "/users/auth"

Body da requisição tem que possuir os seguintes campos "email" e "password". Como exemplo abaixo:

```json
{
  "email": "joao@email.com",
  "password": "camisola"
}
```

Em caso de sucesso no login, a api responderá com um token de autenticação!

### GET "/items"

É necessário encaminhar nos headers da requisição um header authorization no formato "Bearer _token_" como exemplo abaixo:

```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjkzNTk5MzYzLCJleHAiOjE2OTQyMDQxNjN9.tRg9yOIPlMP2DVaKbQB1B26dK53rE4TeIYnA16-yDBk"
}
```

Em caso de sucesso na autenticação, a API responderá com a lista de itens criados até o momento, conforme exemplo:

```json
[
  {
    "id": 1,
    "name": "some name",
    "description": "some description"
  },
  {
    "id": 2,
    "name": "some name",
    "description": "some description"
  },
  {
    "id": 3,
    "name": "some name",
    "description": "some description"
  },
  {
    "id": 4,
    "name": "some name",
    "description": "some description"
  }
]
```

### POST "/items"

É necessário encaminhar nos headers da requisição um header authorization no mesmo formato do exigido no endpoint GET "/items". O body da requisição precisa conter os campos "name" e "description",conforme exemplo.

```json
{
  "name": "some name",
  "description": "some description"
}
```
