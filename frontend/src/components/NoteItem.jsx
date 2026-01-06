const NoteItem = ({ note, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="note-item">
      <div className="note-header">
        <h3>{note.title}</h3>
        <div className="note-actions">
          <button onClick={() => onEdit(note)} className="btn btn-edit">
            Edit
          </button>
          <button onClick={() => onDelete(note.id)} className="btn btn-delete">
            Delete
          </button>
        </div>
      </div>
      <p className="note-content">{note.content}</p>
      <div className="note-footer">
        <span className="note-date">
          Updated: {formatDate(note.updatedAt)}
        </span>
      </div>
    </div>
  );
};

export default NoteItem;