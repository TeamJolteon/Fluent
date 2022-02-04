import styles from '../styles/Header.module.css';
import { signOut } from 'next-auth/client';
import Link from 'next/link';

export default function Header(props) {
  const logoutHandler = () => {
    signOut();
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
      <div className={styles.logo}>
          <Link href='../userportal'>Fluent</Link>
        </div>
        {props.loggedin ? (
          <ul className={styles.sections}>
            <li>
              <Link href='../articles'>Articles</Link>
            </li>
            <li>
              <Link href='../vocab'>Vocab</Link>
            </li>
            <li>
              <Link href='../flashcards'>Flash Cards</Link>
            </li>
          </ul>
        ) : null}
        {props.loggedin ? (
          <div onClick={logoutHandler} className={styles.sign}>
            Sign Out
          </div>
        ) : null}
      </div>
    </div>
  );
}
