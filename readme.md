# Projeto Integração de Software <a name="unifaat-frontend-project"></a>

## 📑 Sumário

- [Instalação e Execução](#instalacao-e-execucao)
- [Entry point Command](#entry-point-command)
- [Acesse](#acesse)

---

## Instalação e Execução <a name="instalacao-e-execucao"></a>

### Siga os passos abaixo para rodar o projeto via Docker:

1. Clonar o repositório:

   ```sh
   git clone https://github.com/luan-tavares/unifaat-2026-is-bimestre01
   ```

2. Entrar na pasta do projeto:

   ```sh
   cd unifaat-2026-is-bimestre01
   ```

3. Criar o arquivo `.env` na raiz do projeto copiando o `.env.example`:

   ```sh
   cp .env.example .env
   ```

4. Instalar as dependências:

   ```sh
   npm install
   ```

5. Subir a aplicação com Docker Compose:

   ```sh
   docker compose up --build
   ```

---

## Entry point Command <a name="entry-point-command"></a>

Os comandos da aplicação ficam na pasta `app/Commands`.

Cada arquivo dentro dessa pasta representa um comando que pode ser executado pelo entry point de CLI da aplicação.

### Estrutura esperada

```txt
app/
└── Commands/
    └── MeuComando.js
```

### Executando um comando

```sh
node command [comando]
```

### Exemplo

Se existir um arquivo como:

```txt
app/Commands/TesteCommand.js
```

você pode executá-lo com:

```sh
node command TesteCommand
```

---

## Acesse <a name="acesse"></a>

- Servidor nginx: [http://localhost:8080](http://localhost:8080)

---
```