import nodemailer from 'nodemailer'
import Email from '../config/Email'

export default nodemailer.createTransport(Email)