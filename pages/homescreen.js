import { getSession } from 'next-auth/client';
import styles from '../styles/Home.module.css';
import { signIn, signOut, useSession } from 'next-auth/client';
import Link from 'next/link';

export default function Homescreen({ user }) {
  const [session, loadingSession] = useSession();

  return (
    <div className={styles.container}>
      <span>
      <Link href='/flashcards'>
        <a>Flashcards</a>
      </Link>
      </span>
      <h1>Dashboard(Protected Route)</h1>
      <p>
        Welcome to dashboard: <b>{user.name}</b>
      </p>
      <p>{user.email}</p>

      {session && (
        <>
          <h4>You are logged as: {session.user.name}</h4>
          <div className={styles.boxCenter}>
            <h4>Email: {session.user.email}</h4>
            <br />
            {session.user.image && (
              <span>
                <img src={session.user.image} alt={session.user.name} />
              </span>
            )}
          </div>
          <br />
          <br />
          <button className={styles.primaryButton} onClick={() => signOut()}>
            Sign Out
          </button>
        </>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    context.res.writeHead(302, { Location: '/' });
    context.res.end();
    return {};
  }
  return {
    props: {
      user: session.user,
    },
  };
}
