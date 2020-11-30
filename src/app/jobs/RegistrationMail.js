import Mail from "../lib/Mail"

export default {
  key: 'RegistrationMail',
  option: {
    delay: 5000
  },
  async handler ({ data }) {
    const { user } = data

    await Mail.sendMail({
      from: 'Teste <teste@teste.com.br>',
      to: `${user.name} <${user.email}>`,
      subject: 'Cadastro de Usuário',
      html:`<h1>Olá ${user.name}!</h1><br>Sua senha temporária é <b>${user.pass}</b>`
    })
  }

}