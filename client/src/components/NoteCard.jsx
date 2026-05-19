function NoteCard({ note, onDelete }) {

    return (
        <div className="border rounded-lg p-4 shadow">

            <h2 className="text-xl font-bold mb-2">
                {note.title}
            </h2>

            <p className="mb-4">
                {note.content}
            </p>

            <button
                onClick={() => onDelete(note._id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
            >
                Delete
            </button>

        </div>
    );
}

export default NoteCard;