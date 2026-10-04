import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
export const alt = 'Vishwa-Vani - The Universal Voice of Vedic Wisdom'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
 
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1c1917',
          backgroundImage: 'linear-gradient(to bottom, #1c1917, #0c0a09)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 40 }}>
          <div
            style={{
              width: 100,
              height: 100,
              backgroundColor: 'white',
              color: '#ea580c',
              borderRadius: 24,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 64,
              fontWeight: 'bolder',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
              transform: 'rotate(12deg)',
            }}
          >
            ॐ
          </div>
        </div>
        <div
          style={{
            fontSize: 72,
            fontFamily: 'serif',
            fontWeight: '900',
            color: 'white',
            letterSpacing: '-0.05em',
            marginBottom: 20,
          }}
        >
          Vishwa-Vani
        </div>
        <div
          style={{
            fontSize: 32,
            fontStyle: 'italic',
            color: '#d6d3d1',
            maxWidth: 800,
            textAlign: 'center',
          }}
        >
          The Universal Voice of Vedic Wisdom
        </div>
      </div>
    ),
    { ...size }
  )
}
