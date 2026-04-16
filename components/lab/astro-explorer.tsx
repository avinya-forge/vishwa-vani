import React, { useState } from 'react'
import VedicAppTemplate from './vedic-app-template'

// Vedic Astronomy constants (LAB-805)
const TITHIS = [
  'Pratipada', 'Dvitiya', 'Tritiya', 'Chaturthi', 'Panchami',
  'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami',
  'Ekadashi', 'Dvadashi', 'Trayodashi', 'Chaturdashi', 'Purnima/Amavasya'
]

const NAKSHATRAS = [
  'Ashvini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashirsha', 'Ardra',
  'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni',
  'Hasta', 'Chitra', 'Svati', 'Vishakha', 'Anuradha', 'Jyeshtha',
  'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha',
  'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
]

// Calculate Julian Date
function calculateJD(date: Date): number {
  let y = date.getUTCFullYear();
  let m = date.getUTCMonth() + 1;
  const d = date.getUTCDate();

  if (m <= 2) {
    y -= 1;
    m += 12;
  }

  const a = Math.floor(y / 100);
  const b = 2 - a + Math.floor(a / 4);

  return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d + b - 1524.5;
}

// Calculate approximate Moon Longitude
function moonLongitude(jd: number): number {
  const t = (jd - 2451545.0) / 36525;
  const l = (218.316 + 481267.8813 * t) % 360;
  return l < 0 ? l + 360 : l;
}

// Calculate approximate Sun Longitude
function sunLongitude(jd: number): number {
  const t = (jd - 2451545.0) / 36525;
  const l = (280.466 + 36000.7698 * t) % 360;
  return l < 0 ? l + 360 : l;
}

export default function AstroExplorer() {
  const [dateStr, setDateStr] = useState('')
  const [result, setResult] = useState<{ tithi: string, nakshatra: string, phase: string } | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const calculatePanchang = () => {
    if (!dateStr) return
    setIsCalculating(true)
    
    setTimeout(() => {
      const date = new Date(dateStr)
      if (isNaN(date.getTime())) {
        setResult({ tithi: 'Invalid Date', nakshatra: 'Unknown', phase: 'Unknown' })
        setIsCalculating(false)
        return
      }

      const jd = calculateJD(date)
      const sunLon = sunLongitude(jd)
      const moonLon = moonLongitude(jd)

      // Tithi Calculation
      let angle = moonLon - sunLon
      if (angle < 0) angle += 360
      const tithiIndex = Math.floor(angle / 12)

      let phase = 'Shukla Paksha (Waxing)'
      let tithiName = TITHIS[tithiIndex % 15]

      if (tithiIndex >= 15) {
        phase = 'Krishna Paksha (Waning)'
        if (tithiIndex === 29) {
           tithiName = 'Amavasya (New Moon)'
        }
      } else if (tithiIndex === 14) {
        tithiName = 'Purnima (Full Moon)'
      }

      // Nakshatra Calculation
      const ayanamsha = 24.1;
      let siderealMoonLon = moonLon - ayanamsha;
      if (siderealMoonLon < 0) siderealMoonLon += 360;

      const nakshatraIndex = Math.floor(siderealMoonLon / 13.333333)
      const nakshatra = NAKSHATRAS[nakshatraIndex % 27]

      setResult({
        tithi: tithiName,
        nakshatra: nakshatra,
        phase: phase
      })
      setIsCalculating(false)
    }, 800)
  }

  const footerNote = "Calculates Tithi and Nakshatra based on planetary longitudes using Vedic Julian date formulas."

  return (
    <VedicAppTemplate
      title="Astro Inquirer"
      subtitle="Vedic Panchang • Ephemeris"
      icon="🌌"
      footerNote={footerNote}
    >
      {!result ? (
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-stone-500 ml-1">
              <span>Standard Civil Date</span>
              <span className="text-orange-600">Terrestrial Anchor</span>
            </div>
            <input 
              type="date"
              value={dateStr}
              onChange={(e) => setDateStr(e.target.value)}
              className="w-full bg-stone-100 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700/50 p-4 rounded-2xl focus:border-orange-500 outline-none transition-all text-stone-900 dark:text-stone-100 shadow-inner appearance-none"
              data-testid="date-input"
            />
          </div>
          
          <button
              onClick={calculatePanchang}
              disabled={!dateStr || isCalculating}
              className="w-full py-4 bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl disabled:opacity-50"
          >
            {isCalculating ? 'Computing Ephemeris...' : 'Align with Cosmic Rhythms'}
          </button>
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-4 text-center">
          <div className="bg-stone-50 dark:bg-stone-800/20 p-6 rounded-[2rem] border border-stone-100 dark:border-stone-800/50">
            <div className="text-[10px] uppercase tracking-widest text-orange-600 font-black mb-2">Lunar Phase (Tithi)</div>
            <h4 className="font-serif italic font-black text-stone-900 dark:text-stone-200 text-xl mb-1">{result.tithi}</h4>
            <div className="text-[10px] font-black uppercase tracking-widest text-stone-400">{result.phase}</div>
          </div>
          
          <div className="bg-white dark:bg-stone-900/40 p-6 rounded-[2rem] border border-stone-100 dark:border-stone-800">
            <div className="text-[10px] uppercase tracking-widest text-blue-600 dark:text-blue-400 font-black mb-2">Moon Station (Nakshatra)</div>
            <h4 className="font-serif italic font-black text-stone-900 dark:text-stone-200 text-xl">{result.nakshatra}</h4>
          </div>

          <button 
              onClick={() => { setResult(null); setDateStr(''); }}
              className="w-full py-4 bg-orange-600 hover:bg-orange-500 text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-lg shadow-orange-600/20 mt-2"
          >
            Observed New Date
          </button>
        </div>
      )}
    </VedicAppTemplate>
  )
}
