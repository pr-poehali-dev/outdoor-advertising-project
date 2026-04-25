import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/26ee31ff-cccb-473e-bbab-b13675945909/files/7b919976-8328-4a3a-9faf-554f2dfe9a1c.jpg";

const NAV_LINKS = [
  { label: "Главная", href: "#hero" },
  { label: "Услуги", href: "#services" },
  { label: "Портфолио", href: "#portfolio" },
  { label: "О компании", href: "#about" },
  { label: "Контакты", href: "#contacts" },
];

const SERVICES = [
  {
    icon: "Type",
    title: "Объёмные буквы",
    desc: "Буквы из акрила, металла, пластика с внутренней или контражурной подсветкой. Эффектно смотрятся круглосуточно.",
    color: "#FFE600",
    tag: "ХИТ",
  },
  {
    icon: "AlignLeft",
    title: "Плоские буквы",
    desc: "Вырезанные буквы из металла, акрила или ПВХ. Лаконично, стильно, доступно.",
    color: "#FF6B00",
    tag: null,
  },
  {
    icon: "Image",
    title: "Баннер",
    desc: "Широкоформатная печать на баннерной ткани. Быстро, ярко, любой размер.",
    color: "#00F5FF",
    tag: null,
  },
  {
    icon: "Square",
    title: "Световые короба",
    desc: "Лайтбоксы с равномерной подсветкой. Видны днём и ночью, защищены от непогоды.",
    color: "#FF2D55",
    tag: null,
  },
  {
    icon: "PanelTop",
    title: "Штендер",
    desc: "Мобильная выносная конструкция. Ставится у входа, привлекает прохожих.",
    color: "#FFE600",
    tag: null,
  },
  {
    icon: "MapPin",
    title: "Адресные таблички",
    desc: "Информационные таблички любой сложности: металл, акрил, гравировка.",
    color: "#FF6B00",
    tag: null,
  },
  {
    icon: "Zap",
    title: "Гибкий неон",
    desc: "Светящиеся вывески и арт-объекты из LED-неона. Нет ничего атмосфернее.",
    color: "#00F5FF",
    tag: "🔥 ТРЕНД",
  },
  {
    icon: "Palette",
    title: "Услуги дизайнера",
    desc: "Разработка макета с нуля, адаптация логотипа, визуализация на фасаде.",
    color: "#FF2D55",
    tag: null,
  },
  {
    icon: "Box",
    title: "3D-печать",
    desc: "Сложные формы и детали, изготовленные на 3D-принтере. Прототипы и готовые изделия.",
    color: "#FFE600",
    tag: "НОВИНКА",
  },
];

const PORTFOLIO = [
  {
    title: "Кафе «Восток»",
    type: "Объёмные буквы + Неон",
    img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80",
  },
  {
    title: "ТЦ Меридиан",
    type: "Световые короба",
    img: "https://images.unsplash.com/photo-1567653418876-5bb0e566e1c2?w=600&q=80",
  },
  {
    title: "Barbershop MAXIM",
    type: "Гибкий неон",
    img: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&q=80",
  },
  {
    title: "Офис IT-компании",
    type: "Плоские буквы + 3D",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
  },
  {
    title: "Ресторан SAKURA",
    type: "Вывеска + Подсветка",
    img: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&q=80",
  },
  {
    title: "Автосалон Drive",
    type: "Баннеры + Короба",
    img: "https://images.unsplash.com/photo-1502161254066-6c74afbf07aa?w=600&q=80",
  },
];

const STATS = [
  { value: "12+", label: "лет на рынке" },
  { value: "850+", label: "проектов сдано" },
  { value: "3", label: "дня — средний срок" },
  { value: "100%", label: "гарантия качества" },
];

const MARQUEE_ITEMS = [
  "ОБЪЁМНЫЕ БУКВЫ", "НЕОН", "СВЕТОВЫЕ КОРОБА", "БАННЕРЫ", "3D-ПЕЧАТЬ",
  "ШТЕНДЕРЫ", "ТАБЛИЧКИ", "ДИЗАЙН", "ПЛОСКИЕ БУКВЫ", "ВЫВЕСКИ",
];

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function RevealSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} ${className}`}
    >
      {children}
    </div>
  );
}

function PreviewModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [text, setText] = useState("ВАША ВЫВЕСКА");
  const [style, setStyle] = useState<"neon" | "3d" | "banner">("neon");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <div
        className="relative bg-[#111] border border-[#FFE600]/30 rounded-lg w-full max-w-2xl p-8 z-10"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors">
          <Icon name="X" size={24} />
        </button>
        <h3 className="font-oswald text-2xl text-[#FFE600] mb-2 uppercase tracking-wider">3D-превью вывески</h3>
        <p className="text-white/50 text-sm mb-6">Введи текст и выбери стиль — увидишь, как будет выглядеть</p>

        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value.toUpperCase())}
          maxLength={20}
          className="w-full bg-[#1a1a1a] border border-white/10 rounded px-4 py-3 text-white font-oswald text-lg uppercase focus:outline-none focus:border-[#FFE600]/60 transition-colors mb-5"
          placeholder="ВАША ВЫВЕСКА"
        />

        <div className="flex gap-3 mb-8">
          {(["neon", "3d", "banner"] as const).map(s => (
            <button
              key={s}
              onClick={() => setStyle(s)}
              className={`flex-1 py-2 rounded border font-oswald text-sm uppercase tracking-wider transition-all ${
                style === s
                  ? "bg-[#FFE600] text-[#0A0A0A] border-[#FFE600] font-bold"
                  : "bg-transparent text-white/60 border-white/20 hover:border-white/40"
              }`}
            >
              {s === "neon" ? "Неон" : s === "3d" ? "3D буквы" : "Баннер"}
            </button>
          ))}
        </div>

        <div
          className="relative rounded-lg overflow-hidden flex items-center justify-center h-52"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=60')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/55" />
          {style === "neon" && (
            <span
              className="relative font-oswald text-4xl font-bold tracking-widest"
              style={{
                color: "#00F5FF",
                textShadow: "0 0 10px #00F5FF, 0 0 30px #00F5FF, 0 0 70px #00F5FF",
              }}
            >
              {text || "ВАША ВЫВЕСКА"}
            </span>
          )}
          {style === "3d" && (
            <span
              className="relative font-oswald text-4xl font-bold tracking-widest"
              style={{
                color: "#FFE600",
                textShadow: "3px 3px 0 #a08000, 6px 6px 0 #7a6000, 0 0 25px rgba(255,230,0,0.6)",
              }}
            >
              {text || "ВАША ВЫВЕСКА"}
            </span>
          )}
          {style === "banner" && (
            <div className="relative px-8 py-4 rounded" style={{ background: "rgba(255,107,0,0.92)", border: "3px solid #FFE600" }}>
              <span className="font-oswald text-3xl font-bold tracking-wider text-white">
                {text || "ВАША ВЫВЕСКА"}
              </span>
            </div>
          )}
        </div>

        <button
          className="mt-6 w-full py-4 rounded font-oswald text-lg font-bold tracking-widest uppercase transition-all duration-300"
          style={{ background: "#FFE600", color: "#0A0A0A", boxShadow: "0 0 15px #FFE600, 0 0 40px rgba(255,107,0,0.5)" }}
          onClick={onClose}
        >
          Заказать этот вариант →
        </button>
      </div>
    </div>
  );
}

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [activePortfolio, setActivePortfolio] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState({ name: "", phone: "", service: "" });

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] font-rubik overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-[#0A0A0A]/85 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <span className="font-oswald text-2xl font-bold tracking-wider" style={{ color: "#FFE600", textShadow: "0 0 10px #FFE600, 0 0 30px #FF6B00" }}>
            НЕОНАРТ
          </span>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-white/60 hover:text-[#FFE600] font-rubik text-sm tracking-wide transition-colors duration-200"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setPreviewOpen(true)}
              className="border border-[#FFE600]/40 text-[#FFE600] px-4 py-2 rounded text-sm font-oswald tracking-wider uppercase hover:bg-[#FFE600]/10 transition-all"
            >
              3D-превью
            </button>
            <button
              onClick={() => scrollTo("#contacts")}
              className="px-5 py-2 rounded text-sm font-oswald tracking-wider uppercase font-bold transition-all duration-300"
              style={{ background: "#FFE600", color: "#0A0A0A", boxShadow: "0 0 15px #FFE600, 0 0 30px rgba(255,107,0,0.4)" }}
            >
              Заказать
            </button>
          </div>

          <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-[#111] border-t border-white/5 px-6 py-4 flex flex-col gap-4">
            {NAV_LINKS.map(link => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-white/80 hover:text-[#FFE600] text-left font-rubik text-base transition-colors"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => { setMenuOpen(false); setPreviewOpen(true); }}
              className="border border-[#FFE600]/40 text-[#FFE600] px-4 py-2 rounded font-oswald tracking-wider uppercase"
            >
              3D-превью
            </button>
            <button
              onClick={() => scrollTo("#contacts")}
              className="py-3 rounded font-oswald tracking-wider uppercase font-bold"
              style={{ background: "#FFE600", color: "#0A0A0A" }}
            >
              Заказать
            </button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden" style={{ clipPath: "polygon(0 0, 100% 0, 100% 90%, 0 100%)" }}>
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${HERO_IMAGE}')` }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, #0A0A0A 40%, rgba(10,10,10,0.7) 70%, rgba(10,10,10,0.3) 100%)" }} />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: "linear-gradient(rgba(255,230,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,230,0,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent, #0A0A0A)" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-36">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-8" style={{ background: "rgba(255,230,0,0.1)", border: "1px solid rgba(255,230,0,0.25)" }}>
            <span className="w-2 h-2 rounded-full bg-[#FFE600] animate-pulse inline-block" />
            <span className="text-[#FFE600] text-sm font-oswald tracking-widest uppercase">Производство в Москве</span>
          </div>

          <h1 className="font-oswald font-bold leading-none mb-6" style={{ fontSize: "clamp(3rem, 10vw, 8rem)" }}>
            <span className="block text-white">НАРУЖНАЯ</span>
            <span
              className="block"
              style={{ color: "#FFE600", textShadow: "0 0 20px #FFE600, 0 0 50px #FFE600, 0 0 90px #FF6B00" }}
            >
              РЕКЛАМА
            </span>
            <span
              className="block"
              style={{
                WebkitTextStroke: "2px rgba(255,255,255,0.15)",
                color: "transparent",
                fontSize: "clamp(2rem, 7vw, 6rem)",
              }}
            >
              КОТОРУЮ ВИДЯТ
            </span>
          </h1>

          <p className="text-white/55 text-lg md:text-xl max-w-lg mb-10 font-rubik font-light leading-relaxed">
            Производим вывески, неон, объёмные буквы и световые короба.<br />
            От макета до монтажа — под ключ, с гарантией.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => scrollTo("#contacts")}
              className="px-8 py-4 rounded font-oswald text-lg font-bold tracking-widest uppercase transition-all duration-300 hover:-translate-y-1"
              style={{ background: "#FFE600", color: "#0A0A0A", boxShadow: "0 0 20px #FFE600, 0 0 50px rgba(255,107,0,0.5)" }}
            >
              Получить расчёт
            </button>
            <button
              onClick={() => setPreviewOpen(true)}
              className="group flex items-center gap-3 border text-white px-8 py-4 rounded font-oswald text-lg tracking-wider uppercase hover:border-[#FFE600]/50 hover:text-[#FFE600] transition-all duration-300"
              style={{ borderColor: "rgba(255,255,255,0.2)" }}
            >
              <Icon name="Eye" size={20} />
              3D-превью вывески
            </button>
          </div>

          <div className="flex flex-wrap gap-8 mt-16">
            {STATS.map((s, i) => (
              <div key={s.label}>
                <div
                  className="font-oswald text-3xl md:text-4xl font-bold"
                  style={{ color: ["#FFE600", "#FF6B00", "#00F5FF", "#FF2D55"][i], textShadow: `0 0 10px ${["#FFE600", "#FF6B00", "#00F5FF", "#FF2D55"][i]}` }}
                >
                  {s.value}
                </div>
                <div className="text-white/35 text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden py-3 relative z-10" style={{ background: "#FFE600" }}>
        <div className="flex animate-marquee whitespace-nowrap">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="font-oswald text-[#0A0A0A] text-sm font-bold tracking-widest uppercase mx-8 flex items-center gap-4">
              {item}
              <span className="text-[#0A0A0A]/35">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* SERVICES */}
      <section id="services" className="py-32 relative">
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: "linear-gradient(rgba(255,230,0,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,230,0,0.025) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="max-w-7xl mx-auto px-6 relative">
          <RevealSection>
            <div className="flex items-end justify-between mb-16">
              <div>
                <span className="font-oswald text-sm tracking-widest uppercase mb-3 block" style={{ color: "#FFE600" }}>
                  Что мы делаем
                </span>
                <h2 className="font-oswald font-bold text-white leading-none" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
                  НАШИ
                  <span
                    className="ml-4"
                    style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)", color: "transparent" }}
                  >
                    УСЛУГИ
                  </span>
                </h2>
              </div>
              <span className="hidden md:block text-white/10 font-oswald font-bold leading-none select-none" style={{ fontSize: "8rem" }}>
                09
              </span>
            </div>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((service, i) => (
              <RevealSection key={service.title}>
                <div
                  className="group relative bg-[#111] border border-white/5 rounded-lg p-6 cursor-pointer overflow-hidden transition-all duration-350 hover:-translate-y-1.5 hover:scale-[1.02]"
                  style={{ transitionDuration: "350ms" }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"
                    style={{ background: `radial-gradient(circle at 50% 0%, ${service.color}12 0%, transparent 70%)` }}
                  />
                  <div
                    className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `linear-gradient(90deg, transparent, ${service.color}, transparent)` }}
                  />

                  <div className="relative flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                      style={{ background: `${service.color}15`, border: `1px solid ${service.color}30` }}
                    >
                      <Icon name={service.icon} size={22} style={{ color: service.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-oswald text-lg font-semibold text-white group-hover:text-[#FFE600] transition-colors duration-300">
                          {service.title}
                        </h3>
                        {service.tag && (
                          <span
                            className="text-xs font-oswald font-bold px-2 py-0.5 rounded-full"
                            style={{ background: `${service.color}18`, color: service.color, border: `1px solid ${service.color}35` }}
                          >
                            {service.tag}
                          </span>
                        )}
                      </div>
                      <p className="text-white/45 text-sm leading-relaxed">{service.desc}</p>
                    </div>
                  </div>

                  <div className="relative mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-white/25 text-xs font-oswald tracking-wider uppercase">Узнать стоимость</span>
                    <Icon name="ArrowRight" size={16} className="text-white/25 group-hover:text-[#FFE600] group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="relative overflow-hidden py-20 my-4">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #1a0a00 0%, #0d0d0d 40%, #001a1a 100%)" }} />
        <div
          className="absolute inset-0 opacity-25"
          style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(255,230,0,0.04) 30px, rgba(255,230,0,0.04) 60px)" }}
        />
        <div className="absolute left-0 top-0 bottom-0 w-1 animate-glow-border" style={{ background: "#FFE600", boxShadow: "0 0 8px #FFE600, 0 0 20px #FF6B00" }} />

        <div className="relative max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-oswald font-bold text-white leading-tight" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>
              Хочешь увидеть, как будет<br />
              <span style={{ color: "#FFE600", textShadow: "0 0 10px #FFE600, 0 0 30px #FF6B00" }}>выглядеть твоя вывеска?</span>
            </h2>
            <p className="text-white/45 mt-3 font-rubik">Попробуй наш 3D-конструктор — введи текст и выбери стиль</p>
          </div>
          <button
            onClick={() => setPreviewOpen(true)}
            className="group flex items-center gap-3 px-8 py-5 rounded font-oswald text-xl font-bold tracking-widest uppercase whitespace-nowrap transition-all duration-300 hover:-translate-y-1"
            style={{ background: "#FFE600", color: "#0A0A0A", boxShadow: "0 0 20px #FFE600, 0 0 50px rgba(255,107,0,0.5)" }}
          >
            <Icon name="Sparkles" size={22} />
            Открыть превью
          </button>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <RevealSection>
            <div className="mb-16">
              <span className="font-oswald text-sm tracking-widest uppercase mb-3 block" style={{ color: "#FF6B00" }}>Наши работы</span>
              <h2 className="font-oswald font-bold text-white leading-none" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
                ПОРТФОЛИО
              </h2>
            </div>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PORTFOLIO.map((item, i) => (
              <RevealSection key={item.title}>
                <div
                  className="group relative rounded-lg overflow-hidden cursor-pointer"
                  style={{ aspectRatio: "4/3" }}
                  onMouseEnter={() => setActivePortfolio(i)}
                  onMouseLeave={() => setActivePortfolio(null)}
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.2) 50%, transparent 100%)" }} />
                  <div
                    className="absolute inset-0 transition-opacity duration-300"
                    style={{ background: "linear-gradient(to top, rgba(255,230,0,0.15), transparent)", opacity: activePortfolio === i ? 1 : 0 }}
                  />

                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="text-xs font-oswald tracking-widest uppercase mb-1" style={{ color: "#FFE600" }}>{item.type}</div>
                    <h3 className="font-oswald text-xl font-bold text-white">{item.title}</h3>
                  </div>

                  <div
                    className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
                    style={{ background: "#FFE600" }}
                  >
                    <Icon name="ArrowUpRight" size={18} className="text-[#0A0A0A]" />
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>

          <RevealSection className="text-center mt-12">
            <button className="border border-white/15 text-white/50 hover:text-white hover:border-white/35 px-10 py-4 rounded font-oswald tracking-widest uppercase transition-all duration-300">
              Смотреть все работы
            </button>
          </RevealSection>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-32 relative overflow-hidden">
        <div
          className="absolute right-0 top-0 w-1/2 h-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse at right, rgba(255,230,0,0.06), transparent 70%)" }}
        />
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <RevealSection>
              <div>
                <span className="font-oswald text-sm tracking-widest uppercase mb-3 block" style={{ color: "#FFE600" }}>О компании</span>
                <h2 className="font-oswald font-bold text-white leading-tight mb-8" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}>
                  МЫ ДЕЛАЕМ<br />
                  <span style={{ color: "#FFE600", textShadow: "0 0 10px #FFE600, 0 0 30px #FF6B00" }}>РЕКЛАМУ</span><br />
                  ЗАМЕТНОЙ
                </h2>
                <p className="text-white/55 leading-relaxed mb-6 font-rubik">
                  НЕОНАРТ — производственная компания с собственным цехом в Москве. Мы работаем с 2012 года
                  и за это время реализовали более 850 проектов для кафе, магазинов, офисов и торговых центров.
                </p>
                <p className="text-white/55 leading-relaxed mb-10 font-rubik">
                  Полный цикл: от разработки дизайна и согласования до изготовления и монтажа.
                  Выезжаем на замер бесплатно, работаем по всей Москве и МО.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: "Award", text: "Собственное производство" },
                    { icon: "Clock", text: "Срок от 3 дней" },
                    { icon: "Truck", text: "Монтаж под ключ" },
                    { icon: "Shield", text: "Гарантия 2 года" },
                  ].map(item => (
                    <div key={item.text} className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0"
                        style={{ background: "rgba(255,230,0,0.1)", border: "1px solid rgba(255,230,0,0.2)" }}
                      >
                        <Icon name={item.icon} size={16} style={{ color: "#FFE600" }} />
                      </div>
                      <span className="text-white/65 text-sm">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </RevealSection>

            <RevealSection>
              <div className="grid grid-cols-2 gap-4">
                {STATS.map((s, i) => (
                  <div
                    key={s.label}
                    className="bg-[#111] border border-white/5 rounded-lg p-6 text-center group hover:border-[#FFE600]/25 transition-all duration-300"
                  >
                    <div
                      className="font-oswald text-4xl font-bold mb-2"
                      style={{ color: ["#FFE600", "#FF6B00", "#00F5FF", "#FF2D55"][i] }}
                    >
                      {s.value}
                    </div>
                    <div className="text-white/35 text-sm">{s.label}</div>
                  </div>
                ))}
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-32 relative">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: "linear-gradient(rgba(255,230,0,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,230,0,0.025) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="max-w-7xl mx-auto px-6 relative">
          <RevealSection>
            <div className="text-center mb-16">
              <span className="font-oswald text-sm tracking-widest uppercase mb-3 block" style={{ color: "#FFE600" }}>Связаться с нами</span>
              <h2 className="font-oswald font-bold text-white" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
                ПОЛУЧИТЬ<br />
                <span style={{ color: "#FFE600", textShadow: "0 0 10px #FFE600, 0 0 30px #FF6B00" }}>РАСЧЁТ</span>
              </h2>
              <p className="text-white/35 mt-4 font-rubik">Оставьте заявку — перезвоним в течение 15 минут в рабочее время</p>
            </div>
          </RevealSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <RevealSection>
              <form className="space-y-4" onSubmit={e => e.preventDefault()}>
                <input
                  type="text"
                  placeholder="Ваше имя"
                  value={contactForm.name}
                  onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
                  className="w-full bg-[#111] border border-white/10 rounded px-4 py-4 text-white placeholder-white/25 focus:outline-none focus:border-[#FFE600]/50 transition-colors font-rubik"
                />
                <input
                  type="tel"
                  placeholder="Номер телефона"
                  value={contactForm.phone}
                  onChange={e => setContactForm({ ...contactForm, phone: e.target.value })}
                  className="w-full bg-[#111] border border-white/10 rounded px-4 py-4 text-white placeholder-white/25 focus:outline-none focus:border-[#FFE600]/50 transition-colors font-rubik"
                />
                <select
                  value={contactForm.service}
                  onChange={e => setContactForm({ ...contactForm, service: e.target.value })}
                  className="w-full bg-[#111] border border-white/10 rounded px-4 py-4 text-white focus:outline-none focus:border-[#FFE600]/50 transition-colors font-rubik appearance-none"
                >
                  <option value="" className="bg-[#111]">Выберите услугу</option>
                  {SERVICES.map(s => (
                    <option key={s.title} value={s.title} className="bg-[#111]">{s.title}</option>
                  ))}
                </select>
                <button
                  type="submit"
                  className="w-full py-4 rounded font-oswald text-lg font-bold tracking-widest uppercase transition-all duration-300 hover:-translate-y-0.5"
                  style={{ background: "#FFE600", color: "#0A0A0A", boxShadow: "0 0 15px #FFE600, 0 0 40px rgba(255,107,0,0.4)" }}
                >
                  Отправить заявку
                </button>
                <p className="text-white/20 text-xs text-center">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
              </form>
            </RevealSection>

            <RevealSection>
              <div className="space-y-4">
                {[
                  { icon: "Phone", label: "Телефон", value: "+7 (495) 000-00-00", color: "#FFE600" },
                  { icon: "Mail", label: "Email", value: "info@neonart.ru", color: "#00F5FF" },
                  { icon: "MapPin", label: "Адрес", value: "Москва, ул. Производственная, 10", color: "#FF6B00" },
                  { icon: "Clock", label: "Режим работы", value: "Пн–Пт: 9:00–19:00, Сб: 10:00–16:00", color: "#FF2D55" },
                ].map(item => (
                  <div
                    key={item.label}
                    className="flex items-start gap-4 p-4 bg-[#111] border border-white/5 rounded-lg hover:border-white/10 transition-colors"
                  >
                    <div
                      className="w-10 h-10 rounded flex items-center justify-center flex-shrink-0"
                      style={{ background: `${item.color}15`, border: `1px solid ${item.color}30` }}
                    >
                      <Icon name={item.icon} size={18} style={{ color: item.color }} />
                    </div>
                    <div>
                      <div className="text-white/28 text-xs font-oswald tracking-wider uppercase mb-1">{item.label}</div>
                      <div className="text-white font-rubik">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-oswald text-xl font-bold tracking-wider" style={{ color: "#FFE600" }}>НЕОНАРТ</span>
          <span className="text-white/18 text-sm">© 2024 НЕОНАРТ. Производство наружной рекламы в Москве.</span>
          <div className="flex gap-6">
            {NAV_LINKS.map(link => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-white/28 hover:text-white/60 text-sm transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </footer>

      <PreviewModal open={previewOpen} onClose={() => setPreviewOpen(false)} />
    </div>
  );
};

export default Index;
