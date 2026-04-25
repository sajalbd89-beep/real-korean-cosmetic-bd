import { useState, useEffect } from "react";

// ─── MOCK PRODUCT DATABASE (mirrors Phase 1 PostgreSQL schema) ───────────────
const PRODUCTS = [
  {
    id: "p1", sku: "CX-SN-001", name: "COSRX Snail Mucin 96% Power Essence",
    brand: "COSRX", price_bdt: 1850, compare_price: 2200,
    slug: "cosrx-snail-mucin-essence",
    images: ["https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80"],
    skin_types: ["Dry", "Combination", "Sensitive"],
    concerns: ["Acne", "Sensitivity", "Dark spots"],
    routine_step: "Essence", rating: 4.9, reviews: 2841,
    description: "96% snail secretion filtrate repairs, hydrates, and brightens skin overnight.",
  },
  {
    id: "p2", sku: "LN-WS-002", name: "Laneige Water Sleeping Mask",
    brand: "Laneige", price_bdt: 2650, compare_price: 3100,
    slug: "laneige-water-sleeping-mask",
    images: ["https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&q=80"],
    skin_types: ["Dry", "Combination"],
    concerns: ["Aging", "Dark spots"],
    routine_step: "Mask", rating: 4.8, reviews: 1923,
    description: "Moisture-sealing overnight mask with SLEEPSCENT™ technology for glass skin.",
  },
  {
    id: "p3", sku: "SK-FX-003", name: "Some By Mi AHA BHA PHA 30 Days Miracle Toner",
    brand: "Some By Mi", price_bdt: 1450, compare_price: 1700,
    slug: "somebymi-miracle-toner",
    images: ["https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=400&q=80"],
    skin_types: ["Oily", "Combination"],
    concerns: ["Acne", "Dark spots"],
    routine_step: "Toner", rating: 4.7, reviews: 3102,
    description: "Triple-acid exfoliating toner that visibly clears acne and reduces hyperpigmentation.",
  },
  {
    id: "p4", sku: "IH-LT-004", name: "IOPE UV Shield Sun Essence SPF50+",
    brand: "IOPE", price_bdt: 1980, compare_price: null,
    slug: "iope-uv-shield-sun-essence",
    images: ["https://images.unsplash.com/photo-1556228578-dd8e4fe2a9a8?w=400&q=80"],
    skin_types: ["Oily", "Combination", "Sensitive"],
    concerns: ["Aging", "Dark spots", "Sensitivity"],
    routine_step: "Sunscreen", rating: 4.8, reviews: 1455,
    description: "Feather-light SPF50+ PA++++ that doubles as a hydrating primer. No white cast.",
  },
  {
    id: "p5", sku: "MF-AM-005", name: "Missha Time Revolution Ampoule",
    brand: "Missha", price_bdt: 3200, compare_price: 3800,
    slug: "missha-time-revolution-ampoule",
    images: ["https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&q=80"],
    skin_types: ["Dry", "Combination", "Sensitive"],
    concerns: ["Aging", "Dark spots"],
    routine_step: "Serum", rating: 4.9, reviews: 987,
    description: "Fermented yeast filtrate serum that reduces fine lines and firms skin texture.",
  },
  {
    id: "p6", sku: "CX-AC-006", name: "COSRX AC Collection Calming Foam Cleanser",
    brand: "COSRX", price_bdt: 1100, compare_price: 1300,
    slug: "cosrx-ac-calming-cleanser",
    images: ["https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&q=80"],
    skin_types: ["Oily", "Combination", "Sensitive"],
    concerns: ["Acne", "Sensitivity"],
    routine_step: "Cleanser", rating: 4.6, reviews: 2210,
    description: "pH 5.5 foam cleanser with BHA that clears pores without stripping the moisture barrier.",
  },
  {
    id: "p7", sku: "DR-CL-007", name: "Dr.Jart+ Cicapair Tiger Grass Cream",
    brand: "Dr.Jart+", price_bdt: 2850, compare_price: 3400,
    slug: "drjart-cicapair-cream",
    images: ["https://images.unsplash.com/photo-1629198688000-71f23e745b6e?w=400&q=80"],
    skin_types: ["Dry", "Sensitive"],
    concerns: ["Sensitivity", "Acne"],
    routine_step: "Moisturizer", rating: 4.8, reviews: 1678,
    description: "Centella-powered calming cream that reduces redness and rebuilds the skin barrier.",
  },
  {
    id: "p8", sku: "SK-EX-008", name: "Etude House SoonJung pH 6.5 Whip Cleanser",
    brand: "Etude House", price_bdt: 980, compare_price: null,
    slug: "etudehouse-soonjung-cleanser",
    images: ["https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&q=80"],
    skin_types: ["Dry", "Sensitive"],
    concerns: ["Sensitivity"],
    routine_step: "Cleanser", rating: 4.7, reviews: 1340,
    description: "Ultra-gentle whip cleanser with panthenol and madecassoside for reactive skin.",
  },
];

// ─── PRODUCT FILTER LOGIC (mirrors Phase 1 DB query logic) ──────────────────
function filterProducts(skinType, concern, routine) {
  let scored = PRODUCTS.map((p) => {
    let score = 0;
    if (p.skin_types.includes(skinType)) score += 3;
    if (p.concerns.includes(concern)) score += 3;
    if (routine === "minimal" && ["Cleanser", "Moisturizer", "Sunscreen"].includes(p.routine_step)) score += 2;
    if (routine === "standard") score += 1;
    if (routine === "advanced") score += 0.5;
    return { ...p, score };
  });
  scored.sort((a, b) => b.score - a.score || b.rating - a.rating);
  // Return top 4 picks ensuring step diversity
  const steps = new Set();
  return scored.filter((p) => {
    if (steps.size < 4 && !steps.has(p.routine_step)) { steps.add(p.routine_step); return true; }
    if (steps.size < 4) { return true; }
    return false;
  }).slice(0, 4);
}

// ─── QUIZ DATA ───────────────────────────────────────────────────────────────
const STEPS = [
  {
    id: "skin_type",
    title: "What is your skin type?",
    subtitle: "We'll tailor your Korean routine to your unique skin.",
    options: [
      { value: "Oily", label: "Oily", icon: "✦", desc: "Shine by noon, enlarged pores" },
      { value: "Dry", label: "Dry", icon: "◇", desc: "Tight, flaky, needs moisture" },
      { value: "Combination", label: "Combination", icon: "◈", desc: "Oily T-zone, dry cheeks" },
      { value: "Sensitive", label: "Sensitive", icon: "○", desc: "Reacts easily, redness-prone" },
    ],
  },
  {
    id: "concern",
    title: "Your main skin concern?",
    subtitle: "Focus your routine on what matters most.",
    options: [
      { value: "Acne", label: "Acne & Breakouts", icon: "▲", desc: "Pimples, blackheads, clogged pores" },
      { value: "Dark spots", label: "Dark Spots", icon: "◎", desc: "Hyperpigmentation, uneven tone" },
      { value: "Aging", label: "Anti-Aging", icon: "✧", desc: "Fine lines, firmness, elasticity" },
      { value: "Sensitivity", label: "Sensitivity", icon: "◇", desc: "Redness, irritation, barrier repair" },
    ],
  },
  {
    id: "routine",
    title: "Your current skincare routine?",
    subtitle: "We'll recommend products that fit your lifestyle.",
    options: [
      { value: "minimal", label: "Minimal", icon: "·", desc: "2–3 steps, keep it simple" },
      { value: "standard", label: "Standard", icon: "··", desc: "4–6 steps, balanced approach" },
      { value: "advanced", label: "Advanced", icon: "···", desc: "7+ steps, full K-beauty ritual" },
    ],
  },
];

const ROUTINE_ORDER = ["Cleanser", "Toner", "Essence", "Serum", "Mask", "Moisturizer", "Sunscreen"];

// ─── STAR RATING ─────────────────────────────────────────────────────────────
function Stars({ rating }) {
  return (
    <span style={{ color: "#c9a84c", fontSize: 12, letterSpacing: 1 }}>
      {"★".repeat(Math.round(rating))}{"☆".repeat(5 - Math.round(rating))}
    </span>
  );
}

// ─── PRODUCT CARD ─────────────────────────────────────────────────────────────
function ProductCard({ product, index }) {
  const [added, setAdded] = useState(false);
  const discount = product.compare_price
    ? Math.round((1 - product.price_bdt / product.compare_price) * 100)
    : null;

  return (
    <div style={{
      background: "#fff",
      border: "1px solid #e8ede8",
      borderRadius: 16,
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      animation: `fadeSlideUp 0.5s ease both`,
      animationDelay: `${index * 0.1}s`,
    }}>
      <div style={{ position: "relative", height: 200, overflow: "hidden", background: "#f5f7f5" }}>
        <img
          src={product.images[0]}
          alt={product.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }}
          onMouseEnter={e => e.target.style.transform = "scale(1.05)"}
          onMouseLeave={e => e.target.style.transform = "scale(1)"}
        />
        <div style={{
          position: "absolute", top: 12, left: 12,
          background: "#2d4a2d", color: "#e8f0e8",
          fontSize: 10, fontWeight: 600, letterSpacing: 1.5,
          padding: "4px 10px", borderRadius: 20, textTransform: "uppercase",
        }}>{product.routine_step}</div>
        {discount && (
          <div style={{
            position: "absolute", top: 12, right: 12,
            background: "#c9a84c", color: "#fff",
            fontSize: 11, fontWeight: 700,
            padding: "4px 10px", borderRadius: 20,
          }}>−{discount}%</div>
        )}
      </div>
      <div style={{ padding: "16px 18px", flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ fontSize: 10, letterSpacing: 2, color: "#7a9a7a", textTransform: "uppercase", fontWeight: 600 }}>
          {product.brand}
        </div>
        <div style={{ fontSize: 14, fontWeight: 600, color: "#1a2a1a", lineHeight: 1.4 }}>
          {product.name}
        </div>
        <div style={{ fontSize: 12, color: "#5a7a5a", lineHeight: 1.5 }}>
          {product.description}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
          <Stars rating={product.rating} />
          <span style={{ fontSize: 11, color: "#8aaa8a" }}>({product.reviews.toLocaleString()})</span>
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 4 }}>
          <span style={{ fontSize: 18, fontWeight: 700, color: "#1a2a1a" }}>৳{product.price_bdt.toLocaleString()}</span>
          {product.compare_price && (
            <span style={{ fontSize: 13, color: "#aaa", textDecoration: "line-through" }}>৳{product.compare_price.toLocaleString()}</span>
          )}
        </div>
      </div>
      <div style={{ padding: "0 18px 18px", display: "flex", gap: 8 }}>
        <button
          onClick={() => { setAdded(true); setTimeout(() => setAdded(false), 2000); }}
          style={{
            flex: 1,
            padding: "12px 0",
            background: added ? "#2d4a2d" : "#c9a84c",
            color: "#fff",
            border: "none",
            borderRadius: 10,
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: 0.5,
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
        >
          {added ? "✓ Added to Cart" : "Order Now →"}
        </button>
        <button style={{
          width: 44, height: 44,
          background: "transparent",
          border: "1px solid #d0ddd0",
          borderRadius: 10, cursor: "pointer", fontSize: 16,
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "border-color 0.2s",
        }}
          onMouseEnter={e => e.currentTarget.style.borderColor = "#c9a84c"}
          onMouseLeave={e => e.currentTarget.style.borderColor = "#d0ddd0"}
        >♡</button>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function RKCBDApp() {
  const [phase, setPhase] = useState("hero"); // hero | quiz | results
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({ skin_type: null, concern: null, routine: null });
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);

  const currentStep = STEPS[step];

  function selectOption(value) {
    setSelected(value);
  }

  function nextStep() {
    if (!selected) return;
    const key = currentStep.id;
    const newAnswers = { ...answers, [key]: selected };
    setAnswers(newAnswers);
    setSelected(null);
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      const filtered = filterProducts(newAnswers.skin_type, newAnswers.concern, newAnswers.routine);
      const sorted = [...filtered].sort((a, b) =>
        ROUTINE_ORDER.indexOf(a.routine_step) - ROUTINE_ORDER.indexOf(b.routine_step)
      );
      setResults(sorted);
      setPhase("results");
    }
  }

  function restart() {
    setPhase("hero");
    setStep(0);
    setAnswers({ skin_type: null, concern: null, routine: null });
    setSelected(null);
    setResults([]);
  }

  const progress = ((step) / STEPS.length) * 100;

  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", background: "#f9faf7", minHeight: "100vh", color: "#1a2a1a" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #f9faf7; }
        .display { font-family: 'Cormorant Garamond', Georgia, serif; }
        .sans { font-family: 'DM Sans', system-ui, sans-serif; }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; } to { opacity: 1; }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .hero-btn:hover { background: #1a2a1a !important; transform: translateY(-2px); }
        .option-card:hover { border-color: #c9a84c !important; background: #fdfbf5 !important; }
        .nav-link:hover { color: #c9a84c !important; }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(249,250,247,0.95)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid #e0e8e0",
        padding: "0 24px", height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div onClick={restart} style={{ cursor: "pointer" }}>
          <div className="display" style={{ fontSize: 18, fontWeight: 600, letterSpacing: 1, color: "#1a2a1a" }}>
            RKCBD
          </div>
          <div className="sans" style={{ fontSize: 9, letterSpacing: 3, color: "#7a9a7a", textTransform: "uppercase", marginTop: -2 }}>
            Real Korean Cosmetics BD
          </div>
        </div>
        <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {["Products", "Brands", "Routines"].map(l => (
            <span key={l} className="sans nav-link" style={{ fontSize: 12, letterSpacing: 1.5, textTransform: "uppercase", color: "#3a5a3a", cursor: "pointer", transition: "color 0.2s" }}>{l}</span>
          ))}
          <div style={{
            background: "#2d4a2d", color: "#e8f0e8",
            padding: "8px 18px", borderRadius: 24,
            fontSize: 12, fontWeight: 600, letterSpacing: 1,
            cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
          }}>Cart (0)</div>
        </div>
      </nav>

      {/* ── HERO ── */}
      {phase === "hero" && (
        <section style={{ animation: "fadeIn 0.6s ease" }}>
          {/* Hero Banner */}
          <div style={{
            background: "linear-gradient(135deg, #1a2a1a 0%, #2d4a2d 50%, #1a3020 100%)",
            minHeight: "88vh", display: "flex", alignItems: "center",
            position: "relative", overflow: "hidden", padding: "60px 24px",
          }}>
            {/* Decorative circles */}
            {[{ s: 400, x: "70%", y: "-10%", o: 0.04 }, { s: 250, x: "80%", y: "60%", o: 0.06 }, { s: 150, x: "5%", y: "70%", o: 0.05 }].map((c, i) => (
              <div key={i} style={{
                position: "absolute", width: c.s, height: c.s,
                borderRadius: "50%", border: "1px solid rgba(201,168,76,0.3)",
                left: c.x, top: c.y, opacity: c.o + 0.96,
                background: `radial-gradient(circle, rgba(201,168,76,${c.o}) 0%, transparent 70%)`,
              }} />
            ))}
            {/* Gold line accent */}
            <div style={{
              position: "absolute", left: 0, top: 0, bottom: 0, width: 3,
              background: "linear-gradient(to bottom, transparent, #c9a84c, transparent)",
            }} />

            <div style={{ maxWidth: 680, margin: "0 auto", position: "relative", zIndex: 2 }}>
              <div className="sans" style={{
                fontSize: 11, letterSpacing: 4, color: "#c9a84c",
                textTransform: "uppercase", marginBottom: 20,
                animation: "fadeSlideUp 0.6s ease both",
              }}>
                ✦ Authentically sourced · Seoul → Dhaka
              </div>
              <h1 className="display" style={{
                fontSize: "clamp(42px, 7vw, 80px)", fontWeight: 300,
                color: "#f5f0e8", lineHeight: 1.1, marginBottom: 20,
                animation: "fadeSlideUp 0.7s ease 0.1s both",
              }}>
                Your Skin,<br />
                <em style={{ color: "#c9a84c", fontStyle: "italic" }}>Scientifically</em><br />
                Cared For
              </h1>
              <p className="sans" style={{
                fontSize: 16, color: "#9ab89a", lineHeight: 1.7,
                maxWidth: 460, marginBottom: 40,
                animation: "fadeSlideUp 0.7s ease 0.2s both",
                fontWeight: 300,
              }}>
                100% genuine Korean skincare — directly sourced from certified Seoul distributors. 
                Let our AI Doctor build your perfect routine in 60 seconds.
              </p>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap", animation: "fadeSlideUp 0.7s ease 0.3s both" }}>
                <button
                  className="hero-btn"
                  onClick={() => setPhase("quiz")}
                  style={{
                    background: "#c9a84c", color: "#fff",
                    border: "none", padding: "16px 36px",
                    borderRadius: 50, fontSize: 14, fontWeight: 600,
                    letterSpacing: 1, cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                    transition: "all 0.3s ease", boxShadow: "0 8px 32px rgba(201,168,76,0.35)",
                  }}
                >
                  ✦ Start Skin Analysis
                </button>
                <button style={{
                  background: "transparent", color: "#9ab89a",
                  border: "1px solid rgba(154,184,154,0.4)", padding: "16px 32px",
                  borderRadius: 50, fontSize: 14, fontWeight: 400,
                  letterSpacing: 1, cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif", transition: "all 0.3s ease",
                }}>
                  Browse Products →
                </button>
              </div>

              {/* Trust badges */}
              <div style={{ display: "flex", gap: 32, marginTop: 56, flexWrap: "wrap", animation: "fadeSlideUp 0.7s ease 0.4s both" }}>
                {[["500+", "Korean Products"], ["100%", "Authentic"], ["48hr", "Dhaka Delivery"], ["bKash", "/ Nagad / COD"]].map(([v, l]) => (
                  <div key={l}>
                    <div className="display" style={{ fontSize: 24, color: "#c9a84c", fontWeight: 600 }}>{v}</div>
                    <div className="sans" style={{ fontSize: 11, color: "#7a9a7a", letterSpacing: 1 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Feature strip */}
          <div style={{ background: "#fff", borderBottom: "1px solid #e8ede8", padding: "20px 24px" }}>
            <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 16 }}>
              {[["🇰🇷", "Direct from Seoul"], ["✓", "KFDA Certified"], ["⚡", "Same-day dispatch"], ["🔒", "Secure payment"]].map(([icon, text]) => (
                <div key={text} className="sans" style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#3a5a3a", fontWeight: 500 }}>
                  <span>{icon}</span> {text}
                </div>
              ))}
            </div>
          </div>

          {/* Brands marquee */}
          <div style={{ background: "#f3f5f1", padding: "28px 24px", textAlign: "center" }}>
            <div className="sans" style={{ fontSize: 10, letterSpacing: 3, color: "#7a9a7a", textTransform: "uppercase", marginBottom: 16 }}>Stocking authentic brands</div>
            <div style={{ display: "flex", justifyContent: "center", gap: 40, flexWrap: "wrap" }}>
              {["COSRX", "Laneige", "Dr.Jart+", "Some By Mi", "IOPE", "Missha", "Etude House", "Innisfree"].map(b => (
                <span key={b} className="display" style={{ fontSize: 15, color: "#4a6a4a", letterSpacing: 1, fontWeight: 600 }}>{b}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── QUIZ ── */}
      {phase === "quiz" && (
        <div style={{ minHeight: "calc(100vh - 64px)", display: "flex", flexDirection: "column", animation: "fadeIn 0.4s ease" }}>
          {/* Progress bar */}
          <div style={{ height: 3, background: "#e8ede8" }}>
            <div style={{
              height: "100%", background: "linear-gradient(90deg, #2d4a2d, #c9a84c)",
              width: `${((step + 1) / STEPS.length) * 100}%`,
              transition: "width 0.4s ease",
            }} />
          </div>

          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "48px 20px", maxWidth: 640, margin: "0 auto", width: "100%" }}>
            {/* Step indicator */}
            <div className="sans" style={{ fontSize: 11, letterSpacing: 3, color: "#7a9a7a", textTransform: "uppercase", marginBottom: 12 }}>
              Step {step + 1} of {STEPS.length} · AI Skin Analysis
            </div>

            <h2 className="display" style={{ fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 300, textAlign: "center", color: "#1a2a1a", marginBottom: 10, lineHeight: 1.2 }}>
              {currentStep.title}
            </h2>
            <p className="sans" style={{ fontSize: 14, color: "#7a9a7a", textAlign: "center", marginBottom: 40, fontWeight: 300 }}>
              {currentStep.subtitle}
            </p>

            {/* Options */}
            <div style={{
              display: "grid",
              gridTemplateColumns: currentStep.options.length === 3 ? "repeat(3, 1fr)" : "repeat(2, 1fr)",
              gap: 14, width: "100%", marginBottom: 32,
            }}>
              {currentStep.options.map((opt) => (
                <button
                  key={opt.value}
                  className="option-card"
                  onClick={() => selectOption(opt.value)}
                  style={{
                    background: selected === opt.value ? "#fdfbf0" : "#fff",
                    border: `1.5px solid ${selected === opt.value ? "#c9a84c" : "#e0e8e0"}`,
                    borderRadius: 14, padding: "20px 16px",
                    cursor: "pointer", textAlign: "center",
                    transition: "all 0.2s ease",
                    transform: selected === opt.value ? "translateY(-2px)" : "none",
                    boxShadow: selected === opt.value ? "0 8px 24px rgba(201,168,76,0.15)" : "none",
                  }}
                >
                  <div style={{ fontSize: 22, marginBottom: 8, color: selected === opt.value ? "#c9a84c" : "#7a9a7a" }}>{opt.icon}</div>
                  <div className="display" style={{ fontSize: 18, fontWeight: 600, color: "#1a2a1a", marginBottom: 4 }}>{opt.label}</div>
                  <div className="sans" style={{ fontSize: 11, color: "#7a9a7a", lineHeight: 1.4, fontWeight: 300 }}>{opt.desc}</div>
                  {selected === opt.value && (
                    <div style={{ marginTop: 8, width: 6, height: 6, borderRadius: "50%", background: "#c9a84c", margin: "8px auto 0" }} />
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={nextStep}
              disabled={!selected}
              style={{
                background: selected ? "#1a2a1a" : "#d0ddd0",
                color: "#fff", border: "none",
                padding: "16px 56px", borderRadius: 50,
                fontSize: 14, fontWeight: 600, letterSpacing: 1,
                cursor: selected ? "pointer" : "not-allowed",
                fontFamily: "'DM Sans', sans-serif",
                transition: "all 0.3s ease",
              }}
            >
              {step === STEPS.length - 1 ? "✦ Reveal My Routine" : "Continue →"}
            </button>

            {step > 0 && (
              <button onClick={() => { setStep(step - 1); setSelected(answers[STEPS[step - 1].id]); }}
                className="sans" style={{ marginTop: 16, background: "none", border: "none", color: "#7a9a7a", fontSize: 13, cursor: "pointer" }}>
                ← Back
              </button>
            )}
          </div>
        </div>
      )}

      {/* ── RESULTS ── */}
      {phase === "results" && (
        <div style={{ animation: "fadeIn 0.5s ease", padding: "0 0 60px" }}>
          {/* Results header */}
          <div style={{
            background: "linear-gradient(135deg, #1a2a1a, #2d4a2d)",
            padding: "48px 24px", textAlign: "center",
          }}>
            <div className="sans" style={{ fontSize: 11, letterSpacing: 3, color: "#c9a84c", textTransform: "uppercase", marginBottom: 12 }}>
              ✦ AI Analysis Complete
            </div>
            <h2 className="display" style={{ fontSize: "clamp(30px, 5vw, 50px)", fontWeight: 300, color: "#f5f0e8", marginBottom: 12 }}>
              Your Korean Routine
            </h2>
            <p className="sans" style={{ color: "#9ab89a", fontSize: 14, fontWeight: 300, maxWidth: 400, margin: "0 auto 24px" }}>
              Curated for <strong style={{ color: "#c9a84c" }}>{answers.skin_type}</strong> skin · targeting <strong style={{ color: "#c9a84c" }}>{answers.concern}</strong>
            </p>
            {/* Answer pills */}
            <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
              {[answers.skin_type, answers.concern, answers.routine].map(a => (
                <span key={a} className="sans" style={{
                  background: "rgba(201,168,76,0.15)", color: "#c9a84c",
                  border: "1px solid rgba(201,168,76,0.3)",
                  padding: "6px 16px", borderRadius: 20, fontSize: 12, letterSpacing: 0.5,
                }}>{a}</span>
              ))}
            </div>
          </div>

          {/* Routine steps label */}
          <div style={{ maxWidth: 900, margin: "0 auto", padding: "36px 20px 0" }}>
            <div className="sans" style={{ fontSize: 10, letterSpacing: 3, color: "#7a9a7a", textTransform: "uppercase", marginBottom: 6 }}>
              Your personalised routine — {results.length} products selected
            </div>
            <div style={{ height: 1, background: "linear-gradient(90deg, #c9a84c, transparent)", marginBottom: 28 }} />

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: 20,
            }}>
              {results.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>

            {/* Complete routine CTA */}
            <div style={{
              marginTop: 40, background: "#fff",
              border: "1px solid #e8ede8", borderRadius: 16,
              padding: "28px 32px", display: "flex",
              alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20,
            }}>
              <div>
                <div className="display" style={{ fontSize: 22, color: "#1a2a1a", marginBottom: 4 }}>Add full routine to cart</div>
                <div className="sans" style={{ fontSize: 13, color: "#7a9a7a" }}>
                  Save up to 15% when you buy the complete routine · Free shipping on orders over ৳3,000
                </div>
              </div>
              <button style={{
                background: "#1a2a1a", color: "#f5f0e8",
                border: "none", padding: "14px 32px",
                borderRadius: 50, fontSize: 13, fontWeight: 600,
                letterSpacing: 0.5, cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap",
              }}>
                ✦ Order Full Routine
              </button>
            </div>

            {/* Payment badges */}
            <div style={{ marginTop: 24, display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
              <span className="sans" style={{ fontSize: 11, color: "#7a9a7a", letterSpacing: 1 }}>Pay with:</span>
              {["bKash", "Nagad", "Cash on Delivery"].map(m => (
                <span key={m} className="sans" style={{
                  background: "#f3f5f1", border: "1px solid #e0e8e0",
                  borderRadius: 8, padding: "5px 14px",
                  fontSize: 12, fontWeight: 600, color: "#3a5a3a",
                }}>{m}</span>
              ))}
            </div>

            <button onClick={restart} className="sans" style={{
              marginTop: 28, background: "none", border: "none",
              color: "#7a9a7a", fontSize: 13, cursor: "pointer", textDecoration: "underline",
            }}>
              ← Retake skin analysis
            </button>
          </div>
        </div>
      )}

      {/* ── FOOTER ── */}
      <footer style={{ background: "#1a2a1a", padding: "40px 24px 28px", color: "#7a9a7a", marginTop: phase === "hero" ? 0 : 40 }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div className="display" style={{ fontSize: 20, color: "#c9a84c", marginBottom: 4 }}>Real Korean Cosmetic BD</div>
          <div className="sans" style={{ fontSize: 11, letterSpacing: 2, marginBottom: 20 }}>AUTHENTIC · DIRECT · EFFECTIVE</div>
          <div className="sans" style={{ fontSize: 12, borderTop: "1px solid #2d4a2d", paddingTop: 20 }}>
            © 2025 Real Korean Cosmetic BD · All products sourced directly from Seoul, South Korea
          </div>
        </div>
      </footer>
    </div>
  );
}
