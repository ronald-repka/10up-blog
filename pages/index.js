import Head from 'next/head'
import Layout from '../components/layout'
import PostArticle from '../components/postArticle'
import { siteTitle, dateFormatOptions } from '../lib/config'

export default function Home({ posts, users, }) {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div itemScope itemType="https://schema.org/Blog">
        {
          posts.map(post => {
            const authorName = users.find(user => user.id === post.author).name

            return <PostArticle {...post} authorName={authorName} key={post.id} preview />
          })
        }
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const resPosts = await fetch('https://js1.10up.com/wp-json/wp/v2/posts')
  const posts = await resPosts.json()
  const resUsers = await fetch('https://js1.10up.com/wp-json/wp/v2/users/')
  const users = await resUsers.json()

  return {
    props: {
      posts,
      users,
    }
  }
}
