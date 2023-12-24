
import React from 'react';

function Avatar({ avatarSrc, name, onClick }) {
  return (
    <div onClick={onClick} className="cursor-pointer text-center">
    <div className="bg-gradient-to-tr from-yellow-500 to-red-600 p-[1.5px] rounded-full">
      <div className="bg-white rounded-full p-1">
        <img
          className="w-14 h-14 rounded-full"
          src={avatarSrc}
          alt={name}
        />
      </div>
    </div>
    <p className="text-xs w-16 truncate">{name}</p>
  </div>
  );
}

export default Avatar;
