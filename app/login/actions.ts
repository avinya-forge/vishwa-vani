'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient, getOAuthUrl } from '@/utils/supabase/server'
import { headers } from 'next/headers'

export async function signInWithGoogle() {
  const origin = (await headers()).get('origin')
  const url = await getOAuthUrl('google', `${origin}/auth/callback`)
  if (url) {
    redirect(url)
  }
}

export async function signInWithApple() {
  const origin = (await headers()).get('origin')
  const url = await getOAuthUrl('apple', `${origin}/auth/callback`)
  if (url) {
    redirect(url)
  }
}

export async function login(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/login?message=Could not authenticate user')
  }

  revalidatePath('/', 'layout')
  redirect('/profile')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/login?message=Could not authenticate user')
  }

  revalidatePath('/', 'layout')
  redirect('/profile')
}
