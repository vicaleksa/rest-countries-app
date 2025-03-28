interface Currency {
    name: string,
}

interface NativeName {
    official: string,
    common: string,
}

export interface Country {
    cca2: string,
    flags: {
        png: string,
    },
    name: {
        common: string,
        official: string,
        nativeName?: Record<string, NativeName>,
    },
    population: number,
    region: string,
    subregion?: string,
    tld?: string[],
    capital?: string[],
    currencies?: Record<string, Currency>,
    languages?: Record<string, string>,
    borders?: string[],
}
