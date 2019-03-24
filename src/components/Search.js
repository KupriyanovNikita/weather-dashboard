import React from 'react';

export default function Search({query, setQuery, addWidget}) {
    return (
        <div>
            <input value={query}
                   onChange={e => setQuery(e.target.value)}
            />
            <button onClick={() => addWidget(query)}>Add</button>
            <button onClick={() => setQuery('')}>Clear</button>
        </div>
    );
}
