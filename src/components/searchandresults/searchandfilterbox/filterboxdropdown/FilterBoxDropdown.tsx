import React, { ChangeEvent } from 'react'

interface Props {
    selectedOption: string
    handleSelect: (event: ChangeEvent<HTMLSelectElement>) => void
    placeholderOption: string
    options: string[]
}

const FilterBoxDropdown = ({
    selectedOption,
    handleSelect,
    placeholderOption,
    options,
}: Props): JSX.Element => {
    return (
        <select
            name="filterBoxDropdown"
            id="filterBoxDropdown"
            onChange={handleSelect}
            value={selectedOption}
        >
            <option selected value={placeholderOption}>
                {placeholderOption}
            </option>
            {options.map((optionText) => (
                <option value={optionText}>{optionText}</option>
            ))}
        </select>
    )
}

export default FilterBoxDropdown
