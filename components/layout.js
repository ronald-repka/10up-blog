import Head from 'next/head'
import Header from './header'

export default function Layout({ children, }) {

  return (
    <div>
      <Head>
        <title>10up Blog</title>

        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="cleartype" content="on" />
      </Head>
      
      <Header />
      <main>{children}</main>
    </div>
  )
}
