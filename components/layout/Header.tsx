import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export default async function Header() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const signOut = async () => {
    'use server'
    const supabase = await createClient()
    await supabase.auth.signOut()
    revalidatePath('/', 'layout')
    redirect('/login')
  }

  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16 bg-white/50 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
        <div className="flex gap-5 items-center font-semibold">
          <Link href="/" className="text-xl font-bold tracking-tight text-orange-900 hover:text-orange-700 transition-colors">
            Vishwa-Vani
          </Link>
          <div className="flex items-center gap-4 text-orange-800 ml-4">
            <Link href="/dictionary" className="hover:text-orange-600 transition-colors">Dictionary</Link>
            {user && (
              <Link href="/collections" className="hover:text-orange-600 transition-colors">Collections</Link>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-gray-600 truncate max-w-[150px] sm:max-w-none hidden md:inline-block">Hey, {user.email}!</span>
              <Link
                href="/profile"
                className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover border text-sm"
              >
                Profile
              </Link>
              <form action={signOut}>
                <button className="py-2 px-4 rounded-md no-underline bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 text-sm transition-colors">
                  Logout
                </button>
              </form>
            </div>
          ) : (
            <Link
              href="/login"
              className="py-2 px-4 rounded-md no-underline bg-orange-600 hover:bg-orange-700 text-white font-medium text-sm transition-colors"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
