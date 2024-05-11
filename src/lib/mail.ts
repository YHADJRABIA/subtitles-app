import { websiteUrl } from '@/utils/general'
import nodemailer from 'nodemailer'

const sender = process.env.NODEMAILER_SENDER_EMAIL
const pass = process.env.NODEMAILER_SENDER_EMAIL_PASSWORD
const service = process.env.NODEMAILER_SERVICE

const transporter = nodemailer.createTransport({
  service,
  auth: {
    user: sender,
    pass,
  },
})

export const sendVerificationEmail = async (
  lang: string,
  email: string,
  token: string
) => {
  const verificationLink = `${websiteUrl}/verify-email?token=${token}`

  const outgoingEmail = {
    title: 'Verify your email',
    content: `
    Hello,\r\n
    \r\n
    An account has been created using this email.\r\n
    Click <a href="${verificationLink}">this link</a> to verify your email.\r\n
    \r\n
    This might not work with all browsers. If you experience an issue, please copy-paste ${verificationLink} in your search bar.
    `,
  }

  switch (lang) {
    case 'fr':
      outgoingEmail.title = 'Vérifiez votre email'
      outgoingEmail.content = `
      Bonjour,\r\n
      \r\n
      Un compte a été créé avec ce courriel.\r\n
      Afin de finaliser la création de votre compte, merci de cliquer sur <a href="${verificationLink}">ce lien</a> pour vérifier votre courriel.\r\n
      \r\n
      Des problèmes d'incompatibilité de certains navigateurs peuvent survenir ; si c'est le cas, merci de copier-coller ${verificationLink} sur votre barre de recherche.
      `
      break

    default: // English
      break
  }

  await transporter.sendMail({
    from: sender,
    to: email,
    subject: outgoingEmail.title,
    text: outgoingEmail.content,
    html: outgoingEmail.content.replace(/\r\n/g, '<br>'),
  })
}
