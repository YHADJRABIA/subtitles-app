import { notFound } from 'next/navigation'

// Invoke 404 page for all non-matching paths inside of [locale] folder
export default function CatchAllPage() {
  notFound()
}
