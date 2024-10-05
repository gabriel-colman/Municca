# Projeto municca - Teste Prático para Desenvolvedor Full Stack

## Descrição

Este projeto é um teste prático para a posição de Desenvolvedor Back-End / Full Stack. O objetivo é criar uma API básica utilizando Node.js, Express e Prisma (sem banco de dados real), com funcionalidades de CRUD para Usuários e Documentos vinculados a usuários, além de uma camada opcional de autenticação JWT para proteger certas rotas.

O desafio consiste em desenvolver uma aplicação capaz de:
1. Extrair dados de faturas de energia elétrica.
2. Organizar esses dados em um banco de dados PostgreSQL.
3. Apresentar esses dados em uma aplicação web, por meio de uma API.

```bash
## Estrutura do Projeto
/projeto
 /client
  /src
   App.js       # Componente principal da aplicação React
   index.js     # Ponto de entrada da aplicação React
 /prisma
   schema.prisma # Definição do esquema de dados com Prisma (simulado em memória)
 server.js     # Servidor Node.js usando Express e Prisma
 server.test.js # Testes unitários para o servidor usando Jest e Supertest
 package.json  # Definições de dependências e scripts NPM
 README.md     # Documentação do projeto 
 ``` 


## Tecnologias Utilizadas

### Backend
- Node.js
- Express
- Prisma ORM
- PostgreSQL
- JWT para autenticação (opcional)

### Frontend
- React
- Axios

### Extração de Dados
- Python
- pdfplumber

### Testes
- Jest
- Supertest

## Pré-requisitos

- Node.js e npm instalados

## Configuração do Projeto


### Passo 1: Clonar o Repositório

git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio


### Passo 2:  Instalar as Dependências do Backend
```bash
npm install
```

### Passo 3: Configurar e Gerar o Prisma Client
Mesmo sem usar um banco de dados real, você precisa gerar o cliente Prisma para que o código funcione corretamente.
```bash	
npx prisma generate
npx prisma migrate dev --name init
```


### Passo 4: Iniciar o Servidor Backend
```bash	
npm start
```


### Passo 5: Instalar as Dependências do Frontend
```bash	
cd client
npm install
```

### Passo 6: Instale as dependências do frontend

1. Navegue até a pasta client:
cd client

2. Instale as dependências do frontend:

npm install

3. Inicie o frontend:

npm start

### Passo 7: Executar os Testes

Certifique-se de que o ambiente está configurado corretamente e rode os testes:

```bash
npm test

```


## Endpoints da API

### Usuários

- **GET /users** - Retorna todos os usuários.

- **POST /users** - Cria um novo usuário.

  **Corpo da requisição:**
  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com"
  }
  ```

  **Exemplo de resposta:**
  ```json
  {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "documents": []
  }
  ```

- **PUT /users/:id** - Atualiza um usuário.

  **Exemplo de URL:** `/users/1`

- **DELETE /users/:id** - Deleta um usuário.

### Documentos (Rotas Protegidas por JWT)

- **GET /documents** - Retorna todos os documentos.

- **POST /documents** - Cria um novo documento vinculado a um usuário.

  **Corpo da requisição:**
  ```json
  {
    "name": "Document 1",
    "status": "active",
    "userId": 1
  }
  ```

  **Exemplo de resposta:**
  ```json
  {
    "id": 1,
    "name": "Document 1",
    "status": "active",
    "userId": 1
  }
  ```

- **PUT /documents/:id** - Atualiza um documento.

  **Exemplo de URL:** `/documents/1`

- **DELETE /documents/:id** - Deleta um documento.

### Autenticação JWT

- **POST /login** - Gera um token JWT para acessar rotas protegidas.

  **Corpo da requisição:**
  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com"
  }
  ```

  **Exemplo de resposta:**
  ```json
  {
    "token": "seuTokenJWT"
  }
  ```

Para acessar as rotas protegidas (por exemplo, `/documents`), você deve incluir o token JWT no cabeçalho da requisição:

```bash
Authorization: Bearer seuTokenJWT
```

### Licença
Este projeto está licenciado sob a licença MIT. Consulte o arquivo LICENSE para obter mais informações.

Copie e cole o conteúdo acima no arquivo `README.md` do seu projeto. Se precisar de mais alguma coisa, estou à disposição para ajudar!
