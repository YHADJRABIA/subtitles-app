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
    <b>This is link is only valid for 1 hour.</b>
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
      <b>Ce lien n'est valable que pendant 1 heure.</b>
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

export const sendPasswordResetEmail = async (
  lang: string,
  email: string,
  token: string
) => {
  const resetLink = `${websiteUrl}/password/reset?token=${token}`

  const outgoingEmail = {
    title: 'Reset your password',
    content: `
    Hello,\r\n
    \r\n
    A password reset has been requested for the account linked to this email.\r\n
    Click <a href="${resetLink}">this link</a> to reset your password.\r\n
    <b>This is link is only valid for 1 hour.</b>
    \r\n
    This might not work with all browsers. If you experience an issue, please copy-paste ${resetLink} in your search bar.
    `,
  }

  switch (lang) {
    case 'fr':
      outgoingEmail.title = 'Réinitialisation de mot de passe'
      outgoingEmail.content = `
      Bonjour,\r\n
      \r\n
      Une demande de réinitialisation de mot de passe a eu lieu pour le compte lié à ce courriel.\r\n
      Afin de réinitialiser votre mot de passe, merci de cliquer sur <a href="${resetLink}">ce lien</a>.\r\n
      <b>Ce lien n'est valable que pendant 1 heure.</b>
      \r\n
      Des problèmes d'incompatibilité de certains navigateurs peuvent survenir ; si c'est le cas, merci de copier-coller ${resetLink} sur votre barre de recherche.
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
