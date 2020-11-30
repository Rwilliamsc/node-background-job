import Queue from 'bull'
import redisConfig from '../config/Redis'

import * as jobs from '../jobs'

const queues = Object.values(jobs).map(job => ({
  bull: new Queue(job.key, redisConfig),
  name: job.key,
  handler: job.handler,
  options: job.option
}))

export default {
  queues,
  add(name, data) {
    const queue = this.queues.find(queue => queue.name === name)

    // adiciona o processo na fila
    return queue.bull.add(data, queue.options)
  },
  process() {
    return this.queues.forEach(queue => {
      queue.bull.process(queue.handler)

      queue.bull.on('failed', (job, err) => {
        console.log('Job Failed', queue.key, job.data)
        console.log(err);
      })
    })
  }
}