import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/26ee31ff-cccb-473e-bbab-b13675945909/files/7b919976-8328-4a3a-9faf-554f2dfe9a1c.jpg";

const NAV_LINKS = [
  { label: "Главная", href: "#hero" },
  { label: "Услуги", href: "#services" },
  { label: "Калькулятор", href: "#calc" },
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
    title: "3D-печать и печать по фото",
    desc: "Сложные формы и детали на 3D-принтере, фотопечать высокого разрешения на любых носителях. Прототипы и готовые изделия.",
    color: "#FFE600",
    tag: "НОВИНКА",
  },
];

const PORTFOLIO = [
  { title: "Кафе «Восток»", type: "Объёмные буквы + Неон", img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80" },
  { title: "ТЦ Меридиан", type: "Световые короба", img: "https://images.unsplash.com/photo-1567653418876-5bb0e566e1c2?w=600&q=80" },
  { title: "Barbershop MAXIM", type: "Гибкий неон", img: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&q=80" },
  { title: "Офис IT-компании", type: "Плоские буквы + 3D", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80" },
  { title: "Ресторан SAKURA", type: "Вывеска + Подсветка", img: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&q=80" },
  { title: "Автосалон Drive", type: "Баннеры + Короба", img: "https://images.unsplash.com/photo-1502161254066-6c74afbf07aa?w=600&q=80" },
];

const STATS = [
  { value: "10+", label: "лет на рынке" },
  { value: "850+", label: "проектов сдано" },
  { value: "3", label: "дня — средний срок" },
  { value: "100%", label: "гарантия качества" },
];

const MARQUEE_ITEMS = [
  "ОБЪЁМНЫЕ БУКВЫ", "НЕОН", "СВЕТОВЫЕ КОРОБА", "БАННЕРЫ", "3D-ПЕЧАТЬ",
  "ШТЕНДЕРЫ", "ТАБЛИЧКИ", "ДИЗАЙН", "ПЛОСКИЕ БУКВЫ", "ВЫВЕСКИ",
];

const CALC_ITEMS = [
  { label: "Изготовление баннеров", price: 1300, unit: "м²", icon: "Image" },
  { label: "Информационный стенд", price: 2000, unit: "шт", icon: "PanelTop" },
  { label: "Изготовление вывески", price: 3000, unit: "шт", icon: "Store" },
  { label: "Объёмные буквы", price: 120, unit: "см²", icon: "Type" },
  { label: "Плоские буквы", price: 60, unit: "см²", icon: "AlignLeft" },
  { label: "Таблички", price: 600, unit: "шт", icon: "MapPin" },
  { label: "Штендеры", price: 7500, unit: "шт", icon: "Triangle" },
  { label: "Оклейка витрин", price: 2000, unit: "м²", icon: "Square" },
  { label: "Монтаж наружной рекламы", price: 1500, unit: "шт", icon: "Wrench" },
];

const NEON_COLORS = ["#00F5FF", "#FF2D55", "#FFE600", "#FF6B00", "#A855F7", "#22C55E", "#FFFFFF"];

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

function PreviewModal({ open, onClose, onOrder }: { open: boolean; onClose: () => void; onOrder: () => void }) {
  const [text, setText] = useState("ВАША ВЫВЕСКА");
  const [style, setStyle] = useState<"neon" | "3d" | "banner">("neon");
  const [neonColor, setNeonColor] = useState("#00F5FF");
  const [fontSize, setFontSize] = useState(40);

  if (!open) return null;

  const handleOrder = () => {
    onClose();
    onOrder();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <div
        className="relative bg-[#111] border border-[#FFE600]/30 rounded-lg w-full max-w-2xl p-8 z-10 max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors">
          <Icon name="X" size={24} />
        </button>
        <h3 className="font-oswald text-2xl text-[#FFE600] mb-2 uppercase tracking-wider">3D-превью вывески</h3>
        <p className="text-white/50 text-sm mb-5">Введи текст, выбери стиль, цвет и размер</p>

        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value.toUpperCase())}
          maxLength={20}
          className="w-full bg-[#1a1a1a] border border-white/10 rounded px-4 py-3 text-white font-oswald text-lg uppercase focus:outline-none focus:border-[#FFE600]/60 transition-colors mb-4"
          placeholder="ВАША ВЫВЕСКА"
        />

        {/* Style tabs */}
        <div className="flex gap-3 mb-5">
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

        {/* Color palette (only for neon and 3d) */}
        {(style === "neon" || style === "3d") && (
          <div className="mb-5">
            <p className="text-white/40 text-xs font-oswald tracking-wider uppercase mb-2">Цвет текста</p>
            <div className="flex gap-2 flex-wrap">
              {NEON_COLORS.map(c => (
                <button
                  key={c}
                  onClick={() => setNeonColor(c)}
                  className="w-8 h-8 rounded-full border-2 transition-transform hover:scale-110"
                  style={{
                    background: c,
                    borderColor: neonColor === c ? "#fff" : "transparent",
                    boxShadow: neonColor === c ? `0 0 8px ${c}` : "none",
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Font size slider */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-white/40 text-xs font-oswald tracking-wider uppercase">Размер текста</p>
            <span className="text-[#FFE600] text-xs font-oswald">{fontSize}px</span>
          </div>
          <input
            type="range"
            min={20}
            max={72}
            value={fontSize}
            onChange={e => setFontSize(Number(e.target.value))}
            className="w-full accent-[#FFE600] h-1 cursor-pointer"
          />
        </div>

        {/* Preview canvas */}
        <div
          className="relative rounded-lg overflow-hidden flex items-center justify-center"
          style={{
            height: "200px",
            backgroundImage: "url('https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=60')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/55" />
          {style === "neon" && (
            <span
              className="relative font-oswald font-bold tracking-widest px-4 text-center"
              style={{
                color: neonColor,
                fontSize: `${fontSize}px`,
                textShadow: `0 0 10px ${neonColor}, 0 0 30px ${neonColor}, 0 0 70px ${neonColor}`,
                lineHeight: 1.2,
              }}
            >
              {text || "ВАША ВЫВЕСКА"}
            </span>
          )}
          {style === "3d" && (
            <span
              className="relative font-oswald font-bold tracking-widest px-4 text-center"
              style={{
                color: neonColor,
                fontSize: `${fontSize}px`,
                textShadow: `3px 3px 0 rgba(0,0,0,0.8), 6px 6px 0 rgba(0,0,0,0.5), 0 0 25px ${neonColor}60`,
                lineHeight: 1.2,
              }}
            >
              {text || "ВАША ВЫВЕСКА"}
            </span>
          )}
          {style === "banner" && (
            <div className="relative px-8 py-4 rounded" style={{ background: "rgba(255,107,0,0.92)", border: "3px solid #FFE600" }}>
              <span
                className="font-oswald font-bold tracking-wider text-white block text-center"
                style={{ fontSize: `${Math.min(fontSize, 48)}px` }}
              >
                {text || "ВАША ВЫВЕСКА"}
              </span>
            </div>
          )}
        </div>

        <button
          className="mt-6 w-full py-4 rounded font-oswald text-lg font-bold tracking-widest uppercase transition-all duration-300 hover:-translate-y-0.5"
          style={{ background: "#FFE600", color: "#0A0A0A", boxShadow: "0 0 15px #FFE600, 0 0 40px rgba(255,107,0,0.5)" }}
          onClick={handleOrder}
        >
          Заказать этот вариант →
        </button>
      </div>
    </div>
  );
}

function Calculator() {
  const [quantities, setQuantities] = useState<Record<string, number>>(
    Object.fromEntries(CALC_ITEMS.map(i => [i.label, 0]))
  );

  const total = CALC_ITEMS.reduce((sum, item) => sum + item.price * (quantities[item.label] || 0), 0);

  const setQty = (label: string, val: number) => {
    setQuantities(prev => ({ ...prev, [label]: Math.max(0, val) }));
  };

  return (
    <section id="calc" className="py-32 relative">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: "linear-gradient(rgba(255,107,0,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,107,0,0.025) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="max-w-7xl mx-auto px-6 relative">
        <RevealSection>
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="font-oswald text-sm tracking-widest uppercase mb-3 block" style={{ color: "#FF6B00" }}>
                Прозрачные цены
              </span>
              <h2 className="font-oswald font-bold text-white leading-none" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
                КАЛЬКУЛЯТОР
                <span
                  className="ml-4"
                  style={{ WebkitTextStroke: "1px rgba(255,255,255,0.15)", color: "transparent" }}
                >
                  СТОИМОСТИ
                </span>
              </h2>
              <p className="text-white/40 mt-3 font-rubik text-sm">Укажите количество — узнайте примерную стоимость заказа</p>
            </div>
          </div>
        </RevealSection>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            {CALC_ITEMS.map(item => (
              <RevealSection key={item.label}>
                <div className="group flex items-center justify-between bg-[#111] border border-white/5 rounded-lg px-5 py-4 hover:border-[#FF6B00]/30 transition-all duration-300">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div
                      className="w-10 h-10 rounded flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(255,107,0,0.1)", border: "1px solid rgba(255,107,0,0.2)" }}
                    >
                      <Icon name={item.icon} size={18} style={{ color: "#FF6B00" }} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-white font-rubik text-sm font-medium truncate">{item.label}</p>
                      <p className="text-white/35 text-xs">от {item.price.toLocaleString("ru-RU")} ₽ / {item.unit}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 ml-4 flex-shrink-0">
                    <button
                      onClick={() => setQty(item.label, (quantities[item.label] || 0) - 1)}
                      className="w-8 h-8 rounded border border-white/10 flex items-center justify-center text-white/60 hover:border-[#FF6B00]/50 hover:text-[#FF6B00] transition-all"
                    >
                      <Icon name="Minus" size={14} />
                    </button>
                    <input
                      type="number"
                      min={0}
                      value={quantities[item.label] || 0}
                      onChange={e => setQty(item.label, Number(e.target.value))}
                      className="w-14 text-center bg-[#1a1a1a] border border-white/10 rounded px-2 py-1 text-white text-sm focus:outline-none focus:border-[#FF6B00]/50"
                    />
                    <button
                      onClick={() => setQty(item.label, (quantities[item.label] || 0) + 1)}
                      className="w-8 h-8 rounded border border-white/10 flex items-center justify-center text-white/60 hover:border-[#FF6B00]/50 hover:text-[#FF6B00] transition-all"
                    >
                      <Icon name="Plus" size={14} />
                    </button>
                    <div className="w-28 text-right">
                      <span className="font-oswald text-sm" style={{ color: quantities[item.label] ? "#FF6B00" : "rgba(255,255,255,0.2)" }}>
                        {(item.price * (quantities[item.label] || 0)).toLocaleString("ru-RU")} ₽
                      </span>
                    </div>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>

          <RevealSection>
            <div
              className="sticky top-24 bg-[#111] border rounded-lg p-6"
              style={{ borderColor: total > 0 ? "rgba(255,107,0,0.4)" : "rgba(255,255,255,0.05)" }}
            >
              <h3 className="font-oswald text-lg text-white uppercase tracking-wider mb-6">Итого</h3>
              <div className="space-y-3 mb-6 max-h-60 overflow-y-auto pr-1">
                {CALC_ITEMS.filter(i => quantities[i.label] > 0).map(item => (
                  <div key={item.label} className="flex justify-between items-start gap-2 text-sm">
                    <span className="text-white/50 font-rubik leading-tight">{item.label} × {quantities[item.label]}</span>
                    <span className="text-white/80 font-oswald whitespace-nowrap">
                      {(item.price * quantities[item.label]).toLocaleString("ru-RU")} ₽
                    </span>
                  </div>
                ))}
                {total === 0 && (
                  <p className="text-white/25 text-sm text-center py-4">Добавьте позиции для расчёта</p>
                )}
              </div>

              <div className="border-t border-white/10 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-white/50 font-rubik text-sm">Итоговая сумма</span>
                  <span
                    className="font-oswald text-2xl font-bold"
                    style={{ color: total > 0 ? "#FF6B00" : "rgba(255,255,255,0.2)" }}
                  >
                    {total.toLocaleString("ru-RU")} ₽
                  </span>
                </div>
                <p className="text-white/25 text-xs mt-1">* Финальная стоимость уточняется при заказе</p>
              </div>

              <button
                onClick={() => document.querySelector("#contacts")?.scrollIntoView({ behavior: "smooth" })}
                className="w-full py-4 rounded font-oswald font-bold tracking-widest uppercase transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: total > 0 ? "#FF6B00" : "#222",
                  color: total > 0 ? "#fff" : "rgba(255,255,255,0.3)",
                  boxShadow: total > 0 ? "0 0 15px rgba(255,107,0,0.5)" : "none",
                }}
              >
                Оформить заявку
              </button>

              <button
                onClick={() => setQuantities(Object.fromEntries(CALC_ITEMS.map(i => [i.label, 0])))}
                className="w-full mt-2 py-2 rounded font-oswald text-sm tracking-wider text-white/25 hover:text-white/50 transition-colors uppercase"
              >
                Очистить
              </button>
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
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

  const scrollToContacts = () => scrollTo("#contacts");

  return (
    <div className="min-h-screen bg-[#0A0A0A] font-rubik overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-[#0A0A0A]/85 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <span className="font-oswald text-2xl font-bold tracking-wider" style={{ color: "#FFE600", textShadow: "0 0 10px #FFE600, 0 0 30px #FF6B00" }}>
            ВИЗУАЛ ПРО
          </span>

          <div className="hidden md:flex items-center gap-6">
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
            <span className="text-[#FFE600] text-sm font-oswald tracking-widest uppercase">Производство в Калининграде</span>
          </div>

          <h1 className="font-oswald font-bold leading-none mb-6" style={{ fontSize: "clamp(3rem, 10vw, 8rem)" }}>
            <span className="block text-white">НАРУЖНАЯ</span>
            <span className="block" style={{ color: "#FFE600", textShadow: "0 0 20px #FFE600, 0 0 50px #FFE600, 0 0 90px #FF6B00" }}>
              РЕКЛАМА
            </span>
            <span
              className="block"
              style={{ WebkitTextStroke: "2px rgba(255,255,255,0.15)", color: "transparent", fontSize: "clamp(2rem, 7vw, 6rem)" }}
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
                  <span className="ml-4" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)", color: "transparent" }}>
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
            {SERVICES.map((service) => (
              <RevealSection key={service.title}>
                <div
                  className="group relative bg-[#111] border border-white/5 rounded-lg p-6 cursor-pointer overflow-hidden transition-all hover:-translate-y-1.5 hover:scale-[1.02]"
                  style={{ transitionDuration: "350ms" }}
                  onClick={() => scrollTo("#contacts")}
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
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
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

      {/* CALCULATOR */}
      <Calculator />

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
            <p className="text-white/45 mt-3 font-rubik">Попробуй наш 3D-конструктор — введи текст, выбери стиль и цвет</p>
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

                <p className="text-white/70 leading-relaxed mb-4 font-rubik text-base">
                  Вас приветствует команда <span className="text-[#FFE600] font-semibold">Визуал ПРО!</span> Мы готовы гарантировать:
                </p>
                <ul className="text-white/60 mb-6 font-rubik space-y-1">
                  <li className="flex items-center gap-2"><span style={{ color: "#FFE600" }}>✦</span> Лояльные цены</li>
                  <li className="flex items-center gap-2"><span style={{ color: "#FFE600" }}>✦</span> Индивидуальный подход</li>
                  <li className="flex items-center gap-2"><span style={{ color: "#FFE600" }}>✦</span> Высокое качество</li>
                  <li className="flex items-center gap-2"><span style={{ color: "#FFE600" }}>✦</span> Соблюдение сроков</li>
                </ul>
                <p className="text-white/65 leading-relaxed mb-4 font-rubik">
                  Если Вам нужна ✨<span className="text-[#FFE600] font-semibold">ЯРКАЯ</span>✨ наружная реклама — мы будем рады видеть Вас в числе наших клиентов!
                </p>
                <p className="text-white/55 leading-relaxed mb-10 font-rubik">
                  Лучшие материалы, качественная сборка, эксклюзивный дизайн.
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
                    <div className="font-oswald text-4xl font-bold mb-2" style={{ color: ["#FFE600", "#FF6B00", "#00F5FF", "#FF2D55"][i] }}>
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
                НАЧНЁМ<br />
                <span style={{ color: "#FFE600", textShadow: "0 0 10px #FFE600, 0 0 30px #FF6B00" }}>РАБОТАТЬ</span>
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
                  { icon: "Phone", label: "Телефон", value: "+7 (921) 618-98-86", color: "#FFE600" },
                  { icon: "Mail", label: "Email", value: "vizualpro39@mail.ru", color: "#00F5FF" },
                  { icon: "MapPin", label: "Адрес", value: "г. Калининград, Киевский переулок, д. 1А", color: "#FF6B00" },
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
                      <div className="text-white/30 text-xs font-oswald tracking-wider uppercase mb-1">{item.label}</div>
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
          <span className="font-oswald text-xl font-bold tracking-wider" style={{ color: "#FFE600" }}>ВИЗУАЛ ПРО</span>
          <span className="text-white/18 text-sm">© 2024 Визуал ПРО. Производство наружной рекламы в Калининграде.</span>
          <div className="flex gap-6 flex-wrap justify-center">
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

      <PreviewModal open={previewOpen} onClose={() => setPreviewOpen(false)} onOrder={scrollToContacts} />
    </div>
  );
};

export default Index;
