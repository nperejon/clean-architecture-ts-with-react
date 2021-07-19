import React, { useState, useEffect } from 'react'
import Styles from './login-styles.scss'
import { Footer, FormStatus, Input, LoginHeader as Header, SubmitButton } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'
import { Validation } from '@/presentation/protocols/validation'
import { Authentication, UpdateCurrentAccount } from '@/domain/usecases'
import { Link, useHistory } from 'react-router-dom'

type Props = {
  validation: Validation
  authentication: Authentication
  updateCurrentAccount: UpdateCurrentAccount
}

const Login: React.FC<Props> = ({ validation, authentication, updateCurrentAccount }: Props) => {
  const history = useHistory()
  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
    email: '',
    password: ''
  })
  const [errorState, setErrorState] = useState({
    email: '',
    password: '',
    main: ''
  })

  useEffect(() => {
    const { email, password } = state
    const formData = { email, password }
    const emailError = validation.validate('email', formData)
    const passwordError = validation.validate('password', formData)
    setErrorState({
      ...errorState,
      email: emailError,
      password: passwordError
    })
    setState({
      ...state,
      isFormInvalid: !!emailError || !!passwordError
    })
  }, [state.email, state.password])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      if (state.isLoading || state.isFormInvalid) return
      setState({ ...state, isLoading: true })
      const account = await authentication.auth({ email: state.email, password: state.password })
      await updateCurrentAccount.save(account)
      history.replace('/')
    } catch (error) {
      setState({ ...state, isLoading: false })
      setErrorState({ ...errorState, main: error.message })
    }
  }

  return (
    <div className={Styles.loginWrap}>
      <Header />
      <Context.Provider value={{ state, setState, errorState }}>
        <form data-testid="form" className={Styles.form} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <SubmitButton text="Entrar" />
          <Link to="/signup" data-testid="signup" className={Styles.link}>Criar Conta</Link>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Login
