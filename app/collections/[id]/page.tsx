import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import ShlokaCard from '@/components/shloka/ShlokaCard'
import RemoveItemButton from './RemoveItemButton'
import { Shloka } from '@/utils/services/shloka'

export const dynamic = 'force-dynamic'

export default async function CollectionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch collection details
  const { data: collection, error: collectionError } = await supabase
    .from('collections')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  if (collectionError || !collection) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="bg-red-50 text-red-500 p-4 rounded-md">
          Collection not found or access denied.
        </div>
      </div>
    )
  }

  // Fetch saved items
  const { data: savedItems, error: itemsError } = await supabase
    .from('saved_items')
    .select('*')
    .eq('collection_id', id)
    .order('created_at', { ascending: false })

  if (itemsError) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="bg-red-50 text-red-500 p-4 rounded-md">
          Error loading saved items: {itemsError.message}
        </div>
      </div>
    )
  }

  // Separate item IDs by type to fetch their details
  const shlokaIds = savedItems.filter(item => item.item_type === 'shloka').map(item => item.item_id)

  // Fetch Shlokas
  let shlokasMap = new Map<string, Shloka>()
  if (shlokaIds.length > 0) {
    const { data: shlokasData } = await supabase
      .from('shlokas')
      .select('*')
      .in('id', shlokaIds)

    if (shlokasData) {
      shlokasData.forEach(shloka => {
        shlokasMap.set(shloka.id, shloka as Shloka)
      })
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link href="/collections" className="text-sm text-orange-600 hover:underline mb-4 inline-block">
          &larr; Back to Collections
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">{collection.name}</h1>
        {collection.description && (
          <p className="text-gray-600 mt-2">{collection.description}</p>
        )}
      </div>

      {savedItems.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-dashed border-gray-300">
          <p className="text-gray-500 mb-2">This collection is empty.</p>
          <p className="text-sm text-gray-400">Save shlokas to see them here.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {savedItems.map((item) => {
            if (item.item_type === 'shloka') {
              const shloka = shlokasMap.get(item.item_id)
              if (!shloka) return null // Data might have been deleted

              return (
                <div key={item.id} className="relative group">
                  <div className="absolute right-0 top-0 z-10 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <RemoveItemButton savedItemId={item.id} collectionId={id} />
                  </div>
                  <ShlokaCard shloka={shloka} />
                </div>
              )
            }
            return null // Handle other types if needed
          })}
        </div>
      )}
    </div>
  )
}
