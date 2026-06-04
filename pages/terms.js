import Link from 'next/link';
import Layout from '../components/Layout';
import styles from '../styles/site.module.css';

export default function Terms() {
  return (
    <Layout>
      <nav className={styles.policyNav}>
        <Link href="/" className={styles.policyBackLink}>← Catchcall</Link>
      </nav>

      <h1 className={styles.policyHeading}>Terms &amp; Conditions</h1>
      <p className={styles.policyDate}>Last updated: June 2026</p>

      <div className={styles.policyBody}>
        <h2>Program name</h2>
        <p>Catchcall.</p>

        <h2>Description</h2>
        <p>
          Catchcall sends automated text replies to people who call a participating business and do
          not reach someone. The message acknowledges the missed call and asks how the business can
          help. Customers initiate contact by calling; messages are sent in response to that call.
        </p>

        <h2>Message frequency</h2>
        <p>Message frequency varies based on the number of calls and replies.</p>

        <h2>Message and data rates</h2>
        <p>Message and data rates may apply.</p>

        <h2>Opt out</h2>
        <p>
          Reply <strong>STOP</strong> at any time to opt out and stop receiving messages.
        </p>

        <h2>Help</h2>
        <p>
          Reply <strong>HELP</strong> for assistance, or contact us at{' '}
          <a href="mailto:hello@catchcall.app">hello@catchcall.app</a>.
        </p>

        <h2>Support</h2>
        <p>
          For support, contact{' '}
          <a href="mailto:hello@catchcall.app">hello@catchcall.app</a>.
        </p>

        <h2>Privacy</h2>
        <p>We do not share your information with third parties for marketing purposes.</p>
      </div>
    </Layout>
  );
}
