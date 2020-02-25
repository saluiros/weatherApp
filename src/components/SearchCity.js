import React from 'react';

const SearchForm = props => {
    return (
        <div>
            <form onSubmit={props.citySubmit}>
                <input type="text"
                    placeholder="Wpisz miasto"
                    value={props.cityValue}
                    onChange={props.cityInput}
                />
                <button>Wyszukaj</button>
            </form>
        </div>
    );
}

export default SearchForm;