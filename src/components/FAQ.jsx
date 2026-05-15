import { useState } from 'react'
import styles from './FAQ.module.css'

const faqs = [
  { q: 'এর কি কোনো সাইড ইফেক্ট আছে?', a: 'না, এটি ১০০% প্রাকৃতিক উপাদান (ভেষজ পাতা, ফল ও শেকড়) দিয়ে তৈরি। কোনো পার্শ্বপ্রতিক্রিয়া নেই।' },
  { q: 'মহিলারা কি এটি পান করতে পারবেন?', a: 'হ্যাঁ, নারী-পুরুষ উভয়েই শারীরিক শক্তি বৃদ্ধি এবং হরমোন ব্যালেন্সের জন্য নিশ্চিন্তে পান করতে পারবেন।' },
  { q: 'ডেলিভারি পেতে কতদিন লাগবে?', a: 'ঢাকার ভেতরে ২৪–৪৮ ঘণ্টা এবং ঢাকার বাইরে ২–৩ দিন।' },
  { q: 'কিভাবে অর্ডার করব?', a: 'উপরের অর্ডার ফর্মে আপনার নাম, মোবাইল নাম্বার ও ঠিকানা দিয়ে সাবমিট করুন। আমরা কনফার্মেশনের জন্য কল করব।' },
]

export default function FAQ() {
  const [open, setOpen] = useState(null)
  return (
    <section className={styles.section} id="faq">
      <div className={styles.container}>
        <span className="section-label">FAQ</span>
        <h2 className="section-title">সাধারণ <span className="hl">জিজ্ঞাসা</span></h2>
        <div className="section-line" />
        <p className="section-desc">আমাদের পণ্য সম্পর্কে সবচেয়ে বেশি জিজ্ঞেস করা প্রশ্নের উত্তর।</p>
        <div className={styles.list}>
          {faqs.map((f, i) => (
            <div className={`${styles.item} ${open === i ? styles.open : ''}`} key={i} onClick={() => setOpen(open === i ? null : i)}>
              <div className={styles.q}><span>{f.q}</span><span className={styles.ico}>{open === i ? '−' : '+'}</span></div>
              {open === i && <div className={styles.a}>{f.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
