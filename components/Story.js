"use client";
import React, { useState, useEffect, useRef } from "react";
import "stories-react/dist/index.css";
import { FaCirclePlus } from "react-icons/fa6";

import CameraShot from "./CameraShot";
import Avatar from "./Avatar";
import ScrollButtons from "./ScrollButtons";
import FullScreenStory from "./FullScreenStory";
import avatarDatas from "../data/avatars.json";

export default function Story() {
  const [selectedStory, setSelectedStory] = useState(null);
  const storiesRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(null); // Seçilen avatarı saklayın
  const [showScrollButton, setShowScrollButton] = useState(true); //scroll butonların gösterilip gizleneceğini kontrol eder

 


  // Kamera modu için state değişkenleri:
  const [isOpenCamera, setIsOpenCamera] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState(null); // Yakalanan fotoğrafı saklamak için.

  // Kamera açma işlevi:
  const handleOpenCamera = () => {
    setIsOpenCamera(true);
  };
  console.log(isOpenCamera);

  // Sayfa kaydırıldığında ne olacağını kontrol eden fonksiyon:
  const onScroll = () => {
    if (storiesRef.current.scrollLeft > 0) {
      setShowLeft(true);
    } else {
      setShowLeft(false);
    }
    if (
      storiesRef.current.scrollLeft ===
      storiesRef.current.scrollWidth - storiesRef.current.clientWidth
    ) {
      setShowRight(false);
    } else {
      setShowRight(true);
    }
  };
  const [avatars, setAvatars] = useState(avatarDatas);
  const handleAvatarClick = (avatar) => {
    setSelectedStory(avatar.story); // Seçilen avatarın hikayesini set edin.
    setSelectedAvatar(avatar); // Seçilen avatarı set edin.
    setShowScrollButton(false);
  };
  useEffect(() => {
    if (!selectedStory) {
      setShowScrollButton(true);
    }
  }, [selectedStory]);

  // Seçilen hikayenin süresi dolduğunda tetiklenen etkileşim:
const avatarStatuses = {};
useEffect(() => {
  if (selectedStory) {
    // Seçilen hikayenin toplam süresini hesapla:
    const totalDuration = selectedStory.reduce(
      (acc, story) => acc + (story.duration || 5000),
      0
    );
    const timer = setTimeout(() => {
      // Hikaye bittiğinde bir sonraki avatara geçiş yap
      const currentAvatarIndex = avatars.findIndex(avatar => avatar.id === selectedAvatar.id);
      if (currentAvatarIndex < avatars.length - 1) {
        const nextAvatar = avatars[currentAvatarIndex + 1];
        setSelectedStory(nextAvatar.story);  // Hikayeyi başlat
        setSelectedAvatar(nextAvatar);      // Avatarı güncelle
        setShowScrollButton(false);
      } else {
        // Eğer son avatara geldiysek, seçili hikayeyi sıfırla
        setSelectedStory(null);

        // avatarStatuses[selectedAvatar.id] kontrolü
        if (avatarStatuses[selectedAvatar.id]) {
          avatarStatuses[selectedAvatar.id].currentIndex = 0;
        } else {
          // Eğer ilgili avatar için bir durum nesnesi yoksa oluştur
          avatarStatuses[selectedAvatar.id] = {
            currentIndex: 0
          };
        }
      }
    }, totalDuration);

    return () => clearTimeout(timer);
  }
}, [selectedStory, selectedAvatar]);

  


  // Yakalanan fotoğraf varsa, avatar listesine ekleyen etkileşim:
  useEffect(() => {
    if (capturedPhoto) {
      const newAvatarList = avatars.map((avatar, index) => {
        if (index === 0) {
          // 1. indexli avatar
          return {
            ...avatar,
            story: [
              ...avatar.story,
              {
                type: "image",
                url: capturedPhoto,
                duration: 5000, 
              },
            ],
          };
        }
        return avatar;
      });

      // Yeni avatar listesini set et ve fotoğrafı sıfırla:
      setAvatars(newAvatarList);
      setCapturedPhoto(null); // Fotoğrafı sıfırlayın
    }
  }, [capturedPhoto]);

  return (
    <div className="relative md:w-max w-full md:h-auto h-screen   overflow-hidden border">
      <div
        onScroll={onScroll}
        ref={storiesRef}
        className="flex space-x-2  overflow-x-scroll max-w-xl bg-white border-gray-200 p-4 scroll-smooth scrollbar-hide"
      >
        <div onClick={() => handleAvatarClick(avatars[0])}>
          <div className="relative bg-gradient-to-tr from-yellow-500 to-red-600 p-[1.5px] rounded-full">
            <div className="bg-white rounded-full p-1">
              <img
                className="w-14 h-14 cursor-pointer rounded-full"
                src={avatars[0].avatar}
                alt=""
              />
            </div>
            <div className="plusIcon cursor-pointer">
              <FaCirclePlus onClick={handleOpenCamera} />
            </div>
          </div>

          <p className="text-xs w-16 truncate text-center">
            {" "}
            {avatars[0].name}
          </p>
        </div>
        {avatars.slice(1).map((avatar) => (
          <Avatar
            key={avatar.id}
            avatarSrc={avatar.avatar}
            name={avatar.name}
            onClick={() => handleAvatarClick(avatar)}
          />
        ))}
      </div>
      {showScrollButton && (
        <ScrollButtons
          onLeftClick={() => {
            storiesRef.current.scrollLeft -= 200;
          }}
          onRightClick={() => {
            storiesRef.current.scrollLeft += 200;
          }}
          showLeft={showLeft}
          showRight={showRight}
        />
      )}

      {selectedStory && (
       <div className="story-animation">
       
       <FullScreenStory
       selectedStory={selectedStory}
       selectedAvatar={selectedAvatar}
       onClose={() => setSelectedStory(null)} // Bu fonksiyonu kapatma işlemi için ayarlayabilirsiniz
     />

       </div>
      )}
      {isOpenCamera && (
        <div className="fullScreenStyle">
          <CameraShot
            onCloseCamera={() => setIsOpenCamera(false)}
            onCapture={setCapturedPhoto}
            onShareToStory={() => {setSelectedStory(null)}}
          />
        </div>
      )}
    </div>
  );
}
