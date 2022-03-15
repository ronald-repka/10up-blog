import Head from 'next/head'
import Layout from '../components/layout'
import { siteTitle } from '../lib/config'

export default function About({ title, content, }) {
  return (
    <Layout>
      <Head>
        <title>{siteTitle} - About</title>
      </Head>
      <h1>
        {title.rendered}
      </h1>
      <div className="page" dangerouslySetInnerHTML={{__html: content.rendered}} />
    </Layout>
  )
}

export async function getStaticProps() {
  const res = await fetch('https://js1.10up.com/wp-json/wp/v2/pages')
  const pages = await res.json()
  const about = pages.find(element => element.slug === 'about-us')

  return {
    props: {
      ...about,
    }
  }
}