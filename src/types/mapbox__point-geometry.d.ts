// Temporary ambient type for mapbox__point-geometry to satisfy TypeScript during build
declare module 'mapbox__point-geometry' {
  class Point {
    constructor(x?: number, y?: number)
    x: number
    y: number
    sub(other: Point): Point
    add(other: Point): Point
    eq(other: Point): boolean
  }
  export default Point
}
