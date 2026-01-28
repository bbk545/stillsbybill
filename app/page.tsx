"use client";

import { useMemo, useRef, useState, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Instagram, Mail, X } from "lucide-react";

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

  const Shell = (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      onMouseMove={handleMove}
      style={{
        width: 74,
        height: 74,
        border: "2px solid #404040",
        background: "rgba(0,0,0,0.45)",
        backdropFilter: "blur(6px)",
        display: "grid",
        placeItems: "center",
        position: "relative",
        cursor: "pointer",
      }}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.12 }}
            style={{
              pointerEvents: "none",
              position: "absolute",
              top: -44,
              left: "50%",
              transform: "translateX(-50%)",
              whiteSpace: "nowrap",
              fontSize: 10,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "#e5e5e5",
            }}
          >
            <span
              style={{
                padding: "6px 10px",
                border: "1px solid #404040",
                background: "rgba(0,0,0,0.85)",
              }}
            >
              {label}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        whileHover={{ scale: 1.12, rotate: -2 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 360, damping: 18 }}
        style={{ position: "relative", display: "grid", placeItems: "center" }}
      >
        {/* glitch shadow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            transform: "translate(2px,-1px)",
            opacity: 0.3,
            color: "#ef4444",
            filter: "blur(0.3px)",
            display: "grid",
            placeItems: "center",
          }}
        >
          {children}
        </div>
        <div style={{ position: "relative" }}>{children}</div>

        {/* micro-strobe */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              aria-hidden
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.08, 0, 0.06, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55 }}
              style={{
                pointerEvents: "none",
                position: "absolute",
                inset: -10,
                background: "#fff",
                mixBlendMode: "overlay",
              }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        style={{ x, y, position: "relative" }}
        whileHover={{ y: -3 }}
        transition={{ type: "spring", stiffness: 280, damping: 18 }}
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
      style={{ x, y, position: "relative", background: "transparent", border: 0, padding: 0 }}
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 280, damping: 18 }}
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

export default function Page() {
  const [activeCollectionKey, setActiveCollectionKey] = useState("hitmen-scab");
  const [activeImage, setActiveImage] = useState<string | null>(null);

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

  const active = collections.find((c) => c.key === activeCollectionKey) || collections[0];

  return (
    <div
      onMouseMove={(e) => {
        mouseX.set(e.clientX / window.innerWidth);
        mouseY.set(e.clientY / window.innerHeight);
      }}
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        color: "#f5f5f5",
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas",
        border: "10px solid #262626",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Moving grid */}
      <motion.div style={{ x: bgX, y: bgY, position: "absolute", inset: 0, opacity: 0.09, mixBlendMode: "screen" }}>
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundImage:
              "linear-gradient(to right, rgba(255,0,0,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,0,0,0.12) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />
      </motion.div>

      {/* HERO */}
      <section
        style={{
          minHeight: "72vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "80px 24px 64px",
          position: "relative",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(44px, 9vw, 96px)",
            fontWeight: 900,
            letterSpacing: "-0.08em",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          STILLS BY BILL
        </h1>
        <div style={{ opacity: 0.7, marginTop: 18, letterSpacing: "0.3em", textTransform: "uppercase", fontSize: 12 }}>
          Live concert and event photography
        </div>
        <div style={{ opacity: 0.85, marginTop: 10, letterSpacing: "0.28em", textTransform: "uppercase", fontSize: 11 }}>
          Shot in the pit · UK shows · Available for bookings
        </div>
      </section>

      {/* Sticky show switcher */}
      <section
        style={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          background: "#0a0a0a",
          borderTop: "2px solid #404040",
          borderBottom: "2px solid #404040",
          padding: "14px 18px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
          {collections.map((c) => (
            <button
              key={c.key}
              onClick={() => setActiveCollectionKey(c.key)}
              style={{
                padding: "10px 12px",
                textTransform: "uppercase",
                letterSpacing: "0.25em",
                fontSize: 12,
                cursor: "pointer",
                border: `2px solid ${c.key === activeCollectionKey ? "#ef4444" : "#404040"}`,
                color: c.key === activeCollectionKey ? "#ef4444" : "#bdbdbd",
                background: "transparent",
              }}
            >
              {c.label}
            </button>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section style={{ padding: "42px 24px 90px", position: "relative" }}>
        <div
          style={{
            textAlign: "center",
            fontSize: 11,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            opacity: 0.7,
            marginBottom: 22,
          }}
        >
          {active.location}
        </div>

        {/* Mobile-first vertical feed */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(1, minmax(0, 1fr))", gap: 18, maxWidth: 980, margin: "0 auto" }}>
          {active.images.map((src, i) => (
            <motion.button
              key={i}
              type="button"
              whileTap={{ scale: 0.99 }}
              onClick={() => setActiveImage(src)}
              style={{
                padding: 0,
                border: "6px solid #737373",
                background: "#000",
                cursor: "zoom-in",
              }}
            >
              <img
                src={src}
                alt={`${active.label} ${i + 1}`}
                loading="lazy"
                style={{
                  width: "100%",
                  aspectRatio: "4 / 5",
                  objectFit: "cover",
                  filter: "grayscale(1) contrast(1.25)",
                  display: "block",
                }}
              />
            </motion.button>
          ))}
        </div>
      </section>

      {/* FULLSCREEN */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImage(null)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.95)",
              zIndex: 50,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveImage(null);
              }}
              style={{
                position: "absolute",
                top: 18,
                right: 18,
                border: "2px solid #404040",
                background: "transparent",
                color: "#fff",
                padding: 10,
                cursor: "pointer",
              }}
              aria-label="Close"
            >
              <X />
            </button>

            <motion.img
              initial={{ scale: 0.96 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.98 }}
              src={activeImage}
              alt="Fullscreen"
              onClick={(e) => e.stopPropagation()}
              style={{ maxWidth: "90vw", maxHeight: "90vh", objectFit: "contain" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE STICKY BOOKING CTA */}
      <motion.a
        href="mailto:stillsbybill55@gmail.com?subject=Booking%20%2F%20Press%20Request"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        whileTap={{ scale: 0.99 }}
        style={{
          position: "fixed",
          right: 18,
          bottom: 18,
          zIndex: 60,
          padding: "12px 14px",
          border: "2px solid #ef4444",
          background: "rgba(0,0,0,0.75)",
          color: "#ef4444",
          letterSpacing: "0.32em",
          textTransform: "uppercase",
          fontSize: 11,
          boxShadow: "10px 10px 0px #111",
          textDecoration: "none",
        }}
      >
        Booking / Contact
      </motion.a>

      {/* FOOTER */}
      <footer style={{ borderTop: "2px solid #404040", padding: "70px 24px", position: "relative" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: 18 }}>
          <FooterIcon label="Instagram" href="https://www.instagram.com/stillsbybill_/">
            <Instagram size={40} />
          </FooterIcon>
          <FooterIcon label="Email" onClick={() => (window.location.href = "mailto:stillsbybill55@gmail.com")}>
            <Mail size={40} />
          </FooterIcon>
        </div>

        <div
          style={{
            marginTop: 42,
            textAlign: "center",
            fontSize: 10,
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            opacity: 0.55,
          }}
        >
          Photos by Billy Baker
        </div>
      </footer>
    </div>
  );
}
