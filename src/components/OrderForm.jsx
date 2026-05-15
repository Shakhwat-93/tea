import { useState } from 'react'
import { supabase } from '../supabaseClient'
import styles from './OrderForm.module.css'
import modalStyles from './DuplicateModal.module.css'

const packages = [
  { id: 'starter',  name: 'Starter Pack',          qty: '১০ প্যাক', price: 890,  img: '/b48106f2-6b69-47da-9e0b-086b27444ea0.webp', inStock: true },
  { id: 'premium',  name: 'Premium Value Pack',     qty: '২০ প্যাক', price: 1540, img: '/b48106f2-6b69-47da-9e0b-086b27444ea0.webp', inStock: true },
  { id: 'complete', name: 'Complete Wellness Pack',  qty: '৩০ প্যাক', price: 2190, img: '/f1a58b20-898f-4228-ac8e-e7e73b5d4f84.webp', inStock: true },
]

const DELIVERY = [
  { id: 'outside', label: 'ঢাকার বাইরে ডেলিভারি চার্জ:', charge: 120 },
  { id: 'inside',  label: 'ঢাকার ভিতরে ডেলিভারি চার্জ:', charge: 60  },
]

// Phones that bypass the rate-limit / duplicate block
const BYPASS_PHONES = ['01315183993', '01953986982']

// ── Duplicate-Order Modal ─────────────────────────────────────
function DuplicateModal({ onClose }) {
  return (
    <div className={modalStyles.overlay} onClick={onClose}>
      <div className={modalStyles.box} onClick={e => e.stopPropagation()}>
        <div className={modalStyles.icon}>⏳</div>
        <h3 className={modalStyles.title}>ডুপ্লিকেট অর্ডার!</h3>
        <p className={modalStyles.body}>
          আপনি গত <strong>৩ ঘণ্টার মধ্যে</strong> ইতিমধ্যে একটি অর্ডার করেছেন।<br />
          একই ফোন নম্বর বা ডিভাইস থেকে এই সময়ের মধ্যে পুনরায় অর্ডার করা সম্ভব নয়।
        </p>
        <p className={modalStyles.hint}>
          যদি মনে করেন এটি ভুল, তাহলে আমাদের সাথে সরাসরি যোগাযোগ করুন।
        </p>
        <button className={modalStyles.closeBtn} onClick={onClose}>
          ঠিক আছে, বুঝেছি
        </button>
      </div>
    </div>
  )
}

// ── Rate-limit helpers ────────────────────────────────────────
async function getClientIP() {
  try {
    const res = await fetch('https://api.ipify.org?format=json')
    const data = await res.json()
    return data.ip
  } catch {
    return null
  }
}

async function isDuplicate(phone, ip) {
  const threeHoursAgo = new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString()

  // 1️⃣ Check localStorage
  const lastOrderTime = localStorage.getItem('last_order_time')
  if (lastOrderTime && new Date(lastOrderTime) > new Date(threeHoursAgo)) {
    return true
  }

  // 2️⃣ Check phone in DB
  const { data: phoneRows } = await supabase
    .from('orders')
    .select('id')
    .eq('phone', phone)
    .gte('created_at', threeHoursAgo)
    .limit(1)

  if (phoneRows && phoneRows.length > 0) return true

  // 3️⃣ Check IP in DB
  if (ip) {
    const { data: ipRows } = await supabase
      .from('orders')
      .select('id')
      .eq('ip_address', ip)
      .gte('created_at', threeHoursAgo)
      .limit(1)

    if (ipRows && ipRows.length > 0) return true
  }

  return false
}

// ── Component ─────────────────────────────────────────────────
export default function OrderForm({ onSuccess }) {
  const [selected, setSelected]         = useState('starter')
  const [delivery, setDelivery]         = useState('inside')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showDupModal, setShowDupModal] = useState(false)

  const pkg    = packages.find(p => p.id === selected)
  const delObj = DELIVERY.find(d => d.id === delivery)
  const total  = (pkg?.price ?? 0) + delObj.charge

  const handleSubmit = async (e) => {
    e.preventDefault()
    const name    = e.target.name.value.trim()
    const address = e.target.address.value.trim()
    const phone   = e.target.phone.value.trim()

    if (!name || !address || !phone) {
      alert('সকল তথ্য পূরণ করুন')
      return
    }

    // ── Phone validation ──
    const phoneDigitsOnly = /^\d+$/.test(phone)
    const phoneStartsWith01 = phone.startsWith('01')
    const phoneIs11Digits = phone.length === 11

    if (!phoneDigitsOnly) {
      alert('ফোন নম্বরে শুধু সংখ্যা দিন, কোনো অক্ষর বা স্পেস দেওয়া যাবে না')
      return
    }
    if (!phoneStartsWith01) {
      alert('ফোন নম্বর অবশ্যই 01 দিয়ে শুরু হতে হবে')
      return
    }
    if (!phoneIs11Digits) {
      alert('ফোন নম্বর অবশ্যই ১১ ডিজিটের হতে হবে (যেমন: 01XXXXXXXXX)')
      return
    }

    setIsSubmitting(true)

    // ── Always capture IP for all orders ──
    const clientIP = await getClientIP()
    const isBypass = BYPASS_PHONES.includes(phone)

    // ── Rate-limit check (bypass for admin phones) ──
    if (!isBypass) {
      const duplicate = await isDuplicate(phone, clientIP)
      if (duplicate) {
        setIsSubmitting(false)
        setShowDupModal(true)
        return
      }
    }

    // ── Capture UTM / traffic source from URL ──
    const urlParams     = new URLSearchParams(window.location.search)
    const utmSource     = urlParams.get('utm_source') || null
    const utmMedium     = urlParams.get('utm_medium') || null
    const utmCampaign   = urlParams.get('utm_campaign') || null
    const trafficSource = utmSource
      ? `${utmSource}${utmMedium ? ' / ' + utmMedium : ''}${utmCampaign ? ' / ' + utmCampaign : ''}`
      : (document.referrer ? new URL(document.referrer).hostname : 'Direct')

    const generatedId  = 'ORD-' + Math.random().toString(36).substring(2, 10).toUpperCase()
    const shippingZone = delivery === 'outside' ? 'Outside dhaka' : 'Inside dhaka'

    const { error } = await supabase
      .from('orders')
      .insert([{
        id:             generatedId,
        customer_name:  name,
        phone:          phone,
        address:        address,
        product_name:   `Healthy Healing Tea - ${pkg.name}`,
        status:         'New',
        amount:         total,
        items:          1,
        shipping_zone:  shippingZone,
        ip_address:     clientIP || null,
        traffic_source: trafficSource,
        ordered_items: [{
          name:     `Healthy Healing Tea - ${pkg.name}`,
          quantity: 1,
          price:    pkg.price
        }]
      }])

    setIsSubmitting(false)

    if (error) {
      console.error('Error submitting order:', error)
      alert('দুঃখিত, অর্ডার কনফার্ম করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।')
    } else {
      // ── GA4 Purchase Event ──
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({ ecommerce: null }) // clear previous ecommerce object
      window.dataLayer.push({
        event: 'purchase',
        customer: {
          name:    name,
          phone:   phone,
          address: address,
        },
        ecommerce: {
          transaction_id: generatedId,
          value:          total,
          currency:       'BDT',
          shipping:       delObj.charge,
          shipping_zone:  shippingZone,
          items: [{
            item_id:   selected,
            item_name: `Healthy Healing Tea - ${pkg.name}`,
            price:     pkg.price,
            quantity:  1
          }]
        }
      })

      // Save timestamp so localStorage check also blocks within 3h
      localStorage.setItem('last_order_time', new Date().toISOString())
      onSuccess()
    }
  }



  return (
    <section className={styles.section} id="order">
      {showDupModal && <DuplicateModal onClose={() => setShowDupModal(false)} />}

      <div className={styles.wrap}>

        {/* ── PRODUCT CARDS ── */}
        <div className={styles.pkgGrid}>
          {packages.map(p => (
            <label
              key={p.id}
              className={`${styles.pkgCard} ${selected === p.id ? styles.pkgActive : ''} ${!p.inStock ? styles.pkgOut : ''}`}
              onClick={() => p.inStock && setSelected(p.id)}
            >
              <input type="checkbox" className={styles.cb} checked={selected === p.id} readOnly disabled={!p.inStock} />
              <img src={p.img} alt={p.name} className={styles.pkgImg} />
              <div className={styles.pkgInfo}>
                <span className={styles.pkgName}>{p.name}</span>
                <span className={styles.pkgQty}>{p.qty}</span>
              </div>
              {p.inStock
                ? <span className={styles.pkgPrice}>৳ {p.price.toLocaleString()}</span>
                : <span className={styles.stockOut}>STOCK OUT</span>
              }
            </label>
          ))}
        </div>

        {/* ── BOTTOM GRID: BILLING + ORDER SUMMARY ── */}
        <div className={styles.bottomGrid}>

          {/* Billing & Shipping */}
          <div className={styles.billing}>
            <h3 className={styles.colTitle}>Billing &amp; Shipping</h3>
            <form id="orderForm" onSubmit={handleSubmit}>
              <div className={styles.fg}>
                <label>আপনার নাম লিখুন <span className={styles.req}>*</span></label>
                <input name="name" placeholder="e.g. Hasan Mahmud" required />
              </div>
              <div className={styles.fg}>
                <label>আপনার ঠিকানা এলাকা, থানা, জেলা লিখুন <span className={styles.req}>*</span></label>
                <input name="address" placeholder="e.g. House 12, Road 4, Dhanmondi, Dhaka" required />
              </div>
              <div className={styles.fg}>
                <label>মোবাইল নাম্বার <span className={styles.req}>*</span></label>
                <input
                  name="phone"
                  type="tel"
                  placeholder="01XXXXXXXXX"
                  maxLength={11}
                  pattern="01[0-9]{9}"
                  inputMode="numeric"
                  onInput={e => e.target.value = e.target.value.replace(/\D/g, '').slice(0, 11)}
                  required
                />
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className={styles.summary}>
            <h3 className={styles.colTitle}>Your order</h3>
            <div className={styles.sumTable}>
              <div className={styles.sumHead}>
                <span>Product</span><span>Subtotal</span>
              </div>
              <div className={styles.sumRow}>
                <div className={styles.sumProduct}>
                  <img src={pkg?.img} alt={pkg?.name} className={styles.sumImg} />
                  <div>
                    <span className={styles.sumName}>{pkg?.name}</span>
                    <span className={styles.sumMeta}>× 1 &nbsp;|&nbsp; {pkg?.qty}</span>
                  </div>
                </div>
                <span className={styles.sumAmt}>৳ {pkg?.price.toLocaleString()}</span>
              </div>
              <div className={styles.divider} />
              <div className={styles.sumRowFlat}>
                <span>Subtotal</span><span>৳ {pkg?.price.toLocaleString()}</span>
              </div>
              <div className={styles.divider} />
              {DELIVERY.map(d => (
                <div className={styles.delRow} key={d.id}>
                  <label className={styles.delLabel}>
                    <span>{d.label} <strong className={styles.delPrice}>৳{d.charge}.00</strong></span>
                  </label>
                  <input
                    type="radio"
                    name="delivery"
                    className={styles.radio}
                    checked={delivery === d.id}
                    onChange={() => setDelivery(d.id)}
                  />
                </div>
              ))}
              <div className={styles.divider} />
              <div className={styles.totalRow}>
                <span>Total</span>
                <span className={styles.totalAmt}>৳ {total.toLocaleString()}</span>
              </div>
            </div>
            <button type="submit" form="orderForm" className={styles.submitBtn} disabled={isSubmitting}>
              {isSubmitting ? 'যাচাই করা হচ্ছে...' : '🔒 অর্ডার কনফার্ম করুন'}
            </button>
          </div>

        </div>
      </div>
    </section>
  )
}
