import { login, signup } from './actions'

export default async function LoginPage(
  props: {
    searchParams: Promise<{ message: string; error: string }>
  }
) {
  const searchParams = await props.searchParams
  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 mx-auto mt-20">
      <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
        <h1 className="text-3xl font-bold mb-6 text-center text-orange-800 font-serif">Sign In / Sign Up</h1>

        {searchParams.message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{searchParams.message}</span>
          </div>
        )}

        {searchParams.error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{searchParams.error}</span>
          </div>
        )}

        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="email"
          placeholder="you@example.com"
          required
        />
        <label className="text-md" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <div className="flex gap-4 justify-between">
            <button
            formAction={login}
            className="bg-orange-600 hover:bg-orange-700 rounded-md px-4 py-2 text-foreground text-white flex-1"
            >
            Sign In
            </button>
            <button
            formAction={signup}
            className="border border-orange-600 text-orange-600 hover:bg-orange-50 rounded-md px-4 py-2 text-foreground flex-1"
            >
            Sign Up
            </button>
        </div>
      </form>
    </div>
  )
}
