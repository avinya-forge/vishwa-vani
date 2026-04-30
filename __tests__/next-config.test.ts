import fs from 'fs'
import path from 'path'

describe('next.config redirects (BUG-066)', () => {
  const configPath = path.join(process.cwd(), 'next.config.ts')
  const configSource = fs.readFileSync(configPath, 'utf8')

  it('defines a redirects() function', () => {
    expect(configSource).toMatch(/async redirects\(\)/)
  })

  it('has /isha-upanishad/shanti redirect rule', () => {
    expect(configSource).toMatch(/source:\s*['"]\/isha-upanishad\/shanti['"]/)
  })

  it('redirects to /isha-upanishad/1/0', () => {
    expect(configSource).toMatch(/destination:\s*['"]\/isha-upanishad\/1\/0['"]/)
  })
})
