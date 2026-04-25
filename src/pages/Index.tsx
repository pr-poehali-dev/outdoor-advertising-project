import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/26ee31ff-cccb-473e-bbab-b13675945909/files/3db3a9fc-9243-44d2-9a70-635eb410ddee.jpg";

const NAV_LINKS = [
  { label: "Главная", href: "#hero" },
  { label: "Услуги", href: "#services" },
  { label: "Калькулятор", href: "#calc" },
  { label: "Портфолио", href: "#portfolio" },
  { label: "О компании", href: "#about" },
  { label: "Контакты", href: "#contacts" },
];

const SERVICES = [
  { icon: "Type", title: "Объёмные буквы", desc: "Буквы из акрила, металла, пластика с внутренней или контражурной подсветкой. Эффектно смотрятся круглосуточно.", color: "#FFE600", tag: "ХИТ" },
  { icon: "AlignLeft", title: "Плоские буквы", desc: "Вырезанные буквы из металла, акрила или ПВХ. Лаконично, стильно, доступно.", color: "#FF6B00", tag: null },
  { icon: "Image", title: "Баннер", desc: "Широкоформатная печать на баннерной ткани. Быстро, ярко, любой размер.", color: "#00F5FF", tag: null },
  { icon: "Square", title: "Световые короба", desc: "Лайтбоксы с равномерной подсветкой. Видны днём и ночью, защищены от непогоды.", color: "#FF2D55", tag: null },
  { icon: "PanelTop", title: "Штендер", desc: "Мобильная выносная конструкция. Ставится у входа, привлекает прохожих.", color: "#FFE600", tag: null },
  { icon: "MapPin", title: "Адресные таблички", desc: "Информационные таблички любой сложности: металл, акрил, гравировка.", color: "#FF6B00", tag: null },
  { icon: "Zap", title: "Гибкий неон", desc: "Светящиеся вывески и арт-объекты из LED-неона. Нет ничего атмосфернее.", color: "#00F5FF", tag: "🔥 ТРЕНД" },
  { icon: "Palette", title: "Услуги дизайнера", desc: "Разработка макета с нуля, адаптация логотипа, визуализация на фасаде.", color: "#FF2D55", tag: null },
  { icon: "Box", title: "3D-печать и печать по фото", desc: "Сложные формы и детали на 3D-принтере, фотопечать высокого разрешения на любых носителях.", color: "#FFE600", tag: "НОВИНКА" },
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

const NEON_COLORS = ["#00F5FF", "#FF2D55", "#FFE600", "#FF6B00", "#A855F7", "#22C55E", "#FFFFFF"];

type CalcProduct = {
  id: string; label: string; icon: string;
  materials: { label: string; multiplier: number }[];
  byArea: true; pricePerM2: number; pricePerUnit?: never;
} | {
  id: string; label: string; icon: string;
  materials: { label: string; multiplier: number }[];
  byArea: false; pricePerUnit: number; pricePerM2?: never;
};

// Калькулятор: типы продуктов
const CALC_PRODUCTS: CalcProduct[] = [
  {
    id: "banner",
    label: "Баннер",
    icon: "Image",
    pricePerM2: 1300,
    byArea: true,
    materials: [
      { label: "Баннерная ткань 440 г/м²", multiplier: 1.0 },
      { label: "Баннерная ткань 650 г/м² (усиленная)", multiplier: 1.4 },
      { label: "Сетка (ветропродуваемая)", multiplier: 1.2 },
      { label: "Пленка самоклеящаяся", multiplier: 1.5 },
    ],
  },
  {
    id: "objem",
    label: "Объёмные буквы",
    icon: "Type",
    pricePerM2: 12000,
    byArea: true,
    materials: [
      { label: "Акрил", multiplier: 1.0 },
      { label: "Нержавеющая сталь", multiplier: 1.8 },
      { label: "Пластик ABS", multiplier: 0.85 },
      { label: "Композит", multiplier: 1.3 },
    ],
  },
  {
    id: "flat",
    label: "Плоские буквы",
    icon: "AlignLeft",
    pricePerM2: 6000,
    byArea: true,
    materials: [
      { label: "ПВХ 10 мм", multiplier: 1.0 },
      { label: "Акрил", multiplier: 1.2 },
      { label: "Нержавейка", multiplier: 1.7 },
      { label: "Оцинкованная сталь", multiplier: 1.4 },
    ],
  },
  {
    id: "lightbox",
    label: "Световой короб",
    icon: "Square",
    pricePerM2: 8500,
    byArea: true,
    materials: [
      { label: "Акрил + алюминиевый профиль", multiplier: 1.0 },
      { label: "Композит + акрил", multiplier: 1.2 },
      { label: "Нержавейка + акрил", multiplier: 1.6 },
    ],
  },
  {
    id: "stend",
    label: "Информ. стенд",
    icon: "PanelTop",
    pricePerUnit: 2000,
    byArea: false,
    materials: [
      { label: "ПВХ + алюминиевая рамка", multiplier: 1.0 },
      { label: "Акрил + нержавейка", multiplier: 1.5 },
      { label: "Дерево + печать", multiplier: 1.3 },
    ],
  },
  {
    id: "sign",
    label: "Вывеска",
    icon: "Store",
    pricePerUnit: 3000,
    byArea: false,
    materials: [
      { label: "Стандарт (ПВХ)", multiplier: 1.0 },
      { label: "Акрил", multiplier: 1.4 },
      { label: "Нержавейка", multiplier: 2.0 },
      { label: "Дерево", multiplier: 1.6 },
    ],
  },
  {
    id: "tabliczka",
    label: "Табличка",
    icon: "MapPin",
    pricePerUnit: 600,
    byArea: false,
    materials: [
      { label: "ПВХ с печатью", multiplier: 1.0 },
      { label: "Акрил с УФ-печатью", multiplier: 1.5 },
      { label: "Металл гравировка", multiplier: 2.2 },
      { label: "Пластик с объёмными буквами", multiplier: 1.8 },
    ],
  },
  {
    id: "shtender",
    label: "Штендер",
    icon: "Triangle",
    pricePerUnit: 7500,
    byArea: false,
    materials: [
      { label: "Металл + баннер", multiplier: 1.0 },
      { label: "Металл + акрил", multiplier: 1.4 },
      { label: "Деревянный", multiplier: 1.2 },
    ],
  },
  {
    id: "okleika",
    label: "Оклейка витрин",
    icon: "Layers",
    pricePerM2: 2000,
    byArea: true,
    materials: [
      { label: "Матовая плёнка", multiplier: 1.0 },
      { label: "Зеркальная плёнка", multiplier: 1.3 },
      { label: "Цветная плёнка", multiplier: 1.1 },
      { label: "Перфорированная (для витрин)", multiplier: 1.5 },
    ],
  },
];

const EXTRA_OPTIONS = [
  { id: "montage", label: "Монтаж", icon: "Wrench", price: 3500 },
  { id: "delivery", label: "Доставка", icon: "Truck", price: 500 },
  { id: "design", label: "Услуги дизайнера", icon: "Palette", price: 3000 },
  { id: "led", label: "Подсветка LED", icon: "Zap", price: 4000 },
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

function PreviewModal({ open, onClose, onOrder }: { open: boolean; onClose: () => void; onOrder: () => void }) {
  const [text, setText] = useState("ВАША ВЫВЕСКА");
  const [style, setStyle] = useState<"neon" | "3d" | "banner">("neon");
  const [neonColor, setNeonColor] = useState("#00F5FF");
  const [fontSize, setFontSize] = useState(40);

  if (!open) return null;

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

        <div className="flex gap-3 mb-5">
          {(["neon", "3d", "banner"] as const).map(s => (
            <button
              key={s}
              onClick={() => setStyle(s)}
              className={`flex-1 py-2 rounded border font-oswald text-sm uppercase tracking-wider transition-all ${
                style === s ? "bg-[#FFE600] text-[#0A0A0A] border-[#FFE600] font-bold" : "bg-transparent text-white/60 border-white/20 hover:border-white/40"
              }`}
            >
              {s === "neon" ? "Неон" : s === "3d" ? "3D буквы" : "Баннер"}
            </button>
          ))}
        </div>

        {(style === "neon" || style === "3d") && (
          <div className="mb-5">
            <p className="text-white/40 text-xs font-oswald tracking-wider uppercase mb-2">Цвет текста</p>
            <div className="flex gap-2 flex-wrap">
              {NEON_COLORS.map(c => (
                <button
                  key={c}
                  onClick={() => setNeonColor(c)}
                  className="w-8 h-8 rounded-full border-2 transition-transform hover:scale-110"
                  style={{ background: c, borderColor: neonColor === c ? "#fff" : "transparent", boxShadow: neonColor === c ? `0 0 8px ${c}` : "none" }}
                />
              ))}
            </div>
          </div>
        )}

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-white/40 text-xs font-oswald tracking-wider uppercase">Размер текста</p>
            <span className="text-[#FFE600] text-xs font-oswald">{fontSize}px</span>
          </div>
          <input type="range" min={20} max={72} value={fontSize} onChange={e => setFontSize(Number(e.target.value))} className="w-full accent-[#FFE600] h-1 cursor-pointer" />
        </div>

        <div
          className="relative rounded-lg overflow-hidden flex items-center justify-center"
          style={{ height: "200px", backgroundImage: "url('https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=60')", backgroundSize: "cover", backgroundPosition: "center" }}
        >
          <div className="absolute inset-0 bg-black/55" />
          {style === "neon" && (
            <span className="relative font-oswald font-bold tracking-widest px-4 text-center" style={{ color: neonColor, fontSize: `${fontSize}px`, textShadow: `0 0 10px ${neonColor}, 0 0 30px ${neonColor}, 0 0 70px ${neonColor}`, lineHeight: 1.2 }}>
              {text || "ВАША ВЫВЕСКА"}
            </span>
          )}
          {style === "3d" && (
            <span className="relative font-oswald font-bold tracking-widest px-4 text-center" style={{ color: neonColor, fontSize: `${fontSize}px`, textShadow: `3px 3px 0 rgba(0,0,0,0.8), 6px 6px 0 rgba(0,0,0,0.5), 0 0 25px ${neonColor}60`, lineHeight: 1.2 }}>
              {text || "ВАША ВЫВЕСКА"}
            </span>
          )}
          {style === "banner" && (
            <div className="relative px-8 py-4 rounded" style={{ background: "rgba(255,107,0,0.92)", border: "3px solid #FFE600" }}>
              <span className="font-oswald font-bold tracking-wider text-white block text-center" style={{ fontSize: `${Math.min(fontSize, 48)}px` }}>
                {text || "ВАША ВЫВЕСКА"}
              </span>
            </div>
          )}
        </div>

        <button
          className="mt-6 w-full py-4 rounded font-oswald text-lg font-bold tracking-widest uppercase transition-all duration-300 hover:-translate-y-0.5"
          style={{ background: "#FFE600", color: "#0A0A0A", boxShadow: "0 0 15px #FFE600, 0 0 40px rgba(255,107,0,0.5)" }}
          onClick={() => { onClose(); onOrder(); }}
        >
          Заказать этот вариант →
        </button>
      </div>
    </div>
  );
}

interface CalcLine {
  productId: string;
  materialIdx: number;
  width: number;
  height: number;
  qty: number;
}

function Calculator() {
  const emptyLine = (): CalcLine => ({ productId: CALC_PRODUCTS[0].id, materialIdx: 0, width: 1, height: 1, qty: 1 });
  const [lines, setLines] = useState<CalcLine[]>([emptyLine()]);
  const [extras, setExtras] = useState<Record<string, boolean>>({});

  const updateLine = (idx: number, patch: Partial<CalcLine>) => {
    setLines(prev => prev.map((l, i) => i === idx ? { ...l, ...patch } : l));
  };

  const addLine = () => setLines(prev => [...prev, emptyLine()]);
  const removeLine = (idx: number) => setLines(prev => prev.filter((_, i) => i !== idx));

  const lineTotal = (line: CalcLine): number => {
    const product = CALC_PRODUCTS.find(p => p.id === line.productId);
    if (!product) return 0;
    const mat = product.materials[line.materialIdx] ?? product.materials[0];
    if (product.byArea) {
      const area = line.width * line.height;
      return Math.round(product.pricePerM2 * area * mat.multiplier * line.qty);
    } else {
      return Math.round(product.pricePerUnit * mat.multiplier * line.qty);
    }
  };

  const productsTotal = lines.reduce((s, l) => s + lineTotal(l), 0);
  const extrasTotal = EXTRA_OPTIONS.filter(o => extras[o.id]).reduce((s, o) => s + o.price, 0);
  const total = productsTotal + extrasTotal;

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
          <div className="mb-12">
            <span className="font-oswald text-sm tracking-widest uppercase mb-3 block" style={{ color: "#FF6B00" }}>Прозрачные цены</span>
            <h2 className="font-oswald font-bold text-white leading-none" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
              КАЛЬКУЛЯТОР
              <span className="ml-4" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.15)", color: "transparent" }}>СТОИМОСТИ</span>
            </h2>
            <p className="text-white/40 mt-3 font-rubik text-sm">Укажите тип изделия, материал, размер и количество — получите предварительную стоимость</p>
          </div>
        </RevealSection>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* LEFT: lines */}
          <div className="xl:col-span-2 space-y-4">
            {lines.map((line, idx) => {
              const product = CALC_PRODUCTS.find(p => p.id === line.productId)!;
              return (
                <RevealSection key={idx}>
                  <div className="bg-[#111] border border-white/5 rounded-xl p-5 hover:border-[#FF6B00]/25 transition-all duration-300">
                    {/* Header row */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-oswald text-[#FF6B00] text-sm uppercase tracking-wider">Позиция {idx + 1}</span>
                      {lines.length > 1 && (
                        <button onClick={() => removeLine(idx)} className="text-white/25 hover:text-red-400 transition-colors">
                          <Icon name="Trash2" size={16} />
                        </button>
                      )}
                    </div>

                    {/* Product select */}
                    <div className="mb-4">
                      <label className="text-white/35 text-xs font-oswald tracking-wider uppercase block mb-1.5">Тип изделия</label>
                      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                        {CALC_PRODUCTS.map(p => (
                          <button
                            key={p.id}
                            onClick={() => updateLine(idx, { productId: p.id, materialIdx: 0 })}
                            className="flex flex-col items-center gap-1 py-2 px-1 rounded-lg border text-center transition-all duration-200"
                            style={{
                              borderColor: line.productId === p.id ? "#FF6B00" : "rgba(255,255,255,0.08)",
                              background: line.productId === p.id ? "rgba(255,107,0,0.12)" : "transparent",
                            }}
                          >
                            <Icon name={p.icon} size={16} style={{ color: line.productId === p.id ? "#FF6B00" : "rgba(255,255,255,0.4)" }} />
                            <span className="text-[10px] font-rubik leading-tight" style={{ color: line.productId === p.id ? "#FF6B00" : "rgba(255,255,255,0.4)" }}>
                              {p.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Material select */}
                    <div className="mb-4">
                      <label className="text-white/35 text-xs font-oswald tracking-wider uppercase block mb-1.5">Материал</label>
                      <div className="flex flex-wrap gap-2">
                        {product.materials.map((mat, mi) => (
                          <button
                            key={mi}
                            onClick={() => updateLine(idx, { materialIdx: mi })}
                            className="px-3 py-1.5 rounded border text-xs font-rubik transition-all duration-200"
                            style={{
                              borderColor: line.materialIdx === mi ? "#FFE600" : "rgba(255,255,255,0.1)",
                              background: line.materialIdx === mi ? "rgba(255,230,0,0.12)" : "transparent",
                              color: line.materialIdx === mi ? "#FFE600" : "rgba(255,255,255,0.5)",
                            }}
                          >
                            {mat.label}
                            {mat.multiplier !== 1.0 && (
                              <span className="ml-1 opacity-60">×{mat.multiplier}</span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Dimensions + qty */}
                    <div className="flex flex-wrap items-end gap-4">
                      {product.byArea ? (
                        <>
                          <div className="flex-1 min-w-[100px]">
                            <label className="text-white/35 text-xs font-oswald tracking-wider uppercase block mb-1.5">Ширина (м)</label>
                            <input
                              type="number"
                              min={0.1}
                              step={0.1}
                              value={line.width}
                              onChange={e => updateLine(idx, { width: Math.max(0.1, Number(e.target.value)) })}
                              className="w-full bg-[#1a1a1a] border border-white/10 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-[#FF6B00]/50 transition-colors"
                            />
                          </div>
                          <div className="flex-1 min-w-[100px]">
                            <label className="text-white/35 text-xs font-oswald tracking-wider uppercase block mb-1.5">Высота (м)</label>
                            <input
                              type="number"
                              min={0.1}
                              step={0.1}
                              value={line.height}
                              onChange={e => updateLine(idx, { height: Math.max(0.1, Number(e.target.value)) })}
                              className="w-full bg-[#1a1a1a] border border-white/10 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-[#FF6B00]/50 transition-colors"
                            />
                          </div>
                          <div className="text-white/30 text-xs text-center pb-2">
                            <span className="block font-oswald text-lg text-white/50">{(line.width * line.height).toFixed(2)}</span>
                            м²
                          </div>
                        </>
                      ) : null}
                      <div className="flex-1 min-w-[100px]">
                        <label className="text-white/35 text-xs font-oswald tracking-wider uppercase block mb-1.5">Количество (шт)</label>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateLine(idx, { qty: Math.max(1, line.qty - 1) })}
                            className="w-8 h-9 rounded border border-white/10 flex items-center justify-center text-white/60 hover:border-[#FF6B00]/50 hover:text-[#FF6B00] transition-all flex-shrink-0"
                          >
                            <Icon name="Minus" size={13} />
                          </button>
                          <input
                            type="number"
                            min={1}
                            value={line.qty}
                            onChange={e => updateLine(idx, { qty: Math.max(1, Number(e.target.value)) })}
                            className="w-14 text-center bg-[#1a1a1a] border border-white/10 rounded px-2 py-2 text-white text-sm focus:outline-none focus:border-[#FF6B00]/50"
                          />
                          <button
                            onClick={() => updateLine(idx, { qty: line.qty + 1 })}
                            className="w-8 h-9 rounded border border-white/10 flex items-center justify-center text-white/60 hover:border-[#FF6B00]/50 hover:text-[#FF6B00] transition-all flex-shrink-0"
                          >
                            <Icon name="Plus" size={13} />
                          </button>
                        </div>
                      </div>
                      <div className="pb-1">
                        <div className="text-white/30 text-xs font-oswald uppercase mb-1">Сумма</div>
                        <div className="font-oswald text-xl font-bold" style={{ color: "#FF6B00" }}>
                          {lineTotal(line).toLocaleString("ru-RU")} ₽
                        </div>
                      </div>
                    </div>
                  </div>
                </RevealSection>
              );
            })}

            {/* Add line */}
            <button
              onClick={addLine}
              className="w-full py-3 rounded-xl border border-dashed border-white/15 text-white/35 hover:border-[#FF6B00]/40 hover:text-[#FF6B00] transition-all duration-300 font-oswald text-sm tracking-wider uppercase flex items-center justify-center gap-2"
            >
              <Icon name="Plus" size={16} />
              Добавить позицию
            </button>

            {/* Extra options */}
            <RevealSection>
              <div className="bg-[#111] border border-white/5 rounded-xl p-5">
                <h4 className="font-oswald text-white text-sm uppercase tracking-wider mb-4">Дополнительные услуги</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {EXTRA_OPTIONS.map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => setExtras(prev => ({ ...prev, [opt.id]: !prev[opt.id] }))}
                      className="flex items-center justify-between px-4 py-3 rounded-lg border transition-all duration-200"
                      style={{
                        borderColor: extras[opt.id] ? "#FFE600" : "rgba(255,255,255,0.08)",
                        background: extras[opt.id] ? "rgba(255,230,0,0.08)" : "transparent",
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0"
                          style={{ background: extras[opt.id] ? "rgba(255,230,0,0.15)" : "rgba(255,255,255,0.05)" }}
                        >
                          <Icon name={opt.icon} size={15} style={{ color: extras[opt.id] ? "#FFE600" : "rgba(255,255,255,0.4)" }} />
                        </div>
                        <span className="font-rubik text-sm" style={{ color: extras[opt.id] ? "#FFE600" : "rgba(255,255,255,0.6)" }}>
                          {opt.label}
                        </span>
                      </div>
                      <span className="font-oswald text-sm ml-3 whitespace-nowrap" style={{ color: extras[opt.id] ? "#FFE600" : "rgba(255,255,255,0.3)" }}>
                        +{opt.price.toLocaleString("ru-RU")} ₽
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </RevealSection>
          </div>

          {/* RIGHT: summary */}
          <RevealSection>
            <div
              className="sticky top-24 bg-[#111] border rounded-xl p-6"
              style={{ borderColor: total > 0 ? "rgba(255,107,0,0.4)" : "rgba(255,255,255,0.05)" }}
            >
              <h3 className="font-oswald text-lg text-white uppercase tracking-wider mb-6">Итоговый расчёт</h3>

              <div className="space-y-2 mb-4 max-h-52 overflow-y-auto pr-1">
                {lines.map((line, idx) => {
                  const product = CALC_PRODUCTS.find(p => p.id === line.productId)!;
                  const mat = product.materials[line.materialIdx];
                  return (
                    <div key={idx} className="text-xs text-white/50 font-rubik flex justify-between gap-2">
                      <span className="truncate">
                        {product.label}{product.byArea ? ` ${line.width}×${line.height}м` : ""} × {line.qty} шт — {mat?.label}
                      </span>
                      <span className="text-white/70 whitespace-nowrap">{lineTotal(line).toLocaleString("ru-RU")} ₽</span>
                    </div>
                  );
                })}
                {EXTRA_OPTIONS.filter(o => extras[o.id]).map(opt => (
                  <div key={opt.id} className="text-xs text-white/50 font-rubik flex justify-between gap-2">
                    <span>{opt.label}</span>
                    <span className="text-[#FFE600]/70">+{opt.price.toLocaleString("ru-RU")} ₽</span>
                  </div>
                ))}
                {total === 0 && <p className="text-white/25 text-sm text-center py-4">Добавьте позиции</p>}
              </div>

              <div className="border-t border-white/8 pt-4 mb-6">
                {extrasTotal > 0 && (
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/40 font-rubik">Изделия</span>
                    <span className="text-white/60 font-oswald">{productsTotal.toLocaleString("ru-RU")} ₽</span>
                  </div>
                )}
                {extrasTotal > 0 && (
                  <div className="flex justify-between text-sm mb-3">
                    <span className="text-white/40 font-rubik">Доп. услуги</span>
                    <span className="text-[#FFE600]/70 font-oswald">+{extrasTotal.toLocaleString("ru-RU")} ₽</span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-white/50 font-rubik text-sm">Итого</span>
                  <span className="font-oswald text-2xl font-bold" style={{ color: total > 0 ? "#FF6B00" : "rgba(255,255,255,0.2)" }}>
                    {total.toLocaleString("ru-RU")} ₽
                  </span>
                </div>
                <p className="text-white/20 text-xs mt-2">* Финальная стоимость уточняется при заказе</p>
              </div>

              <button
                onClick={() => document.querySelector("#contacts")?.scrollIntoView({ behavior: "smooth" })}
                className="w-full py-4 rounded font-oswald font-bold tracking-widest uppercase transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: total > 0 ? "#FF6B00" : "#1a1a1a",
                  color: total > 0 ? "#fff" : "rgba(255,255,255,0.25)",
                  boxShadow: total > 0 ? "0 0 15px rgba(255,107,0,0.5)" : "none",
                }}
              >
                Оформить заявку
              </button>

              <button
                onClick={() => { setLines([emptyLine()]); setExtras({}); }}
                className="w-full mt-2 py-2 rounded font-oswald text-xs tracking-wider text-white/20 hover:text-white/45 transition-colors uppercase"
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

const SEND_EMAIL_URL = "https://functions.poehali.dev/4155d2e9-ec3d-4a6b-8e89-dd3663c8ffcc";

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [activePortfolio, setActivePortfolio] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState({ name: "", phone: "", service: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name.trim() || !contactForm.phone.trim()) return;
    setFormStatus("sending");
    try {
      const res = await fetch(SEND_EMAIL_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactForm),
      });
      if (res.ok) {
        setFormStatus("success");
        setContactForm({ name: "", phone: "", service: "" });
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  };

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
            ВИЗУАЛ ПРО
          </span>

          <div className="hidden md:flex items-center gap-5">
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
            {/* Telegram icon */}
            <a
              href="https://t.me/vizualPRO_39"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-300 hover:scale-110"
              style={{ background: "rgba(0,136,204,0.15)", border: "1px solid rgba(0,136,204,0.3)" }}
              title="Telegram"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#0088cc">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.247l-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L6.9 14.41l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.916.175z"/>
              </svg>
            </a>
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
            <a
              href="https://t.me/vizualPRO_39"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-2 rounded font-rubik text-[#0088cc] border border-[#0088cc]/30"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#0088cc">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.247l-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L6.9 14.41l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.916.175z"/>
              </svg>
              Telegram
            </a>
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

      {/* HERO — fullscreen */}
      <section id="hero" className="relative w-full" style={{ height: "100vh", minHeight: "640px" }}>
        <img
          src={HERO_IMAGE}
          alt="Визуал ПРО — производство наружной рекламы"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, rgba(10,10,10,0.92) 35%, rgba(10,10,10,0.65) 65%, rgba(10,10,10,0.35) 100%)" }} />
        <div
          className="absolute inset-0 opacity-35"
          style={{
            backgroundImage: "linear-gradient(rgba(255,107,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,107,0,0.05) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent, #0A0A0A)" }} />

        <div className="relative z-10 h-full flex flex-col justify-center max-w-7xl mx-auto px-6 pt-16">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-8 w-fit" style={{ background: "rgba(255,107,0,0.1)", border: "1px solid rgba(255,107,0,0.3)" }}>
            <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-pulse inline-block" />
            <span className="text-[#FF6B00] text-sm font-oswald tracking-widest uppercase">Производство в Калининграде</span>
          </div>

          <h1 className="font-oswald font-bold leading-none mb-6" style={{ fontSize: "clamp(3rem, 10vw, 8rem)" }}>
            <span className="block text-white">НАРУЖНАЯ</span>
            <span className="block" style={{ color: "#FFE600", textShadow: "0 0 20px #FFE600, 0 0 50px #FFE600, 0 0 90px #FF6B00" }}>
              РЕКЛАМА
            </span>
            <span className="block" style={{ WebkitTextStroke: "2px rgba(255,255,255,0.12)", color: "transparent", fontSize: "clamp(2rem, 7vw, 6rem)" }}>
              КОТОРУЮ ВИДЯТ
            </span>
          </h1>

          <p className="text-white/55 text-lg md:text-xl max-w-lg mb-10 font-rubik font-light leading-relaxed">
            Производим вывески, неон, объёмные буквы и световые короба.<br />
            От макета до монтажа — под ключ, с гарантией.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
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
            {/* Telegram floating in hero */}
            <a
              href="https://t.me/vizualPRO_39"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 border px-8 py-4 rounded font-oswald text-lg tracking-wider uppercase transition-all duration-300 hover:scale-105"
              style={{ borderColor: "rgba(0,136,204,0.4)", color: "#0088cc", background: "rgba(0,136,204,0.08)" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#0088cc">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.247l-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L6.9 14.41l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.916.175z"/>
              </svg>
              Telegram
            </a>
          </div>

          <div className="flex flex-wrap gap-8">
            {STATS.map((s, i) => (
              <div key={s.label}>
                <div className="font-oswald text-3xl md:text-4xl font-bold" style={{ color: ["#FFE600", "#FF6B00", "#00F5FF", "#FF2D55"][i], textShadow: `0 0 10px ${["#FFE600", "#FF6B00", "#00F5FF", "#FF2D55"][i]}` }}>
                  {s.value}
                </div>
                <div className="text-white/35 text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Fixed Telegram button bottom-right */}
        <a
          href="https://t.me/vizualPRO_39"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full font-oswald text-sm font-bold tracking-wider uppercase transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          style={{ background: "#0088cc", color: "#fff", boxShadow: "0 0 20px rgba(0,136,204,0.5), 0 4px 20px rgba(0,0,0,0.4)" }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.247l-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L6.9 14.41l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.916.175z"/>
          </svg>
          Написать
        </a>
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
                <span className="font-oswald text-sm tracking-widest uppercase mb-3 block" style={{ color: "#FFE600" }}>Что мы делаем</span>
                <h2 className="font-oswald font-bold text-white leading-none" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
                  НАШИ
                  <span className="ml-4" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)", color: "transparent" }}>УСЛУГИ</span>
                </h2>
              </div>
              <span className="hidden md:block text-white/10 font-oswald font-bold leading-none select-none" style={{ fontSize: "8rem" }}>09</span>
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
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" style={{ background: `radial-gradient(circle at 50% 0%, ${service.color}12 0%, transparent 70%)` }} />
                  <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(90deg, transparent, ${service.color}, transparent)` }} />

                  <div className="relative flex items-start gap-4">
                    <div className="w-12 h-12 rounded flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110" style={{ background: `${service.color}15`, border: `1px solid ${service.color}30` }}>
                      <Icon name={service.icon} size={22} style={{ color: service.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <h3 className="font-oswald text-lg font-semibold text-white group-hover:text-[#FFE600] transition-colors duration-300">{service.title}</h3>
                        {service.tag && (
                          <span className="text-xs font-oswald font-bold px-2 py-0.5 rounded-full" style={{ background: `${service.color}18`, color: service.color, border: `1px solid ${service.color}35` }}>
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
        <div className="absolute inset-0 opacity-25" style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(255,230,0,0.04) 30px, rgba(255,230,0,0.04) 60px)" }} />
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
              <h2 className="font-oswald font-bold text-white leading-none" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>ПОРТФОЛИО</h2>
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
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.2) 50%, transparent 100%)" }} />
                  <div className="absolute inset-0 transition-opacity duration-300" style={{ background: "linear-gradient(to top, rgba(255,230,0,0.15), transparent)", opacity: activePortfolio === i ? 1 : 0 }} />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="text-xs font-oswald tracking-widest uppercase mb-1" style={{ color: "#FFE600" }}>{item.type}</div>
                    <h3 className="font-oswald text-xl font-bold text-white">{item.title}</h3>
                  </div>
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0" style={{ background: "#FFE600" }}>
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
        <div className="absolute right-0 top-0 w-1/2 h-full pointer-events-none" style={{ background: "radial-gradient(ellipse at right, rgba(255,230,0,0.06), transparent 70%)" }} />
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
                      <div className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,230,0,0.1)", border: "1px solid rgba(255,230,0,0.2)" }}>
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
                  <div key={s.label} className="bg-[#111] border border-white/5 rounded-lg p-6 text-center group hover:border-[#FFE600]/25 transition-all duration-300">
                    <div className="font-oswald text-4xl font-bold mb-2" style={{ color: ["#FFE600", "#FF6B00", "#00F5FF", "#FF2D55"][i] }}>{s.value}</div>
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
              <form className="space-y-4" onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Ваше имя *"
                  value={contactForm.name}
                  onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
                  required
                  disabled={formStatus === "sending" || formStatus === "success"}
                  className="w-full bg-[#111] border border-white/10 rounded px-4 py-4 text-white placeholder-white/25 focus:outline-none focus:border-[#FFE600]/50 transition-colors font-rubik disabled:opacity-50"
                />
                <input
                  type="tel"
                  placeholder="Номер телефона *"
                  value={contactForm.phone}
                  onChange={e => setContactForm({ ...contactForm, phone: e.target.value })}
                  required
                  disabled={formStatus === "sending" || formStatus === "success"}
                  className="w-full bg-[#111] border border-white/10 rounded px-4 py-4 text-white placeholder-white/25 focus:outline-none focus:border-[#FFE600]/50 transition-colors font-rubik disabled:opacity-50"
                />
                <select
                  value={contactForm.service}
                  onChange={e => setContactForm({ ...contactForm, service: e.target.value })}
                  disabled={formStatus === "sending" || formStatus === "success"}
                  className="w-full bg-[#111] border border-white/10 rounded px-4 py-4 text-white focus:outline-none focus:border-[#FFE600]/50 transition-colors font-rubik appearance-none disabled:opacity-50"
                >
                  <option value="" className="bg-[#111]">Выберите услугу</option>
                  {SERVICES.map(s => (
                    <option key={s.title} value={s.title} className="bg-[#111]">{s.title}</option>
                  ))}
                </select>

                {formStatus === "success" && (
                  <div className="flex items-center gap-3 px-4 py-4 rounded-lg" style={{ background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.3)" }}>
                    <Icon name="CheckCircle" size={20} style={{ color: "#22C55E" }} />
                    <div>
                      <p className="text-[#22C55E] font-oswald font-bold text-sm uppercase tracking-wide">Заявка отправлена!</p>
                      <p className="text-white/50 text-xs mt-0.5">Перезвоним в рабочее время Пн–Пт 10:00–18:00</p>
                    </div>
                  </div>
                )}

                {formStatus === "error" && (
                  <div className="flex items-center gap-3 px-4 py-3 rounded-lg" style={{ background: "rgba(255,45,85,0.1)", border: "1px solid rgba(255,45,85,0.3)" }}>
                    <Icon name="AlertCircle" size={18} style={{ color: "#FF2D55" }} />
                    <p className="text-[#FF2D55] text-sm">Ошибка отправки. Позвоните нам: +7 (921) 618-98-86</p>
                  </div>
                )}

                {formStatus !== "success" && (
                  <button
                    type="submit"
                    disabled={formStatus === "sending"}
                    className="w-full py-4 rounded font-oswald text-lg font-bold tracking-widest uppercase transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                    style={{ background: "#FFE600", color: "#0A0A0A", boxShadow: "0 0 15px #FFE600, 0 0 40px rgba(255,107,0,0.4)" }}
                  >
                    {formStatus === "sending" ? "Отправляем..." : "Отправить заявку"}
                  </button>
                )}

                {formStatus === "success" && (
                  <button
                    type="button"
                    onClick={() => setFormStatus("idle")}
                    className="w-full py-3 rounded font-oswald text-sm tracking-widest uppercase text-white/40 hover:text-white/70 transition-colors border border-white/10"
                  >
                    Отправить ещё одну заявку
                  </button>
                )}

                <p className="text-white/20 text-xs text-center">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
              </form>
            </RevealSection>

            <RevealSection>
              <div className="space-y-4">
                {[
                  { icon: "Phone", label: "Телефон", value: "+7 (921) 618-98-86", color: "#FFE600" },
                  { icon: "Mail", label: "Email", value: "vizualpro39@mail.ru", color: "#00F5FF" },
                  { icon: "MapPin", label: "Адрес", value: "г. Калининград, Киевский переулок, д. 1А", color: "#FF6B00" },
                  { icon: "Clock", label: "Режим работы", value: "Пн–Пт: 10:00–18:00, Сб: 10:00–17:00", color: "#FF2D55" },
                ].map(item => (
                  <div key={item.label} className="flex items-start gap-4 p-4 bg-[#111] border border-white/5 rounded-lg hover:border-white/10 transition-colors">
                    <div className="w-10 h-10 rounded flex items-center justify-center flex-shrink-0" style={{ background: `${item.color}15`, border: `1px solid ${item.color}30` }}>
                      <Icon name={item.icon} size={18} style={{ color: item.color }} />
                    </div>
                    <div>
                      <div className="text-white/30 text-xs font-oswald tracking-wider uppercase mb-1">{item.label}</div>
                      <div className="text-white font-rubik">{item.value}</div>
                    </div>
                  </div>
                ))}

                {/* Telegram contact card */}
                <a
                  href="https://t.me/vizualPRO_39"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 border rounded-lg transition-all duration-300 hover:scale-[1.02]"
                  style={{ background: "rgba(0,136,204,0.08)", borderColor: "rgba(0,136,204,0.3)" }}
                >
                  <div className="w-10 h-10 rounded flex items-center justify-center flex-shrink-0" style={{ background: "rgba(0,136,204,0.15)", border: "1px solid rgba(0,136,204,0.3)" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#0088cc">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.247l-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L6.9 14.41l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.916.175z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-[#0088cc]/60 text-xs font-oswald tracking-wider uppercase mb-1">Telegram</div>
                    <div className="text-[#0088cc] font-rubik font-medium">@vizualPRO_39 — написать нам</div>
                  </div>
                </a>
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
          <div className="flex gap-5 flex-wrap justify-center items-center">
            {NAV_LINKS.map(link => (
              <button key={link.href} onClick={() => scrollTo(link.href)} className="text-white/28 hover:text-white/60 text-sm transition-colors">
                {link.label}
              </button>
            ))}
            <a href="https://t.me/vizualPRO_39" target="_blank" rel="noopener noreferrer" className="text-[#0088cc]/60 hover:text-[#0088cc] transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.247l-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L6.9 14.41l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.916.175z"/>
              </svg>
            </a>
          </div>
        </div>
      </footer>

      <PreviewModal open={previewOpen} onClose={() => setPreviewOpen(false)} onOrder={() => scrollTo("#contacts")} />
    </div>
  );
};

export default Index;