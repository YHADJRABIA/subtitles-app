'use client'
import AuthForm from '@/components/Auth/AuthForm'
import { handleRegister } from '@/actions/auth'
import React from 'react'

const RegisterPage = () => {
  return <AuthForm type="register" onSubmit={handleRegister} />
}

export default RegisterPage
