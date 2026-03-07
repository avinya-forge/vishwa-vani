import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import CreateCollectionForm from './CreateCollectionForm'

export const dynamic = 'force-dynamic'

export default async function CollectionsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: collections, error } = await supabase
    .from('collections')
    .select('*, saved_items(count)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Your Collections</h1>
      </div>

      <CreateCollectionForm />

      {error ? (
        <div className="bg-red-50 text-red-500 p-4 rounded-md mt-6">
          Error loading collections: {error.message}
        </div>
      ) : (
        <>
          {collections?.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border border-dashed border-gray-300 mt-6">
              <p className="text-gray-500 mb-2">You don&apos;t have any collections yet.</p>
              <p className="text-sm text-gray-400">Create one above to start saving shlokas!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {collections?.map((collection) => (
                <Link
                  key={collection.id}
                  href={`/collections/${collection.id}`}
                  className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200 p-6 flex flex-col h-full"
                >
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">{collection.name}</h2>
                  <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-2">
                    {collection.description || 'No description'}
                  </p>
                  <div className="text-xs font-medium text-orange-600 uppercase tracking-wider mt-auto pt-4 border-t border-gray-100">
                    {collection.saved_items?.[0]?.count || 0} items
                  </div>
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
