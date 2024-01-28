import React, { useState, useEffect } from 'react';

function FullScreenStory({ selectedStory, selectedAvatar, onClose, setSelectedStory, setSelectedAvatar, avatarDatas }) {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [progressBarWidth, setProgressBarWidth] = useState(0);
  const [autoNextStoryTimer, setAutoNextStoryTimer] = useState(null);

  useEffect(() => {
    setCurrentStoryIndex(0);
    setProgressBarWidth(0);
    setAutoNextStoryTimer(null);
  }, [selectedAvatar]);

  const handleXButtonClick = (e) => {
    e.stopPropagation();
    onClose();
  };

  const handleNextStory = () => {
    setCurrentStoryIndex((prevIndex) => prevIndex + 1);

    if (currentStoryIndex + 1 >= selectedAvatar.story.length) {
      const currentAvatarIndex = avatarDatas.findIndex((avatar) => avatar.id === selectedAvatar.id);
      const nextAvatar = avatarDatas[currentAvatarIndex + 1];

      if (nextAvatar) {
        setSelectedStory(nextAvatar.story);
        setSelectedAvatar(nextAvatar);
        setCurrentStoryIndex(0);
        setProgressBarWidth(0);
      } else {
        onClose();
      }
    }
  };

  const handlePrevStory = () => {
    if (currentStoryIndex === 0) {
      const currentAvatarIndex = avatarDatas.findIndex((avatar) => avatar.id === selectedAvatar.id);
      const prevAvatar = avatarDatas[currentAvatarIndex - 1];

      if (prevAvatar) {
        setSelectedStory(prevAvatar.story);
        setSelectedAvatar(prevAvatar);
        setCurrentStoryIndex(prevAvatar.story.length - 1);
        setProgressBarWidth(0);
      } else {
        onClose();
      }
    } else {
      setCurrentStoryIndex((prevIndex) => Math.max(0, prevIndex - 1));
      setProgressBarWidth(0);
    }
  };
  
  const handleContainerClick = (e) => {
    const { clientX, target } = e;
    const { offsetWidth } = target;

    if (clientX > offsetWidth / 2) {
      handleNextStory();
    } else {
      handlePrevStory();
    }

    resetAutoNextStoryTimer(); // Tıklama olduğunda otomatik geçiş zamanlayıcısını sıfırla ve başlat
  };

  // Otomatik geçiş için timer'ı başlat
  const startAutoNextStoryTimer = () => {
    setAutoNextStoryTimer(
      setTimeout(() => {
        handleNextStory();
        resetAutoNextStoryTimer(); // Otomatik geçiş gerçekleştikten sonra timer'ı sıfırla ve başlat
      }, 3000) // 3 saniye sonra otomatik geçiş
    );
  };

  // Otomatik geçiş için timer'ı sıfırla ve başlat
  const resetAutoNextStoryTimer = () => {
    if (autoNextStoryTimer) {
      clearTimeout(autoNextStoryTimer);
    }
    startAutoNextStoryTimer();
  };

  useEffect(() => {
    setProgressBarWidth(0);

    const totalDuration = selectedStory.reduce((acc, story) => acc + (story.duration || 5000), 0);
    const interval = setInterval(() => {
      setProgressBarWidth((prevWidth) => (prevWidth + 10 / totalDuration) * 100);
    }, 10);

    startAutoNextStoryTimer(); // İlk render'da otomatik geçiş zamanlayıcısını başlat

    const timer = setTimeout(() => {
      handleNextStory();
    }, totalDuration);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
      clearTimeout(autoNextStoryTimer); // Komponent kaldırıldığında otomatik geçiş zamanlayıcısını temizle
    };
  }, [selectedStory, handleNextStory]);

  return (
    <div className="fullScreenStyle" onClick={handleContainerClick}>
      <div className="absolute text-white top-9 mt-2 right-8 cursor-pointer z-[1000]" onClick={handleXButtonClick}>
        X
      </div>

      {selectedAvatar && (
        <div className="flex justify-center items-center absolute mt-2 top-8 left-8 z-[1000]">
          <img src={selectedAvatar.avatar} alt={selectedAvatar.name} className="w-[40px] h-[40px] rounded-full mr-3 " />
          <p className="text-white font-[16px]">{selectedAvatar.name}</p>
        </div>
      )}

      <div className="storyContainerStyle" style={{ borderRadius: '10px' }}>
        {selectedAvatar && selectedAvatar.story && (
          <div>
            {selectedAvatar.story.map((storyItem, index) => (
              <div key={index} className="text-gray-100">
                {currentStoryIndex === index && (
                  <>
                    {storyItem.type === 'image' && (
                      <img
                        src={storyItem.url}
                        alt={`story-${index}`}
                        className='w-[100%] h-auto md:rounded-xl'
                      />
                    )}

                    <div className="story-lines-container">
                      {Array.from({ length: selectedAvatar.story.length }, (_, i) => (
                        <div key={i} className={`story-line ${i <= currentStoryIndex ? 'active' : ''}`}></div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FullScreenStory;
