import passwordGenerator from 'password-generator'
import Queue from '../lib/Queue'

export default {
  async storage(req, res) {
    const { name, email } = req.body

    const user = {
      name,
      email,
      pass: passwordGenerator(15, false)
    }

    await Queue.add('RegistrationMail', { user })
    res.json(user)
  }
}