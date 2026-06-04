import Link from 'next/link';
import styles from '../styles/site.module.css';

export default function Layout({ children }) {
  return (
    <div className={styles.page}>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <Link href="/privacy" className={styles.footerLink}>Privacy Policy</Link>
        <span className={styles.footerDot} aria-hidden="true">·</span>
        <Link href="/terms" className={styles.footerLink}>Terms &amp; Conditions</Link>
      </footer>
    </div>
  );
}
