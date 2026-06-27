import { useEffect, useState } from 'react'

export default function SplashScreen({ onDone }) {
  const [entered, setEntered] = useState(false)
  const [fade, setFade]       = useState(false)

  useEffect(() => {
    const t0 = setTimeout(() => setEntered(true), 80)
    const t1 = setTimeout(() => setFade(true), 2200)
    const t2 = setTimeout(onDone, 2750)
    return () => { clearTimeout(t0); clearTimeout(t1); clearTimeout(t2) }
  }, [onDone])

  return (
    <div
      className={`fixed inset-0 z-[200] bg-white flex flex-col items-center justify-center transition-opacity duration-500 ${
        fade ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* ── Brand block ── */}
      <div
        className={`text-center select-none transition-all duration-700 ease-out ${
          entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
        }`}
      >
        <p
          className="text-[46px] font-bold leading-none text-[#0F172A]"
          style={{ letterSpacing: '-0.02em', fontFamily: 'Poppins, sans-serif' }}
        >
          GOBT ERP
        </p>
        <p
          className={`text-[10.5px] font-medium text-[#94A3B8] mt-3 transition-all duration-700 delay-200 ease-out ${
            entered ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ letterSpacing: '0.28em' }}
        >
          MEDICAL INVENTORY MANAGEMENT
        </p>
      </div>

      {/* ── Stethoscope loader ── */}
      <div
        className={`absolute bottom-[10%] transition-all duration-700 delay-300 ease-out ${
          entered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <svg width="160" height="168" viewBox="0 0 160 168" fill="none" xmlns="http://www.w3.org/2000/svg">

          {/* LAYER 1 — static gray ghost outline */}
          <path d="M 44,26 L 36,14" stroke="#E2E8F0" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M 116,26 L 124,14" stroke="#E2E8F0" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M 44,26 Q 44,58 80,58 Q 116,58 116,26" stroke="#E2E8F0" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M 80,58 C 80,76 78,98 80,118" stroke="#E2E8F0" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          <circle cx="80" cy="140" r="21" stroke="#E2E8F0" strokeWidth="4.5" fill="none" />
          <circle cx="80" cy="140" r="8"  stroke="#E2E8F0" strokeWidth="2.5" fill="none" />

          {/* LAYER 2 — animated blue drawing (all 3 s, pathLength="1000" normalises dashoffset) */}

          {/* Earpiece left — 0–12% */}
          <path d="M 44,26 L 36,14" stroke="#2563EB" strokeWidth="4.5" strokeLinecap="round"
            pathLength="1000"
            style={{ strokeDasharray:1000, strokeDashoffset:1000, animation:'earLeft 3s ease-in-out infinite' }} />

          {/* Earpiece right — 0–12% */}
          <path d="M 116,26 L 124,14" stroke="#2563EB" strokeWidth="4.5" strokeLinecap="round"
            pathLength="1000"
            style={{ strokeDasharray:1000, strokeDashoffset:1000, animation:'earRight 3s ease-in-out infinite' }} />

          {/* Headset arch — 8–42% */}
          <path d="M 44,26 Q 44,58 80,58 Q 116,58 116,26"
            stroke="#2563EB" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none"
            pathLength="1000"
            style={{ strokeDasharray:1000, strokeDashoffset:1000, animation:'headset 3s ease-in-out infinite' }} />

          {/* Tube — 42–58% */}
          <path d="M 80,58 C 80,76 78,98 80,118"
            stroke="#2563EB" strokeWidth="4.5" strokeLinecap="round" fill="none"
            pathLength="1000"
            style={{ strokeDasharray:1000, strokeDashoffset:1000, animation:'tube 3s ease-in-out infinite' }} />

          {/* Chest outer ring — 58–80% */}
          <circle cx="80" cy="140" r="21" stroke="#2563EB" strokeWidth="4.5" fill="none"
            pathLength="1000"
            style={{ strokeDasharray:1000, strokeDashoffset:1000, animation:'chestOuter 3s ease-in-out infinite' }} />

          {/* Chest inner ring — 78–88% */}
          <circle cx="80" cy="140" r="8" stroke="#2563EB" strokeWidth="2.5" fill="none"
            pathLength="1000"
            style={{ strokeDasharray:1000, strokeDashoffset:1000, animation:'chestInner 3s ease-in-out infinite' }} />

          {/* LAYER 3 — red heartbeat pulse at chest centre */}
          <circle cx="80" cy="140" r="0" fill="#EF4444">
            <animate attributeName="r"       values="0;20;0"   keyTimes="0;0.5;1" dur="0.9s" repeatCount="indefinite" begin="1.85s" />
            <animate attributeName="opacity" values="0;0.25;0" keyTimes="0;0.5;1" dur="0.9s" repeatCount="indefinite" begin="1.85s" />
          </circle>
          <circle cx="80" cy="140" r="0" fill="#EF4444">
            <animate attributeName="r"       values="0;6;0" keyTimes="0;0.5;1" dur="0.9s" repeatCount="indefinite" begin="1.85s" />
            <animate attributeName="opacity" values="0;1;0"  keyTimes="0;0.5;1" dur="0.9s" repeatCount="indefinite" begin="1.85s" />
          </circle>
        </svg>

        <style>{`
          @keyframes earLeft {
            0%   { stroke-dashoffset:1000; opacity:0 }
            3%   { opacity:1 }
            12%  { stroke-dashoffset:0 }
            82%  { stroke-dashoffset:0; opacity:1 }
            90%  { opacity:0 }
            100% { stroke-dashoffset:1000; opacity:0 }
          }
          @keyframes earRight {
            0%   { stroke-dashoffset:1000; opacity:0 }
            4%   { opacity:1 }
            13%  { stroke-dashoffset:0 }
            82%  { stroke-dashoffset:0; opacity:1 }
            90%  { opacity:0 }
            100% { stroke-dashoffset:1000; opacity:0 }
          }
          @keyframes headset {
            0%   { stroke-dashoffset:1000; opacity:0 }
            8%   { opacity:1 }
            42%  { stroke-dashoffset:0 }
            82%  { stroke-dashoffset:0; opacity:1 }
            90%  { opacity:0 }
            100% { stroke-dashoffset:1000; opacity:0 }
          }
          @keyframes tube {
            0%   { stroke-dashoffset:1000; opacity:0 }
            42%  { stroke-dashoffset:1000; opacity:0 }
            44%  { opacity:1 }
            58%  { stroke-dashoffset:0 }
            82%  { stroke-dashoffset:0; opacity:1 }
            90%  { opacity:0 }
            100% { stroke-dashoffset:1000; opacity:0 }
          }
          @keyframes chestOuter {
            0%   { stroke-dashoffset:1000; opacity:0 }
            58%  { stroke-dashoffset:1000; opacity:0 }
            60%  { opacity:1 }
            80%  { stroke-dashoffset:0 }
            82%  { stroke-dashoffset:0; opacity:1 }
            90%  { opacity:0 }
            100% { stroke-dashoffset:1000; opacity:0 }
          }
          @keyframes chestInner {
            0%   { stroke-dashoffset:1000; opacity:0 }
            78%  { stroke-dashoffset:1000; opacity:0 }
            80%  { opacity:1 }
            88%  { stroke-dashoffset:0 }
            90%  { stroke-dashoffset:0; opacity:1 }
            94%  { opacity:0 }
            100% { stroke-dashoffset:1000; opacity:0 }
          }
        `}</style>
      </div>
    </div>
  )
}
