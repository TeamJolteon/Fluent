import App from 'next/app'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from '../components/header.js';
import { signIn, signOut, useSession } from 'next-auth/client';


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
      password: password
    });

    if (!result.error) {
      router.replace('/profile');
    }
  };

  function submitSignup(e) {
    e.preventDefault();
    const info = {
      email: email,
      password: password
    };
    axios.post('/api/auth/signup', info)
      .then((res) => {
        window.location.href = '/articles';
      })
  };

  if (loadingSession) {
    return <p>Loading...</p>;
  }

  // return (
  //   <div className={styles.container}>
  //     <Head>
  //       <title>NextAuth Google Authentication</title>
  //       <link rel="icon" href="/favicon.ico" />
  //     </Head>

  //     <h1>Google Authentication with NextAuth </h1>

  //     {!currentSession && (
  //       <>
  //         <button className={styles.primaryButton} onClick={() => signIn("google", {callbackUrl: "http://localhost:3000/homescreen"})}>
  //           Sign In With Google
  //         </button>
  //       </>
  //     )}

  //     {currentSession && (
  //       <>
  //         <h4>You are logged as: {currentSession.user.name}</h4>
  //         <div className={styles.boxCenter}>
  //           <h4>Email: {currentSession.user.email}</h4>
  //           <br />
  //           {currentSession.user.image && (
  //             <span>
  //               <img src={currentSession.user.image} alt={currentSession.user.name} />
  //             </span>
  //           )}
  //         </div>
  //         <br />
  //         <br />
  //         <button className={styles.primaryButton} onClick={() => signOut()}>
  //           Sign Out
  //         </button>
  //       </>
  //     )}
  //     )
  return (
    <div>
      <Header />
      <div className={styles.container}>
        <div className={styles.login}>
          <div className={styles.title}>LanguageApp</div>
          <div className={styles.flex}>
            <div onClick={() => { setSignin(true); }} className={signin ? `${styles.option} ${styles.active}` : `${styles.option}`}>Sign In</div>
            <div onClick={() => { setSignin(false); }} className={signin ? `${styles.option}`: `${styles.option} ${styles.active}`}>Sign Up</div>
          </div>
          <div className={styles.google}>Sign In With Google</div>
          {!currentSession && (
        <>
          <button className={styles.primaryButton} onClick={() => signIn("google", {callbackUrl: "http://localhost:3000/homescreen"})}>
            Sign In With Google
          </button>
        </>
      )}
          <div className={styles.or}>or</div>
          <form className={styles['login-form']}>
            <input onChange={(e) => {setEmail(e.target.value)}} type="text" value={email}></input>
            <input onChange={(e) => {setPassword(e.target.value)}} type="password"></input>
            {signin ? <button onClick={(e) => {submitSignin(e); }} type="submit" className={styles.button}>Sign In</button> : <button onClick={(e) => {submitSignup(e); }} type="submit" className={styles.button}>Sign Up</button> }
          </form>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      login: false
    }
  }
}
