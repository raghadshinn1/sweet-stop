import { useEffect, useRef } from "react";

const FLAGS: string[] = [
  "jo","iq","sa","qa","ir","au","jp","kr","uz",
  "ma","eg","tn","dz","sn","ci","gh","za","cv","cd",
  "gb","fr","es","pt","nl","be","de","hr","ch",
  "no","at","se","tr","cz","ba",
  "ar","br","co","uy","ec","py",
  "us","ca","mx","pa","ht","cw",
];

const FLAG_CDN = "https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.2.3/flags/4x3";

export default function FallingFlags(): null {
  const containerRef = useRef<HTMLDivElement>(document.createElement("div"));

  useEffect(() => {
    const container = containerRef.current;
    document.body.appendChild(container);

    let flagIdx = 0;
    let counter = 0;

    function drop(): void {
      counter++;
      const isTrophy  = counter % 12 === 0;
      const duration  = 2400 + Math.random() * 3200;
      const left      = 2 + Math.random() * 92;
      const rotStart  = -20 + Math.random() * 40;

      if (isTrophy) {
        const el = document.createElement("div");
        const size   = 30 + Math.random() * 20;
        const rotEnd = rotStart + (Math.random() > 0.5 ? 360 : -360);

        Object.assign(el.style, {
          position:      "fixed",
          top:           "-60px",
          left:          `${left}vw`,
          fontSize:      `${size}px`,
          zIndex:        "9999",
          pointerEvents: "none",
          userSelect:    "none",
          lineHeight:    "1",
        });

        el.textContent = "🏆";
        el.animate(
          [
            { top: "-60px", transform: `rotate(${rotStart}deg)`, opacity: "1"   },
            { top: "110vh", transform: `rotate(${rotEnd}deg)`,   opacity: "0.1" },
          ],
          { duration, fill: "forwards", easing: "linear" }
        );

        container.appendChild(el);
        setTimeout(() => el.remove(), duration + 300);
        return;
      }

      const code   = FLAGS[flagIdx % FLAGS.length];
      flagIdx++;

      const wrapper = document.createElement("div");
      const w       = 48 + Math.random() * 30;
      const h       = Math.round(w * 0.67);
      const rotEnd  = rotStart + (Math.random() > 0.5 ? 180 : -180);

      Object.assign(wrapper.style, {
        position:      "fixed",
        top:           "-80px",
        left:          `${left}vw`,
        width:         `${w}px`,
        height:        `${h}px`,
        borderRadius:  "4px",
        overflow:      "hidden",
        boxShadow:     "0 2px 8px rgba(0,0,0,0.5)",
        zIndex:        "9999",
        pointerEvents: "none",
      });

      const img = document.createElement("img");
      img.src = `${FLAG_CDN}/${code}.svg`;
      img.alt = code;

      Object.assign(img.style, {
        width:      "100%",
        height:     "100%",
        objectFit:  "cover",
        display:    "block",
      });

      wrapper.appendChild(img);
      wrapper.animate(
        [
          { top: "-80px", transform: `rotate(${rotStart}deg)`, opacity: "1"   },
          { top: "110vh", transform: `rotate(${rotEnd}deg)`,   opacity: "0.1" },
        ],
        { duration, fill: "forwards", easing: "linear" }
      );

      container.appendChild(wrapper);
      setTimeout(() => wrapper.remove(), duration + 300);
    }

    const interval = setInterval(drop, 230);
    setTimeout(() => clearInterval(interval), 7000);

    return () => {
      clearInterval(interval);
      document.body.removeChild(container);
    };
  }, []);

  return null;
}