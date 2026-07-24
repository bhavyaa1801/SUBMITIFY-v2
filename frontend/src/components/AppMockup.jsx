import { useState, useEffect } from "react";

const SLIDES = [
  {
    label: "01 — Project Information",
    img: "/screenshots/project-info.png",
  },
  {
    label: "02 — Paste Question Sheet",
    img: "/screenshots/questions.png",
  },
  {
    label: "03 — Review Questions",
    img: "/screenshots/review.png",
  },
  {
    label: "04 — AI Generation",
    img: "/screenshots/generating.png",
  },
  {
    label: "05 — Document Editor",
    img: "/screenshots/editor.png",
  },
  {
    label: "06 — Export PDF",
    img: "/screenshots/export.png",
  },
];

export default function AppMockup() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % SLIDES.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        width: "100%",
      }}
    >
      {/* Step Pills */}

      <div
        style={{
          display: "flex",
          gap: 8,
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {SLIDES.map((slide, index) => (
          <button
            key={index}
            onClick={() => setActive(index)}
            style={{
              padding: "5px 14px",
              borderRadius: 999,
              border: "1px solid",
              borderColor:
                index === active
                  ? "rgba(99,179,237,0.6)"
                  : "rgba(255,255,255,0.1)",
              background:
                index === active
                  ? "rgba(99,179,237,0.12)"
                  : "transparent",
              color:
                index === active
                  ? "#63b3ed"
                  : "rgba(255,255,255,0.35)",
              fontSize: "0.72rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all .3s ease",
              whiteSpace: "nowrap",
            }}
          >
            {slide.label}
          </button>
        ))}
      </div>

      {/* Browser */}

      <div
        style={{
          borderRadius: 14,
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,.08)",
          background: "#17191f",
          boxShadow: "0 30px 70px rgba(0,0,0,.45)",
        }}
      >
        {/* Browser Header */}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "12px 16px",
            background: "#111318",
            borderBottom: "1px solid rgba(255,255,255,.05)",
          }}
        >
          <div
            style={{
              flex: 1,
              background: "rgba(255,255,255,.05)",
              borderRadius: 6,
              padding: "4px 12px",
              textAlign: "center",
              color: "rgba(255,255,255,.35)",
              fontSize: ".72rem",
            }}
          >
            submitify.vercel.app
          </div>
        </div>

        {/* Screenshot */}

        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "16 / 10",
            overflow: "hidden",
          }}
        >
          {SLIDES.map((slide, index) => (
            <img
              key={index}
              src={slide.img}
              alt={slide.label}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "contain",
                objectPosition: "top",
                opacity: active === index ? 1 : 0,
                transition: "opacity .45s ease",
              }}
            />
          ))}

          {/* Progress */}

          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: 3,
              background: "rgba(99,179,237,.18)",
            }}
          >
            <div
              style={{
                width: `${((active + 1) / SLIDES.length) * 100}%`,
                height: "100%",
                background: "#63b3ed",
                transition: ".35s ease",
              }}
            />
          </div>
        </div>
      </div>

      {/* Caption */}

      <div
        style={{
          textAlign: "center",
        }}
      >
        <div
          style={{
            color: "#e5e7eb",
            fontWeight: 600,
            marginBottom: 4,
          }}
        >
          {SLIDES[active].label}
        </div>

        <div
          style={{
            color: "rgba(255,255,255,.45)",
            fontSize: ".82rem",
          }}
        >
          AI-powered academic document workflow
        </div>
      </div>
    </div>
  );
}