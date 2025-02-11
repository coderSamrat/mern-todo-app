import React from 'react'
import moment from 'moment';
import { MdCreate, MdDelete, MdOutlinePushPin } from "react-icons/md";


const NotesCard = ({ title, date, content, tags, isPinned, onEdit, onDelete, onPinNote }) => {
      return (
            <div className='card'>
                  <div className='flex justify-between items-center'>
                        <div>
                              <h6 className='text-sm font-medium'>{title}</h6>
                              <span className='text-xs text-gray-500'>{moment(date).format('MMM D, YYYY, h:mm:ss A')}</span>
                        </div>
                        <MdOutlinePushPin
                              onClick={onPinNote}
                              className={`icon-btn ${isPinned ? 'text-primary' : 'text-slate-300'} `}
                        />
                  </div>

                  <p className='text-lg text-slate-600 mt-2'>{content?.slice(0, 60)}</p>
                  <div className='flex items-center justify-between mt-2'>
                        <div className='text-xs text-slate-500'> {tags.map((tag) => `#${tag} `)} </div>
                        <div className='flex items-center gap-3'>
                              <MdCreate
                                    onClick={onEdit}
                                    className='icon-btn hover:text-green-500 cursor-pointer'
                              />
                              <MdDelete
                                    onClick={onDelete}
                                    className='icon-btn hover:text-red-500 cursor-pointer'
                              />
                        </div>
                  </div>
            </div>
      );
};

export default NotesCard;
