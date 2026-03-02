import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import ShlokaCard from '@/components/shloka/ShlokaCard'
import { removeItemFromCollection } from '@/app/actions/collections'

interface CollectionPageProps {
    params: Promise<{
        id: string
    }>
}

export default async function CollectionPage({ params }: CollectionPageProps) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const { id } = await params

    const { data: collection, error: colError } = await supabase
        .from('collections')
        .select('*')
        .eq('id', id)
        .eq('user_id', user.id)
        .single()

    if (colError || !collection) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-12">
                <p className="text-red-500">Collection not found or access denied.</p>
                <Link href="/collections" className="text-orange-600 hover:underline">&larr; Back to Collections</Link>
            </div>
        )
    }

    // Fetch saved items
    const { data: savedItems, error: itemsError } = await supabase
        .from('saved_items')
        .select(`
            *,
            shloka:item_id (
              id,
              deity,
              source_text,
              verse_index,
              sanskrit_text,
              word_mapping,
              created_at
            )
        `)
        .eq('collection_id', id)
        .order('created_at', { ascending: false })

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="mb-8">
                <Link href="/collections" className="text-sm text-gray-500 hover:text-gray-700 mb-4 inline-block">
                    &larr; Back to Collections
                </Link>
                <h1 className="text-3xl font-serif text-gray-900 mb-2">{collection.name}</h1>
                {collection.description && (
                    <p className="text-gray-600">{collection.description}</p>
                )}
            </div>

            {itemsError ? (
                <div className="bg-red-50 p-4 rounded-md">
                    <p className="text-red-700">Failed to load items: {itemsError.message}</p>
                </div>
            ) : savedItems?.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200 text-gray-500">
                    <p>No items saved in this collection yet.</p>
                </div>
            ) : (
                <div className="space-y-8">
                    {savedItems?.map((item) => (
                        <div key={item.id} className="relative">
                            <form action={async () => {
                                'use server'
                                await removeItemFromCollection(id, item.item_id, item.item_type)
                            }} className="absolute top-4 right-4 z-10">
                                <button type="submit" className="text-sm bg-white border border-gray-300 rounded px-2 py-1 shadow-sm hover:bg-gray-50 text-red-600">
                                    Remove
                                </button>
                            </form>

                            {item.item_type === 'shloka' && item.shloka ? (
                                <ShlokaCard shloka={item.shloka} />
                            ) : (
                                <div className="p-4 bg-gray-100 rounded">
                                    <p>Unsupported item type or missing data.</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
