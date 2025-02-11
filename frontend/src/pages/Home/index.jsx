import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { MdAdd } from 'react-icons/md';

import Navbar from '../../components/Navbar';
import NotesCard from '../../components/Cards/NotesCard';
import AddEditNotes from '../AddEditNotes';
import axiosInstance from '../../utils/axiosInstance.js';
import Toast from '../../components/ToastMessage/index.jsx';
import EmptyCard from '../../components/EmptyCard/index.jsx';

import AddNoteImage from "../../assets/add_note.png";
import NodataImage from "../../assets/nodata_image.png";

const Home = () => {
      const [openAddEditModel, setAddEditModel] = useState({
            isShown: false,
            type: 'add',
            data: null
      });

      const [showToastMsg, setShowToastMsg] = useState({
            isShown: false,
            message: '',
            type: 'add'
      });

      const handleShowToastMessage = (msg, type) => {
            setShowToastMsg({
                  isShown: true,
                  message: msg,
                  type: type
            });
      };

      const handleCloseToast = () => {
            setShowToastMsg({
                  isShown: false,
                  message: '',
                  type: 'add'
            });
      };

      const [userInfo, setUserInfo] = useState(null);
      const [allNotes, setAllNotes] = useState([]);
      const [isSearch, setIsSearch] = useState(false);
      const navigate = useNavigate();

      const handleEdit = (noteDetails) => {
            setAddEditModel({ isShown: true, type: 'edit', data: noteDetails });
      };

      // API Integration to get user info
      const getUserInfo = async () => {
            try {
                  const response = await axiosInstance.get('/api/v1/users/get-user');
                  if (response.data && response.data.user) {
                        setUserInfo(response.data.user);
                  } else {
                        setIsSearch(true);
                        setAllNotes([]);
                  }
            } catch (error) {
                  if (error.response && error.response.status === 401) {
                        localStorage.removeItem('token');
                        navigate('/login'); 
                  }
            }
      };

      // API Integration to get all notes of the user
      const getAllNotes = async () => {
            try {
                  const response = await axiosInstance.get('/api/v1/note/get-all-note');
                  if (response.data && response.data.notes) {
                        setAllNotes(response.data.notes);
                  }
            } catch (error) {
                  console.log(error);
            }
      };

      // API Integration to delete a note
      const deleteNote = async (note) => {
            try {
                  const response = await axiosInstance.delete(`/api/v1/note/delete-note/${note._id}`);
                  if (response.data && response.data.message) {
                        handleShowToastMessage(response.data.message, 'delete');
                        getAllNotes();
                  }
            } catch (error) {
                  console.log(error);
                  handleShowToastMessage('Failed to delete note. Please try again later', 'error');
            }
      };

      // API Integration to update to pin notes
      const updateIsPinned = async (note) => {
            try {
                  const response = await axiosInstance.put(`/api/v1/note/update-note-pinned/${note._id}`, {
                        isPinned: !note.isPinned
                  });
                  if (response.data && response.data.message) {
                        handleShowToastMessage(response.data.message, 'success');
                        getAllNotes();
                  }
            } catch (error) {
                  console.log(error);
                  handleShowToastMessage('Failed to update note. Please try again later', 'error');
            }
      };

      // API Integration to search a note
      const searchNote = async (query) => {
            try {
                  const response = await axiosInstance.get(`/api/v1/note/search-note?query=${query}`);
                  if (response.data && response.data.notes) {
                        setIsSearch(true);
                        setAllNotes(response.data.notes);
                  }
            } catch (error) {
                  console.log(error);
                  setAllNotes([]);
            }
      };

      const handleCloseSearch = async () => {
            setIsSearch(false);
            getAllNotes();
      };

      useEffect(() => {
            getUserInfo();
            getAllNotes();
      }, []);

      return (
            <>
                  <Navbar
                        userInfo={userInfo}
                        searchNote={searchNote}
                        handleCloseSearch={handleCloseSearch}
                  />
                  <div className="w-full h-full min-h-[85vh] mt-4 bg-transparent">
                        {allNotes.length > 0 ? (
                              <div className="container mx-auto">
                                    <div className="grid lg:grid-cols-3 sm:grid-cols-1 gap-4 mt-8">
                                          {allNotes.map((note, index) => (
                                                <NotesCard
                                                      key={index}
                                                      title={note.title}
                                                      date={note.createdAt}
                                                      content={note.content}
                                                      tags={note.tags}
                                                      isPinned={note.isPinned}
                                                      onEdit={() => handleEdit(note)}
                                                      onDelete={() => deleteNote(note)}
                                                      onPinNote={() => updateIsPinned(note)}
                                                />
                                          ))}
                                    </div>
                              </div>
                        ) : (
                              <EmptyCard
                                    imgSrc={isSearch ? NodataImage : AddNoteImage}
                                    message={
                                          isSearch
                                                ? 'No notes found matching your search criteria'
                                                : 'Start creating your first note! Click the "Add" button to jot down your thoughts, ideas, and reminders. Let\'s get started!'
                                    }
                              />
                        )}
                        <button
                              className="add-note-btn"
                              onClick={() => {
                                    setAddEditModel({
                                          isShown: true,
                                          type: 'add',
                                          data: null
                                    });
                              }}
                        >
                              <MdAdd className="text-[32px] text-white" />
                        </button>

                        <Modal
                              isOpen={openAddEditModel.isShown}
                              onRequestClose={() => { }}
                              style={{
                                    overlay: {
                                          backgroundColor: 'rgba(0, 0, 0, 0.5)'
                                    },
                              }}
                              contentLabel=""
                              className="add-edit-model md:w-[40%] w-[90%] max-h-[80%] bg-white mx-auto mt-20 rounded-lg overflow-y-scroll"
                              appElement={document.getElementById('root')}
                        >
                              <AddEditNotes
                                    type={openAddEditModel.type}
                                    noteData={openAddEditModel.data}
                                    getAllNotes={getAllNotes}
                                    showToastMessage={handleShowToastMessage}
                                    onClose={() => {
                                          setAddEditModel({ isShown: false, type: 'add', data: null });
                                    }}
                              />
                        </Modal>

                        <Toast
                              isShown={showToastMsg.isShown}
                              message={showToastMsg.message}
                              type={showToastMsg.type}
                              onClose={handleCloseToast}
                        />
                  </div>
            </>
      );
};

export default Home;
