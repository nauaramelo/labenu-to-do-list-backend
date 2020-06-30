import knex from "knex";
import dotenv from "dotenv";
import moment from 'moment';

dotenv.config();
moment.locale('pt-br')

const connection = knex({
  client: "mysql",
  connection: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || "3306"),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
});

//EXPRESS
import express, { Request, Response} from "express";
import { AddressInfo } from "net";

const app = express();

app.use(express.json());

const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
}); 

//1 - Criando Usuario

const createUser = async (name: string, nickname: string, email: string) => {
    const maxId = await getLastIdByTableName("ToDoListUser");
    const idUser = maxId ? maxId + 1 : 1;

    await connection
    .insert ({id: idUser, name: name, nickname: nickname, email: email})
    .into("ToDoListUser")
}

const getLastIdByTableName = async (tablename: string) => {
    const result = await connection(tablename).max('id as maxId').first()
    
    return result ? result.maxId : null;
}


app.put("/user", async (req: Request, res: Response) => {
    try {
        const name = req.body.name
        const nickname = req.body.nickname
        const email = req.body.email

        if (name && nickname && email) {
            await createUser(
                req.body.name,
                req.body.nickname,
                req.body.email
            )
            res.status(200).send()
        } else {
            res.status(400).send({message: 'Todos os campos são obrigatórios.'})
        }

    } catch (error) {
        res.status(400).send({message: error.message})
    }
})

//2 - Pegar usuario pelo id

const getUserById = async (id: string) => {
    return await connection('ToDoListUser')
    .select("*")
    .where('id', id).first();
}

app.get("/user/:id",async (req: Request, res: Response) => {
    const id = req.params.id

    try {

        if (id) {
            const user = await getUserById(
                req.params.id
            )
            
            if (user) {
                res.status(200).send(user)
            } else {
                res.status(400).send({message: 'Usuário não encontrado.'})
            }

        } else {
            res.status(400).send({message: 'Id é obrigatório.'})
        }
        
    } catch (error) {
        res.status(400).send({message: error.message})
    }
})


//3 - Editar Usuario

const updateUser = async (id: string, name: string, nickname: string, email: string) => {
    console.log(nickname)
    await connection ("ToDoListUser")
    .update({
        nickname: nickname,
        email: email,
        name: name
    })
    .where('id', id);
}

const changePropertiesUser = (changeProperties: any, user: any) => {
    if (changeProperties.name) {
        user.name = changeProperties.name
    }

    if(changeProperties.nickname) {
        user.nickname = changeProperties.nickname
    }

    if(changeProperties.email) {
        user.nickname = changeProperties.email
    }

    return user
}

app.post("/user/edit", async (req: Request, res: Response) => {
    try {
        const userRequest = {
            id: req.body.id,
            name: req.body.name,
            nickname: req.body.nickname,
            email: req.body.email
        }

        const user = await getUserById(userRequest.id)

        console.log(user)

        const userModified = changePropertiesUser(userRequest, user)
        
        await updateUser(userModified.id, userModified.name, userModified.nickname, userModified.email)

        res.status(200).send({message: 'Usuário Atualizado.'})
    } catch (error) {
        res.status(400).send({message: error.message})
    }
})

//4 - Criar tarefa

const createTask = async (title: string, description: string, limitDate: Date, creatorUserId: string) => {
    const maxId = await getLastIdByTableName("TodoListTask");
    const idTask = maxId ? maxId + 1 : 1

    await connection
    .insert({id: idTask, title: title, description: description, limit_date: limitDate, creator_user_id: creatorUserId})
    .into("TodoListTask")
}

app.put("/task", async (req: Request, res: Response) => {
    try {
        const title = req.body.title
        const description = req.body.description
        const limitDate = req.body.limitDate
        const creatorUserId = req.body.creatorUserId

        if (title && description && limitDate && creatorUserId) {
            await createTask(
                title,
                description,
                moment(limitDate, "DD/MM/YYYY").toDate(),
                creatorUserId
            )
            res.status(200).send()
        } else {
            res.status(400).send("Todos os campos são obrigatórios")
        }
    } catch (error) {
        res.status(400).send({message: error.message})
    }
})

//5 - Pegar tarefa pelo id

const getTaskById = async (id: string) => {
    return await connection('TodoListTask')
    .select('*')
    .where('id', id).first()
}

app.get("/task/:id", async (req: Request, res: Response) => {
    const idTask = req.params.id

    try {
        if(idTask) {
            const task = await getTaskById(
                req.params.id
            )

            if (task) {
               res.status(200).send(task) 
            } else {
                res.status(400).send({message: 'Tarefa não encontrada.'})
            }

        } else {
            res.status(400).send({message: 'Por favor, informe o id'})
        }
    } catch (error) {
        res.status(400).send({message: error.message})
    }
})