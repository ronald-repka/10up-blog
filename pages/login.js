import Head from 'next/head'
import Layout from '../components/layout'
import LoginForm from '../components/loginForm'
import { siteTitle } from '../lib/config'

export default function Login() {
  return (
    <Layout>
      <Head>
        <title>{siteTitle} - Login</title>
      </Head>
      <h1>
        Login
      </h1>
      <LoginForm />
    </Layout>
  )
}

export async function getStaticProps() {

  return {
    props: {
      
    }
  }
}