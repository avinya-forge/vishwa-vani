'use client'

import { useState, useEffect } from 'react'
import { getUserCollections, addItemToCollection, createCollection } from '@/app/actions/collections'

interface SaveToCollectionButtonProps {
    shlokaId: string
}

type Collection = {
  id: string;
  name: string;
}

export default function SaveToCollectionButton({ shlokaId }: SaveToCollectionButtonProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [status, setStatus] = useState<string | null>(null)
    const [collections, setCollections] = useState<Collection[]>([])
    const [loading, setLoading] = useState(false)
    const [newCollectionName, setNewCollectionName] = useState('')

    useEffect(() => {
        if (isOpen) {
            loadCollections()
        }
    }, [isOpen])

    const loadCollections = async () => {
        setLoading(true)
        const result = await getUserCollections()
        if (result.collections) {
            setCollections(result.collections)
        } else if (result.error) {
            setStatus(result.error)
        }
        setLoading(false)
    }

    const handleSave = async (e: React.MouseEvent) => {
        e.preventDefault()
        setIsOpen(!isOpen)
        setStatus(null)
    }

    const handleAddToCollection = async (collectionId: string) => {
        setLoading(true)
        setStatus("Saving...")
        const result = await addItemToCollection(collectionId, 'shloka', shlokaId)
        if (result.error) {
            setStatus(result.error)
        } else {
            setStatus("Saved successfully!")
            setTimeout(() => {
                setIsOpen(false)
                setStatus(null)
            }, 2000)
        }
        setLoading(false)
    }

    const handleCreateCollection = async () => {
        if (!newCollectionName.trim()) return

        setLoading(true)
        setStatus("Creating...")
        const result = await createCollection(newCollectionName.trim())
        if (result.error) {
            setStatus(result.error)
        } else if (result.collection) {
            setCollections([result.collection, ...collections])
            setNewCollectionName('')
            await handleAddToCollection(result.collection.id)
        }
        setLoading(false)
    }

    return (
        <div className="relative inline-block text-left mt-4">
            <button
                onClick={handleSave}
                className="inline-flex justify-center items-center px-4 py-2 text-sm font-medium text-orange-700 bg-orange-100 border border-orange-200 rounded-md hover:bg-orange-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-500"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                Save to Collection
            </button>

            {isOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-0 mt-2 w-64 origin-top bg-white border border-gray-200 rounded-md shadow-lg outline-none z-10 p-4">
                    <h3 className="text-sm font-semibold text-gray-900 mb-2 border-b pb-2">Save to...</h3>

                    {loading && collections.length === 0 ? (
                        <p className="text-sm text-gray-500 my-2">Loading...</p>
                    ) : (
                        <ul className="max-h-40 overflow-y-auto mb-3 space-y-1">
                            {collections.length === 0 && !loading && (
                                <li className="text-sm text-gray-500 italic py-1">No collections yet</li>
                            )}
                            {collections.map(c => (
                                <li key={c.id}>
                                    <button
                                        disabled={loading}
                                        onClick={() => handleAddToCollection(c.id)}
                                        className="w-full text-left text-sm text-gray-700 hover:bg-orange-50 px-2 py-1.5 rounded disabled:opacity-50"
                                    >
                                        {c.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}

                    <div className="border-t pt-3 mt-2">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={newCollectionName}
                                onChange={(e) => setNewCollectionName(e.target.value)}
                                placeholder="New collection..."
                                className="flex-1 text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-orange-500"
                                onKeyDown={(e) => e.key === 'Enter' && handleCreateCollection()}
                            />
                            <button
                                disabled={loading || !newCollectionName.trim()}
                                onClick={handleCreateCollection}
                                className="text-sm bg-orange-500 text-white px-2 py-1 rounded disabled:opacity-50 hover:bg-orange-600"
                            >
                                Add
                            </button>
                        </div>
                    </div>

                    {status && (
                        <p className={`mt-3 text-xs text-center ${status.includes('error') || status.includes('Not authenticated') ? 'text-red-500' : 'text-green-600'}`}>
                            {status}
                        </p>
                    )}

                    <button
                        onClick={() => setIsOpen(false)}
                        className="mt-3 w-full text-center text-xs text-gray-500 hover:text-gray-700"
                    >
                        Cancel
                    </button>
                </div>
            )}
        </div>
    )
}
