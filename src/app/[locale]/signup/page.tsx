'use client'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { isEmpty, isValidEmail } from '@/utils/validators'
import { faAt, faLock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from './page.module.scss'
import Button from '@/components/UI/Button'
import ReCAPTCHA from 'react-google-recaptcha'
import { useShowPassword } from '@/hooks/useShowPassword'

const SignupPage = () => {
  const router = useRouter()
  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  const [isDisabled, setIsDisabled] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [passwordInputType, ToggleIcon] = useShowPassword()
  const [token, setToken] = useState<string | null>(null) // reCAPTCHA's token (sent to backend to be validated by Google)
  const reCaptchaRef = useRef<ReCAPTCHA>(null)

  const onSignup = async () => {
    try {
      setIsLoading(true)
      const response = await axios.post('/api/users/signup', user)
      console.log('Signup success', response.data)
      router.push('/login')
    } catch (error: any) {
      console.log('Signup failed', error.message)

      // TODO: Add error toast
    } finally {
      setIsLoading(false)
    }
  }

  const isValidUser = isValidEmail(user.email) && !isEmpty(user.password)

  useEffect(() => {
    setIsDisabled(!isValidUser || isLoading)
  }, [isValidUser])

  return (
    <>
      <form
        method="post"
        onSubmit={onSignup}
        noValidate
        className={styles.formCard}
      >
        <h1>Create account</h1>

        <div className={styles.wrapper}>
          <div className={styles.formField}>
            <div className={styles.fieldIcon}>
              <FontAwesomeIcon
                icon={faAt}
                style={{ fontSize: 14 }}
                title="Email" // TODO: rework this
              />
            </div>
            <input
              placeholder="email@domain.com"
              type="email"
              name="email"
              value={user.email}
              onChange={e => setUser({ ...user, email: e.target.value })}
              data-testid="login-email"
            />
            <label htmlFor="email">Email</label>
          </div>

          <div className={styles.formField}>
            <div className={styles.fieldIcon}>
              <FontAwesomeIcon
                icon={faLock}
                style={{ fontSize: 14 }}
                title="Password" // TODO: rework this
              />
            </div>
            <input
              placeholder={
                passwordInputType === 'password' ? '••••' : 'MyPa$$word_'
              }
              type={passwordInputType}
              name="password"
              value={user.password}
              onChange={e => setUser({ ...user, password: e.target.value })}
              data-testid="login-password"
            />
            <label htmlFor="password">Password</label>
            {/*          <div className={styles.ctaIcon}>
            <ToggleIcon />
          </div> */}
          </div>
          {/* 
          <div className={styles.recaptchaContainer}>
            <ReCAPTCHA
              size="normal"
              sitekey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_CLIENT}
              ref={reCaptchaRef}
              data-testid="contact-recaptcha"
              onChange={token => setToken(token)}
              onExpired={() => setToken(null)}
            />
          </div> */}
          <Button
            variation="primary"
            testId="submit-login-form"
            /*           isDisabled={isDisabled} */
            isLoading={isLoading}
          >
            Create account
          </Button>
        </div>
        <p>
          Already have an account? <Link href="/login"> Login here</Link>
        </p>
      </form>
    </>
  )
}

export default SignupPage
