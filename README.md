# Labenu | Desenvolvimento Web Full Stack


<p align="center">
  <img src="https://user-images.githubusercontent.com/59856574/86274338-e7bbd280-bba7-11ea-9b0f-312418c0c364.png"/>
</p>

## Projeto To do List

<p align="center">
  <img src="https://img.shields.io/static/v1?label=node&message=framework&color=green&style=for-the-badge&logo=NODE.JS"/>
  <img src="https://img.shields.io/static/v1?label=mysql&message=Banco%20de%20Dados%20&color=blue&style=for-the-badge&logo=MYSQL"/>
  <img src="http://img.shields.io/static/v1?label=License&message=MIT&color=green&style=for-the-badge"/>
  <img src="https://img.shields.io/static/v1?label=typescript&message=3.8.3&color=black&style=for-the-badge&logo=TYPESCRIPT"/>
  <img src="http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=RED&style=for-the-badge"/>
</p>

> Status do Projeto: Concluído :heavy_check_mark:


## Descrição do projeto 

<p align="justify">
  Para começar a explicar o nosso sistema vamos falar sobre os usuários. O cadastro deles deve ser simples, pedindo: um nome, um apelido (nickname) e um email.
</p>
<p align="justify">
   As tarefas são definidas por: título, descrição, data limite até a qual precisa ser feita, status e usuário pedinte (o que criou a tarefa). Existem os usuários responsáveis por uma tarefa, ou seja, aqueles que terão que executa-las. Mais de um usuário pode ser diretamente responsável de mesma tarefa. Os status das tarefas são 3: to do ("a fazer"), doing ("fazendo") e done ("feita").
</p>

## Funcionalidades

:heavy_check_mark: Criar usuário

:heavy_check_mark: Pegar usuário pelo id 

:heavy_check_mark: Editar usuário 

:heavy_check_mark: Criar tarefa 

:heavy_check_mark: Pegar tarefa pelo id 


## Pré-requisitos

:warning: [Node](https://nodejs.org/en/download/)

:warning: [MYSQL](https://www.mysql.com/downloads/)



## Como rodar a aplicação :arrow_forward:

No terminal, clone o projeto: 

```
git clone https://github.com/nauaramelo/labenu-to-do-list-backend.git
```
Entre no projeto e instale as dependências através do comando:
```
npm install
```
Suba a aplicação: 
```
npm start
```
Por último, crie um arquivo .env na raiz do projeto com as seguintes variáveis:
```
DB_HOST = 
DB_USER = 
DB_PASSWORD = 
DB_NAME = 
```

## Endpoints :end:

:black_small_square: Criar usuário

**Método**: POST

**Path**: `/user`

**Body**
```
{
	"name": "User",
	"nickname": "user",
	"email": "user@email.com"
}
```

:black_small_square: Pegar usuário pelo id

**Método**: GET

**Path**: `/user/:id`

**Path Param**: é o id do usuário

**Body de Resposta**:
```
{
	"id": "001",
	"nickname": "user"
}
```

:black_small_square: Editar Usuário

**Método**: PUT

**Path**: `/user/edit`

**Body**:
```
{
	"name": "User",
	"nickname": "user"
}
```

:black_small_square: Criar Tarefa

**Método**: POST

**Path**: `/task`

**Body**:
```
{
	"title": "Criar o readme do projeto",
	"description": "Devemos criar o readme dos projetos para uma melhor apresentação do projeto",
	"limitDate": "03/07/2020",
	"creatorUserId": "001"
}
```

:black_small_square: Pegar tarefa pelo id

**Método**: GET

**Path**: `/task/id`

**Path Param**: é o id da tarefa

**Body**:
```
{
  "taskId": "001",
	"title": "Criar o readme do projeto",
	"description": "Devemos criar o readme dos projetos para uma melhor apresentação do projeto",
	"limitDate": "03/07/2020",
	"status": "to_do",
	"creatorUserId": "001"
}
```


## JSON :floppy_disk:

### Usuários: 

|id|name|nickname|email|
| -------- |-------- |-------- |-------- |
|001|User|user|user@email.com|


## Linguagens, dependencias e libs utilizadas :books:

- [Node](https://nodejs.org/en/)
- [MYSQL](https://www.mysql.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [Knex](http://knexjs.org/)
- [Moment](https://momentjs.com/)

## Desenvolvedora/Contribuinte :octocat:

| [<img src="https://user-images.githubusercontent.com/59856574/86283681-d11d7780-bbb7-11ea-90a5-9312ee67cdec.jpg" width=115><br><sub>Nauara Melo</sub>](https://www.linkedin.com/in/nauara-melo-mayer-464a82135/) | 
| :---: |

## Licença 

[MIT License](https://github.com/nauaramelo/labenu-to-do-list-backend/blob/master/LICENSE)

Copyright :copyright: 2020 - To do List
