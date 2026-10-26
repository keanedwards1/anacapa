import { useEffect, useRef, useState } from 'react'

const FALLBACK_CATALOG = [
  {
    slug: 'turning',
    name: 'Turning',
    detail: 'Carbide inserts for turning operations. Tell us what you need and what material you cut.',
  },
  {
    slug: 'milling',
    name: 'Milling',
    detail: 'Carbide inserts for milling applications. Tell us what you need and what material you cut.',
  },
]

const WHATSAPP = '14155210686'
const STEEL_MILLING_PHOTO = 'https://cdn.pixabay.com/photo/2016/01/13/14/12/milling-1137974_1280.jpg'
const BRASS_PARTS_PHOTO = 'https://cdn.pixabay.com/photo/2016/02/05/14/24/machine-1181046_1280.jpg'
const TURNING_VIDEO = 'https://videos.pexels.com/video-files/5846709/5846709-hd_1280_720_25fps.mp4'
const TURNING_POSTER = 'https://images.pexels.com/videos/5846709/pexels-photo-5846709.jpeg?auto=compress&dpr=1&h=750&w=1260'
const MILLING_VIDEO = 'https://videos.pexels.com/video-files/9033891/9033891-sd_640_360_24fps.mp4'
const MILLING_POSTER = 'https://images.pexels.com/videos/9033891/cnc-engineering-machining-manufacturing-9033891.jpeg?auto=compress&dpr=1&h=750&w=1260'

function AnacapaIcon({ name, size = 36 }) {
  const marks = {
    direct: <><path d="M6 39V20l10 6v-6l11 6v-6l15 7v12H6Z"/><path d="M12 20v-8h6v11m-4 11h3m5 0h3m5 0h3m5 0h1"/><path d="M10 39v-5h5v5m6 0v-5h5v5m6 0v-5h5v5"/></>,
    minimum: <><path d="m24 5 14 8-14 8-14-8 14-8Z"/><path d="m10 21 14 8 14-8M10 29l14 8 14-8"/><circle cx="24" cy="13" r="2"/><circle cx="24" cy="29" r="2"/></>,
    sample: <><path d="M8 15h32v20H8zM8 15l5-7h22l5 7"/><path d="m24 19 7 4-7 4-7-4 7-4Z"/><circle cx="24" cy="23" r="1.5"/><path d="M15 31h18"/></>,
    quote: <><path d="M12 6h18l7 7v29H12zM30 6v8h7"/><path d="M18 21h13M18 27h13M18 33h8"/><path d="m29 32 3 3 5-6"/></>,
    estimate: <><path d="M10 6h18l8 8v28H10zM28 6v8h8"/><path d="M16 19h8m-8 5h5"/><circle cx="29" cy="31" r="8"/><path d="M29 26v10m3-8c-.8-1-4-1.4-5.2.1-1.2 1.5.2 2.5 2.2 3.1s3.3 1.7 2.1 3.3c-1.2 1.5-4.4 1.2-5.2.1"/></>,
    quality: <><path d="m24 5 15 6v11c0 9-6 16-15 21C15 38 9 31 9 22V11z"/><path d="m16 24 5 5 11-12"/></>,
    value: <><path d="m7 14 7-7h18l9 9v18l-7 7H16L7 32z"/><circle cx="17" cy="17" r="2"/><path d="M27 18v13m3-10c-1-2-6-2-7 0-1 2 1 3 4 4s4 3 2 5c-1.5 2-6 2-8 0"/></>,
    globe: <><circle cx="24" cy="24" r="17"/><path d="M7 24h34M24 7c5 5.2 7.5 10.8 7.5 17S29 35.8 24 41c-5-5.2-7.5-10.8-7.5-17S19 12.2 24 7Z"/><path d="M11 14h26M11 34h26"/></>,
    turning: <><path d="M5 12h9v15H5zM14 16h15v7H14zM29 12h8v15h-8z"/><path d="M5 31h32M9 35h24M18 27v4m8-4v4"/><circle cx="9.5" cy="19.5" r="2"/><circle cx="33" cy="19.5" r="2"/></>,
    milling: <><path d="M20 6h8v8h-8zM18 14h12v12H18zM15 26h18"/><path d="m18 26-3 5 3 1-3 4m7-10-2 5 3 1-2 4m8-10 2 5-3 1 2 4"/><path d="M9 38h30"/></>,
    code: <><path d="M7 11h34v25H7z"/><path d="m18 16 6 7-6 7m11-1 6-12"/><path d="M3 17v13"/></>,
    review: <><path d="M10 7h22l7 7v29H10zM32 7v8h7"/><path d="M16 22h16M16 28h9"/><path d="m25 35 3 3 6-7"/></>,
  }

  return <svg aria-hidden="true" focusable="false" width={size} height={size} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{marks[name]}</svg>
}

function App() {
  const [catalog, setCatalog] = useState(FALLBACK_CATALOG)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuToggleRef = useRef(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [operation, setOperation] = useState('')

  useEffect(() => {
    const apiBase = import.meta.env.VITE_API_URL || ''
    fetch(apiBase + '/api/catalog')
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((data) => {
        if (Array.isArray(data.categories) && data.categories.length) setCatalog(data.categories)
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    function closeOnEscape(event) {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        menuToggleRef.current?.focus()
      }
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen])

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return

    document.documentElement.classList.add('motion-ready')
    const items = document.querySelectorAll('[data-reveal]')
    const revealGroups = new Map()
    items.forEach((item) => {
      const group = item.closest('section') || document
      const groupItems = revealGroups.get(group) || []
      groupItems.push(item)
      revealGroups.set(group, groupItems)
    })
    revealGroups.forEach((groupItems) => {
      groupItems.forEach((item, index) => {
        item.style.setProperty('--reveal-delay', Math.min(index, 4) * 55 + 'ms')
      })
    })
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -24px' })

    items.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const videos = document.querySelectorAll('[data-ambient-video]')
    if (!videos.length || !('IntersectionObserver' in window)) return

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (motionPreference.matches) {
          entry.target.pause()
        } else if (entry.isIntersecting) {
          entry.target.play().catch(() => {})
        } else {
          entry.target.pause()
        }
      })
    }, { threshold: 0.1, rootMargin: '120px 0px' })

    const syncMotionPreference = () => {
      if (motionPreference.matches) {
        observer.disconnect()
        videos.forEach((video) => video.pause())
      } else {
        videos.forEach((video) => observer.observe(video))
      }
    }

    syncMotionPreference()
    motionPreference.addEventListener('change', syncMotionPreference)

    return () => {
      observer.disconnect()
      motionPreference.removeEventListener('change', syncMotionPreference)
    }
  }, [])

  function sendQuoteRequest(event) {
    event.preventDefault()
    const message = [
      'Hi Anacapa, I’d like a quote for carbide inserts.',
      'Name: ' + name.trim(),
      'Email: ' + email.trim(),
      'Phone: ' + phone.trim(),
      'Insert type: ' + operation,
    ].filter(Boolean).join('\n')

    window.open(
      'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(message),
      '_blank',
      'noopener,noreferrer',
    )
  }

  return (
    <>
      <div className="utility-bar">
        <span>Carbide inserts for shops and distributors worldwide</span>
      </div>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Anacapa Industrial Supply home">
          <img src="/anacapa-logo.svg" alt="Anacapa Industrial Supply" />
        </a>
        <nav id="primary-navigation" className={menuOpen ? 'is-open' : ''} aria-label="Main navigation">
          <a href="#inserts" onClick={() => setMenuOpen(false)}>Turning and milling</a>
          <a href="#why-anacapa" onClick={() => setMenuOpen(false)}>Why Anacapa</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>
        <div className="header-actions">
          <a className="header-contact-item" href="#top" aria-label="Request a quote" onClick={() => setMenuOpen(false)}>
            <svg className="header-contact-icon" aria-hidden="true" focusable="false" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 4h10l5 5v19H9zM19 4v6h5M13 15h7M13 19h7M13 23h4"/><path d="m21 22 2 2 4-5"/></svg>
            <span className="header-contact-copy"><strong>Request a quote</strong><small>TURNING &amp; MILLING INSERTS</small></span>
          </a>
          <a className="header-contact-item" href="tel:+14155210686" aria-label="Call Anacapa today at 415 521 0686">
            <svg className="header-contact-icon" aria-hidden="true" focusable="false" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 5h5l2 6-3 2a20 20 0 0 0 7 7l2-3 6 2v5c0 1.1-.9 2-2 2C14 26 6 18 6 7c0-1.1.9-2 2-2Z"/></svg>
            <span className="header-contact-copy"><strong>Call today</strong><small>(415) 521-0686</small></span>
          </a>
          <button ref={menuToggleRef} className="menu-toggle" type="button" aria-controls="primary-navigation" aria-expanded={menuOpen} aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} onClick={() => setMenuOpen((open) => !open)}>
            <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              {menuOpen ? <path d="m6 6 12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-photo" data-reveal>
            <video poster={TURNING_POSTER} muted loop playsInline preload="none" data-ambient-video aria-hidden="true">
              <source src={TURNING_VIDEO} type="video/mp4" />
            </video>
            <p className="media-attribution"><a href="https://www.pexels.com/video/metal-working-machinery-5846709/" target="_blank" rel="noreferrer">Video: Tima Miroshnichenko / Pexels</a></p>
          </div>
          <div className="hero-copy">
            <p className="hero-banner" data-reveal>Factory-direct turning and milling inserts for CNC shops</p>
            <h1 id="hero-title" data-reveal>Carbide inserts<br />for your shop.</h1>
            <p className="hero-description" data-reveal>Reliable turning and milling inserts, priced direct from our line.</p>
            <div className="hero-trust" data-reveal aria-label="Anacapa advantages">
              <div><span className="hero-trust-icon"><AnacapaIcon name="estimate" size={31} /></span><span>Free<br />estimates</span></div>
              <div><span className="hero-trust-icon"><AnacapaIcon name="quality" size={31} /></span><span>Consistent<br />results</span></div>
              <div><span className="hero-trust-icon"><AnacapaIcon name="value" size={31} /></span><span>Factory-direct<br />prices</span></div>
            </div>
            <div className="hero-actions" data-reveal>
              <a className="button button-red" href="tel:+14155210686">Call: (415) 521-0686</a>
            </div>
          </div>
          <form className="quote-card" id="quote" onSubmit={sendQuoteRequest} data-reveal>
            <div className="quote-card-heading">
              <h2>Get High Quality Inserts</h2>
              <p>Professional. Trustworthy. Long-Lasting.</p>
            </div>
            <div className="quote-fields">
            <label className="sr-only" htmlFor="name">Name</label>
            <input id="name" name="name" autoComplete="name" placeholder="Your name" value={name} onChange={(event) => setName(event.target.value)} required />
            <div className="form-pair">
              <div>
                <label className="sr-only" htmlFor="email">Email</label>
                <input id="email" name="email" type="email" autoComplete="email" placeholder="Email address" value={email} onChange={(event) => setEmail(event.target.value)} required />
              </div>
              <div>
                <label className="sr-only" htmlFor="phone">Phone</label>
                <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="Phone number" value={phone} onChange={(event) => setPhone(event.target.value)} required />
              </div>
            </div>
            <label className="sr-only" htmlFor="operation">Insert type</label>
            <select id="operation" value={operation} onChange={(event) => setOperation(event.target.value)} required>
              <option value="" disabled>Choose turning or milling</option>
              <option>Turning</option>
              <option>Milling</option>
            </select>
            <button className="button button-amber" type="submit">Submit</button>
            </div>
          </form>
        </section>

        <section className="proof-band" aria-label="Anacapa products and quote support">
            <article data-reveal><span className="proof-icon"><AnacapaIcon name="turning" size={45} /></span><h2>Turning inserts</h2></article>
            <article data-reveal><span className="proof-icon"><AnacapaIcon name="milling" size={45} /></span><h2>Milling inserts</h2></article>
            <article data-reveal><span className="proof-icon"><AnacapaIcon name="sample" size={45} /></span><h2>Free samples</h2></article>
            <article data-reveal><span className="proof-icon"><AnacapaIcon name="minimum" size={45} /></span><h2>Small minimums</h2></article>
        </section>

        <section className="range-section" id="inserts" aria-labelledby="range-title">
          <div className="range-copy">
            <h2 id="range-title" data-reveal>Turning and milling inserts.</h2>
            <p className="range-intro" data-reveal>We supply our own full line at factory-direct prices. Tell us whether you need turning or milling inserts, and include the workpiece material if you know it.</p>
            <div className="catalog-list" aria-label="Insert categories">
              {catalog.map((item) => (
                <article className="catalog-item" key={item.slug || item.name}>
                  <div className="catalog-item-heading"><span className="catalog-icon"><AnacapaIcon name={item.slug === 'milling' ? 'milling' : 'turning'} size={34} /></span><h3 data-reveal>{item.name}<br />inserts</h3></div>
                  <p>{item.detail}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="range-gallery">
            <figure className="milling-image" data-reveal>
              <video poster={MILLING_POSTER} muted loop playsInline preload="none" data-ambient-video aria-hidden="true">
                <source src={MILLING_VIDEO} type="video/mp4" />
              </video>
              <figcaption className="media-attribution"><a href="https://www.pexels.com/video/a-machine-is-cutting-metal-with-a-metal-cutting-tool-9033891/" target="_blank" rel="noreferrer">Video: Daniel Smyth / Pexels</a></figcaption>
            </figure>
            <div className="range-details">
              <figure data-reveal>
                <img src={STEEL_MILLING_PHOTO} alt="Steel being milled in a machine shop" loading="lazy" />
                <figcaption className="media-attribution"><a href="https://pixabay.com/fr/photos/fraisage-usinage-t%C3%AAte-de-couteau-1137974/" target="_blank" rel="noreferrer">Photo: gefrorene_wand / Pixabay</a></figcaption>
              </figure>
              <figure data-reveal>
                <img src={BRASS_PARTS_PHOTO} alt="Precision brass components from a machine shop" loading="lazy" />
                <figcaption className="media-attribution"><a href="https://pixabay.com/photos/machine-machining-precision-parts-1181046/" target="_blank" rel="noreferrer">Photo: Somervisor / Pixabay</a></figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className="why-section" id="why-anacapa" aria-labelledby="why-title">
          <div className="why-heading">
            <h2 id="why-title" data-reveal>An alternative to big-brand pricing.</h2>
            <p data-reveal>Get dependable carbide inserts with pricing and order sizes that make sense for your shop.</p>
          </div>
          <div className="why-grid">
            <article data-reveal><span className="why-index">01</span><h3>Direct-line pricing</h3><p>Our own line of turning and milling inserts, priced below distributor levels.</p></article>
            <article data-reveal><span className="why-index">02</span><h3>Order what you need</h3><p>Small minimums make it easier to start with a practical quantity.</p></article>
            <article data-reveal><span className="why-index">03</span><h3>Try a sample first</h3><p>Evaluate a grade in your own operation before placing a larger order.</p></article>
            <article data-reveal><span className="why-index">04</span><h3>Tool life that competes</h3><p>Quality grades designed to deliver tool life comparable to major brands.</p></article>
          </div>
        </section>

        <section className="contact-strip" id="contact" aria-labelledby="contact-title">
          <div>
            <h2 id="contact-title" data-reveal>Contact Anacapa.</h2>
          </div>
          <div className="contact-details">
            <p><strong>Looking for pricing or samples?</strong><br />Send a request and we can help with turning or milling inserts.</p>
            <a className="button button-dark" href="#top">Request a quote</a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-about">
            <a className="footer-brand" href="#top" aria-label="Back to Anacapa home">
              <img src="/anacapa-logo.svg" alt="Anacapa Industrial Supply" />
            </a>
            <p>Carbide turning and milling inserts<br />California-based supplier serving shops and distributors worldwide</p>
          </div>
          <nav className="footer-group" aria-label="Footer navigation">
            <h2>Explore</h2>
            <div className="footer-links">
              <a href="#inserts">Turning and milling</a>
              <a href="#why-anacapa">Why Anacapa</a>
              <a href="#contact">Contact</a>
            </div>
          </nav>
          <div className="footer-group footer-contact">
            <h2>Call Anacapa</h2>
            <a href="tel:+14155210686">(415) 521-0686</a>
          </div>
        </div>
        <div className="footer-bottom">
          <small>© {new Date().getFullYear()} Anacapa Industrial Supply</small>
        </div>
      </footer>
    </>
  )
}

export default App

