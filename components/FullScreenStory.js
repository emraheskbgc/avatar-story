import React, { useState, useEffect } from 'react';

function FullScreenStory({ selectedStory, selectedAvatar, onClose, setSelectedStory, setSelectedAvatar, avatarDatas }) {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [progressBarWidth, setProgressBarWidth] = useState(0);

  useEffect(() => {
    setCurrentStoryIndex(0);
    setProgressBarWidth(0);
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
        // Bir önceki avatarın hikayelerini göster
        setSelectedStory(prevAvatar.story);
        setSelectedAvatar(prevAvatar);
        setCurrentStoryIndex(prevAvatar.story.length - 1); // Son hikayeye geç
        setProgressBarWidth(0); // Progress bar'ını sıfırla
      } else {
        // Eğer bir önceki avatar yoksa kapat
        onClose();
      }
    } else {
      setCurrentStoryIndex((prevIndex) => Math.max(0, prevIndex - 1));
      setProgressBarWidth(0); // Bir önceki hikayeye geçildiğinde progress bar'ını sıfırla
    }
  };
  
  const handleContainerClick = (e) => {
    const { clientX, target } = e;
    const { offsetWidth } = target;

    // Ekranın sağ yarısına tıklandıysa bir sonraki hikayeye geç
    if (clientX > offsetWidth / 2) {
      handleNextStory();
    } else {
      // Ekranın sol yarısına tıklandıysa bir önceki hikayeye geç
      handlePrevStory();
    }
  };

  useEffect(() => {
    setProgressBarWidth(0);

    const totalDuration = selectedStory.reduce((acc, story) => acc + (story.duration || 5000), 0);
    const interval = setInterval(() => {
      setProgressBarWidth((prevWidth) => (prevWidth + 10 / totalDuration) * 100);
    }, 10);

    const timer = setTimeout(() => {
      handleNextStory();
    }, totalDuration);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
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
                        className='w-[100%] h-auto flex justify-center items-center object-cover md:rounded-xl'
                        
                      />
                    )}
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
