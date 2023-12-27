import React from 'react';
import Stories from 'stories-react';

function FullScreenStory({ selectedStory, selectedAvatar, onClose }) {
  if (!selectedStory) return null; // Eğer seçili bir hikaye yoksa, bileşeni gösterme
  const storyContent = {
    position: "relative",
    width: "auto",
    maxWidth: "100%",
    maxHeight: "100%",
    margin: "auto",
    padding: "10px", // Kapatma düğmesini konumlandırmak için biraz dolgu ekleyin
  };
  return (
    <div className="fullScreenStyle">
      {/* Kapatma düğmesi */}
      <div
        className="absolute text-white top-9 mt-8 right-8 cursor-pointer z-[1000]"
        onClick={onClose}
      >
        X
      </div>

      {/* Avatar bilgisi */}
      {selectedAvatar && (
        <div className="flex justify-center items-center absolute mt-8 top-8 left-8 z-[1000]">
          <img
            src={selectedAvatar.avatar}
            alt={selectedAvatar.name}
            className="w-[40px] h-[40px] rounded-full mr-3 "
          />
          <p className="text-white font-[16px]">{selectedAvatar.name}</p>
        </div>
      )}

      {/* Hikaye içeriği */}
      <div className="storyContainerStyle">
      <Stories stories={selectedStory} storyStyles={storyContent} />
      </div>
    </div>
  );
}

export default FullScreenStory;
