import styles from './ProblemSolution.module.css'

const problems = [
  'সারাদিন কাজের পর শরীর অতিরিক্ত ক্লান্ত ও দুর্বল লাগে',
  'মানসিক চাপে কাজে ফোকাস ধরে রাখতে কষ্ট হচ্ছে',
  'দাম্পত্য জীবনের বিশেষ মুহূর্তগুলো আকর্ষণ হারাচ্ছে',
  'ক্যাফেইন বা এনার্জি ড্রিংকে পার্শ্বপ্রতিক্রিয়া',
  'রোগ প্রতিরোধ ক্ষমতা দুর্বল, ঘন ঘন অসুস্থ হওয়া',
]
const solutions = [
  'সকাল থেকে রাত পর্যন্ত শক্তি ও কর্মচাঞ্চল্য বজায় থাকে',
  'ব্রেনের কার্যক্ষমতা ও ফোকাস উল্লেখযোগ্যভাবে বাড়ে',
  'স্ট্যামিনা ও ভাইটালিটি ফিরে পান সম্পূর্ণ ন্যাচারালি',
  'কোনো আর্টিফিশিয়াল উপাদান নেই, ১০০% হার্বাল',
  'ইমিউনিটি বুস্ট হয়, ভেতর থেকে সুস্থ থাকুন',
]

export default function ProblemSolution() {
  return (
    <section className={styles.section} id="problem">
      <div className={styles.container}>
        <span className="section-label">সমস্যা ও সমাধান</span>
        <h2 className="section-title">প্রতিদিনের দৌড়ঝাঁপে আপনি কি নিজের সেরাটা দিতে পারছেন?</h2>
        <div className="section-line" />
        <div className={styles.grid}>
          <div className={`${styles.card} ${styles.probCard}`}>
            <div className={styles.cardHead}><span className={styles.headIcon}>😟</span><h3>এখনকার সমস্যা</h3></div>
            <ul>
              {problems.map((p, i) => <li key={i}><span className={styles.x}>✗</span>{p}</li>)}
            </ul>
          </div>
          <div className={styles.vs}>VS</div>
          <div className={`${styles.card} ${styles.solCard}`}>
            <div className={styles.cardHead}><span className={styles.headIcon}>✅</span><h3>Healthy Healing-এর সমাধান</h3></div>
            <ul>
              {solutions.map((s, i) => <li key={i}><span className={styles.check}>✓</span>{s}</li>)}
            </ul>
          </div>
        </div>
        <div className={styles.note}>💡 বয়স বা স্ট্রেস নয়, আপনার শরীর খুঁজছে <strong>সঠিক পুষ্টি এবং রিফ্রেশমেন্ট!</strong></div>
      </div>
    </section>
  )
}
