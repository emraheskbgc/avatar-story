import React from 'react';
import Stories from 'stories-react';

function FullScreenStory({ selectedStory, selectedAvatar, onClose,avatars,setSelectedStory,setSelectedAvatar }) {
  if (!selectedStory) return null; // Eğer seçili bir hikaye yoksa, bileşeni gösterme
  const storyContent = {
    position: "relative",
    width: "auto",
    maxWidth: "100%",
    maxHeight: "100%",
  
  };
  const goToNextAvatarStory = () => {
    // Örnek olarak, şu anki seçili avatarın index'ini alıp, bir sonraki avatarın index'ini kullanalım.
    const currentIndex = avatars.findIndex(avatar => avatar.id === selectedAvatar.id);
    const nextAvatar = avatars[currentIndex + 1];
    if (nextAvatar) {
      setSelectedStory(nextAvatar.story);
      setSelectedAvatar(nextAvatar);
    }
  };
  const goToPreviousAvatarStory = () => {
    // Şu anki seçili avatarın index'ini alıp, bir önceki avatarın index'ini kullanalım.
    const currentIndex = avatars.findIndex(avatar => avatar.id === selectedAvatar.id);
    const previousAvatar = avatars[currentIndex - 1];
    if (previousAvatar) {
      setSelectedStory(previousAvatar.story);
      setSelectedAvatar(previousAvatar);
    }
  };
  return (
    <div className="fullScreenStyle" onClick={(e) => {
      const { clientX } = e;
      const { innerWidth } = window;

      // Sayfanın sağ yarısında tıklama yapılırsa sonraki hikayeye geç
      if (clientX > innerWidth / 2) {
        goToNextAvatarStory();
      } 
      // Sayfanın sol yarısında tıklama yapılırsa önceki hikayeye geç
      else {
        goToPreviousAvatarStory();
      }
    }}>
      {/* Kapatma düğmesi */}
      <div
        className="absolute text-white top-9 mt-2 right-8 cursor-pointer z-[1000]"
        onClick={onClose}
      >
        X
      </div>

      {/* Avatar bilgisi */}
      {selectedAvatar && (
        <div className="flex  justify-center items-center absolute mt-2 top-8 left-8 z-[1000]">
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
