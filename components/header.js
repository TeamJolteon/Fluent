import styles from '../styles/Header.module.css'

export default function Header(props) {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>Language App</div>
      <ul className={styles.sections}>
        <li>Articles</li>
        <li>Vocab</li>
        <li>Flash Cards</li>
      </ul>
      <div className={styles.sign}>Sign In</div>
    </div>
  )
}