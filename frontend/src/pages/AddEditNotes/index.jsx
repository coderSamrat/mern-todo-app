import React, { useState, useEffect } from 'react';
import TagInput from '../../components/Inputs/TagInput';
import { MdClose } from 'react-icons/md';
import axiosInstance from '../../utils/axiosInstance.js';

const AddEditNotes = ({ noteData, type, getAllNotes, onClose, showToastMessage }) => {

      const [title, setTitle] = useState('');
      const [content, setContent] = useState('');
      const [tags, setTags] = useState([]);
      const [error, setError] = useState(null);

      useEffect(() => {
            if (noteData) {
                  setTitle(noteData.title || '');
                  setContent(noteData.content || '');
                  setTags(noteData.tags || []);
            }
      }, [noteData]);

      const addNewNote = async () => {
            try {
                  const response = await axiosInstance.post('/api/v1/note/add-note', {
                        title: title,
                        content: content,
                        tags: tags,
                  });
                  if (response.data && response.data.note) {
                        showToastMessage('Note added successfully', 'success');
                        getAllNotes();
                        onClose();
                  }
            } catch (error) {
                  if ( 
                        error.response &&
                        error.response.data &&
                        error.response.data.message
                  ) {
                        setError(error.response.data.message);
                  }
            }
      };

      const editNote = async () => {
            const noteId = noteData._id;
            try {
                  const response = await axiosInstance.put(`/api/v1/note/edit-note/${noteId}`, {
                        title: title,
                        content: content,
                        tags: tags,
                  });
                  if (response.data && response.data.note) {
                        showToastMessage('Note updated successfully', 'success');
                        getAllNotes();
                        onClose();
                  }
            } catch (error) {
                  if (
                        error.response &&
                        error.response.data &&
                        error.response.data.message
                  ) {
                        setError(error.response.data.message);
                  }
            }
      };

      const handleAddNote = async () => {
            if (!title) {
                  setError("Title is required");
                  return;
            }

            if (!content) {
                  setError("Content is required");
                  return;
            }
            setError(null);

            if (type === "edit") {
                  editNote();
            } else {
                  addNewNote();
            }
      }

      return (
            <div className='relative'>
                  <button
                        className='absolute top-2 right-2'
                        onClick={() => { onClose() }}
                  >
                        <MdClose className='text-xl text-slate-400' />
                  </button>
                  <div className='flex flex-col gap-2 p-5'>
                        <div className='flex flex-col gap-2'>
                              <label className='input-label'>Title</label>
                              <input
                                    type='text'
                                    className='text-2xl font-bold text-slate-800 outline-none p-2 bg-slate-200'
                                    placeholder='Enter title'
                                    value={title}
                                    onChange={({ target }) => setTitle(target.value)}
                              />
                        </div>
                        <div className='flex flex-col gap-2'>
                              <label className='input-label'>Content</label>
                              <textarea
                                    className='text-lg text-slate-800 bg-slate-100 outline-none rounded p-2'
                                    placeholder='Enter content'
                                    rows={5}
                                    value={content}
                                    onChange={({ target }) => setContent(target.value)}
                              />
                        </div>
                        <div className='flex flex-col gap-2'>
                              <label className='input-label'>Tags</label>
                              <TagInput tags={tags} setTags={setTags} />
                        </div>
                        {error && <p className="text-red-500 text-sm pt-4">{error}</p>}
                        <button className="btn-primary font-medium mt-5 p-3" onClick={handleAddNote}>
                              {type === "edit" ? "Update Note" : "Add Note"}
                        </button>
                  </div>
            </div>
      );
};

export default AddEditNotes;
