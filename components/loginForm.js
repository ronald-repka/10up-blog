import Link from 'next/link'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import styles from './LoginForm.module.css'

export default function LoginForm() {
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  })
  const [cookies, setCookie] = useCookies(['jwt-username'])
  const username = cookies['jwt-username'] !== 'undefined' ? cookies['jwt-username'] : undefined
  const handleInputsUpdate = e => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    })
  }
  const logIn = async e => {
    e.preventDefault()
    const res = await fetch('https://js1.10up.com/wp-json/jwt-auth/v1/token', {
      method: 'POST',
      mode: 'cors',
      path: '/',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inputs)
    })
    const token = await res.json()
    const username = token['user_display_name']

    setCookie('jwt-username', username, { path: '/' })
  }

  return (
    <>
      {username
        ?
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        :
          <div className={styles.login}>
            <form method="post" onSubmit={logIn}>
              <div>
                <label htmlFor="username">Username</label>{' '}
                <input id="username" type="text" name="username" value={inputs.username} onChange={handleInputsUpdate} />
              </div>
              <div>
                <label htmlFor="password">Password</label>{' '}
                <input id="password" type="password" name="password" value={inputs.password} onChange={handleInputsUpdate} />
              </div>
              <div>
                <input type="submit" value="Submit" />
              </div>
            </form>
          </div>
      }
    </>
  )
}
