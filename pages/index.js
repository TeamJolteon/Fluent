import App from 'next/app'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from '../components/header.js';

export default function Home(props) {
  return (
    <div>
      <Header section={'Home'} />
    </div>
  )
}

export async function getServerSideProps() {
  return {
    props: {
      product: 'coffee'
    }
  }
}
