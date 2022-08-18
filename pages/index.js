import Head from 'next/head'
import Image from 'next/image'
import styles from '../sass/Home.module.css'
import Layout from '../components/Layout'

export default function Home() {
  return (
   <Layout>
      <Head>
        <title>enRemembrance</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="summary of website" />
      </Head>

    <p>
      Title Page Content
    </p>
   </Layout>
  )
}
