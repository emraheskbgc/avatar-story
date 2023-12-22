"use client"
import React, {useState, useEffect, useRef} from 'react';
import Stories from 'stories-react';
import 'stories-react/dist/index.css';
import { FaCircleChevronRight } from "react-icons/fa6";
import { FaCircleChevronLeft } from "react-icons/fa6";


export default function ImagesStories() {
    const [selectedStory, setSelectedStory] = useState(null);
    const storiesRef = useRef(null);
    const [showLeft, setShowLeft] = useState(false)
    const[showRight, setShowRight] = useState(true)
    const onScroll = () => {
        if (storiesRef.current.scrollLeft > 0) {
            setShowLeft(true)
        }else{
            setShowLeft(false)
        }
        if (storiesRef.current.scrollLeft == storiesRef.current.scrollWidth - storiesRef.current.clientWidth) {
            setShowRight(false)
        }else{
            setShowRight(true)
        }
    }
    const avatars = [
        {
          id: 1,
          name: 'Avatar 1',
          avatar: "https://reqres.in/img/faces/1-image.jpg",

          story: [
            {
              type: 'image',
              url: 'https://images.pexels.com/photos/9470805/pexels-photo-9470805.jpeg?w=300',
              duration: 5000,
            }, {
                type: 'image',
                url: 'https://images.pexels.com/photos/9733197/pexels-photo-9733197.jpeg?w=300',
                duration: 6000,
              },
            // Diğer hikaye öğeleri...
          ],
        },
        {
          id: 2,
          name: 'Avatar 2',
          avatar: "https://reqres.in/img/faces/2-image.jpg",

          story: [
            {
              type: 'image',
              url: 'https://images.pexels.com/photos/9733197/pexels-photo-9733197.jpeg?w=300',
              duration: 6000,
            },
            // Diğer hikaye öğeleri...
          ],
        },
        {
            id: 3,
            name: 'Avatar 1',
            avatar: "https://reqres.in/img/faces/1-image.jpg",
  
            story: [
              {
                type: 'image',
                url: 'https://images.pexels.com/photos/9470805/pexels-photo-9470805.jpeg?w=300',
                duration: 5000,
              }, {
                  type: 'image',
                  url: 'https://images.pexels.com/photos/9733197/pexels-photo-9733197.jpeg?w=300',
                  duration: 6000,
                },
              // Diğer hikaye öğeleri...
            ],
          },
          {
            id: 4,
            name: 'Avatar 2',
            avatar: "https://reqres.in/img/faces/2-image.jpg",
  
            story: [
              {
                type: 'image',
                url: 'https://images.pexels.com/photos/9733197/pexels-photo-9733197.jpeg?w=300',
                duration: 6000,
              },
              // Diğer hikaye öğeleri...
            ],
          },
          {
            id: 5,
            name: 'Avatar 1',
            avatar: "https://reqres.in/img/faces/1-image.jpg",
  
            story: [
              {
                type: 'image',
                url: 'https://images.pexels.com/photos/9470805/pexels-photo-9470805.jpeg?w=300',
                duration: 5000,
              }, {
                  type: 'image',
                  url: 'https://images.pexels.com/photos/9733197/pexels-photo-9733197.jpeg?w=300',
                  duration: 6000,
                },
              // Diğer hikaye öğeleri...
            ],
          },
          {
            id: 6,
            name: 'Avatar 2',
            avatar: "https://reqres.in/img/faces/2-image.jpg",
  
            story: [
              {
                type: 'image',
                url: 'https://images.pexels.com/photos/9733197/pexels-photo-9733197.jpeg?w=300',
                duration: 6000,
              },
              // Diğer hikaye öğeleri...
            ],
          },
          {
            id: 7,
            name: 'Avatar 1',
            avatar: "https://reqres.in/img/faces/1-image.jpg",
  
            story: [
              {
                type: 'image',
                url: 'https://images.pexels.com/photos/9470805/pexels-photo-9470805.jpeg?w=300',
                duration: 5000,
              }, {
                  type: 'image',
                  url: 'https://images.pexels.com/photos/9733197/pexels-photo-9733197.jpeg?w=300',
                  duration: 6000,
                },
              // Diğer hikaye öğeleri...
            ],
          },
          {
            id: 8,
            name: 'Avatar 2',
            avatar: "https://reqres.in/img/faces/2-image.jpg",
  
            story: [
              {
                type: 'image',
                url: 'https://images.pexels.com/photos/9733197/pexels-photo-9733197.jpeg?w=300',
                duration: 6000,
              },
              // Diğer hikaye öğeleri...
            ],
          },
          {
            id: 9,
            name: 'Avatar 1',
            avatar: "https://reqres.in/img/faces/1-image.jpg",
  
            story: [
              {
                type: 'image',
                url: 'https://images.pexels.com/photos/9470805/pexels-photo-9470805.jpeg?w=300',
                duration: 5000,
              }, {
                  type: 'image',
                  url: 'https://images.pexels.com/photos/9733197/pexels-photo-9733197.jpeg?w=300',
                  duration: 6000,
                },
              // Diğer hikaye öğeleri...
            ],
          },
          {
            id: 10,
            name: 'Avatar 2',
            avatar: "https://reqres.in/img/faces/2-image.jpg",
  
            story: [
              {
                type: 'image',
                url: 'https://images.pexels.com/photos/9733197/pexels-photo-9733197.jpeg?w=300',
                duration: 6000,
              },
              // Diğer hikaye öğeleri...
            ],
          },
          {
            id: 11,
            name: 'Avatar 1',
            avatar: "https://reqres.in/img/faces/1-image.jpg",
  
            story: [
              {
                type: 'image',
                url: 'https://images.pexels.com/photos/9470805/pexels-photo-9470805.jpeg?w=300',
                duration: 5000,
              }, {
                  type: 'image',
                  url: 'https://images.pexels.com/photos/9733197/pexels-photo-9733197.jpeg?w=300',
                  duration: 6000,
                },
              // Diğer hikaye öğeleri...
            ],
          },
          {
            id: 12,
            name: 'Avatar 2',
            avatar: "https://reqres.in/img/faces/2-image.jpg",
  
            story: [
              {
                type: 'image',
                url: 'https://images.pexels.com/photos/9733197/pexels-photo-9733197.jpeg?w=300',
                duration: 6000,
              },
              // Diğer hikaye öğeleri...
            ],
          },
        // Diğer avatarlar...
      ];

      const handleAvatarClick = (story) => {
        setSelectedStory(story);
      };
      useEffect(() => {
        if (selectedStory) {
          const totalDuration = selectedStory.reduce((acc, story) => acc + (story.duration || 5000), 0); // Varsayılan süre: 5000 ms
          const timer = setTimeout(() => {
            setSelectedStory(null); // Hikaye süresi dolduğunda sıfırla
          }, totalDuration);
          
          return () => clearTimeout(timer); // Component unmount olduğunda timer'ı temizle
        }
      }, [selectedStory]);
    
 return (
    <div className='relative w-max'>
    <div onScroll={onScroll} ref={storiesRef}  className='flex space-x-2  overflow-x-scroll max-w-xl bg-white border-gray-200 p-4 scroll-smooth scrollbar-hide'>
      {avatars.map((avatar) => (
        <div key={avatar.id} onClick={() => handleAvatarClick(avatar.story)} >
        <div className="bg-gradient-to-tr from-yellow-500 to-red-600 p-[1.5px] rounded-full">
        <div className="bg-white rounded-full p-1">
          <img  className="w-14 h-14 cursor-pointer rounded-full" src={avatar.avatar} alt="" />
        </div>
      </div>
      <p className="text-xs w-16 truncate text-center"> {avatar.name}</p>
        </div>
      ))}
    </div>
   

    {selectedStory && (
      <Stories
        width="400px"
        height="600px"
        stories={selectedStory}
      />
    )}
  </div>
 );
}