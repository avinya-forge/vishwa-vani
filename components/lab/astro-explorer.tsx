'use client'

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
      // Tithi is the longitudinal angle between moon and sun, divided by 12 degrees
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
      // Moon's longitude divided by 13 degrees 20 minutes (13.333)
      // Ayanamsha correction (approx 24 degrees)
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

  return (
    <VedicAppTemplate
      title="Astro Explorer"
      subtitle="Vedic Panchang"
      icon="🌌"
      darkMode={true}
      footerNote="Calculates Tithi and Nakshatra based on planetary longitudes using Vedic Julian date formulas."
    >
      {!result ? (
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-500 uppercase tracking-widest ml-1">Enter a Date</label>
            <input 
              type="date"
              value={dateStr}
              onChange={(e) => setDateStr(e.target.value)}
              className="w-full bg-stone-800/50 border border-stone-700 p-4 rounded-xl focus:border-orange-400 outline-none transition-all text-stone-100 shadow-inner"
              data-testid="date-input"
            />
          </div>
          
          <button
              onClick={calculatePanchang}
              disabled={!dateStr || isCalculating}
              className="btn-primary w-full shadow-saffron-100"
          >
            {isCalculating ? 'Calculating Ephemeris...' : 'Calculate Panchang'}
          </button>
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 bg-stone-800 p-6 rounded-2xl border border-stone-700 text-center">
          <div className="bg-stone-900 rounded-xl p-4 border border-stone-800 shadow-sm text-center mb-4">
            <div className="text-[10px] uppercase tracking-widest text-orange-400 font-black mb-1">Lunar Day (Tithi)</div>
            <h4 className="font-serif font-black text-stone-200 text-xl">{result.tithi}</h4>
            <div className="text-xs text-stone-500 font-medium mt-1">{result.phase}</div>
          </div>
          
          <div className="bg-stone-900 rounded-xl p-4 border border-stone-800 shadow-sm text-center">
            <div className="text-[10px] uppercase tracking-widest text-blue-400 font-black mb-1">Lunar Mansion (Nakshatra)</div>
            <h4 className="font-serif font-black text-stone-200 text-xl">{result.nakshatra}</h4>
          </div>

          <button 
              onClick={() => { setResult(null); setDateStr(''); }}
              className="btn-secondary w-full mt-6 bg-stone-700 hover:bg-stone-600 text-white border-none"
          >
            Check Another Date
          </button>
        </div>
      )}
    </VedicAppTemplate>
  )
}
