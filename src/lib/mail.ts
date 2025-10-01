import { websiteUrl } from '@/utils/general'
import nodemailer from 'nodemailer'

const {
  NODEMAILER_SENDER_EMAIL: sender,
  NODEMAILER_SENDER_EMAIL_PASSWORD: pass,
  NODEMAILER_SERVICE: service,
  EMAIL_VERIFICATION_TOKEN_LIFETIME_HOURS,
  EMAIL_VERIFICATION_CODE_LIFETIME_MINUTES,
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
    <b>This code is only valid for ${EMAIL_VERIFICATION_CODE_LIFETIME_MINUTES} minutes.</b>
    `,
  }

  switch (lang) {
    case 'fr':
      outgoingEmail.title = `Votre code de mise à jour d'email — ${code}`
      outgoingEmail.content = `
      Bonjour,\r\n
      \r\n
      Une demande de mise à jour de l'email a été créée avec cette adresse.\r\n
      Veuillez insérer le code suivant : <b>${code}</b> pour valider cette opération.
      <b>Ce code n'est valable que pendant ${EMAIL_VERIFICATION_CODE_LIFETIME_MINUTES} minutes.</b>
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

export const sendTwoFactorOTPEmail = async (
  lang: string,
  email: string,
  code: string
) => {
  const outgoingEmail = {
    title: `Your login code — ${code}`,
    content: `
    Hello,\r\n
    \r\n
    You have two-factor authentication enabled on your account.\r\n
    Please use the following code to complete your login: <b>${code}</b>\r\n
    <b>This code is only valid for ${EMAIL_VERIFICATION_CODE_LIFETIME_MINUTES} minutes.</b>\r\n
    \r\n
    If you did not request this login, please ignore this email and consider changing your password.
    `,
  }

  switch (lang) {
    case 'fr':
      outgoingEmail.title = `Votre code de connexion — ${code}`
      outgoingEmail.content = `
      Bonjour,\r\n
      \r\n
      Vous avez activé l'authentification à deux facteurs sur votre compte.\r\n
      Veuillez introduire le code suivant pour compléter votre connexion : <b>${code}</b>\r\n
      <b>Ce code n'est valable que pendant ${EMAIL_VERIFICATION_CODE_LIFETIME_MINUTES} minutes.</b>\r\n
      \r\n
      Si vous n'avez pas demandé cette connexion, veuillez ignorer cet email et changer votre mot de passe.
      `
      break

    default:
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
