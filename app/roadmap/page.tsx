import React from 'react'
import { getDynamicLibraryStats } from '@/lib/texts'
import RoadmapClient from './RoadmapClient'

export default async function RoadmapPage() {
  const stats = await getDynamicLibraryStats();
  return <RoadmapClient stats={stats} />
}
