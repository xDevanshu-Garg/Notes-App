import { useState } from "react";


function NoteCard({
    note,
    onDelete,
    onEdit,
}) {

    const [isEditing, setIsEditing] = useState(false);

    const [editData, setEditData] = useState({
        title: note.title,
        content: note.content,
    });


    const handleChange = (e) => {

        setEditData({
            ...editData,
            [e.target.name]: e.target.value,
        });

    };


    const handleSave = () => {

        onEdit(note._id, editData);

        setIsEditing(false);

    };


    return (
        <div className="border rounded-lg p-4 shadow">

            {isEditing ? (

                <div className="space-y-3">

                    <input
                        type="text"
                        name="title"
                        value={editData.title}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />

                    <textarea
                        name="content"
                        value={editData.content}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />

                    <div className="flex gap-2">

                        <button
                            onClick={handleSave}
                            className="bg-green-500 text-white px-4 py-2 rounded"
                        >
                            Save
                        </button>

                        <button
                            onClick={() => setIsEditing(false)}
                            className="bg-gray-500 text-white px-4 py-2 rounded"
                        >
                            Cancel
                        </button>

                    </div>

                </div>

            ) : (

                <>

                    <h2 className="text-xl font-bold mb-2">
                        {note.title}
                    </h2>

                    <p className="mb-4">
                        {note.content}
                    </p>

                    <div className="flex gap-2">

                        <button
                            onClick={() => setIsEditing(true)}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Edit
                        </button>

                        <button
                            onClick={() => onDelete(note._id)}
                            className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                            Delete
                        </button>

                    </div>

                </>

            )}

        </div>
    );
}

export default NoteCard;