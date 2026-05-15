import styles from './StatsBar.module.css'
const stats = [
  { val: '৫০০০+', label: 'সন্তুষ্ট গ্রাহক' },
  { val: '১০০%', label: 'ন্যাচারাল উপাদান' },
  { val: '৪৮ ঘণ্টা', label: 'ডেলিভারি (ঢাকায়)' },
  { val: 'জিরো', label: 'সাইড ইফেক্ট' },
]
export default function StatsBar() {
  return (
    <div className={styles.bar}>
      <div className={styles.inner}>
        {stats.map((s, i) => (
          <div className={styles.item} key={s.label}>
            <strong>{s.val}</strong><span>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
