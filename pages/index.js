import App from 'next/app';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Header from '../components/header.js';
import axios from 'axios';
import { signIn, signOut, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { getSession } from 'next-auth/client';

export default function Home(props) {
  const [session, loading] = useSession();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signin, setSignin] = useState(true);
  const [currentSession, loadingSession] = useSession();

  async function submitSignin(e) {
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: false,
      email: email,
      password: password,
    });

    if (!result.error) {
      router.replace('/profile');
    }
  }

  function submitSignup(e) {
    e.preventDefault();
    const info = {
      email: email,
      password: password,
    };
    axios.post('/api/auth/signup', info).then((res) => {
      window.location.href = '/articles';
    });
  }

  if (loadingSession) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Header />

      {!currentSession && (
        <div className={styles.container}>
          <div className={styles.login}>
            <div className={styles.title}>Fluent</div>
            <div className={styles.flex}>
              <div
                onClick={() => {
                  setSignin(true);
                }}
                className={
                  signin
                    ? `${styles.option} ${styles.active}`
                    : `${styles.option}`
                }
              >
                Sign In
              </div>
              <div
                onClick={() => {
                  setSignin(false);
                }}
                className={
                  signin
                    ? `${styles.option}`
                    : `${styles.option} ${styles.active}`
                }
              >
                Sign Up
              </div>
            </div>
            <>
              <div
                className={styles.google}
                onClick={() =>
                  signIn('google', {
                    callbackUrl: 'http://localhost:3000/profile',
                  })
                }
              >
                Sign In With Google
              </div>
            </>
            <div className={styles.or}>or</div>
            <form className={styles['login-form']}>
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type='text'
                value={email}
              ></input>
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type='password'
              ></input>
              {signin ? (
                <button
                  onClick={(e) => {
                    submitSignin(e);
                  }}
                  type='submit'
                  className={styles.button}
                >
                  Sign In
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    submitSignup(e);
                  }}
                  type='submit'
                  className={styles.button}
                >
                  Sign Up
                </button>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session) {
    context.res.writeHead(302, { Location: '/userportal' });
    context.res.end();
    return {};
  }

  return {
    props: {
      login: false,
    },
  };
}
