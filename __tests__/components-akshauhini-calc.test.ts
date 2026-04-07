import { calculateAkshauhini } from '@/components/lab/akshauhini-calc'

describe('calculateAkshauhini()', () => {
  it('1 unit produces standard ratios (21870 base)', () => {
    const { elephants, chariots, cavalry, infantry } = calculateAkshauhini(1)
    expect(elephants).toBe(21_870)
    expect(chariots).toBe(21_870)
    expect(cavalry).toBe(21_870 * 3)
    expect(infantry).toBe(21_870 * 5)
  })

  it('total for 1 unit is sum of all four arms', () => {
    const s = calculateAkshauhini(1)
    expect(s.total).toBe(s.elephants + s.chariots + s.cavalry + s.infantry)
  })

  it('18 units scales linearly', () => {
    const one = calculateAkshauhini(1)
    const eighteen = calculateAkshauhini(18)
    expect(eighteen.total).toBe(one.total * 18)
  })

  it('full 18-Akshauhini war total is known canonical value', () => {
    // 18 * (1+1+3+5) * 21870 = 18 * 10 * 21870 = 3,936,600
    const { total } = calculateAkshauhini(18)
    expect(total).toBe(3_936_600)
  })
})
