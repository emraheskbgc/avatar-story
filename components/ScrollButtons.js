import React from 'react';
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";

function ScrollButtons({ onLeftClick, onRightClick, showLeft, showRight }) {
  return (
    <div className=" hidden md:flex absolute top-0 p-4 h-full flex justify-between z-10 items-center w-full pointer-events-none">
      <div className="left-0 pl-4 pointer-events-auto">
        <button onClick={onLeftClick}>
          <FaCircleChevronLeft
            className={`w-5 h-5 cursor-pointer drop-shadow-lg text-white filter ${
              showLeft ? "visible" : "invisible"
            }`}
          />
        </button>
      </div>
      <div className="right-0 pr-4 pointer-events-auto">
        <button onClick={onRightClick}>
          <FaCircleChevronRight
            className={`w-5 h-5 cursor-pointer drop-shadow-lg  text-white filter ${
              showRight ? "visible" : "invisible"
            }`}
          />
        </button>
      </div>
    </div>
  );
}

export default ScrollButtons;
