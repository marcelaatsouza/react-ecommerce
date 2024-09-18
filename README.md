# Projeto E-commerce com MongoDB, Express, React, Node. js. (MERN) e Vite
Este é um projeto fictício sem fins comerciais, que consiste em uma aplicação fullstack para uma loja virtual. A aplicação é dividida em três partes:

## Estrutura do Projeto
- **frontend/**: Contém o código-fonte do frontend da aplicação, desenvolvido em React.
- **backend/**: Contém o código-fonte do backend, desenvolvido em Node.js com Express.
- **admin/**: Contém o código-fonte do painel administrativo, desenvolvido com Vite.

## Pré-requisitos
Antes de começar, certifique-se de que você tem as seguintes ferramentas instaladas:

- [Node.js](https://nodejs.org/) (v14.x ou superior)
- [npm](https://www.npmjs.com/) (v6.x ou superior) ou [yarn](https://yarnpkg.com/) (opcional)

## Iniciando o Backend

1. Navegue até a pasta `backend/`:
   ```bash
   cd backend
2. Instale as dependências:
      ```bash
   npm install
3. Crie uma pasta `config` em backend:
   ```bash
   mkdir backend\config
4. Crie um arquivo `dbConfig.js` dentro da pasta config, e cole o código a seguir:
   ```bash
    // Substitua a URL abaixo pela sua própria string de conexão do MongoDB
    module.exports = {
        mongoURI: "mongodb+srv://<seu-usuario>:<sua-senha>@<seu-cluster>.mongodb.net/<seu-banco-de-dados>"
    };
3. Inicie o backend:
   ```bash
   npm start

## Iniciando o Frontend
1. Navegue até a pasta `frontend/`:
   ```bash
   cd frontend
2. Instale as dependências:
      ```bash
   npm install
3. Inicie o frontend:
      ```bash
   npm run dev

## Iniciando o Painel Administrativo
1. Navegue até a pasta `admin/`:
   ```bash
   cd admin
2. Instale as dependências:
      ```bash
   npm install
3. Inicie o frontend:
      ```bash
   npm start
