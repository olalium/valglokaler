export interface SearchableObject {
    county_id: number
    county_name: string
    municipality_id: number
    municipality_name: string
    borough_id: string
    borough_name: string
    polling_place_id: number
    polling_place_name: string
    address_line: string
    postal_code: number
    area: string
    info_text: string
    gps_coordinates: string
    election_day_voting: number
    opening_hours: string
}

export interface County {
    county_name: string
    municipalities: string[]
}

export const search = (
    searchQuery: string,
    county: string,
    municipality: string,
    searchableObjects: SearchableObject[]
): SearchableObject[] => {
    return searchableObjects.filter(
        (searchableObject) =>
            matchSearchQuery(searchableObject, searchQuery) &&
            ((searchQuery &&
                county === 'Fylke' &&
                municipality === 'Kommune') ||
                (matchCounty(searchableObject, county) &&
                    matchMunicipality(searchableObject, municipality)))
    )
}

const matchSearchQuery = (searchableObject: SearchableObject, query: string) =>
    !query
        ? true
        : searchableObject.polling_place_name
              .toLowerCase()
              .includes(query.toLowerCase())

const matchCounty = (searchableObject: SearchableObject, county: string) =>
    !county ? true : searchableObject.county_name === county

const matchMunicipality = (
    searchableObject: SearchableObject,
    municipality: string
) =>
    !municipality || municipality === 'Kommune'
        ? true
        : searchableObject.municipality_name === municipality

export const generateCountyFilter = (
    searchableObjects: SearchableObject[]
): string[] =>
    Array.from(
        new Set(
            searchableObjects.map(
                (searchableObject) => searchableObject.county_name
            )
        )
    ).sort((a, b) => a.localeCompare(b))

export const generateMunicipalityFilter = (
    searchableObjects: SearchableObject[]
): string[] =>
    Array.from(
        new Set(
            searchableObjects.map(
                (searchableObject) => searchableObject.municipality_name
            )
        )
    ).sort((a, b) => a.localeCompare(b))

export const generateFilters = (
    searchableObjects: SearchableObject[]
): County[] => {
    var counties = generateCountyFilter(searchableObjects).map(
        (county) =>
            ({
                county_name: county,
                municipalities: [],
            } as County)
    )
    searchableObjects.forEach((searchableObject) => {
        const county = counties.find(
            (county) => county.county_name === searchableObject.county_name
        )

        county &&
            !county.municipalities.includes(
                searchableObject.municipality_name
            ) &&
            county.municipalities.push(searchableObject.municipality_name)
    })
    return counties
}
