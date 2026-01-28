import { useMemo, useRef, useState, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Instagram, Mail, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type FooterIconProps = {
  label: string;
  href?: string;
  onClick?: () => void;
  children: ReactNode;
};

function FooterIcon({ label, href, onClick, children }: FooterIconProps) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  // magnetic pull
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 420, damping: 26, mass: 0.35 });
  const y = useSpring(my, { stiffness: 420, damping: 26, mass: 0.35 });

  const base =
    "group relative grid place-items-center w-16 h-16 md:w-[74px] md:h-[74px] border-2 border-neutral-700 bg-black/40 backdrop-blur rounded-none";

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    mx.set(dx * 0.12);
    my.set(dy * 0.12);
  };

  const handleLeave = () => {
    setHovered(false);
    mx.set(0);
    my.set(0);
  };

  const Inner = (
    <motion.span
      className="relative grid place-items-center"
      whileHover={{ scale: 1.12, rotate: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 360, damping: 18 }}
    >
      {/* glitch shadow */}
      <span className="absolute inset-0 translate-x-[2px] -translate-y-[1px] opacity-30 text-red-500 blur-[0.3px]">
        {children}
      </span>
      <span className="relative">{children}</span>

      {/* micro-strobe */}
      <AnimatePresence>
        {hovered && (
          <motion.span
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.08, 0, 0.06, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55 }}
            className="pointer-events-none absolute inset-[-10px] bg-white mix-blend-overlay"
          />
        )}
      </AnimatePresence>
    </motion.span>
  );

  const Tooltip = (
    <AnimatePresence>
      {hovered && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.98 }}
          transition={{ duration: 0.12 }}
          className="pointer-events-none absolute -top-11 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] tracking-[0.32em] uppercase text-neutral-200"
        >
          <span className="px-3 py-1 border border-neutral-700 bg-black/85">
            {label}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const Shell = (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      onMouseMove={handleMove}
      className={base + " hover:border-red-600 hover:text-red-500 transition"}
    >
      {Tooltip}
      {Inner}
    </div>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        style={{ x, y }}
        whileHover={{ y: -3 }}
        transition={{ type: "spring", stiffness: 280, damping: 18 }}
        className="relative"
      >
        {Shell}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      aria-label={label}
      onClick={onClick}
      style={{ x, y }}
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 280, damping: 18 }}
      className="relative"
    >
      {Shell}
    </motion.button>
  );
}

type Collection = {
  key: string;
  label: string;
  location: string;
  images: string[];
};

export default function Portfolio() {
  const [activeCollectionKey, setActiveCollectionKey] = useState("hitmen-scab");
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const cloudinary = (url: string) => url;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const bgX = useTransform(mouseX, [0, 1], [-60, 60]);
  const bgY = useTransform(mouseY, [0, 1], [-60, 60]);

  const collections: Collection[] = useMemo(
    () => [
      {
        key: "hitmen-scab",
        label: "HITMEN & SCAB SHOW",
        location: "Portsmouth · 2025",
        images: [
          "https://res.cloudinary.com/dlnswhjm2/image/upload/v1769550784/DSCF3224_oybxjn.jpg",
          "https://res.cloudinary.com/dlnswhjm2/image/upload/v1769550803/DSCF3273_ikocvm.jpg",
          "https://res.cloudinary.com/dlnswhjm2/image/upload/v1769550802/DSCF3272_tm4vhb.jpg",
          "https://res.cloudinary.com/dlnswhjm2/image/upload/v1769550802/DSCF3274_jzhmk9.jpg",
          "https://res.cloudinary.com/dlnswhjm2/image/upload/v1769550797/DSCF3270_b5a0f5.jpg",
        ],
      },
      {
        key: "esdee-rico",
        label: "ESDEE & RICO ACE — HEADLINER",
        location: "London · 2025",
        images: [
          "https://res.cloudinary.com/dlnswhjm2/image/upload/v1769552200/DSCF3059_qczxzw.jpg",
          "https://res.cloudinary.com/dlnswhjm2/image/upload/v1769552200/DSCF3074_l3zc4d.jpg",
          "https://res.cloudinary.com/dlnswhjm2/image/upload/v1769552200/DSCF3039_w5zxgg.jpg",
          "https://res.cloudinary.com/dlnswhjm2/image/upload/v1769552200/DSCF3053_jmuesa.jpg",
          "https://res.cloudinary.com/dlnswhjm2/image/upload/v1769552199/DSCF3032_vrtud6.jpg",
          "https://res.cloudinary.com/dlnswhjm2/image/upload/v1769552198/DSCF3019_mvzleu.jpg",
          "https://res.cloudinary.com/dlnswhjm2/image/upload/v1769552197/DSCF3002_pgfmcb.jpg",
          "https://res.cloudinary.com/dlnswhjm2/image/upload/v1769552197/DSCF3013_v61lal.jpg",
          "https://res.cloudinary.com/dlnswhjm2/image/upload/v1769552197/DSCF2983_kcyd7g.jpg",
          "https://res.cloudinary.com/dlnswhjm2/image/upload/v1769552197/DSCF2937_g8l1wg.jpg",
          "https://res.cloudinary.com/dlnswhjm2/image/upload/v1769552197/DSCF2959_hh9f3a.jpg",
          "https://res.cloudinary.com/dlnswhjm2/image/upload/v1769552197/DSCF2958_stqszv.jpg",
          "https://res.cloudinary.com/dlnswhjm2/image/upload/v1769552197/DSCF2955_dwisja.jpg",
          "https://res.cloudinary.com/dlnswhjm2/image/upload/v1769552197/DSCF2946_usig6u.jpg",
          "https://res.cloudinary.com/dlnswhjm2/image/upload/v1769552197/DSCF2939_yjlogh.jpg",
          "https://res.cloudinary.com/dlnswhjm2/image/upload/v1769552196/DSCF2936_sbdkoo.jpg",
          "https://res.cloudinary.com/dlnswhjm2/image/upload/v1769551547/DSCF2937_ivwbee.jpg",
        ],
      },
    ],
    []
  );

  // Dev “tests” to catch paste/truncation issues early
  if (typeof window !== "undefined") {
    console.assert(collections.length === 2, "Expected 2 collections");
    console.assert(
      collections.every((c) =>
        c.images.every((u) => typeof u === "string" && u.startsWith("https://"))
      ),
      "Expected all image URLs to be https strings"
    );
    console.assert(
      collections.every((c) => c.images.length > 0),
      "Expected each collection to have at least 1 image"
    );
  }

  const activeCollection =
    collections.find((c) => c.key === activeCollectionKey) || collections[0];

  return (
    <div
      onMouseMove={(e) => {
        mouseX.set(e.clientX / window.innerWidth);
        mouseY.set(e.clientY / window.innerHeight);
      }}
      className="relative bg-[#0a0a0a] text-neutral-100 min-h-screen overflow-hidden font-mono tracking-tight border-[6px] md:border-[10px] border-neutral-800"
    >
      {/* Moving grid */}
      <motion.div
        style={{ x: bgX, y: bgY }}
        className="pointer-events-none absolute inset-0 opacity-[0.09] mix-blend-screen"
      >
        <div className="w-full h-full bg-[linear-gradient(to_right,#ff000020_1px,transparent_1px),linear-gradient(to_bottom,#ff000020_1px,transparent_1px)] bg-[size:70px_70px]" />
      </motion.div>

      {/* HERO */}
      <section className="relative min-h-[72vh] md:h-screen flex flex-col justify-center items-center text-center px-6 pt-20 pb-16">
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-[-0.08em] uppercase">
          STILLS BY BILL
        </h1>
        <p className="mt-6 text-neutral-400 uppercase text-xs tracking-widest">
          Live concert and event photography
        </p>
        <p className="mt-3 text-neutral-300 uppercase text-[11px] tracking-[0.28em]">
          Shot in the pit · UK shows · Available for bookings
        </p>
      </section>

      {/* Sticky show switcher */}
      <section className="sticky top-0 z-30 bg-[#0a0a0a] relative border-y-2 border-neutral-700">
        <div className="flex flex-wrap justify-center gap-3 py-4 uppercase text-xs tracking-widest px-6">
          {collections.map((c) => (
            <button
              key={c.key}
              onClick={() => setActiveCollectionKey(c.key)}
              className={
                "px-4 py-2 border-2 " +
                (c.key === activeCollectionKey
                  ? "border-red-600 text-red-500"
                  : "border-neutral-700 text-neutral-400")
              }
            >
              {c.label}
            </button>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section className="relative py-14 md:py-32">
        <div className="text-center text-[10px] md:text-xs tracking-[0.32em] md:tracking-widest uppercase text-neutral-400 mb-8 md:mb-10 px-6">
          {activeCollection.location}
        </div>

        {/* MOBILE FIRST: vertical feed */}
        <div className="px-6 md:hidden">
          <div className="grid grid-cols-1 gap-6">
            {activeCollection.images.map((src, i) => (
              <motion.button
                type="button"
                key={i}
                whileTap={{ scale: 0.99 }}
                className="text-left border-[6px] border-neutral-500 bg-black"
                onClick={() => setActiveImage(src)}
              >
                <Card className="overflow-hidden rounded-none bg-black">
                  <img
                    loading="lazy"
                    src={cloudinary(src)}
                    alt={activeCollection.label + " " + (i + 1)}
                    className="w-full aspect-[4/5] object-cover grayscale contrast-125 md:hover:grayscale-0 transition"
                  />
                </Card>
              </motion.button>
            ))}
          </div>
        </div>

        {/* DESKTOP: horizontal strip */}
        <motion.div className="hidden md:flex gap-14 px-10 overflow-x-scroll no-scrollbar">
          {activeCollection.images.map((src, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.06 }}
              className="min-w-[55vw] cursor-zoom-in border-[6px] border-neutral-500"
              onClick={() => setActiveImage(src)}
            >
              <Card className="overflow-hidden rounded-none bg-black">
                <img
                  loading="lazy"
                  src={cloudinary(src)}
                  alt={activeCollection.label + " " + (i + 1)}
                  className="h-[70vh] w-full object-cover grayscale contrast-125 md:hover:grayscale-0 transition"
                />
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* FULLSCREEN */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImage(null)}
          >
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setActiveImage(null);
              }}
              className="absolute top-6 right-6"
              variant="ghost"
            >
              <X />
            </Button>
            <motion.img
              initial={{ scale: 0.96 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.98 }}
              src={cloudinary(activeImage)}
              alt="Fullscreen"
              className="max-h-[90vh] max-w-[90vw] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE STICKY BOOKING CTA */}
      <motion.a
        href="mailto:stillsbybill55@gmail.com?subject=Booking%20%2F%20Press%20Request"
        className="md:hidden fixed bottom-5 right-5 z-50 px-5 py-3 border-2 border-red-600 bg-black/75 backdrop-blur text-red-500 uppercase text-[11px] tracking-[0.32em] shadow-[10px_10px_0px_#111]"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        whileTap={{ scale: 0.99 }}
      >
        <motion.span
          aria-hidden
          className="absolute inset-0"
          animate={{ opacity: [0, 0.06, 0, 0.04, 0] }}
          transition={{ repeat: Infinity, duration: 2.8 }}
          style={{ background: "white", mixBlendMode: "overlay" }}
        />
        <span className="relative">Booking / Contact</span>
      </motion.a>

      {/* FOOTER */}
      <footer className="relative border-t-2 border-neutral-700 py-20 overflow-hidden">
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-red-600/50"
          animate={{ x: ["-30%", "130%"] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "linear" }}
        />

        <motion.div
          className="absolute left-1/2 -translate-x-1/2 -top-10 hidden md:block"
          animate={{ opacity: [0.4, 1, 0.6] }}
          transition={{ repeat: Infinity, duration: 1.4 }}
        >
          <button
            type="button"
            onClick={() => (window.location.href = "mailto:stillsbybill55@gmail.com")}
            className="px-6 py-2 border-2 border-red-600 text-red-500 tracking-[0.35em] uppercase text-xs bg-black"
          >
            Booking / Contact
          </button>
        </motion.div>

        <div className="flex justify-center gap-8 md:gap-10 mt-14">
          <FooterIcon
            label="Instagram"
            href="https://www.instagram.com/stillsbybill_/"
          >
            <Instagram className="w-9 h-9 md:w-10 md:h-10" />
          </FooterIcon>

          <FooterIcon
            label="Email"
            onClick={() => {
              window.location.href = "mailto:stillsbybill55@gmail.com";
            }}
          >
            <Mail className="w-9 h-9 md:w-10 md:h-10" />
          </FooterIcon>
        </div>

        <div className="mt-12 text-center text-[10px] tracking-[0.35em] uppercase text-neutral-600">
          Photos by Billy Baker
        </div>
      </footer>
    </div>
  );
}
