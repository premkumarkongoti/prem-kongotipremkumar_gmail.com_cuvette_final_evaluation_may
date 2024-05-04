

import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './StoryDisplay.module.css';
import crossIcon from '../../assets/close.png';
import likeIcon from '../../assets/like.png';
import bookmarkIcon from '../../assets/bookmark.png';
import shareIcon from '../../assets/share.png';
import 'react-accessible-accordion/dist/fancy-example.css';
import axios from 'axios';

import toast from "react-hot-toast";


function StoryDisplay({ story, onClose }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(story.likes ? story.likes.length : 0);
  const [copied, setCopied] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [bookmarked, setBookmarked] = useState(false);

  const handleBookmark = async () => {
    try {
      // Send a request to the backend API to bookmark the story
      const response = await axios.post('https://prem-kongotipremkumar-gmail-com-cuvette-final-evaluation-may.vercel.app/api/bookmarks', { storyId: story._id });
      if (response.data.success) {
        setBookmarked(true);
        toast.success('Story bookmarked successfully!');
      } else {
        toast.error('Failed to bookmark the story.');
      }
    } catch (error) {
      console.error('Error bookmarking the story:', error);
      toast.error('Error bookmarking the story.');
    }
  };

  const toggleLike = () => {
    if (liked) {
      // Unlike
      setLikeCount(likeCount - 1);
    } else {
      // Like
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked); // Toggle like status



   

    // Send like/unlike request to backend API (pseudo code)
    /*
    const endpoint = liked ? 'unlike' : 'like';
    fetch(`/api/story/${story.id}/${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle response if needed
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    */
  };



  const handleCopyStoryLink = () => {
    navigator.clipboard.writeText(
      `}`
    );
    toast.success("Link copied successfully!");
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: true,
    swipeToSlide: true,
    draggable: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  const renderSlide = (slide, index) => (
    <div key={index} className={styles.slide}>
     
      
      <div className={styles.slideContent}>
        <h2 className={styles.title}>{slide.heading}</h2>
        <p className={styles.desc}>{slide.description}</p>
       
      </div>
      <img src={slide.imageUrl} alt={slide.heading} className={styles.displayimg} />

      
    </div>
  );

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <Slider {...settings}>
          {story.slides.map(renderSlide)}
        </Slider>
        <div className={styles.progressBarContainer}>
          {story.slides.map((slide, index) => (
            <div
              key={index}
              className={`${styles.progressBar} ${index <= currentSlideIndex ? styles.progressBarCompleted : ''} ${
                index === currentSlideIndex ? styles.progressBarActive : ''
              }`}
            ></div>
          ))}
        </div>
        <div className={styles.buttonsContainer}>
          <button className={styles.closeIcon} onClick={onClose}>
          X
          </button>
        
            <img src={shareIcon} alt="Share" className={styles.shareIcon} />
        
          <div>
            <img src={bookmarkIcon} alt="Bookmark" className={styles.bookIcon} onClick={handleBookmark}
              style={{ cursor: 'pointer', filter: bookmarked ? 'brightness(0) invert(1)' : 'none' }}
            />
            {bookmarked ? 'Bookmarked' : 'Bookmark'}
          </div>
             <img
            src={liked ? likeIcon : likeIcon}
            alt={liked ? 'Unlike' : 'Like'}
            className={`${styles.likeIcon} ${liked ? styles.liked : ''}`}
            onClick={toggleLike}
          />
          <span className={styles.likeCount}>{likeCount}</span>
          
        </div>
      </div>
      {copied && <span className={styles.copyMessage}>Link copied!</span>}
    </div>
  );
}


export default StoryDisplay;





