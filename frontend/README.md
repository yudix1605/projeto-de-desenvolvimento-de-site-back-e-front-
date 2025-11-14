
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# AP1 - Gerenciador de Tarefas (Entrega 1 - Backend)

## Descrição
Integrantes do projeto: Yuri Tito, Giovani Senna e  Enzo Scartezini
Projeto backend em Flask estruturado em MVC, com persistência em SQLite (SQLAlchemy), documentação Swagger e containerização Docker. Implementa `User` e `Task` com relacionamento 1:N.

## Estrutura do projeto
```
api_final/
├── app.py
├── config.py
├── models/
│   ├── __init__.py
│   ├── user.py
│   └── task.py
├── controllers/
│   ├── __init__.py
│   ├── user_controller.py
│   └── task_controller.py
├── views/
│   ├── __init__.py
│   └── routes.py
├── database.db (gerado ao rodar)
├── .env
├── requirements.txt
└── Dockerfile
```

## Como rodar (local)
1. Criar e ativar venv:
   ```bash
   python -m venv venv
   source venv/bin/activate   # linux/mac
   venv\Scripts\activate    # windows
   ```
2. Instalar dependências:
   ```
   pip install -r requirements.txt
   ```
3. Rodar a aplicação:
   ```
   export FLASK_APP=app.py
   export FLASK_ENV=development
   python app.py
   ```
   ou no Windows (PowerShell):
   ```
   set FLASK_APP=app.py
   set FLASK_ENV=development
   python app.py
   ```
4. A API ficará em `http://localhost:5000/` e a documentação Swagger em `http://localhost:5000/apidocs`

## Rotas principais
- `GET /` — Mensagem inicial
- `POST /users` — Criar usuário
- `GET /users` — Listar usuários
- `GET /users/<id>` — Obter usuário
- `PUT /users/<id>` — Atualizar usuário
- `DELETE /users/<id>` — Excluir usuário
- `POST /tasks` — Criar tarefa (associada a user_id)
- `GET /tasks` — Listar tarefas
- `GET /tasks/<id>` — Obter tarefa
- `PUT /tasks/<id>` — Atualizar tarefa
- `DELETE /tasks/<id>` — Excluir tarefa

## Diagrama ER (texto)
```
User (id PK, nome, email) 1 --- N Task (id PK, titulo, descricao, concluida, user_id FK)
```

## Docker
Build:
```
docker build -t ap1-gerenciador-tarefas .
docker run -p 5000:5000 ap1-gerenciador-tarefas
```

## Observações
- O arquivo `.env` contém variáveis de configuração. Troque `SECRET_KEY`.
- O banco `database.db` será criado automaticamente ao rodar a aplicação pela primeira vez.







<img width="1536" height="1024" alt="RE README" src="https://github.com/user-attachments/assets/599d7501-a7ab-49f0-a7d7-89070d83dfcb" />

