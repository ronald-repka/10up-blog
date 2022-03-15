import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/layout'
import PostArticle from '../../components/postArticle'
import { siteTitle } from '../../lib/config'

export default function Post(params) {
  return (
    <Layout>
      <Head>
        <title>{siteTitle} - {params.title.rendered}</title>
      </Head>
      <div itemScope itemType="https://schema.org/Blog">
        <PostArticle {...params} />
        <Link href="/">
          <a>← Back to home</a>
        </Link>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const resPosts = await fetch('https://js1.10up.com/wp-json/wp/v2/posts')
  const posts = await resPosts.json()
  const paths = posts.map(({ slug }) => ({
    params: {
      slug,
    }
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params, }) {
  const resPosts = await fetch('https://js1.10up.com/wp-json/wp/v2/posts')
  const posts = await resPosts.json()
  const post = posts.find(post => post.slug === params.slug)
  const resUsers = await fetch('https://js1.10up.com/wp-json/wp/v2/users/')
  const users = await resUsers.json()
  const authorName = users.find(user => user.id === post.author).name

  return {
    props: {
      ...post,
      authorName,
    }
  }
}