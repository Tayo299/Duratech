import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import logo from "@/assets/duratech-logo.png";

const WA = "https://wa.me/2349010766808?text=Hello%20Duratech%2C%20I%27d%20like%20to%20make%20an%20enquiry%20about%20";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Duratech Aluminum Ventures | Aluminum & Glass Works" },
      { name: "description", content: "We design, fabricate and install aluminum windows, doors, partitions, railings, curtain walls and roofing — measured to fit and finished neatly." },
      { property: "og:title", content: "Duratech Aluminum Ventures | Aluminum & Glass Works" },
      { property: "og:description", content: "Aluminum windows, doors, partitions, railings and roofing — designed, fabricated and installed by Duratech." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const services = [
  { ic: "🪟", t: "Windows", d: "Casement, sliding and fixed windows. We measure each opening, cut the aluminum profiles to size, fit your choice of clear, tinted or reflective glass, and seal them against rain and dust." },
  { ic: "🚪", t: "Doors", d: "Sliding, swing and full-glass doors for homes, offices and shops — supplied with quality rollers, hinges and locks so they open smoothly and close securely for years." },
  { ic: "🏢", t: "Curtain Walls & Shopfronts", d: "Large glass fronts on aluminum framing that give plazas, banks and shops a bold, modern face while letting in natural light." },
  { ic: "🧱", t: "Glass Partitions", d: "Office and room dividers that split space without blocking light. Ideal for meeting rooms, receptions and open-plan offices." },
  { ic: "🚿", t: "Shower Cubicles", d: "Neat aluminum and glass shower enclosures built to your bathroom size, sealed to keep water where it belongs." },
  { ic: "🛡️", t: "Burglary Proof & Gates", d: "Security grilles, burglary-proof frames and gates that keep your property safe without looking like a cage." },
  { ic: "🏠", t: "Roofing, Carports & Ceilings", d: "Aluminum roofing sheets, fascia, carports, canopies, skylights and ceilings that resist rust and stand up to the weather." },
  { ic: "🔧", t: "Railings & Custom Work", d: "Stair handrails, balcony railings, louvers, fencing, signage frames and any made-to-order aluminum job you have in mind." },
];

const steps = [
  { n: "01", t: "Tell us your project", d: "Send a WhatsApp message, call, or fill the quote form. Share photos or a rough idea of what you want." },
  { n: "02", t: "Site visit & measurement", d: "We visit, take exact measurements, and advise on profile type, glass and colour that suit your budget." },
  { n: "03", t: "Clear quotation", d: "You get a detailed price for materials and labour — no hidden charges — before any work starts." },
  { n: "04", t: "Fabrication in our workshop", d: "Our team cuts, joins and assembles every frame to your measurements using quality aluminum profiles." },
  { n: "05", t: "Installation & clean finish", d: "We install on site, seal every joint, clean up after ourselves, and walk you through the finished job." },
];

const work = [
  {
    title: "Aluminum Fencing",
    image: "/assest/aluminum%20fencing.jpeg",
    description: "Custom-fitted aluminum fencing for a clean, durable boundary.",
  },
  {
    title: "Aluminum Louvers",
    image: "/assest/aluminum%20louvers.jpeg",
    description: "Made-to-measure louvers that add airflow and privacy.",
  },
  {
    title: "Aluminum Carport",
    image: "/assest/aluminum%20carport.jpeg",
    description: "A sturdy aluminum shelter designed around your available space.",
  },
  {
    title: "Aluminum Skylight",
    image: "/assest/aluminum%20skylight.png",
    description: "A framed roof opening that brings natural light indoors.",
  },
  {
    title: "Aluminum Stair Handrail",
    image: "/assest/aluminum%20handrill.png",
    description: "A neat, made-to-fit handrail for everyday support.",
  },
  {
    title: "Modern Glass Balcony",
    image: "/assest/alumium%20Modern%20Glass%20Balcon.png",
    description: "A contemporary glass-and-aluminum balcony finish.",
  },
];

function Index() {
  const [open, setOpen] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [submissionError, setSubmissionError] = useState("");
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => {
      setPrefersReducedMotion(motionPreference.matches);
      if (motionPreference.matches) videoRef.current?.pause();
    };
    updateMotionPreference();
    motionPreference.addEventListener("change", updateMotionPreference);
    return () => motionPreference.removeEventListener("change", updateMotionPreference);
  }, []);
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY;
    if (!accessKey) {
      setSubmissionError("Email sending is not configured yet. Please contact us via WhatsApp.");
      setSubmissionStatus("error");
      return;
    }

    setSubmissionStatus("sending");
    setSubmissionError("");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          subject: "New Quote Request - Duratech Website",
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          service: formData.get("service"),
          message: formData.get("message"),
          botcheck: formData.get("botcheck") ?? "",
        }),
      });
      const result: { success?: boolean; message?: string } = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || "The form could not be submitted. Please try again.");
      }
      setSubmissionStatus("success");
    } catch (error) {
      setSubmissionError(error instanceof Error ? error.message : "The form could not be submitted. Please try again.");
      setSubmissionStatus("error");
    }
  };
  const sendViaWhatsApp = (e: React.MouseEvent<HTMLButtonElement>) => {
    const form = e.currentTarget.form;
    if (!form?.reportValidity()) return;
    const formData = new FormData(form);
    const text = `Hello Duratech, my name is ${formData.get("name")} (${formData.get("phone")}, ${formData.get("email")}). I need: ${formData.get("service")}. ${formData.get("message")}`;
    window.open(`https://wa.me/2349010766808?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  };
  const nav = [["#work", "Our Work"], ["#services", "Services"], ["#process", "How We Work"], ["#about", "About Us"], ["#contact", "Contact"]];
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-3">
          <a href="#top"><img src={logo} alt="Duratech Aluminum Ventures logo" className="h-14 w-auto mix-blend-screen" /></a>
          <button aria-label="Toggle navigation" onClick={() => setOpen(!open)} className="rounded-lg border border-border px-3 py-2 md:hidden">☰</button>
          <nav className={`${open ? "flex" : "hidden"} w-full flex-col gap-3 md:flex md:w-auto md:flex-row md:gap-7`}>
            {nav.map(([h, l]) => <a key={h} href={h} onClick={() => setOpen(false)} className="text-sm font-semibold hover:text-primary">{l}</a>)}
          </nav>
          <a href={WA} target="_blank" rel="noopener" className="hidden rounded-full bg-primary px-5 py-2 text-sm font-bold text-primary-foreground hover:bg-accent md:inline-block">Chat on WhatsApp</a>
        </div>
      </header>

      <section id="top" className="hero-section relative overflow-hidden border-b border-border">
        <video
          ref={videoRef}
          aria-hidden="true"
          autoPlay={!prefersReducedMotion}
          muted
          loop
          playsInline
          preload="metadata"
          poster="/assest/landpage.jpeg"
          className="hero-background-video absolute inset-0 z-0 h-full w-full object-cover"
        >
          {/* Use a compressed H.264 MP4, ideally under 8 MB. */}
          <source src="/assest/landingpage.mp4" type="video/mp4" />
        </video>
        <div className="hero-video-overlay absolute inset-0 z-[1]" />
        <div className="hero-copy relative z-[2] mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 md:grid-cols-[1.3fr_1fr] md:py-28">
          <div>
            <p className="mb-4 text-xs font-bold tracking-[0.35em] text-muted-foreground">DESIGN • FABRICATE • INSTALL</p>
            <h1 className="font-display text-5xl font-extrabold leading-[1.05] md:text-7xl">Premium <span className="block text-primary">Aluminum Works</span></h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              Duratech Aluminum Ventures designs, builds and installs aluminum and glass for homes, offices, shops and estates — windows, doors, partitions, railings, curtain walls and roofing. Every piece is measured on your site, made in our workshop, and fitted by our own team.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#contact" className="rounded-full bg-primary px-7 py-3 font-bold text-primary-foreground hover:bg-accent">Get a Free Quote →</a>
              <a href="#process" className="rounded-full border border-border px-7 py-3 font-bold hover:border-primary">See How We Work</a>
            </div>
          </div>
          <img
            src={logo}
            alt="Duratech Aluminum Ventures"
            className="hero-logo relative z-[3] mx-auto h-auto w-full max-w-[460px]"
          />
        </div>
      </section>

      <div className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-5 px-5 py-5 text-sm font-semibold">
          {["🛡️ Rust-resistant materials", "📏 Made to your exact size", "⚙️ Professional installation", "🤝 Reliable after-service"].map((t) => <span key={t}>{t}</span>)}
        </div>
      </div>

      <section id="services" className="mx-auto max-w-6xl px-5 py-20">
        <p className="text-xs font-bold tracking-[0.3em] text-primary">SERVICES</p>
        <h2 className="mt-2 font-display text-4xl font-extrabold">What We Do</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">If it can be made with aluminum and glass, we can design it, fabricate it and install it. Here is what each service involves:</p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <div key={s.t} className="rounded-2xl border border-b-4 border-border border-b-primary bg-card p-6 transition hover:-translate-y-1">
              <div className="text-3xl">{s.ic}</div>
              <h3 className="mt-3 text-lg font-bold">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="process" className="border-y border-border bg-card">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <p className="text-xs font-bold tracking-[0.3em] text-primary">HOW WE WORK</p>
          <h2 className="mt-2 font-display text-4xl font-extrabold">From First Message to Finished Job</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">A simple five-step process so you always know what happens next.</p>
          <ol className="mt-10 grid gap-5 md:grid-cols-5">
            {steps.map((s) => (
              <li key={s.n} className="rounded-2xl border border-border bg-background p-6">
                <span className="font-display text-3xl font-extrabold text-primary">{s.n}</span>
                <h3 className="mt-2 font-bold">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="work" className="mx-auto max-w-6xl px-5 py-20">
        <p className="text-xs font-bold tracking-[0.3em] text-primary">OUR WORK</p>
        <h2 className="mt-2 font-display text-4xl font-extrabold">Projects We've Completed</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">Explore examples of our aluminum and glass work, from made-to-measure fencing and louvers to skylights, handrails and balcony finishes.</p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {work.map((project) => (
            <figure key={project.title} className="overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-1">
              <img src={project.image} alt={project.title} loading="lazy" className="h-56 w-full object-cover" />
              <figcaption className="p-5">
                <h3 className="font-bold text-primary">{project.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{project.description}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="about" className="border-y border-border bg-card">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <p className="text-xs font-bold tracking-[0.3em] text-primary">ABOUT US</p>
          <h2 className="mt-2 font-display text-4xl font-extrabold">Why Choose Duratech</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[["Built to Last", "Quality aluminum profiles that resist rust and harsh weather."], ["Neat Finishing", "Clean joints, straight lines and careful sealing on every project."], ["Custom Sizes", "Every frame is made to your exact measurements — no forcing."], ["Easy to Reach", "Message us on WhatsApp or call; we respond quickly."]].map(([t, d]) => (
              <div key={t} className="rounded-2xl border border-border bg-background p-6"><h3 className="font-bold">{t}</h3><p className="mt-2 text-sm text-muted-foreground">{d}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-[1fr_1.2fr]">
        <div>
          <p className="text-xs font-bold tracking-[0.3em] text-primary">CONTACT</p>
          <h2 className="mt-2 font-display text-4xl font-extrabold">Get a Free Quote</h2>
          <p className="mt-3 text-muted-foreground">Tell us what you need and we'll get back to you quickly.</p>
          <div className="mt-8 space-y-5">
            <p><b className="block text-xs tracking-widest text-primary">WHATSAPP</b><a href={WA} className="text-lg font-semibold">0901 076 6808</a></p>
            <p><b className="block text-xs tracking-widest text-primary">CALL US</b><a href="tel:08078215441" className="text-lg font-semibold">0807 821 5441</a></p>
            <p><b className="block text-xs tracking-widest text-primary">EMAIL</b><a href="mailto:aduragbemiisrael26@gmail.com" className="text-lg font-semibold break-all">aduragbemiisrael26@gmail.com</a></p>
          </div>
        </div>
        <form onSubmit={submit} className="space-y-4 rounded-2xl border border-border bg-card p-7">
          {[["name", "Full Name", "text"], ["email", "Email Address", "email"], ["phone", "Phone Number", "tel"]].map(([n, l, t]) => (
            <label key={n} className="block text-sm font-semibold text-primary">{l}<input required name={n} type={t} className="mt-1 w-full rounded-lg border border-input bg-background p-3 text-foreground" /></label>
          ))}
          <label className="block text-sm font-semibold text-primary">Service Needed
            <select name="service" className="mt-1 w-full rounded-lg border border-input bg-background p-3 text-foreground">
              {services.map((s) => <option key={s.t}>{s.t}</option>)}<option>Other</option>
            </select>
          </label>
          <label className="block text-sm font-semibold text-primary">Message<textarea name="message" rows={4} className="mt-1 w-full rounded-lg border border-input bg-background p-3 text-foreground" /></label>
          <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
          <button type="submit" disabled={submissionStatus === "sending"} className="w-full rounded-full bg-primary py-3 font-bold text-primary-foreground hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60">
            {submissionStatus === "sending" ? "Sending..." : "Send Quote Request"}
          </button>
          <button type="button" onClick={sendViaWhatsApp} className="w-full rounded-full border border-border py-3 font-bold hover:border-primary">Send via WhatsApp</button>
          {submissionStatus === "success" && <p role="status" className="text-sm font-semibold text-primary">Thank you, we received your request and will contact you shortly</p>}
          {submissionStatus === "error" && <p role="alert" className="text-sm font-semibold text-destructive">{submissionError}</p>}
        </form>
      </section>

      <footer className="border-t border-border py-7 text-center text-sm text-muted-foreground">© Duratech Aluminum Ventures. All rights reserved.</footer>
      <a href={WA} target="_blank" rel="noopener" aria-label="Chat on WhatsApp" className="fixed bottom-5 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-2xl text-whatsapp-foreground shadow-lg">💬</a>
    </div>
  );
}
