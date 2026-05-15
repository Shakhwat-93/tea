import styles from './Pricing.module.css'

const packages = [
  { icon: '📦', name: 'Starter Pack', qty: '১০ প্যাক', desc: 'টেস্ট করার জন্য পারফেক্ট।', price: '৳ ৮৯০', save: null, best: false, id: 'starter' },
  { icon: '✨', name: 'Premium Value Pack', qty: '২০ প্যাক', desc: 'নিয়মিত ব্যবহারের জন্য সবচেয়ে জনপ্রিয়।', price: '৳ ১,৫৪০', save: 'সেভ করুন ২৪০ টাকা', best: true, id: 'premium' },
  { icon: '💎', name: 'Complete Wellness Pack', qty: '৩০ প্যাক', desc: '১ মাসের সম্পূর্ণ কোর্স।', price: '৳ ২,১৯০', save: 'সর্বোচ্চ ডিসকাউন্ট', best: false, id: 'complete' },
]

export default function Pricing() {
  return (
    <section className={styles.section} id="pricing">
      <div className={styles.container}>
        <span className="section-label">অফার</span>
        <h2 className="section-title">আপনার প্রয়োজন অনুযায়ী <span className="hl">প্যাকেজ</span> বেছে নিন</h2>
        <div className="section-line" />
        <p className="section-desc">ক্যাশ অন ডেলিভারিতে অর্ডার করুন — পণ্য পেয়ে টাকা দিন।</p>
        <div className={styles.grid}>
          {packages.map((p) => (
            <div className={`${styles.card} ${p.best ? styles.best : ''}`} key={p.id}>
              {p.best && <div className={styles.bestLbl}>👑 Best Seller!</div>}
              <div className={styles.ico}>{p.icon}</div>
              <h3>{p.name}</h3>
              <p className={styles.qty}>{p.qty}</p>
              <p className={styles.desc}>{p.desc}</p>
              <div className={styles.price}>{p.price}</div>
              {p.save && <div className={styles.save}>{p.save}</div>}
              <a href="#order" className={p.best ? styles.btnGold : styles.btnOutline}>অর্ডার করুন</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
