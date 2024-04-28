import axios from 'axios'

// Returns true if input is empty or has whitespaces
export const isEmpty = (input: string): boolean => !input || !input.trim()

export const isValidEmail = (email: string): boolean => {
  const re =
    // eslint-disable-next-line
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

export const isPasswordLengthValid = (
  password: string,
  minLength: number
): boolean => {
  const re = new RegExp(`^(?=.*[a-zA-Z0-9])[a-zA-Z0-9]{${minLength},}$`)
  return re.test(password)
}

// Google reCAPTCHA validation (validating the frontend's generated token through Google's API)
export const validateHuman = async (token: string): Promise<boolean> => {
  const res = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.GOOGLE_RECAPTCHA_SECRET}&response=${token}`
  )
  return res.data.success // True if human user
}
