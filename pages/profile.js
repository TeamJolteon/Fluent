import Header from '../components/header';
import styles from '../styles/Profile.module.css';
import { useSession } from 'next-auth/client';

import { useEffect, useState } from 'react';
import { getSession, signOut } from 'next-auth/client';

export default function Profile(props) {

  const logoutHandler = () => {
    signOut();
  }

  const [session, loading] = useSession();

  if (loading) return <p>Loading...</p>;

  if (!session) return <p>You are not authenciated</p>;

  return (
    <div>
      <Header loggedin={true} />
      <div className={styles.container}>Welcome: {props.email}</div>
      <p>You are authenticated</p>
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