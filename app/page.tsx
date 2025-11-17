import { redirect } from 'next/navigation'

export default function Home() {
  // Redirect to dashboard by default
  // In production, this would check authentication first
  redirect('/dashboard')
}
