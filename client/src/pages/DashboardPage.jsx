import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import NoteCard from "../components/NoteCard";

import {
  getNotes,
  createNote,
  deleteNote,
  updateNote,
} from "../services/noteService";

import { logoutUser, getUserInfo } from "../utils/auth";


function DashboardPage() {

  const navigate = useNavigate();
  const formRef = useRef(null);

  const [notes, setNotes] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Toast state
  const [toast, setToast] = useState(null);

  // Delete confirmation modal
  const [deleteModal, setDeleteModal] = useState({ show: false, noteId: null, noteTitle: "" });

  // Get user name from localStorage
  const userInfo = getUserInfo();
  const userName = userInfo?.name || "there";


  // Show toast notification
  const showToast = (message, type = "success") => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => setToast(null), 3500);
  };


  // Fetch notes on load
  useEffect(() => {

    const fetchNotes = async () => {
      try {
        setLoading(true);
        const data = await getNotes();
        setNotes(data);
        setError("");
      }
      catch (err) {
        // Only redirect on auth errors
        if (err.response?.status === 401) {
          logoutUser();
          navigate("/login");
        } else {
          setError("Failed to load notes. Please try again.");
        }
      }
      finally {
        setLoading(false);
      }
    };

    fetchNotes();

  }, [navigate]);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.content.trim()) {
      showToast("Please fill in both title and content", "error");
      return;
    }

    setSubmitting(true);

    try {
      const newNote = await createNote(formData);
      setNotes([newNote, ...notes]);
      setFormData({ title: "", content: "" });
      showToast("Note created successfully!");
    }
    catch (err) {
      showToast("Failed to create note", "error");
    }
    finally {
      setSubmitting(false);
    }
  };


  // Open delete confirmation modal
  const handleDeleteRequest = (id) => {
    const note = notes.find(n => n._id === id);
    setDeleteModal({
      show: true,
      noteId: id,
      noteTitle: note?.title || "this note",
    });
  };


  // Confirm delete
  const handleDeleteConfirm = async () => {
    const { noteId } = deleteModal;
    setDeleteModal({ show: false, noteId: null, noteTitle: "" });

    try {
      await deleteNote(noteId);
      setNotes(notes.filter((note) => note._id !== noteId));
      showToast("Note deleted");
    }
    catch (err) {
      showToast("Failed to delete note", "error");
    }
  };


  // Cancel delete
  const handleDeleteCancel = () => {
    setDeleteModal({ show: false, noteId: null, noteTitle: "" });
  };


  const handleEdit = async (id, updatedData) => {
    try {
      const updatedNote = await updateNote(id, updatedData);
      setNotes(
        notes.map((note) =>
          note._id === id ? updatedNote : note
        )
      );
      showToast("Note updated!");
    }
    catch (err) {
      showToast("Failed to update note", "error");
    }
  };


  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };


  // Loading state
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner" />
        <p className="loading-text">Loading your notes...</p>
      </div>
    );
  }


  return (
    <div className="dashboard-container">

      {/* ── Header ── */}
      <header className="dashboard-header">
        <div className="dashboard-header-left">
          <h1 className="dashboard-logo">Notely</h1>
          <p className="dashboard-greeting">
            Hello, <span className="dashboard-greeting-name">{userName}</span>
          </p>
        </div>

        <button onClick={handleLogout} className="btn-logout" id="logout-button">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Logout
        </button>
      </header>

      {/* ── Error Banner ── */}
      {error && (
        <div className="error-message">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
          {error}
        </div>
      )}

      {/* ── Create Note Form ── */}
      <div className="note-form" ref={formRef}>
        <h2 className="note-form-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          New Note
        </h2>

        <form onSubmit={handleSubmit} id="create-note-form">

          <div className="input-group">
            <input
              type="text"
              name="title"
              placeholder="Give your note a title..."
              value={formData.title}
              onChange={handleChange}
              className="input-field"
              disabled={submitting}
              id="note-title-input"
            />
          </div>

          <div className="input-group">
            <textarea
              name="content"
              placeholder="Write your thoughts..."
              value={formData.content}
              onChange={handleChange}
              className="textarea-field"
              disabled={submitting}
              rows={4}
              id="note-content-input"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn-primary"
            id="add-note-button"
          >
            {submitting ? (
              <>
                <span className="loading-spinner-small" />
                Adding...
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Add Note
              </>
            )}
          </button>

        </form>
      </div>

      {/* ── Notes Grid ── */}
      {notes.length === 0 ? (

        <div className="empty-state">
          <div className="empty-state-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="12" y1="18" x2="12" y2="12" />
              <line x1="9" y1="15" x2="15" y2="15" />
            </svg>
          </div>
          <h2 className="empty-state-title">No notes yet</h2>
          <p className="empty-state-text">
            Create your first note above to get started.
            <br />
            Your thoughts deserve a beautiful home.
          </p>
        </div>

      ) : (

        <div className="notes-grid">
          {notes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              onDelete={handleDeleteRequest}
              onEdit={handleEdit}
            />
          ))}
        </div>

      )}


      {/* ── Delete Confirmation Modal ── */}
      {deleteModal.show && (
        <div className="modal-overlay" onClick={handleDeleteCancel}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>

            <div className="modal-icon modal-icon-danger">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                <line x1="10" y1="11" x2="10" y2="17" />
                <line x1="14" y1="11" x2="14" y2="17" />
              </svg>
            </div>

            <h3 className="modal-title">Delete Note</h3>
            <p className="modal-body">
              Are you sure you want to delete "<strong>{deleteModal.noteTitle}</strong>"?
              This action cannot be undone.
            </p>

            <div className="modal-actions">
              <button onClick={handleDeleteCancel} className="btn-secondary" id="cancel-delete-button">
                Cancel
              </button>
              <button onClick={handleDeleteConfirm} className="btn-danger" id="confirm-delete-button">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
                Delete
              </button>
            </div>

          </div>
        </div>
      )}


      {/* ── Toast Notification ── */}
      {toast && (
        <div className="toast-container">
          <div className={`toast ${toast.type === "error" ? "toast-error" : "toast-success"}`} key={toast.id}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              {toast.type === "error" ? (
                <>
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </>
              ) : (
                <>
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </>
              )}
            </svg>
            <span>{toast.message}</span>
          </div>
        </div>
      )}

    </div>
  );
}

export default DashboardPage;