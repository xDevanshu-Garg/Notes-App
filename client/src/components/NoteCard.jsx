import { useState } from "react";


function NoteCard({ note, onDelete, onEdit }) {

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


  const handleCancelEdit = () => {
    setEditData({ title: note.title, content: note.content });
    setIsEditing(false);
  };


  // Format relative time
  const getRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffSec < 60) return "Just now";
    if (diffMin < 60) return `${diffMin}m ago`;
    if (diffHour < 24) return `${diffHour}h ago`;
    if (diffDay < 7) return `${diffDay}d ago`;
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });
  };


  return (
    <div className={`note-card ${note.isPinned ? "pinned" : ""}`}>

      {isEditing ? (

        /* ── Edit Mode ── */
        <div className="note-card-edit">

          <input
            type="text"
            name="title"
            value={editData.title}
            onChange={handleChange}
            className="input-field"
            placeholder="Note title"
          />

          <textarea
            name="content"
            value={editData.content}
            onChange={handleChange}
            className="textarea-field"
            placeholder="Write your note..."
            rows={4}
          />

          <div className="note-card-edit-actions">
            <button onClick={handleSave} className="btn-primary btn-sm">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Save
            </button>
            <button onClick={handleCancelEdit} className="btn-secondary btn-sm">
              Cancel
            </button>
          </div>

        </div>

      ) : (

        /* ── View Mode ── */
        <>
          <div className="note-card-header">
            <h3 className="note-card-title">{note.title}</h3>

            <div className="note-card-actions">
              <button
                onClick={() => setIsEditing(true)}
                className="btn-icon"
                title="Edit note"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </button>

              <button
                onClick={() => onDelete(note._id)}
                className="btn-icon btn-icon-danger"
                title="Delete note"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
              </button>
            </div>
          </div>

          <div className="note-card-content">
            <p>{note.content}</p>
          </div>

          <div className="note-card-footer">
            <span className="note-card-time">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {getRelativeTime(note.updatedAt || note.createdAt)}
            </span>
            {note.isPinned && (
              <span className="note-card-pinned-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                  <path d="M16 2L7.5 10.5 2 12l2.5 2.5-4 7 7-4L10 20l1.5-5.5L20 6z" />
                </svg>
                Pinned
              </span>
            )}
          </div>
        </>

      )}

    </div>
  );
}

export default NoteCard;