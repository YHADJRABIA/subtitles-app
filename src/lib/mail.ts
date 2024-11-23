import { websiteUrl } from '@/utils/general'
import nodemailer from 'nodemailer'

const {
  NODEMAILER_SENDER_EMAIL: sender,
  NODEMAILER_SENDER_EMAIL_PASSWORD: pass,
  NODEMAILER_SERVICE: service,
  EMAIL_VERIFICATION_TOKEN_LIFETIME_HOURS,
  PASSWORD_RESET_TOKEN_LIFETIME_HOURS,
} = process.env

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
  const verificationLink = `${websiteUrl}/${lang}/verify-email?token=${token}`

  const outgoingEmail = {
    title: 'Verify your email',
    content: `
    Hello,\r\n
    \r\n
    An account has been created using this email.\r\n
    Click <a href="${verificationLink}">this link</a> to verify your email.\r\n
    <b>This is link is only valid for ${EMAIL_VERIFICATION_TOKEN_LIFETIME_HOURS} hours.</b>
    \r\n
    This might not work with all browsers. If you experience an issue, please copy-paste <b>${verificationLink}</b> in your search bar.
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
      <b>Ce lien n'est valable que pendant ${EMAIL_VERIFICATION_TOKEN_LIFETIME_HOURS} heures.</b>
      \r\n
      Des problèmes d'incompatibilité de certains navigateurs peuvent survenir ; si c'est le cas, merci de copier-coller <b>${verificationLink}</b> sur votre barre de recherche.
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
  const resetLink = `${websiteUrl}/${lang}/password/reset?token=${token}`

  const outgoingEmail = {
    title: 'Reset your password',
    content: `
    Hello,\r\n
    \r\n
    A password reset has been requested for the account linked to this email.\r\n
    Click <a href="${resetLink}">this link</a> to reset your password.\r\n
    <b>This is link is only valid for ${PASSWORD_RESET_TOKEN_LIFETIME_HOURS} hours.</b>
    \r\n
    This might not work with all browsers. If you experience an issue, please copy-paste <b>${resetLink}</b> in your search bar.
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
      <b>Ce lien n'est valable que pendant ${PASSWORD_RESET_TOKEN_LIFETIME_HOURS} heures.</b>
      \r\n
      Des problèmes d'incompatibilité de certains navigateurs peuvent survenir ; si c'est le cas, merci de copier-coller <b>${resetLink}</b> sur votre barre de recherche.
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

export const sendEmailUpdateEmail = async (
  lang: string,
  email: string,
  code: string
) => {
  const outgoingEmail = {
    title: `Your email-update code — ${code}`,
    content: `
    Hello,\r\n
    \r\n
    An email update request has been created using this email.\r\n
    You will need to input the following code: <b>${code}</b> to validate this operation.
    <b>This code is only valid for ${EMAIL_VERIFICATION_TOKEN_LIFETIME_HOURS} hours.</b>
    `,
  }

  switch (lang) {
    case 'fr':
      outgoingEmail.title = `Votre code de mise à jour d'email — ${code}`
      outgoingEmail.content = ``
      /* TODO: complete */
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
