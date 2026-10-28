export const STORAGE_KEY = 'photo-gallery-favourites'

export const ADD_FAVOURITE = 'ADD_FAVOURITE'
export const REMOVE_FAVOURITE = 'REMOVE_FAVOURITE'

// Favourites are stored as an array of photo ids
export function loadFavourites() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY))
    return Array.isArray(stored) ? stored : []
  } catch {
    return []
  }
}

export function favouritesReducer(favouriteIds, action) {
  switch (action.type) {
    case ADD_FAVOURITE:
      if (favouriteIds.includes(action.id)) return favouriteIds
      return [...favouriteIds, action.id]
    case REMOVE_FAVOURITE:
      return favouriteIds.filter((id) => id !== action.id)
    default:
      return favouriteIds
  }
}