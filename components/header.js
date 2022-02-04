import styles from '../styles/Header.module.css';
import { signOut } from 'next-auth/client';
import Link from 'next/link';

export default function Header(props) {
  const logoutHandler = () => {
    signOut();
  };
  const languages = ['fr', 'de', 'it', 'pt', 'es', 'sv'];
  const languagesFull = ['French', 'German', 'Italian', 'Portuguese', 'Spanish', 'Swedish'];
  const index = languagesFull.indexOf(props.language);
  const abbreviation = languages.splice(index, 1);
  const full = languagesFull.splice(index, 1);
  languages.unshift(abbreviation);
  languagesFull.unshift(full);

  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <div className={styles.logo}>Fluent</div>
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
          <div className={styles.flex}>
            <select className={styles.language_selector} onChange={(e) => { props.setLanguage(e.target.value); }}>
              {languagesFull.map((language, index) => {
                if (index === 0) {
                  return <option key={language} value={language} selected>{language}</option>
                } else {
                  return <option key={language} value={language}>{language}</option>
                }
              })}
            </select>
            <div onClick={logoutHandler} className={styles.sign}>
              Sign Out
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
