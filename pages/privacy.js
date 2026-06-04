import Link from 'next/link';
import Layout from '../components/Layout';
import styles from '../styles/site.module.css';

export default function Privacy() {
  return (
    <Layout>
      <nav className={styles.policyNav}>
        <Link href="/" className={styles.policyBackLink}>← Catchcall</Link>
      </nav>

      <h1 className={styles.policyHeading}>Privacy Policy</h1>
      <p className={styles.policyDate}>Last updated: June 2026</p>

      <div className={styles.policyBody}>
        <p>
          Catchcall ("we," "us") provides an automated missed-call text-back service for businesses.
          This policy explains what we collect and how we use it.
        </p>

        <h2>What we collect</h2>
        <p>
          When a person calls a business that uses Catchcall and the call is not answered, we collect
          the caller's phone number, the time of the call, and any text messages exchanged in response.
        </p>

        <h2>How we use it</h2>
        <p>
          We use this information solely to send an automated reply to the caller on behalf of the
          business and to give the business a record of the missed call and conversation.
        </p>

        <h2>Sharing</h2>
        <p>
          We do not sell your information. We do not share it with third parties for marketing
          purposes. Information is shared only with the business you contacted and with service
          providers strictly to deliver the service.
        </p>

        <h2>Message and data rates</h2>
        <p>Message and data rates may apply. Message frequency varies.</p>

        <h2>Opt out</h2>
        <p>Reply STOP at any time to stop receiving messages. Reply HELP for help.</p>

        <h2>Contact</h2>
        <p>
          For questions, contact us at{' '}
          <a href="mailto:hello@catchcall.app">hello@catchcall.app</a>.
        </p>
      </div>
    </Layout>
  );
}
