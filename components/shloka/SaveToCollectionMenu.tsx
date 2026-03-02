'use client'

import { useState, useEffect } from 'react'
import { getUserCollections, saveItemToCollection, createCollection } from '@/app/actions/collections'

interface SaveToCollectionMenuProps {
  shlokaId: string
}

export default function SaveToCollectionMenu({ shlokaId }: SaveToCollectionMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [collections, setCollections] = useState<any[]>([])
  const [newCollectionName, setNewCollectionName] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    if (isOpen && collections.length === 0) {
      loadCollections()
    }
  }, [isOpen])

  const loadCollections = async () => {
    setLoading(true)
    setError(null)
    try {
      const { data, error } = await getUserCollections()
      if (error) {
        if (error === 'Not authenticated') {
          // If not authenticated, we could just disable the feature or show a message.
          // For now, we'll just not show collections.
          setError('Please login to save shlokas.')
        } else {
          setError('Failed to load collections.')
        }
      } else {
        setCollections(data || [])
      }
    } catch (err) {
      setError('An error occurred.')
    } finally {
      setLoading(false)
    }
  }

  const handleSaveToCollection = async (collectionId: string) => {
    setMessage(null)
    setError(null)
    try {
      const { error } = await saveItemToCollection(collectionId, 'shloka', shlokaId)
      if (error) {
        setError('Failed to save shloka to collection.')
      } else {
        setMessage('Saved successfully!')
        setTimeout(() => setIsOpen(false), 1500)
      }
    } catch (err) {
      setError('An error occurred.')
    }
  }

  const handleCreateCollection = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCollectionName.trim()) return

    setIsCreating(true)
    setMessage(null)
    setError(null)
    try {
      const { data, error } = await createCollection(newCollectionName, '')
      if (error) {
        setError('Failed to create collection.')
      } else if (data) {
        setCollections([...collections, data])
        setNewCollectionName('')
        await handleSaveToCollection(data.id)
      }
    } catch (err) {
      setError('An error occurred.')
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-orange-600 hover:text-orange-800 focus:outline-none focus:underline text-sm font-medium transition-colors"
        aria-label="Save to Collection"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 inline-block mr-1">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
        </svg>
        Save
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10 p-2">
          {error && <p className="text-red-500 text-xs mb-2 px-2">{error}</p>}
          {message && <p className="text-green-500 text-xs mb-2 px-2">{message}</p>}

          <div className="py-1">
            {loading ? (
              <p className="text-gray-500 text-xs px-2 py-1">Loading...</p>
            ) : collections.length > 0 ? (
              <ul className="max-h-40 overflow-y-auto mb-2">
                {collections.map(c => (
                  <li key={c.id}>
                    <button
                      onClick={() => handleSaveToCollection(c.id)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-900 rounded-md"
                    >
                      {c.name}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              !error && <p className="text-gray-500 text-xs px-2 py-1 mb-2">No collections yet.</p>
            )}

            {(!error || error !== 'Please login to save shlokas.') && (
                <form onSubmit={handleCreateCollection} className="border-t pt-2 mt-1">
                  <input
                    type="text"
                    placeholder="New Collection"
                    value={newCollectionName}
                    onChange={(e) => setNewCollectionName(e.target.value)}
                    className="w-full text-sm border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500 px-2 py-1 mb-1 border"
                  />
                  <button
                    type="submit"
                    disabled={isCreating || !newCollectionName.trim()}
                    className="w-full bg-orange-100 text-orange-800 hover:bg-orange-200 text-xs py-1 rounded-md transition-colors disabled:opacity-50"
                  >
                    {isCreating ? 'Creating...' : '+ Create & Save'}
                  </button>
                </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}