import styles from './Ingredients.module.css'
const ings = [
  { icon: '🌿', name: 'জিনসেং', en: 'Ginseng', desc: 'এনার্জি ও স্ট্যামিনার রাজা। যুগ যুগ ধরে ব্যবহৃত।' },
  { icon: '🌱', name: 'মাকা রুট', en: 'Maca Root', desc: 'ন্যাচারাল হরমোন ব্যালেন্সার ও স্ট্যামিনা বুস্টার।' },
  { icon: '🍒', name: 'গোজি বেরি', en: 'Wolfberry', desc: 'সুপারফুড — রক্ত সঞ্চালন বাড়ায়, শরীর সতেজ রাখে।' },
  { icon: '🫐', name: 'মালবেরি ও লাল খেজুর', en: '', desc: 'অ্যান্টি-অক্সিডেন্টের উৎস, ইমিউনিটি বাড়ায়।' },
]
export default function Ingredients() {
  return (
    <section className={styles.section} id="ingredients">
      <div className={styles.container}>
        <span className="section-label">উপাদান</span>
        <h2 className="section-title">প্রকৃতির সেরা উপাদানের <span className="hl">প্রিমিয়াম ব্লেন্ড</span></h2>
        <div className="section-line" />
        <p className="section-desc">প্রতিটি উপাদান সাবধানে বাছাই করা হয়েছে সর্বোচ্চ গুণগত মান নিশ্চিত করে।</p>
        <div className={styles.grid}>
          {ings.map((ing, i) => (
            <div className={styles.card} key={i}>
              <div className={styles.ico}>{ing.icon}</div>
              <div>
                <h4>{ing.name} {ing.en && <span>{ing.en}</span>}</h4>
                <p>{ing.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.tags}>
          <span>✓ জিরো অ্যাডেড সুগার</span>
          <span>✓ আর্টিফিশিয়াল কালার মুক্ত</span>
          <span>✓ কেমিক্যাল মুক্ত</span>
        </div>
      </div>
    </section>
  )
}
