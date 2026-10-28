export default function PhotoCard({ photo, isFavourite, onToggleFavourite }) {
  // Request a small image rather than the full-size original
  const imageUrl = `https://picsum.photos/id/${photo.id}/400/300`

  return (
    <article className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-md">
      <img
        src={imageUrl}
        alt={`Photo by ${photo.author}`}
        width="400"
        height="300"
        loading="lazy"
        className="aspect-[4/3] w-full bg-slate-100 object-cover"
      />
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <p className="truncate text-sm font-medium text-slate-700">{photo.author}</p>
        <button
          type="button"
          onClick={() => onToggleFavourite(photo.id)}
          aria-pressed={isFavourite}
          aria-label={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
          className="rounded-full p-1.5 transition hover:bg-rose-50"
        >
          <svg
            className={`h-6 w-6 transition ${
              isFavourite ? 'fill-rose-500 stroke-rose-500' : 'fill-none stroke-slate-400 hover:stroke-rose-400'
            }`}
            viewBox="0 0 24 24"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 21s-7-4.4-9.5-9A5.5 5.5 0 0 1 12 6.5 5.5 5.5 0 0 1 21.5 12c-2.5 4.6-9.5 9-9.5 9Z" />
          </svg>
        </button>
      </div>
    </article>
  )
}