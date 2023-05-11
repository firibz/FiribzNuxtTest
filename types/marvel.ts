// types/marvel.d.ts
export interface Character {
    id: number
    name: string
    description: string
    thumbnail: {
        path: string
        extension: string
    }
    series: {
        available: number
        items: {
            resourceURI: string
            name: string
        }[]
    }
    comics: {
        available: number
        items: {
            resourceURI: string
            name: string
        }[]
    }
}
