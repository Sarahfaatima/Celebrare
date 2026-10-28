import { useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import Gallery from './components/Gallery.jsx'
import SearchBar from './components/SearchBar.jsx'
import useFetchPhotos from './hooks/useFetchPhotos.js'
import {
  ADD_FAVOURITE,
  REMOVE_FAVOURITE,
  STORAGE_KEY,
  favouritesReducer,
  loadFavourites,
} from './reducers/favouritesReducer.js'

export default function App() {
  const { photos, loading, error } = useFetchPhotos()
  const [searchText, setSearchText] = useState('')
  const [favouriteIds, dispatch] = useReducer(favouritesReducer, [], loadFavourites)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favouriteIds))
    } catch {
      // Storage can be full or blocked; favourites still work for this session
    }
  }, [favouriteIds])

  const handleSearchChange = useCallback((event) => {
    setSearchText(event.target.value)
  }, [])

  const filteredPhotos = useMemo(() => {
    const query = searchText.trim().toLowerCase()
    return photos.filter((photo) => photo.author.toLowerCase().includes(query))
  }, [photos, searchText])

  // Not memoized on purpose: it depends on favouriteIds, which changes with every toggle
  function handleToggleFavourite(photoId) {
    const type = favouriteIds.includes(photoId) ? REMOVE_FAVOURITE : ADD_FAVOURITE
    dispatch({ type, id: photoId })
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Photo Gallery</h1>
          <p className="mt-2 text-slate-500">Browse photos, search by author, and save your favourites.</p>
        </header>

        <div className="mb-8">
          <SearchBar value={searchText} onChange={handleSearchChange} />
        </div>

        {loading && (
          <div className="flex justify-center py-20" role="status" aria-label="Loading photos">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-500" />
          </div>
        )}

        {error && (
          <div className="mx-auto max-w-md rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200">
            <p className="text-lg font-semibold">Something went wrong</p>
            <p className="mt-1 text-sm text-slate-500">
              We couldn't load the photos ({error}). Please check your connection and try again.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-4 rounded-full bg-indigo-500 px-5 py-2 text-sm font-medium text-white transition hover:bg-indigo-600"
            >
              Try again
            </button>
          </div>
        )}

        {!loading && !error && filteredPhotos.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-lg font-semibold">No authors found</p>
            <p className="mt-1 text-sm text-slate-500">Nothing matches "{searchText}". Try a different name.</p>
          </div>
        )}

        {!loading && !error && filteredPhotos.length > 0 && (
          <Gallery
            photos={filteredPhotos}
            favouriteIds={favouriteIds}
            onToggleFavourite={handleToggleFavourite}
          />
        )}
      </main>
    </div>
  )
}