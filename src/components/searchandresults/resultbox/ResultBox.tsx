import { useState } from 'react'
import { SearchableObject } from '../searchandfilterbox/filterUtils'

interface Props {
    results: SearchableObject[]
}

const ResultBox = ({ results }: Props): JSX.Element => {
    const [expandedNodeId, setExpandedNodeId] = useState<number | null>(null)

    return (
        <div
            style={{
                display: 'flex',
                maxHeight: '20vh',
                overflowY: 'auto',
                width: '20vw',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {results
                    .sort((a, b) =>
                        a.polling_place_name.localeCompare(b.polling_place_name)
                    )
                    .map((result) => {
                        const nodeIsExpanded =
                            expandedNodeId === result.polling_place_id
                        return (
                            <div
                                style={{
                                    padding: '8px',
                                    borderLeft: nodeIsExpanded
                                        ? '1px solid lightslategrey'
                                        : undefined,
                                    whiteSpace: 'break-spaces',
                                }}
                            >
                                <div style={{ fontSize: '14px' }}>
                                    {result.polling_place_name}
                                </div>
                                <div
                                    style={{ fontSize: '11px', color: 'gray' }}
                                >
                                    {`${result.address_line}`}
                                    <br />
                                    {`${result.postal_code} ${result.area}`}
                                </div>
                                <div
                                    style={{
                                        fontSize: '10px',
                                        color: 'blue',
                                        cursor: 'pointer',
                                        padding: '4px 0px',
                                    }}
                                    onClick={() =>
                                        setExpandedNodeId(
                                            nodeIsExpanded
                                                ? null
                                                : result.polling_place_id
                                        )
                                    }
                                >
                                    {nodeIsExpanded ? 'mindre' : 'mer'}
                                </div>
                                {nodeIsExpanded && (
                                    <div>{result.info_text}</div>
                                )}
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}

export default ResultBox
