import { Router } from "express";
import {
      addNote,
      deleteNote,
      editNote,
      getAllNotes,
      searchNote,
      updateIsPinned
} from "../controllers/note.controller.js";
import { authenticateToken } from "../utilities/services.js";

const noteRoutes = Router();

noteRoutes.route('/add-note').post(authenticateToken, addNote);
noteRoutes.route('/edit-note/:id').put(authenticateToken, editNote);
noteRoutes.route('/get-all-note').get(authenticateToken, getAllNotes);
noteRoutes.route('/delete-note/:id').delete(authenticateToken, deleteNote);
noteRoutes.route('/update-note-pinned/:id').put(authenticateToken, updateIsPinned);
noteRoutes.route('/search-note').get(authenticateToken, searchNote);

export { noteRoutes };
