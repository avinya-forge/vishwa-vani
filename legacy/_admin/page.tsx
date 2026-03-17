'use client'

import { useState } from 'react'

export default function AdminPage() {
    const [password, setPassword] = useState('')
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [jsonInput, setJsonInput] = useState('')
    const [status, setStatus] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        // Simple MVP protection. In prod, use real auth or env var on server.
        // For now, let's just use a hardcoded "secret" or check against an API.
        // We'll trust the API route to do the real check, but here we just gated the UI.
        if (password === 'om-shanti') {
            setIsAuthenticated(true)
        } else {
            alert('Incorrect password')
        }
    }

    const handleImport = async () => {
        if (!jsonInput) return
        setLoading(true)
        setStatus('Importing...')

        try {
            const payload = JSON.parse(jsonInput)

            const res = await fetch('/api/admin/import', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-admin-key': password // Send password to server for verification
                },
                body: JSON.stringify(payload),
            })

            const result = await res.json()

            if (res.ok) {
                setStatus(`Success: ${result.message}`)
                setJsonInput('')
            } else {
                setStatus(`Error: ${result.error}`)
            }
        } catch (e) {
            setStatus(`Invalid JSON: ${(e as Error).message}`)
        } finally {
            setLoading(false)
        }
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md">
                    <h1 className="text-xl font-bold mb-4">Admin Access</h1>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border p-2 rounded w-full mb-4"
                        placeholder="Enter Admin Password"
                    />
                    <button type="submit" className="bg-orange-600 text-white px-4 py-2 rounded w-full hover:bg-orange-700">
                        Login
                    </button>
                </form>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold mb-8">Content Import Tool</h1>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold mb-4">Bulk Import JSON</h2>
                <p className="text-sm text-gray-500 mb-4">
                    Paste a JSON object containing `dictionary` (array) and `shlokas` (array).
                </p>

                <textarea
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                    className="w-full h-64 p-4 border border-gray-300 rounded-lg font-mono text-sm mb-4 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder='{
  "dictionary": [
    { "root_word": "Gaja", "meaning_en": "Elephant", ... }
  ],
  "shlokas": [
    { "deity": "Ganesha", "source_text": "...", "sanskrit_text": "...", "word_mapping": [...] }
  ]
}'
                />

                <div className="flex justify-between items-center">
                    <div className="text-sm font-medium">
                        {status && (
                            <span className={status.startsWith('Error') || status.startsWith('Invalid') ? 'text-red-600' : 'text-green-600'}>
                                {status}
                            </span>
                        )}
                    </div>
                    <button
                        onClick={handleImport}
                        disabled={loading || !jsonInput}
                        className={`px-6 py-2 rounded-lg font-semibold text-white ${loading || !jsonInput ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-600 hover:bg-orange-700'
                            }`}
                    >
                        {loading ? 'Importing...' : 'Run Import'}
                    </button>
                </div>
            </div>
        </div>
    )
}
