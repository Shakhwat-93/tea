import styles from './Footer.module.css'
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.logo}>🍃 Healthy <strong>Healing</strong></div>
        <div className={styles.contact}>
          <p>📧 <a href="mailto:info@healthyhealing.com.bd">info@healthyhealing.com.bd</a></p>
        </div>
        <div className={styles.links}>
          <a href="#">Privacy Policy</a><a href="#">Terms & Conditions</a><a href="#">Refund Policy</a>
        </div>
        <p className={styles.copy}>
          © 2026 Healthy Healing. All rights reserved.<br/>
          Developed by <a href="https://shakhwatrasel.vercel.app/" target="_blank" rel="noopener noreferrer">Shakhwat Hossain Rasel</a>
        </p>
      </div>
    </footer>
  )
}
