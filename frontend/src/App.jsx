import { useState, useEffect } from 'react';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import { noteService } from './services/api';

function App() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await noteService.getAllNotes();
      setNotes(data);
    } catch (err) {
      setError('Failed to fetch notes: ' + err.message);
      console.error('Error fetching notes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNote = async (noteData) => {
    try {
      setError('');
      const newNote = await noteService.createNote(noteData);
      setNotes([newNote, ...notes]);
    } catch (err) {
      setError('Failed to create note: ' + err.message);
      throw err;
    }
  };

  const handleUpdateNote = async (noteData) => {
    try {
      setError('');
      const updatedNote = await noteService.updateNote(editingNote.id, noteData);
      setNotes(notes.map((note) => 
        note.id === updatedNote.id ? updatedNote : note
      ));
      setEditingNote(null);
    } catch (err) {
      setError('Failed to update note: ' + err.message);
      throw err;
    }
  };

  const handleDeleteNote = async (id) => {
    if (!window.confirm('Are you sure you want to delete this note?')) {
      return;
    }

    try {
      setError('');
      await noteService.deleteNote(id);
      setNotes(notes.filter((note) => note.id !== id));
    } catch (err) {
      setError('Failed to delete note: ' + err.message);
      console.error('Error deleting note:', err);
    }
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingNote(null);
  };

  const handleSubmit = editingNote ? handleUpdateNote : handleCreateNote;

  return (
    <div className="app">
      <header className="app-header">
        <h1>📝 Notes App</h1>
        <p>Organize your thoughts and ideas</p>
      </header>

      <main className="app-main">
        {error && <div className="error-banner">{error}</div>}
        
        <NoteForm
          onSubmit={handleSubmit}
          editingNote={editingNote}
          onCancelEdit={handleCancelEdit}
        />

        <NoteList
          notes={notes}
          onEdit={handleEditNote}
          onDelete={handleDeleteNote}
          loading={loading}
        />
      </main>
    </div>
  );
}

export default App;