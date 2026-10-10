import React from 'react'
import { getDynamicLibraryStats } from '@/lib/server-lake'
import { getVedicHierarchy } from '@/lib/texts'
import LibraryClient from './LibraryClient'

export const metadata = {
  title: 'Sacred Library | सम्पूर्ण वैदिक ग्रन्थागार — Vishwa-Vani',
  description: 'Explore the complete corpus of 17 sacred scriptures across Veda Saṁhitās, Upaniṣads, Itihāsa, Purāṇas, and Darśana Sūtras. Choose any scripture and start reading with authentic multi-scholar commentaries.',
}

export default async function LibraryPage() {
  const stats = await getDynamicLibraryStats()
  const hierarchy = getVedicHierarchy()
  return <LibraryClient stats={stats} hierarchy={hierarchy} />
}
