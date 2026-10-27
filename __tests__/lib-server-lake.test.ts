


jest.mock('@libsql/client', () => {
  return {
    createClient: jest.fn()
  }
})

jest.mock('fs', () => ({
  existsSync: jest.fn()
}))

describe('Server Lake', () => {
  let mockExecute: jest.Mock

  beforeEach(() => {
    jest.clearAllMocks()
    jest.resetModules()

    mockExecute = jest.fn()
    const { createClient } = require('@libsql/client')
    createClient.mockReturnValue({
      execute: mockExecute
    })
  })

  it('connects to remote turso DB if URL is provided and decrypts data correctly', async () => {
    process.env.TURSO_DATABASE_URL = 'http://turso'
    process.env.TURSO_AUTH_TOKEN = 'test'
    process.env.LAKE_KEY = 'test-key'

    mockExecute.mockResolvedValueOnce({
      rows: [
        {
          content: '{"verse": 1, "original": "test"}'
        }
      ]
    })

    const { getVersesFromLakeServer } = require('@/lib/server-lake')
    const verses = await getVersesFromLakeServer('gita', 1)

    const { createClient } = require('@libsql/client')
    expect(createClient).toHaveBeenCalledWith({
      url: 'http://turso',
      authToken: 'test'
    })
    expect(verses).toHaveLength(1)
    expect(verses[0].verse).toBe(1)

    delete process.env.TURSO_DATABASE_URL
    delete process.env.TURSO_AUTH_TOKEN
    delete process.env.LAKE_KEY
  })

  it('falls back to local SQLite file when TURSO_DATABASE_URL is not set', async () => {
    const fs = require('fs')
    fs.existsSync.mockReturnValue(true)
    mockExecute.mockResolvedValueOnce({
      rows: []
    })

    const { getVersesFromLakeServer } = require('@/lib/server-lake')
    const verses = await getVersesFromLakeServer('gita', 2)

    const { createClient } = require('@libsql/client')
    expect(createClient).toHaveBeenCalledWith(
      expect.objectContaining({
        url: expect.stringContaining('file:')
      })
    )
    expect(verses).toHaveLength(0)
  })

  it('throws an error when local SQLite file is not found and Turso URL missing', async () => {
    const fs = require('fs')
    fs.existsSync.mockReturnValue(false)

    const { getVersesFromLakeServer } = require('@/lib/server-lake')
    await expect(getVersesFromLakeServer('gita', 3)).rejects.toThrow('SQLITE_CANTOPEN: DB missing and no Turso URL provided.')
  })

  it('handles corrupted JSON in DB rows safely by filtering them out', async () => {
    const fs = require('fs')
    fs.existsSync.mockReturnValue(true)
    mockExecute.mockResolvedValueOnce({
      rows: [
        {
          content: '{"verse": 1, "original": "test"}'
        },
        {
          content: '{ bad json }'
        }
      ]
    })

    const { getVersesFromLakeServer } = require('@/lib/server-lake')
    const verses = await getVersesFromLakeServer('gita', 4)
    expect(verses).toHaveLength(1)
    expect(verses[0].verse).toBe(1)
  })

  it('gracefully handles missing LAKE_KEY when fetching encrypted data in dev', async () => {
    const fs = require('fs')
    fs.existsSync.mockReturnValue(true)
    delete process.env.LAKE_KEY
    Object.defineProperty(process.env, 'NODE_ENV', { value: 'development', configurable: true })

    mockExecute.mockResolvedValueOnce({
      rows: [
        {
          content: 'iv:auth:encrypted'
        }
      ]
    })

    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    const { getVersesFromLakeServer } = require('@/lib/server-lake')
    const verses = await getVersesFromLakeServer('gita', 5)

    expect(verses).toHaveLength(0)

    consoleWarnSpy.mockRestore()
    consoleErrorSpy.mockRestore()
  })

  it('fails closed when missing LAKE_KEY in production', async () => {
    const originalEnv = process.env.NODE_ENV
    Object.defineProperty(process.env, 'NODE_ENV', { value: 'production', configurable: true })
    delete process.env.LAKE_KEY
    delete process.env.LAKE_SECRET_KEY
    jest.resetModules()

    const fs = require('fs')
    fs.existsSync.mockReturnValue(true)

    // We must re-mock the clients since we reset modules
    const mockExecuteProd = jest.fn()
    const libClient = require('@libsql/client')
    libClient.createClient = jest.fn().mockReturnValue({ execute: mockExecuteProd })

    mockExecuteProd.mockResolvedValueOnce({
      rows: [
        {
          content: 'iv:auth:encrypted'
        }
      ]
    })

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => {
      require('@/lib/server-lake')
    }).toThrow('Missing LAKE_KEY or LAKE_SECRET_KEY environment variable in production');

    Object.defineProperty(process.env, 'NODE_ENV', { value: originalEnv, configurable: true })
    consoleErrorSpy.mockRestore()
  })
})
