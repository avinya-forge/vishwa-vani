import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createCollection } from '@/app/actions/collections'

export default async function CollectionsPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const { data: collections, error } = await supabase
        .from('collections')
        .select(`
            *,
            saved_items (count)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

    return (
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-serif text-gray-900">My Collections</h1>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Create New Collection</h2>
                <form action={async (formData: FormData) => {
                    'use server'
                    const name = formData.get('name') as string
                    const description = formData.get('description') as string
                    if (name) {
                        await createCollection(name, description)
                    }
                }} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm border p-2"
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description (Optional)</label>
                        <textarea
                            name="description"
                            id="description"
                            rows={3}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm border p-2"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-orange-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                    >
                        Create Collection
                    </button>
                </form>
            </div>

            {error ? (
                <div className="bg-red-50 p-4 rounded-md">
                    <p className="text-red-700">Failed to load collections: {error.message}</p>
                </div>
            ) : collections?.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200 text-gray-500">
                    <p>You haven't created any collections yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {collections?.map((collection) => (
                        <Link
                            key={collection.id}
                            href={`/collections/${collection.id}`}
                            className="block p-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:border-orange-300 hover:shadow-md transition-all duration-200"
                        >
                            <h3 className="text-xl font-medium text-gray-900 mb-2 truncate">
                                {collection.name}
                            </h3>
                            <p className="text-gray-500 text-sm mb-4 line-clamp-2 min-h-[40px]">
                                {collection.description || 'No description'}
                            </p>
                            <div className="flex items-center text-sm text-orange-600 font-medium">
                                <span>{collection.saved_items[0].count} items</span>
                                <span className="ml-auto">&rarr;</span>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}
