# Desafio VExpenses

Este projeto é baseado no desafio proposto pela VExpenses para a vaga de Desenvolvedor Junior

Algumas considerações pessoais:
Não estou satisfeito com a entrega deste forma, existem alguns pontos que estou ciente que precisam ser melhorados porem devido ao tempo que tinha (duas noites) acabei por optar a não implementar.
Algumas dessas melhorias seriam:
Validação com ValidationPipe no controller + criação de DTOs
Utilização de middleware para autenticação e para controle de logs
Implementação de testes para os services.
Utilização de um banco de dados mais robusto como o postgresql ou mysql, a principio iria utilizar json-db pela finalidade e baixa complexidade da api, porem tive que trocar para sqlite para utilizar funçoes basicas como autoincrement e outras relações entre as tabelas.

---

## Tecnologias Utilizadas

- **Node.js**
- **NestJS**
- **Sequelize**
- **SQLite**

---

## Rodando o Projeto

### 1. Instalar as Dependências

Após clonar o repositório do projeto, vá para o diretório do projeto no seu terminal e execute o seguinte comando para instalar as dependências:

npm install

Após instalar as dependências, iniciar o projeto com o comando:

npx nest start

Isso irá iniciar a API no localhost com a porta padrão 3000

### Endpoints

Aqui estão os endpoints disponíveis na API:

### 1. `GET /plano`

Recupera todos os planos cadastrados.

**Método**: `GET`

**Exemplo de resposta:200**

```json
[
  {
    "id": 1,
    "nome": "ccccc",
    "createdAt": "2025-01-17T01:51:51.868Z",
    "updatedAt": "2025-01-17T01:51:51.868Z"
  },
  {
    "id": 2,
    "nome": "ccccc",
    "createdAt": "2025-01-17T03:05:47.991Z",
    "updatedAt": "2025-01-17T03:05:47.991Z"
  }
]
```

### 2. `GET /plano/:id`

Recupera as informações de um plano de forma mais detalhada.
o historico retorna a operaçao que pode ser 1: Adição ou 2: Deleção.

**Método**: `GET`

**Exemplo de resposta:200**

```json
{
  "id": 1,
  "nome": "ccccc",
  "createdAt": "2025-01-17T01:51:51.868Z",
  "updatedAt": "2025-01-17T01:51:51.868Z",
  "produtos": [
    {
      "id": 1,
      "name": "produto1",
      "description": "aaaaaaaa",
      "createdAt": "2025-01-17T01:51:36.623Z",
      "updatedAt": "2025-01-17T01:51:36.623Z"
    },
    {
      "id": 3,
      "name": "produto3",
      "description": "aaaaaaaa",
      "createdAt": "2025-01-17T01:51:41.725Z",
      "updatedAt": "2025-01-17T01:51:41.725Z"
    },
    {
      "id": 4,
      "name": "produto4",
      "description": "aaaaaaaa",
      "createdAt": "2025-01-17T01:51:43.700Z",
      "updatedAt": "2025-01-17T01:51:43.700Z"
    }
  ],
  "historico": [
    {
      "id": 1,
      "idProduto": 1,
      "idPlano": 1,
      "operation": 1,
      "createdAt": "2025-01-17T01:51:51.885Z",
      "updatedAt": "2025-01-17T01:51:51.885Z"
    },
    {
      "id": 2,
      "idProduto": 2,
      "idPlano": 1,
      "operation": 1,
      "createdAt": "2025-01-17T01:51:51.900Z",
      "updatedAt": "2025-01-17T01:51:51.900Z"
    },
    {
      "id": 5,
      "idProduto": 2,
      "idPlano": 1,
      "operation": 2,
      "createdAt": "2025-01-17T01:55:38.342Z",
      "updatedAt": "2025-01-17T01:55:38.342Z"
    },
    {
      "id": 3,
      "idProduto": 3,
      "idPlano": 1,
      "operation": 1,
      "createdAt": "2025-01-17T01:51:51.917Z",
      "updatedAt": "2025-01-17T01:51:51.917Z"
    },
    {
      "id": 4,
      "idProduto": 4,
      "idPlano": 1,
      "operation": 1,
      "createdAt": "2025-01-17T01:51:51.932Z",
      "updatedAt": "2025-01-17T01:51:51.932Z"
    }
  ]
}
```

### 3. `POST /plano`

Adiciona um novo plano.

**Método**: `POST`
**Exemplo de requisicao:**

```json
{
  "name": "ccccc",
  "listaProdutos": [{ "id": 1 }, { "id": 2 }, { "id": 3 }, { "id": 4 }]
}
```

**Exemplo de resposta: 201**

```json
{
  "id": 2,
  "nome": "ccccc",
  "updatedAt": "2025-01-17T03:05:47.991Z",
  "createdAt": "2025-01-17T03:05:47.991Z"
}
```

### 4. `POST /plano/:id/produtos`

Adiciona um novo produto ou produtos ao plano, deve ser passado um array com os ids dos produtos.

**Método**: `POST`
**Exemplo de requisicao:**

```json
{
  "idsProduto": [1, 2, 3]
}
```

**Exemplo de resposta: 201**

```json
{
  "id": 1,
  "nome": "ccccc",
  "createdAt": "2025-01-17T01:51:51.868Z",
  "updatedAt": "2025-01-17T01:51:51.868Z"
}
```

### 5. `DELETE /plano/:id`

Deleta um plano.

**Método**: `DELETE`

**Exemplo de resposta: 200**

```json
{
  "message": "Plano deletado"
}
```

### 6. `DELETE /plano/:id/produtos/:idProduto`

Deleta um produto de um plano.

**Método**: `DELETE`

**Exemplo de resposta: 200**

```json
{
  "message": "Produto deletado"
}
```

### 7. `GET /produto`

Recupera todos produtos cadastrados

**Método**: `GET`

**Exemplo de resposta: 200**

```json
[
  {
    "id": 1,
    "name": "produto1",
    "description": "aaaaaaaa",
    "createdAt": "2025-01-17T01:51:36.623Z",
    "updatedAt": "2025-01-17T01:51:36.623Z"
  },
  {
    "id": 2,
    "name": "produto2",
    "description": "aaaaaaaa",
    "createdAt": "2025-01-17T01:51:39.699Z",
    "updatedAt": "2025-01-17T01:51:39.699Z"
  },
  {
    "id": 3,
    "name": "produto3",
    "description": "aaaaaaaa",
    "createdAt": "2025-01-17T01:51:41.725Z",
    "updatedAt": "2025-01-17T01:51:41.725Z"
  },
  {
    "id": 4,
    "name": "produto4",
    "description": "aaaaaaaa",
    "createdAt": "2025-01-17T01:51:43.700Z",
    "updatedAt": "2025-01-17T01:51:43.700Z"
  },
  {
    "id": 5,
    "name": "produto5",
    "description": "aaaaaaaa",
    "createdAt": "2025-01-17T01:51:45.786Z",
    "updatedAt": "2025-01-17T01:51:45.786Z"
  },
  {
    "id": 6,
    "name": "",
    "description": "aaaaaaaa",
    "createdAt": "2025-01-17T02:43:05.642Z",
    "updatedAt": "2025-01-17T02:43:05.642Z"
  }
]
```

### 8. `GET /produto/:id`

Recupera um produto especifico cadastrado

**Método**: `GET`

**Exemplo de resposta: 200**

```json
{
  "id": 2,
  "name": "produto2",
  "description": "aaaaaaaa",
  "createdAt": "2025-01-17T01:51:39.699Z",
  "updatedAt": "2025-01-17T01:51:39.699Z"
}
```

### 9. `POST /produto`

Cadastra um produto

**Método**: `POST`

**Exemplo de requisição**

```json
{
  "name": "ccccc",
  "description": "teste"
}
```

**Exemplo de resposta: 201**

```json
{
  "id": 2,
  "name": "produto2",
  "description": "aaaaaaaa",
  "createdAt": "2025-01-17T01:51:39.699Z",
  "updatedAt": "2025-01-17T01:51:39.699Z"
}
```

### 10. `POST /produto/:id`

Cadastra um produto

**Método**: `DELETE`

**Exemplo de resposta: 200**

```json
{
  "message": "Produto deletado"
}
```
