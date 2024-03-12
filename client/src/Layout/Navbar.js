import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function Navbar({accessToken}) {
    const[searchTerm, setSearchTerm] = useState('')

    const handleSearch = async (e) => {
        e.preventDefault()
        try {
            const searchUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchTerm)}&type=artist`;
      
            const response = await fetch(searchUrl, {
              headers: {
                'Authorization': `Bearer ${accessToken}`
              }
            });
      
            if (response.ok) {
              const data = await response.json();
      
              if (data.artists && data.artists.items.length > 0) {
                const artistData = data.artists.items[0];
                console.log(artistData);
                // Handle the search results
                
              } else {
                console.error(`Failed to search for artist: ${response.status}`);
              }
            } else {
              console.error(`Failed to search for artist: ${response.status}`);
            }
          } catch (error) {
            console.error('Error searching for artist:', error);
          }
    }
  return (
    <nav className='navbar'>
      <h2>TuneTide</h2>
      <div className='navbar-menu'>
        <Link className='navbar-item' >Home</Link>
        <Link className='navbar-item' >Albums</Link>
        <Link className='navbar-item'>Top Tracks</Link>
      </div>
      <form className='navbar-search'>
        <input
          className='navbar-search-input'
          type='text'
          placeholder='Search for artist'
          aria-label='search'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className='navbar-search-button'
          type='submit'
          onClick={handleSearch}
        >
          Search
        </button>
      </form>
    </nav>
  )
}
