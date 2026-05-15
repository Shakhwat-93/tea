import styles from './SuccessPage.module.css'

export default function SuccessPage({ onReset }) {
  return (
    <div className={styles.page}>

      {/* Soft background blobs */}
      <div className={styles.blob1} />
      <div className={styles.blob2} />

      <div className={styles.card}>

        {/* Animated checkmark */}
        <div className={styles.iconWrap}>
          <svg className={styles.checkCircle} viewBox="0 0 52 52">
            <circle className={styles.checkCircleBg} cx="26" cy="26" r="25" />
            <path className={styles.checkMark} fill="none" d="M14 27 l8 8 l16-16" />
          </svg>
        </div>

        {/* Bengali success text */}
        <h1 className={styles.title}>অর্ডার সফলভাবে হয়েছে! 🎉</h1>

        <p className={styles.subtitle}>
          আপনার অর্ডারটি আমাদের সিস্টেমে সফলভাবে রেজিস্টার হয়েছে।
        </p>

        <div className={styles.divider} />

        <div className={styles.steps}>
          <div className={styles.step}>
            <span className={styles.stepIcon}>📞</span>
            <div>
              <strong>কনফার্মেশন কল</strong>
              <p>আমাদের টিম শীঘ্রই আপনার সাথে যোগাযোগ করবে।</p>
            </div>
          </div>
          <div className={styles.step}>
            <span className={styles.stepIcon}>📦</span>
            <div>
              <strong>প্যাকেজিং ও ডেলিভারি</strong>
              <p>কনফার্মেশনের পর ২৪–৪৮ ঘণ্টার মধ্যে পণ্য পাঠানো হবে।</p>
            </div>
          </div>
          <div className={styles.step}>
            <span className={styles.stepIcon}>🏠</span>
            <div>
              <strong>হোম ডেলিভারি</strong>
              <p>সরাসরি আপনার দরজায় পৌঁছে দেওয়া হবে।</p>
            </div>
          </div>
        </div>

        <div className={styles.divider} />

        <p className={styles.note}>
          🙏 ধন্যবাদ আমাদের উপর বিশ্বাস রাখার জন্য। আপনার সুস্বাস্থ্যই আমাদের লক্ষ্য।
        </p>

        {/* Action Buttons */}
        <div className={styles.actions}>
          <button className={styles.btnPrimary} onClick={onReset}>
            🛒 আবার অর্ডার করুন
          </button>
          <button className={styles.btnSecondary} onClick={() => { onReset(); setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50) }}>
            🏠 হোমপেজে ফিরুন
          </button>
        </div>

        <div className={styles.brand}>🍃 Healthy <strong>Healing</strong></div>

      </div>
    </div>
  )
}
