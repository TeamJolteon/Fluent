import styles from '../styles/Home.module.css';
import Header from '../components/header';
import { useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Login(props) {
  const [session, loading] = useSession();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [sigin, setSignin] = useState(true);
  
  async function submitSignin(e) {
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: false,
      email: email,
      password: password
    });

    if (!result.error) {
      router.replace('/profile');
    }
  };

  function submitSignup(e) {
    e.preventDefault();
    console.log('signing up!');
    const info = {
      email: email,
      password: password 
    };
    axios.post('/api/auth/signup', info)
      .then((res) => {
        console.log('yayyy!');
      })
  };

  const logoutHandler = () => {
    signOut();
  }

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <div className={styles.login}>
          <div className={styles.title}>LanguageApp</div>
          <div className={styles.flex}>
            <div onClick={() => { setSignin(true); }} className={sigin ? `${styles.option} ${styles.active}` : `${styles.option}`}>Sign In</div>
            <div onClick={() => { setSignin(false); }} className={sigin ? `${styles.option}`: `${styles.option} ${styles.active}`}>Sign Up</div>
          </div>
          <div className={styles.google}>Sign In With Google</div>
          <div className={styles.or}>or</div>
          <form className={styles['login-form']}>
            <input onChange={(e) => {setEmail(e.target.value)}} type="text" value={email}></input>
            <input onChange={(e) => {setPassword(e.target.value)}} type="password"></input>
            {sigin ? <button onClick={(e) => {submitSignin(e); }} type="submit" className={styles.button}>Sign In</button> : <button onClick={(e) => {submitSignup(e); }} type="submit" className={styles.button}>Sign Up</button> }
          </form>
        </div>
        {session ? <div onClick={logoutHandler} >Logout</div> : null }
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  return {
    props: {
      login: false
    }
  }
}
