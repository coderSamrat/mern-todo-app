import React, { useState } from 'react';
import { MdAdd, MdClose } from 'react-icons/md';

const TagInput = ({ tags, setTags }) => {

      const [inputValue, setInputValue] = useState("");

      const handleInputChange = (event) => {
            setInputValue(event.target.value);
      };

      const addNewTag = () => {
            if (inputValue.trim() !== "") {
                  setTags([...tags, inputValue]);
                  setInputValue("");
            }
      };

      const handleKeyDown = (event) => {
            if (event.key === "Enter") {
                  addNewTag();
            }
      };

      const handleRemoveTag = (tagRemove) => {
            setTags(tags.filter((tag) => tag!== tagRemove));
      };


      return (
            <div>
                  {
                        tags?.length > 0 && (
                              <div className='flex items-center flex-wrap mt-2 gap-2'>
                                    {tags.map((tag, index) => (
                                          <span
                                                key={index}
                                                className='flex items-center gap-1 text-sm text-slate-900
                                                bg-slate-300 px-3 py-1 rounded'
                                          >
                                                <span># {tag}</span>
                                                <button
                                                      className='text-slate-400 hover:text-slate-800 cursor-pointer'
                                                      onClick={() => { handleRemoveTag(tag) }}
                                                >
                                                      <MdClose />
                                                </button>
                                          </span>
                                    ))}
                              </div>
                        )
                  }
                  <div className='flex items-center gap-4 mt-3'>
                        <input
                              type='text'
                              className='bg-slate-50 text-slate-800 text-sm border-slate-400 border outline-none py-2.5 px-3 rounded'
                              placeholder='Add a tag'
                              value={inputValue}
                              onChange={handleInputChange}
                              onKeyDown={handleKeyDown}
                        />
                        <button
                              className='w-10 h-10 flex items-center justify-center border border-blue-700
                              rounded cursor-pointer bg-white hover:bg-blue-700 transition-colors duration-300 ease-in-out group'
                              onClick={() => addNewTag()}
                        >
                              <MdAdd
                                    className='text-2xl text-blue-700 group-hover:text-white 
                                    transition-colors duration-300 ease-in-out'
                              />
                        </button>
                  </div>
            </div>
      );
};

export default TagInput;
