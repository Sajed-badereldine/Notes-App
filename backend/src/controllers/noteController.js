import { AppDataSource } from '../config/database.js';
import { Note } from '../entities/Note.js';

const noteRepository = AppDataSource.getRepository(Note);

export const getAllNotes = async (req, res, next) => {
  try {
    const notes = await noteRepository.find({
      order: { updatedAt: 'DESC' },
    });
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

export const getNoteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const note = await noteRepository.findOne({
      where: { id: parseInt(id) },
    });

    if (!note) {
      res.status(404).json({ message: 'Note not found' });
      return;
    }

    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

export const createNote = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      res.status(400).json({ message: 'Title and content are required' });
      return;
    }

    const note = noteRepository.create({
      title: title.trim(),
      content: content.trim(),
    });

    const savedNote = await noteRepository.save(note);
    res.status(201).json(savedNote);
  } catch (error) {
    next(error);
  }
};

export const updateNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const note = await noteRepository.findOne({
      where: { id: parseInt(id) },
    });

    if (!note) {
      res.status(404).json({ message: 'Note not found' });
      return;
    }

    if (title !== undefined) note.title = title.trim();
    if (content !== undefined) note.content = content.trim();

    const updatedNote = await noteRepository.save(note);
    res.status(200).json(updatedNote);
  } catch (error) {
    next(error);
  }
};

export const deleteNote = async (req, res, next) => {
  try {
    const { id } = req.params;

    const note = await noteRepository.findOne({
      where: { id: parseInt(id) },
    });

    if (!note) {
      res.status(404).json({ message: 'Note not found' });
      return;
    }

    await noteRepository.remove(note);
    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    next(error);
  }
};