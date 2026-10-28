import PhotoCard from './PhotoCard.jsx'

export default function Gallery({ photos, favouriteIds, onToggleFavourite }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {photos.map((photo) => (
        <PhotoCard
          key={photo.id}
          photo={photo}
          isFavourite={favouriteIds.includes(photo.id)}
          onToggleFavourite={onToggleFavourite}
        />
      ))}
    </div>
  )
}