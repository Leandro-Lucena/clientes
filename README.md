# Sistema de Gerenciamento de Clientes

## ✨ O Projeto

Aplicativo de cadastro de clientes feito com frontend em React + TypeScript e backend em Node.js + PostgreSQL. O sistema permite login autenticado, cadastro, edição e listagem de clientes, com opção para exportar em PDF uma lista de todos os clientes. Utilizado autenticação para proteção de rotas, e foi utilizado Docker para containerizar a aplicação.

## 🚀 Tecnologias Utilizadas

### Frontend:

- React + TypeScript
- Material UI
- React Router
- react-pdf (geração de PDF)
- Jest (testes unitários)

### Backend:

- Node.js + TypeScript
- Express
- TypeORM
- PostgreSQL
- JWT para autenticação e proteção de rotas

### DevOps:

- Docker
- Docker Compose

---

## 📌 API - Endpoints Disponíveis no Backend (porta 5000)

### Autenticação:

```
POST /login
→ Corpo: { username: string, password: string }
→ Retorna: token JWT
```

### Clientes (protegido com JWT):

```
GET /clients
→ Lista todos os clientes

POST /clients
→ Cria um novo cliente
→ Corpo: { name, email, phone, address }

PUT /clients/:id
→ Atualiza um cliente existente
→ Corpo: { name, email, phone, address }

DELETE /clients/:id
→ Remove um cliente existente
```

---

## ⚖️ Funcionalidades

### Autenticação

- Usuário fixo: `admin`
- Senha fixa: `admin`

### Cadastro de Clientes

- Campos: Nome, E-mail, Telefone, Endereço
- CRUD completo (criar, listar, editar, deletar)

### Listagem

- Tabela com dados dos clientes
- Botão para exportar a lista em PDF (via `react-pdf`)

---

## 📆 Instruções para Execução

### Requisitos:

- Node.js >= 18
- Docker

### Passos:

```bash
# Clone o repositório
git clone https://github.com/Leandro-Lucena/clientes

# Entre na pasta do repositório clonado
cd clientes

# Renomeie os arquivos de variáveis de ambiente de ".env.example" para ".env"
mv frontend/.env.example frontend/.env
mv backend/.env.example backend/.env

# Suba os containers
docker-compose up --build
```

### Acessar:

- Entre pelo navegador no endereço: http://localhost (ou http://localhost:80)
- Faça login com as credenciais: `usuário: admin, senha: admin`
- Agora cadastre, edite e exporte uma lista em PDF dos seus clientes.

---

## 🔧 Testes (Jest)

```bash
# Rodar testes no frontend
cd front-end
npm test
```

```bash
# Rodar testes no backend
cd back-end
npm test
```

---

## ✅ Concluindo...

Este projeto foi construido com foco em boas práticas de desenvolvimento full stack, integração entre frontend e backend, e organização de código escalável. A implementação de testes, autenticação JWT, exportação de PDF e containerização Docker demonstra o compromisso com qualidade, manutenção e facilidade de deploy. Sinta-se à vontade para contribuir, sugerir melhorias ou utilizá-lo como base para projetos futuros.
