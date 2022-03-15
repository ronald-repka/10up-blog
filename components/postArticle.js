import Link from 'next/link'
import { dateFormatOptions } from '../lib/config'
import styles from './postArticle.module.css'

export default function PostArticle({ title, date, excerpt, content, authorName, slug, preview=false, }) {
  const dateAttribute = date.slice(0, 10)
  const dateObj = new Date(date)
  const dateDisplay = dateObj.toLocaleDateString('en-US', dateFormatOptions)

	return (
		<article itemScope itemType="http://schema.org/BlogPosting" className={styles.post}>
		  <header>
		    <h2 itemProp="headline">
		      {preview
		      	?
		      		<Link href={'/posts/'+ slug}>
		      		  <a>
		      		    {title.rendered}
		      		  </a>
		      		</Link>
		      	: title.rendered
		      }
		    </h2>
		    <div className={styles.date}>
		      <strong>Publish Date</strong>:{' '}
		      <span itemProp="datePublished">
		        <time dateTime={dateAttribute}>{dateDisplay}</time>
		      </span>
		    </div>
		    <div className={styles.author}>
		      <strong>Author</strong>:{' '}
		      <span itemProp="author">{authorName}</span>
		    </div>
		  </header>
		  <div itemProp="articleBody" className={styles.content}
		  	dangerouslySetInnerHTML={{__html: preview ? excerpt.rendered : content.rendered}}
		  />
		</article>
	)
}