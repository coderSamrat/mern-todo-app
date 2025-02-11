import { Note } from "../models/note.model.js";

export const addNote = async (req, res) => {
      const { title, content, tags } = req.body;
      const { user } = req;

      if (!title) {
            return res.status(400).json({
                  message: "Title is required",
                  error: true
            });
      }
      if (!content) {
            return res.status(400).json({
                  message: "Content is required",
                  error: true
            });
      }
      if (!tags || tags.length === 0) {
            return res.status(400).json({
                  message: "At least one tag is required",
                  error: true
            });
      }


      try {
            const note = new Note({
                  title,
                  content,
                  userId: user._id,
                  tags,
            });
            await note.save();

            return res.status(201).json({
                  message: "Note created successfully",
                  note: note,
                  error: false
            });
      } catch (error) {
            return res.status(500).json({ message: error.message });
      }
};

export const getAllNotes = async (req, res) => {
      const { user } = req;

      try {
            const notes = await Note.find({ userId: user._id }).sort({ isPinned: -1 });
            return res.status(200).json({
                  message: "Notes retrieved successfully",
                  notes: notes,
                  error: false
            });
      } catch (error) {
            return res.status(500).json({ message: error.message });
      }
};

export const editNote = async (req, res) => {
      const { title, content, tags } = req.body;
      const { id } = req.params;
      const { user } = req;

      if (!title && !content && !tags) {
            return res.status(400)
                  .json({
                        message: "No changes detected",
                        error: true
                  });
      }

      try {
            const note = await Note.findOne({
                  _id: id,
                  userId: user._id
            });
            if (!note) {
                  return res.status(404)
                        .json({
                              message: "Note not found",
                              error: true
                        });
            }


            if (title) note.title = title;
            if (content) note.content = content;
            if (tags) note.tags = tags;

            await note.save();
            return res.status(200).json({
                  message: "Note updated successfully",
                  note: note,
                  error: false
            });
      } catch (error) {
            return res.status(500).json({ message: error.message });
      }
};

export const deleteNote = async (req, res) => {
      const { id } = req.params;
      const { user } = req;

      try {
            const note = await Note.findOne({ _id: id, userId: user._id });
            if (!note) {
                  return res.status(404).json({
                        message: "Note not found or you are not authorized to delete this note.",
                        error: true
                  });
            }

            await Note.findByIdAndDelete(id);

            return res.status(200).json({
                  message: "Note deleted successfully",
                  error: false
            });
      } catch (error) {
            console.error("Error deleting note:", error);
            return res.status(500).json({ message: "Server error. Please try again later." });
      }
};

export const updateIsPinned = async (req, res) => {
      const { id } = req.params;
      const { isPinned } = req.body;
      const { user } = req;
      try {
            const note = await Note.findOne({
                  _id: id,
                  userId: user._id
            });
            if (!note) {
                  return res.status(404)
                        .json({
                              message: "Note not found",
                              error: true
                        });
            }
            if (typeof isPinned !== 'undefined') {
                  note.isPinned = isPinned;
            }
            await note.save();
            return res.status(200).json({
                  message: "Note updated successfully",
                  note: note,
                  error: false
            });

      } catch (error) {
            return res.status(500).json({ message: error.message });
      }
};

export const searchNote = async (req, res) => {
      const { user } = req;
      const { query } = req.query;

      if (!query) {
            return res.status(400).json({
                  message: "Search term is required",
                  error: true,
            });
      }

      try {
            const notes = await Note.find({
                  userId: user._id,
                  $or: [
                        { title: { $regex: new RegExp(query, "i") } },
                        { content: { $regex: new RegExp(query, "i") } },
                  ],
            });

            if (notes.length === 0) {
                  return res.status(404).json({
                        message: "No notes found matching the search term",
                        notes: [],
                        error: false,
                  });
            }

            return res.status(200).json({
                  message: "Notes retrieved successfully",
                  notes: notes,
                  error: false,
            });
      } catch (error) {
            console.error(error); 
            return res.status(500).json({
                  message: "An error occurred while retrieving notes",
                  error: true,
                  details: error.message,
            });
      }
};
