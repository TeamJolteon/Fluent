import Header from '../components/header';
import styles from '../styles/Profile.module.css';

import { useEffect, useState } from 'react';
import { getSession, signOut } from 'next-auth/client';

export default function Profile(props) {

  const logoutHandler = () => {
    signOut();
  }

  return (
    <div>
      <Header loggedin={true} />
      <div className={styles.container}>Welcome: {props.email}</div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({req: context.req});
  console.log(session);
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      email: session.user.email
    }
  }
}