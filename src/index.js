import 'dotenv/config'
import express from 'express'
import usersController from './app/controller/usersController'

import { router, setQueues } from 'bull-board'
import Queue from './app/lib/Queue'

const app = express()
setQueues(Queue.queues.map(queue => queue.bull))

app.use(express.json())

app.post('/users', usersController.storage)
app.use('/admin/queues', router)

app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`)
})