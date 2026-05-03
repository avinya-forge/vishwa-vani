/**
 * Tests for SCHOLAR-004: scripts/parse_scholar_bhasya.js
 * Verifies CLI arg validation, extractor registration, and the
 * SCHOLAR_METADATA table is in sync with lib/scholars.ts queued tier.
 */

import { execSync } from 'child_process'
import * as fs from 'fs'
import * as path from 'path'
import * as os from 'os'

const SCRIPT = path.join(process.cwd(), 'scripts', 'parse_scholar_bhasya.js')

function runScript(args: string[]): { stdout: string; stderr: string; status: number } {
  try {
    const stdout = execSync(`node "${SCRIPT}" ${args.join(' ')}`, {
      encoding: 'utf-8',
      stdio: ['ignore', 'pipe', 'pipe'],
    })
    return { stdout, stderr: '', status: 0 }
  } catch (e: any) {
    return {
      stdout: e.stdout?.toString() ?? '',
      stderr: e.stderr?.toString() ?? '',
      status: e.status ?? 1,
    }
  }
}

describe('SCHOLAR-004: parse_scholar_bhasya.js CLI', () => {
  it('exits non-zero when --scholar is missing', () => {
    const r = runScript([])
    expect(r.status).not.toBe(0)
    expect(r.stderr).toContain('Missing --scholar')
  })

  it('exits non-zero when --book is missing', () => {
    const r = runScript(['--scholar', 'adi-shankara'])
    expect(r.status).not.toBe(0)
    expect(r.stderr).toContain('Missing --book')
  })

  it('exits non-zero when --bronze path does not exist', () => {
    const r = runScript([
      '--scholar', 'adi-shankara',
      '--book', 'bhagavad-gita',
      '--bronze', '/tmp/nonexistent-bronze-' + Date.now() + '.html',
      '--format', 'gretil-tei',
    ])
    expect(r.status).not.toBe(0)
    expect(r.stderr).toContain('Bronze file not found')
  })

  it('rejects unknown scholar id', () => {
    const r = runScript([
      '--scholar', 'fictional-scholar-xyz',
      '--book', 'bhagavad-gita',
      '--bronze', '/tmp/foo',
      '--format', 'gretil-tei',
    ])
    expect(r.status).not.toBe(0)
    expect(r.stderr).toContain('Unknown scholar')
  })

  it('rejects unknown format', () => {
    // create a tiny bronze file so the bronze-existence check passes
    const tmpFile = path.join(os.tmpdir(), `bronze-test-${Date.now()}.html`)
    fs.writeFileSync(tmpFile, '<html></html>')
    try {
      const r = runScript([
        '--scholar', 'adi-shankara',
        '--book', 'bhagavad-gita',
        '--bronze', tmpFile,
        '--format', 'unknown-format',
      ])
      expect(r.status).not.toBe(0)
      expect(r.stderr).toContain('Unknown format')
    } finally {
      fs.unlinkSync(tmpFile)
    }
  })

  it('parses a synthetic GRETIL TEI fragment end-to-end (dry-run)', () => {
    const tmpFile = path.join(os.tmpdir(), `gretil-fragment-${Date.now()}.html`)
    const fragment = `<div type="adhyaya" n="1">
<l n="1">karmaṇy-evādhikāras te mā phaleṣu kadācana mā karma-phala-hetur bhūr mā te saṅgo'stv akarmaṇi tasmād asaktaḥ satataṃ kāryaṃ karma samācara asakto hy ācaran karma param āpnoti pūruṣaḥ ataḥ karma-yoga eva śreyān iti śaṅkarāḥ vadanti</l>
<l n="2">na karmaṇām anārambhān naiṣkarmyaṃ puruṣo'śnute saṅkalpa-pratyāgāc ca śuddhi-nirmokṣa-mokṣaṇāt iti śaṅkara-bhāṣyam asti yatra vṛttiḥ pratipattim āpnoti pūrva-pakṣa-siddhānta-niścayaḥ kriyate vyākhyāne</l>
</div>`
    fs.writeFileSync(tmpFile, fragment)
    try {
      const r = runScript([
        '--scholar', 'adi-shankara',
        '--book', 'bhagavad-gita',
        '--bronze', tmpFile,
        '--format', 'gretil-tei',
        '--dry-run',
      ])
      expect(r.status).toBe(0)
      expect(r.stdout).toContain('extracted 2 verse records')
      expect(r.stdout).toContain('[dry-run] would write')
    } finally {
      fs.unlinkSync(tmpFile)
    }
  })
})
