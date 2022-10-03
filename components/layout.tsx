import Head from 'next/head'
import Image from 'next/image'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'

const name = 'Block Bit'
export const siteTitle = 'Block Bit'

export default function Layout({
  children,
  home
}: {
  children: React.ReactNode
  home?: boolean
}) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Well maintained trading bot"
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <nav>
        <div>
          <span className={utilStyles.heading2Xl}>{name}</span>
        </div>
        <ul>
          <li><Link href={`/trading`}>
            <a>Trading</a>
          </Link></li>
          {/* <li><Link href={`/exchanges`}>
            <a>Exchanges</a>
          </Link></li>*/}
        </ul>
      </nav>
      <header className={styles.header}>
        {home ? (
          <>
          </>
        ) : (
          <>

          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  )
}
