import { ChangeEvent, useEffect, useMemo, useState, KeyboardEvent } from 'react'
import FilterBoxDropdown from './filterboxdropdown/FilterBoxDropdown'
import { SearchableObject, search, generateFilters } from './filterUtils'

import searchableObjects from '../../../assets/2017.json'

interface Props {
    setResults: (results: SearchableObject[]) => void
}

const SearchAndFilterBox = ({ setResults }: Props): JSX.Element => {
    const [query, setQuery] = useState<string>('')
    const [county, setCounty] = useState<string>('Fylke')
    const [municipality, setMunicipality] = useState<string>('Kommune')

    useEffect(() => {
        if (county || municipality)
            setResults(
                search(
                    query,
                    county,
                    municipality,
                    searchableObjects as SearchableObject[]
                )
            )
    }, [query, county, municipality, setResults])

    const handleQueryKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        switch (event.key) {
            case 'Enter':
                event.preventDefault()
                setResults(
                    search(
                        query,
                        county,
                        municipality,
                        searchableObjects as SearchableObject[]
                    )
                )
                break
            case 'Esc':
                event.preventDefault()
                setQuery('')
        }
    }

    const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) =>
        setQuery(event.target.value)

    const handleCountySelect = (event: ChangeEvent<HTMLSelectElement>) => {
        setCounty(event.target.value)
        setMunicipality('Kommune')
    }

    const handleMunicipalitySelect = (event: ChangeEvent<HTMLSelectElement>) =>
        setMunicipality(event.target.value)

    const handleResetFilterClick = () => {
        setQuery('')
        setCounty('Fylke')
        setMunicipality('Kommune')
        setResults([])
    }

    const countryFilter = useMemo(
        () => generateFilters(searchableObjects as SearchableObject[]),
        []
    )

    const getMunicipalityFromCounty = (countryString: string): string[] =>
        countryFilter.find(
            (countryFilterItem) =>
                countryFilterItem.county_name === countryString
        )?.municipalities ?? []

    return (
        <>
            <input
                placeholder="Søk etter valgstasjon"
                type="search"
                value={query}
                onKeyDown={handleQueryKeyDown}
                onChange={handleQueryChange}
            />
            eller
            <FilterBoxDropdown
                selectedOption={county}
                handleSelect={handleCountySelect}
                placeholderOption="Fylke"
                options={countryFilter.map((country) => country.county_name)}
            />
            {county !== 'Fylke' && (
                <FilterBoxDropdown
                    selectedOption={municipality}
                    handleSelect={handleMunicipalitySelect}
                    placeholderOption="Kommune"
                    options={getMunicipalityFromCounty(county)}
                />
            )}
            <button onClick={handleResetFilterClick}>reset filters</button>
        </>
    )
}

export default SearchAndFilterBox
