import React from 'react'
import search from '../../media/images/search.svg'

function SearchBar() {
  return (
    <div className='container'>
      <div className="search-container">
            <input type="text" placeholder="Search for any service..." className="search-input" />
            <span className="search-icon"><img src={search} /></span>
      </div>
    </div>
  )
}

export default SearchBar
