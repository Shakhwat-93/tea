import styles from './Navbar.module.css'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <>
      <div className={styles.announce}>
        🎉 সীমিত সময়ের অফার! আজই অর্ডার করুন &nbsp;|&nbsp; 🚚 সারা বাংলাদেশে হোম ডেলিভারি
      </div>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.inner}>
          <div className={styles.logo}>🍃 Healthy <strong>Healing</strong></div>
          <a href="#order" className={styles.cta}>🛒 অর্ডার করুন</a>
        </div>
      </nav>
    </>
  )
}
