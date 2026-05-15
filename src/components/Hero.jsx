import { useState, useEffect } from 'react'
import styles from './Hero.module.css'

const images = [
  '/b48106f2-6b69-47da-9e0b-086b27444ea0.webp',
  '/product-detail-1.webp',
  '/product-detail-2.webp',
  '/product-detail-3.webp',
  '/product-detail-4.webp',
  '/product-detail-5.webp',
  '/product-detail-6.webp',
  '/product-detail-7.webp',
  '/product-detail-8.webp',
  '/product-detail-9.webp',
  '/product-detail-10.webp',
  '/product-detail-11.webp',
  '/product-detail-12.webp'
]

export default function Hero() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(c => (c + 1) % images.length)
    }, 3500)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className={styles.hero}>
      <div className={styles.overlay} />
      <div className={styles.container}>
        <div className={styles.text}>
          <div className={styles.tag}>✦ ১০০% ন্যাচারাল &nbsp;•&nbsp; কোরিয়ান ফর্মুলা &nbsp;•&nbsp; নো সাইড-ইফেক্ট ✦</div>
          <h1>ক্লান্তিহীন দিন আর আত্মবিশ্বাসী রাতের জন্য—<br /><span>ফিরে পান আপনার 'প্রাইম এনার্জি'!</span></h1>
          <p>জিনসেং, মাকা রুট এবং গোজি বেরি সমৃদ্ধ প্রিমিয়াম এনার্জি টি। সারাদিনের স্ট্রেস দূর করুন এবং ব্যক্তিগত জীবনে ফিরিয়ে আনুন হারিয়ে যাওয়া স্পার্ক।</p>
          <a href="#order" className={`btn-primary ${styles.heroCta}`}>🛒 অর্ডার করুন — ক্যাশ অন ডেলিভারি</a>
          <div className={styles.badges}>
            <span>✓ ১০০% ন্যাচারাল</span>
            <span>✓ প্রিমিয়াম কোয়ালিটি</span>
            <span>✓ হোম ডেলিভারি</span>
          </div>
        </div>
        <div className={styles.imgWrap}>
          <div className={styles.slider}>
            {images.map((img, i) => (
              <img 
                key={i} 
                src={img} 
                alt={`Product detail ${i + 1}`} 
                className={`${styles.img} ${current === i ? styles.active : ''}`} 
              />
            ))}
          </div>
          <div className={styles.dots}>
            {images.map((_, i) => (
              <span 
                key={i} 
                className={`${styles.dot} ${current === i ? styles.dotActive : ''}`}
                onClick={() => setCurrent(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
