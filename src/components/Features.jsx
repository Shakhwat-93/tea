import styles from './Features.module.css'

const features = [
  { icon: '⚡', title: 'সারাদিনের ন্যাচারাল এনার্জি', desc: 'অলসতা ও ক্লান্তি দূর করে শরীরকে রাখে সতেজ ও চনমনে।' },
  { icon: '🔥', title: 'স্ট্যামিনা ও ভাইটালিটি', desc: 'মাকা রুট প্রাকৃতিকভাবে হরমোন ব্যালেন্স ও সহনশীলতা বাড়ায়।' },
  { icon: '🧠', title: 'মানসিক প্রশান্তি ও ফোকাস', desc: 'জিনসেং মানসিক চাপ কমায়, ব্রেনের কার্যক্ষমতা বৃদ্ধি করে।' },
  { icon: '🛡️', title: 'ইমিউনিটি বুস্ট', desc: 'অ্যান্টি-অক্সিডেন্টে ভরপুর, রক্ত সঞ্চালন স্বাভাবিক রাখে।' },
  { icon: '🌿', title: '১০০% ন্যাচারাল', desc: 'জিরো সুগার, জিরো কেমিক্যাল, কোনো পার্শ্বপ্রতিক্রিয়া নেই।' },
  { icon: '🇰🇷', title: 'কোরিয়ান ফর্মুলা', desc: 'বিশ্বমানের গবেষণায় প্রস্তুত প্রিমিয়াম হার্বাল ব্লেন্ড।' },
]

export default function Features() {
  return (
    <section className={styles.section} id="benefits">
      <div className={styles.container}>
        <span className="section-label">কেন বেছে নেবেন</span>
        <h2 className="section-title">Why You'll <span className="hl">Love It</span></h2>
        <div className="section-line" />
        <p className="section-desc">প্রকৃতির সেরা উপাদান দিয়ে তৈরি, বিজ্ঞানসম্মত ফর্মুলায় প্রস্তুত।</p>
        <div className={styles.grid}>
          {features.map((f, i) => (
            <div className={styles.card} key={i}>
              <div className={styles.iconBox}>{f.icon}</div>
              <div className={styles.cardText}>
                <h4>{f.title}</h4>
                <p>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
