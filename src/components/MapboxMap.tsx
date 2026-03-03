"use client"

import { useEffect, useRef } from 'react'

export default function MapboxMap({ lng = 13.405, lat = 52.52, zoom = 9 }: { lng?: number; lat?: number; zoom?: number }) {
  const mapRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!mapRef.current) return
    // lazy-load mapbox-gl to avoid SSR issues
    import('mapbox-gl').then((mapbox) => {
      mapbox.default.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''
      const map = new mapbox.default.Map({
        container: mapRef.current as HTMLElement,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        zoom,
      })

      return () => map.remove()
    })
  }, [lng, lat, zoom])

  return <div ref={mapRef} className="w-full h-64 rounded" />
}
