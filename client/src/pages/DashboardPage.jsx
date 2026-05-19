import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import NoteCard from "../components/NoteCard";

import {
  getNotes,
  createNote,
  deleteNote,
  updateNote,
} from "../services/noteService";


function DashboardPage() {

  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

const [loading, setLoading] = useState(true);

const [error, setError] = useState("");


  // Fetch notes on load
  useEffect(() => {

  const fetchNotes = async () => {

    try {

      setLoading(true);

      const data = await getNotes();

      setNotes(data);

      setError("");

    }
    catch (error) {

      setError("Failed to load notes");

    }
    finally {

      setLoading(false);

    }

  };

  fetchNotes();

}, []);


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const newNote = await createNote(formData);

      setNotes([newNote, ...notes]);

      setFormData({
        title: "",
        content: "",
      });

    }
    catch (error) {
      console.log(error);
    }

  };


  const handleDelete = async (id) => {

    try {

      await deleteNote(id);

      setNotes(
        notes.filter((note) => note._id !== id)
      );

    }
    catch (error) {
      console.log(error);
    }

  };

 const handleEdit = async (id, updatedData) => {

  try {

    const updatedNote = await updateNote(
      id,
      updatedData
    );

    setNotes(
      notes.map((note) =>
        note._id === id ? updatedNote : note
      )
    );

  }
  catch (error) {

    console.log(error);

  }

};


  const handleLogout = () => {

    localStorage.removeItem("userInfo");

    navigate("/login");

  };

  if (loading) {
    return (
      <div className="text-center mt-20 text-2xl">
        Loading...
      </div>
    );
  }


  return (
    <div className="max-w-4xl mx-auto p-6">

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-4xl font-bold">
          My Notes
        </h1>

        <button
          onClick={handleLogout}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Logout
        </button>

      </div>

      {error && (
        <p className="text-red-500 mb-4">
          {error}
        </p>
      )}

      {/* Create Note Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 mb-8"
      >

        <input
          type="text"
          name="title"
          placeholder="Note title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <textarea
          name="content"
          placeholder="Write your note..."
          value={formData.content}
          onChange={handleChange}
          className="w-full border p-3 rounded h-32"
        />

        <button
          className="bg-blue-500 text-white px-6 py-3 rounded"
        >
          Add Note
        </button>

      </form>


      {/* Notes List */}
      <div className="grid gap-4">
        
        {notes.length === 0 && (
          <p className="text-gray-500 text-center mt-10 text-2xl">
            No notes yet.
          </p>
        )}

        {notes.map((note) => (

          <NoteCard
            key={note._id}
            note={note}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />

        ))}

      </div>

    </div>
  );
}

export default DashboardPage;