import React from 'react'

const EmptyCard = ({ imgSrc, message }) => {
      return (
            <div className='w-full flex flex-col items-center justify-center'>
                  <img src={imgSrc} alt="Empty Card" className='w-60 object-center' />

                  <p className='w-1/2 text-sm font-medium text-slate-700 text-center leading-7 mt-5'>
                        {message}
                  </p>
            </div>
      );
};

export default EmptyCard;
