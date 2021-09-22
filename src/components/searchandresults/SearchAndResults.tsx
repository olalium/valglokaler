import { useState } from 'react'
import { SearchableObject } from './searchandfilterbox/filterUtils'
import ResultBox from './resultbox/ResultBox'
import SearchAndFilterBox from './searchandfilterbox/SearchAndFilterBox'

const SearchAndResults = (): JSX.Element => {
    const [results, setResults] = useState<SearchableObject[]>([])

    return (
        <div
            style={{
                display: 'flex',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                overflowY: 'auto',
            }}
        >
            <SearchAndFilterBox setResults={setResults} />
            <ResultBox results={results} />
        </div>
    )
}

export default SearchAndResults
