"use client";
import React, { useState, useEffect, useRef } from "react";
import Stories from "stories-react";
import "stories-react/dist/index.css";
import { FaCircleChevronRight } from "react-icons/fa6";
import { FaCircleChevronLeft } from "react-icons/fa6";
import { FaCirclePlus } from "react-icons/fa6";

export default function Story() {
  const [selectedStory, setSelectedStory] = useState(null);
  const storiesRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(null); // Seçilen avatarı saklayın
  const [showScrollButton, setShowScrollButton] = useState(true);

  const onScroll = () => {
    if (storiesRef.current.scrollLeft > 0) {
      setShowLeft(true);
    } else {
      setShowLeft(false);
    }
    if (
      storiesRef.current.scrollLeft ==
      storiesRef.current.scrollWidth - storiesRef.current.clientWidth
    ) {
      setShowRight(false);
    } else {
      setShowRight(true);
    }
  };
  const avatars = [
    {
      id: 1,
      name: "Avatar 1",
      avatar: "https://reqres.in/img/faces/1-image.jpg",

      story: [
        {
          type: "image",
          url: "https://images.pexels.com/photos/9470805/pexels-photo-9470805.jpeg?w=300",
          duration: 5000,
        },
        {
          type: "image",
          url: "https://images.pexels.com/photos/9733197/pexels-photo-9733197.jpeg?w=300",
          duration: 6000,
        },
        // Diğer hikaye öğeleri...
      ],
    },
    {
      id: 2,
      name: "Avatar 1",
      avatar: "https://reqres.in/img/faces/1-image.jpg",

      story: [
        {
          type: "image",
          url: "https://images.pexels.com/photos/9470805/pexels-photo-9470805.jpeg?w=300",
          duration: 5000,
        },
        {
          type: "image",
          url: "https://images.pexels.com/photos/9733197/pexels-photo-9733197.jpeg?w=300",
          duration: 6000,
        },
        // Diğer hikaye öğeleri...
      ],
    },
    {
      id: 3,
      name: "Avatar 2",
      avatar: "https://reqres.in/img/faces/2-image.jpg",

      story: [
        {
          type: "image",
          url: "https://images.pexels.com/photos/9733197/pexels-photo-9733197.jpeg?w=300",
          duration: 6000,
        },
        // Diğer hikaye öğeleri...
      ],
    },
    {
      id: 4,
      name: "Avatar 1",
      avatar: "https://reqres.in/img/faces/1-image.jpg",

      story: [
        {
          type: "image",
          url: "https://images.pexels.com/photos/9470805/pexels-photo-9470805.jpeg?w=300",
          duration: 5000,
        },
        {
          type: "image",
          url: "https://images.pexels.com/photos/9733197/pexels-photo-9733197.jpeg?w=300",
          duration: 6000,
        },
        // Diğer hikaye öğeleri...
      ],
    },
    {
      id: 5,
      name: "Avatar 2",
      avatar: "https://reqres.in/img/faces/2-image.jpg",

      story: [
        {
          type: "image",
          url: "https://images.pexels.com/photos/9733197/pexels-photo-9733197.jpeg?w=300",
          duration: 6000,
        },
        // Diğer hikaye öğeleri...
      ],
    },
    {
      id: 6,
      name: "Avatar 1",
      avatar: "https://reqres.in/img/faces/1-image.jpg",

      story: [
        {
          type: "image",
          url: "https://images.pexels.com/photos/9470805/pexels-photo-9470805.jpeg?w=300",
          duration: 5000,
        },
        {
          type: "image",
          url: "https://images.pexels.com/photos/9733197/pexels-photo-9733197.jpeg?w=300",
          duration: 6000,
        },
        // Diğer hikaye öğeleri...
      ],
    },
    {
      id: 7,
      name: "Avatar 2",
      avatar: "https://reqres.in/img/faces/2-image.jpg",

      story: [
        {
          type: "image",
          url: "https://images.pexels.com/photos/9733197/pexels-photo-9733197.jpeg?w=300",
          duration: 6000,
        },
        // Diğer hikaye öğeleri...
      ],
    },
    {
      id: 8,
      name: "Avatar 1",
      avatar: "https://reqres.in/img/faces/1-image.jpg",

      story: [
        {
          type: "image",
          url: "https://images.pexels.com/photos/9470805/pexels-photo-9470805.jpeg?w=300",
          duration: 5000,
        },
        {
          type: "image",
          url: "https://images.pexels.com/photos/9733197/pexels-photo-9733197.jpeg?w=300",
          duration: 6000,
        },
        // Diğer hikaye öğeleri...
      ],
    },
    {
      id: 9,
      name: "Avatar 2",
      avatar: "https://reqres.in/img/faces/2-image.jpg",

      story: [
        {
          type: "image",
          url: "https://images.pexels.com/photos/9733197/pexels-photo-9733197.jpeg?w=300",
          duration: 6000,
        },
        // Diğer hikaye öğeleri...
      ],
    },
    {
      id: 10,
      name: "Avatar 1",
      avatar: "https://reqres.in/img/faces/1-image.jpg",

      story: [
        {
          type: "image",
          url: "https://images.pexels.com/photos/9470805/pexels-photo-9470805.jpeg?w=300",
          duration: 5000,
        },
        {
          type: "image",
          url: "https://images.pexels.com/photos/9733197/pexels-photo-9733197.jpeg?w=300",
          duration: 6000,
        },
        // Diğer hikaye öğeleri...
      ],
    },
    {
      id: 11,
      name: "Avatar 2",
      avatar: "https://reqres.in/img/faces/2-image.jpg",

      story: [
        {
          type: "image",
          url: "https://images.pexels.com/photos/9733197/pexels-photo-9733197.jpeg?w=300",
          duration: 6000,
        },
        // Diğer hikaye öğeleri...
      ],
    },
    {
      id: 12,
      name: "Avatar 1",
      avatar: "https://reqres.in/img/faces/1-image.jpg",

      story: [
        {
          type: "image",
          url: "https://images.pexels.com/photos/9470805/pexels-photo-9470805.jpeg?w=300",
          duration: 5000,
        },
        {
          type: "image",
          url: "https://images.pexels.com/photos/9733197/pexels-photo-9733197.jpeg?w=300",
          duration: 6000,
        },
        // Diğer hikaye öğeleri...
      ],
    },
    {
      id: 13,
      name: "Avatar 2",
      avatar: "https://reqres.in/img/faces/2-image.jpg",

      story: [
        {
          type: "image",
          url: "https://images.pexels.com/photos/9733197/pexels-photo-9733197.jpeg?w=300",
          duration: 6000,
        },
        // Diğer hikaye öğeleri...
      ],
    },
    // Diğer avatarlar...
  ];

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
  useEffect(() => {
    if (selectedStory) {
      const totalDuration = selectedStory.reduce(
        (acc, story) => acc + (story.duration || 5000),
        0
      ); // Varsayılan süre: 5000 ms
      const timer = setTimeout(() => {
        setSelectedStory(null); // Hikaye süresi dolduğunda sıfırla
      }, totalDuration);

      return () => clearTimeout(timer); // Component unmount olduğunda timer'ı temizle
    }
  }, [selectedStory]);

  const storyContent = {
    position: "relative",
    width: "auto",
    maxWidth: "100%",
    maxHeight: "100%",
    margin: "auto",
    padding: "10px", // Kapatma düğmesini konumlandırmak için biraz dolgu ekleyin
  };

  return (
    <div className="relative md:w-max w-full md:h-auto h-screen   overflow-hidden border">
      <div
        onScroll={onScroll}
        ref={storiesRef}
        className="flex space-x-2  overflow-x-scroll max-w-xl bg-white border-gray-200 p-4 scroll-smooth scrollbar-hide"
      >
        <div>
          <div className="relative bg-gradient-to-tr from-yellow-500 to-red-600 p-[1.5px] rounded-full">
            <div className="bg-white rounded-full p-1">
              <img
                className="w-14 h-14 cursor-pointer rounded-full"
                src={avatars[0].avatar}
                alt=""
              />
            </div>
            <div className="plusIcon">
              <FaCirclePlus />
            </div>
          </div>

          <p className="text-xs w-16 truncate text-center"> emrah</p>
        </div>
        {avatars.map((avatar) => (
          <div key={avatar.id} onClick={() => handleAvatarClick(avatar)}>
            <div className="bg-gradient-to-tr from-yellow-500 to-red-600 p-[1.5px] rounded-full">
              <div className="bg-white rounded-full p-1">
                <img
                  className="w-14 h-14 cursor-pointer rounded-full"
                  src={avatar.avatar}
                  alt=""
                />
              </div>
            </div>
            <p className="text-xs w-16 truncate text-center"> {avatar.name}</p>
          </div>
        ))}
      </div>
      {showScrollButton && (
        <div className="absolute top-0 p-4 h-full flex justify-between z-10 items-center w-full pointer-events-none">
          <div className="left-0 pl-4 pointer-events-auto">
            <button
              onClick={() => {
                storiesRef.current.scrollLeft -= 200;
              }}
            >
              <FaCircleChevronLeft
                className={`w-5 h-5 cursor-pointer drop-shadow-lg text-white filter ${
                  showLeft ? "visible" : "invisible"
                }`}
              />
            </button>
          </div>
          <div className="right-0 pr-4 pointer-events-auto">
            <button
              onClick={() => {
                storiesRef.current.scrollLeft += 200;
              }}
            >
              <FaCircleChevronRight
                className={`w-5 h-5 cursor-pointer drop-shadow-lg  text-white filter ${
                  showRight ? "visible" : "invisible"
                }`}
              />
            </button>
          </div>
        </div>
      )}

      {selectedStory && (
        <div className="fullScreenStyle">
          {/* Kapatma düğmesi */}
          <div
            className="absolute text-white top-9 right-8 cursor-pointer z-[1000]"
            onClick={() => setSelectedStory(null)}
          >
            X
          </div>
          {selectedAvatar && (
            <div className="flex justify-center items-center absolute top-8 left-8 z-[1000]">
              <img
                src={selectedAvatar.avatar}
                alt={selectedAvatar.name}
                className="w-[40px] h-[40px] rounded-full mr-3 "
              />
              <p className="text-white font-[16px]">{selectedAvatar.name}</p>
            </div>
          )}

          <div className="storyContainerStyle">
            <Stories stories={selectedStory} storyStyles={storyContent} />
          </div>
        </div>
      )}
    </div>
  );
}
