import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export default async function ProfilePage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center justify-center p-8">
      <div className="animate-in flex-1 flex flex-col w-full max-w-4xl px-3 text-center">
        <h1 className="text-4xl font-bold mb-8 font-serif text-orange-900">User Profile</h1>

        <div className="bg-white p-8 rounded-lg shadow-md border border-orange-100 max-w-2xl mx-auto w-full text-left">
            <div className="mb-6 pb-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold mb-2 text-gray-800">Account Details</h2>
                <p className="text-gray-600 mb-1">
                    <span className="font-medium text-gray-900">Email:</span> {user.email}
                </p>
                 <p className="text-gray-600 mb-1">
                    <span className="font-medium text-gray-900">User ID:</span> <span className="font-mono text-sm bg-gray-50 px-2 py-1 rounded">{user.id}</span>
                </p>
                <p className="text-gray-600 mb-1">
                    <span className="font-medium text-gray-900">Last Sign In:</span> {new Date(user.last_sign_in_at || '').toLocaleString()}
                </p>
            </div>

            <div>
                 <h2 className="text-xl font-semibold mb-2 text-gray-800">Preferences</h2>
                 <p className="text-gray-500 italic">No preferences saved yet.</p>
            </div>
        </div>
      </div>
    </div>
  )
}
