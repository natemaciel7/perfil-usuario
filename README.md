# Sistema de Perfis de Usuários

Este é um projeto fullstack simples de cadastro, edição, visualização e exclusão de perfis de usuários.
Desenvolvido com **React.js** no frontend e **Node.js + Express + MySQL** no backend.

## Funcionalidades
* Listar todos os usuários
* Cadastrar novo usuário (com foto de perfil)
* Editar perfil de usuário
* Visualizar detalhes do perfil
* Deletar usuário

## Tecnologias Utilizadas
* **Frontend:** React.js, Bootstrap
* **Backend:** Node.js, Express, MySQL
* **Upload de imagens:** `multer`

---

## Instruções para rodar localmente

### 1. Clone o repositório

```bash
https://github.com/seu-usuario/seu-repo.git
```

### 2. Instale as dependências

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd frontend
npm install
```

### 3. Banco de Dados

Configure um banco MySQL e crie a tabela `usuarios`:

```sql
CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  idade INT NOT NULL,
  rua VARCHAR(255),
  bairro VARCHAR(255),
  estado VARCHAR(255),
  biografia TEXT,
  foto VARCHAR(255)
);
```

Crie um arquivo `.env` dentro da pasta `backend` com os dados do seu banco:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=nome_do_banco
DB_PORT=3306
PORT=3001
```

### 4. Rodando os servidores

#### Backend

```bash
npm start
```

#### Frontend

```bash
npm start
```

O frontend roda na porta `3000` e o backend na `3001`.

---

## Upload de Imagens

As imagens de perfil são salvas localmente na pasta:

```
backend/uploads/
```

Essa pasta precisa existir e estar acessível. Verifique se existe e crie caso não:

```bash
mkdir backend/uploads
```

No backend, a pasta está exposta com:

```js
app.use("/uploads", express.static("uploads"));
```

---

## Deploy (planejado)

* Frontend: Vercel
* Backend: Render ou outro serviço compatível com Node.js + MySQL
* As imagens precisarão ser armazenadas em um bucket (como S3) ou em banco de dados base64 para funcionar online. Atualmente elas estão armazenadas localmente e funcionarão apenas em ambiente local.

---

## Autor

Projeto desenvolvido por \[Seu Nome].
