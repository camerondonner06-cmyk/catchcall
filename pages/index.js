import Layout from '../components/Layout';
import styles from '../styles/site.module.css';

const FEATURES = [
  {
    title: 'Instant text-back',
    text: 'Every missed call gets an automatic SMS reply within seconds — before the caller even hangs up.',
  },
  {
    title: 'Every lead captured',
    text: "No call slips through. Every caller is logged and followed up with, so you never wonder who you missed.",
  },
  {
    title: 'Works while you work',
    text: "Runs quietly in the background while you're on the job. Catchcall handles the first response for you.",
  },
];

export default function Home() {
  return (
    <Layout>
      <nav className={styles.nav}>
        <span className={styles.brand}>Catchcall</span>
      </nav>

      <section className={styles.hero}>
        <h1 className={styles.headline}>Never lose another job to a missed call.</h1>
        <p className={styles.subheading}>
          Catchcall instantly texts back every missed call so your customers reach you — not your competitor.
        </p>
      </section>

      <section className={styles.features}>
        {FEATURES.map((f) => (
          <div key={f.title}>
            <h3 className={styles.featureTitle}>{f.title}</h3>
            <p className={styles.featureText}>{f.text}</p>
          </div>
        ))}
      </section>
    </Layout>
  );
}
