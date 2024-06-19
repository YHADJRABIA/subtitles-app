'use client'
import AuthForm from '@/components/Auth/AuthForm'
import { handleRegister } from '@/lib/auth/actions'
import React from 'react'

const RegisterPage = () => {
  return <AuthForm type="register" onSubmit={handleRegister} />
}

export default RegisterPage
