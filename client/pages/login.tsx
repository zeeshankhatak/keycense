import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { post } from '@/utils/http'
import { toast } from 'react-toastify'
import Router from 'next/router'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mounted, setMounted] = useState(false);

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: SyntheticEvent): Promise<void> => {
    try {
      e.preventDefault();
      const resp = await post('/auth/login', JSON.stringify({username, password}))
      const loginResponse = await resp.json()
      localStorage.setItem('token', loginResponse.token)
      Router.push('/merchandise')
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    }
  };

  useEffect(() => {
    if (Boolean(localStorage.getItem('token'))) {
      Router.push('/merchandise')
    } else {
      setMounted(true)
    }
  }, [])

  return mounted ? (
    <Container className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
      <Form style={{width: '300px'}} onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicUsername" className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username" value={username} onChange={handleUsernameChange}/>
        </Form.Group>

        <Form.Group controlId="formBasicPassword" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter password" value={password} onChange={handlePasswordChange}/>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  ) : <>Loading...</>
}

export default Login
