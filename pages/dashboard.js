import { createClient } from '@supabase/supabase-js';
import styles from '../styles/Dashboard.module.css';

export async function getServerSideProps() {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const { data: leads, error } = await supabase
    .from('leads')
    .select('*')
    .order('call_time', { ascending: false });

  if (error) {
    console.error('Dashboard Supabase error:', error.message);
    return { props: { leads: [], leadsThisWeek: 0, totalLeads: 0 } };
  }

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const leadsThisWeek = (leads ?? []).filter(
    (l) => new Date(l.call_time) >= oneWeekAgo
  ).length;

  return {
    props: {
      leads: leads ?? [],
      leadsThisWeek,
      totalLeads: leads?.length ?? 0,
    },
  };
}

export default function Dashboard({ leads, leadsThisWeek, totalLeads }) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.brand}>Fieldline</h1>
        <p className={styles.subtitle}>Lead Dashboard</p>
      </header>

      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <span className={styles.statNumber}>{leadsThisWeek}</span>
          <span className={styles.statLabel}>Leads this week</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statNumber}>{totalLeads}</span>
          <span className={styles.statLabel}>Total leads</span>
        </div>
      </div>

      <p className={styles.sectionTitle}>All leads</p>

      {leads.length === 0 ? (
        <p className={styles.empty}>No leads yet — missed calls will appear here.</p>
      ) : (
        <div className={styles.grid}>
          {leads.map((lead) => (
            <LeadCard key={lead.id} lead={lead} />
          ))}
        </div>
      )}
    </div>
  );
}

function LeadCard({ lead }) {
  const formatted = new Date(lead.call_time).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <div className={styles.card}>
      <div className={styles.cardTop}>
        <span className={styles.phone}>{lead.caller_number}</span>
        <span className={`${styles.badge} ${lead.sms_sent ? styles.badgeGreen : styles.badgeRed}`}>
          {lead.sms_sent ? 'SMS sent' : 'SMS failed'}
        </span>
      </div>

      <p className={styles.time}>{formatted}</p>

      <hr className={styles.divider} />

      <div className={styles.reply}>
        {lead.reply_text ? (
          <>
            <span className={styles.replyLabel}>Reply:</span>
            {lead.reply_text}
          </>
        ) : (
          <span className={styles.noReply}>No reply yet</span>
        )}
      </div>
    </div>
  );
}
