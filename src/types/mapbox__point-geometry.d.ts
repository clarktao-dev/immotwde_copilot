// Temporary ambient type for mapbox__point-geometry to satisfy TypeScript during build
declare module 'mapbox__point-geometry' {
  const Point: any
  export default Point
}
