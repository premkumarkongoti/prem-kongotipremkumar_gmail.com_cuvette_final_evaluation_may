import React, { useState } from 'react';
import styles from './Addstories.module.css';
import crossIcon from '../../assets/close.png';
import axios from 'axios';

const Slide = ({ slides, currentSlide, setCurrentSlide }) => (
  <div>
    {[...Array(slides.length)].map((_, index) => (
      <button
        key={index}
        type="button"
        onClick={() => setCurrentSlide(index)}
        className={index === currentSlide ? styles.activeSlide : ''}
      >
        Slide {index + 1}
      </button>
    ))}
  </div>
);

const Form = ({ slides, currentSlide, handleInputChange, handleSlideChange, onSubmit }) => {
  const categories = [
    { value: 'food', label: 'Food' },
    { value: 'health', label: 'Health & Fitness' },
    { value: 'travel', label: 'Travel' },
    { value: 'movie', label: 'Movie' },
    { value: 'education', label: 'Education' },
  ];

  return (
    <form onSubmit={onSubmit}>
      <div className={styles.formgroup}>
        <label htmlFor="heading">Heading:</label>
        <input
          type="text"
          name="heading"
          id="heading"
          value={slides[currentSlide].heading}
          onChange={handleInputChange}
        />
      </div>
      <div className={styles.formgroup}>
        <label htmlFor="description">Description:</label>
        <textarea
          name="description"
          id="description"
          value={slides[currentSlide].description}
          onChange={handleInputChange}
        />
      </div>
      <div className={styles.formgroup}>
        <label htmlFor="imageUrl">Image URL:</label>
        <input
          type="text"
          name="imageUrl"
          id="imageUrl"
          value={slides[currentSlide].imageUrl}
          onChange={handleInputChange}
        />
      </div>
      <div className={styles.formgroup}>
        <label htmlFor="category">Category:</label>
        <select
          name="category"
          id="category"
          value={slides[currentSlide].category}
          onChange={handleInputChange}
        >
          {categories.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <button type="button" onClick={() => handleSlideChange('prev')}>
        Previous Slide
      </button>
      <button type="button" onClick={() => handleSlideChange('next')}>
        Next Slide
      </button>
      <button type="submit">Post</button>
    </form>
  );
};

function Story({ onClose, onSubmit }) {
  const [slides, setSlides] = useState([
    { heading: '', description: '', imageUrl: '', category: 'food' },
    { heading: '', description: '', imageUrl: '', category: 'food' },
    { heading: '', description: '', imageUrl: '', category: 'food' },
    { heading: '', description: '', imageUrl: '', category: 'food' },
    { heading: '', description: '', imageUrl: '', category: 'food' },
    { heading: '', description: '', imageUrl: '', category: 'food' },
  ]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const newSlides = [...slides];
    newSlides[currentSlide][name] = value;
    setSlides(newSlides);
  };

  const handleSlideChange = (direction) => {
    if (direction === 'next' && currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else if (direction === 'prev' && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if any required fields are empty
    const currentSlideData = slides[currentSlide];
    if (!currentSlideData.heading || !currentSlideData.description || !currentSlideData.imageUrl) {
      alert('Please fill in all required fields.');
      return; // Stop execution if any required field is empty
    }


    if (slides.length < 3) {
      alert('Please add at least 3 slides.');
      return; // Stop execution if less than 3 slides are added
    }


    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.error('User is not authenticated.');
      return;
    }

    
    // Send form data to backend API for processing
    const newStory = {
      heading: currentSlideData.heading,
      description: currentSlideData.description,
      imageUrl: currentSlideData.imageUrl,
      category: currentSlideData.category,
      slides: slides.slice(0, currentSlide + 1), // Include slides up to the current slide
    };
    try {
      // Send the story data to the backend API
      const response = await axios.post('https://prem-kongotipremkumar-gmail-com-cuvette-final-evaluation-may.vercel.app/stories', newStory);

      console.log(response.data); // Log the response from the backend (optional)
      // Reset form fields after successful submission
      onSubmit(newStory);
    } catch (error) {
      console.error('Error creating story:', error);
      // Handle any error that occurs during API request
      // You can show an error message to the user or take appropriate action
    }
  };
  return (
    <div className={styles.modal}>
      <div className={styles.modalcontainer}>
        <button className={styles.closemodal} onClick={onClose}>
          <img src={crossIcon} alt="Close" />
        </button>
        <span>add up to 6 slides</span>
        <div className={styles.storyform}>
          <h1>Add Story</h1>
          <Slide
            slides={slides}
            currentSlide={currentSlide}
            setCurrentSlide={setCurrentSlide}
          />
          <Form
            slides={slides}
            currentSlide={currentSlide}
            handleInputChange={handleInputChange}
            handleSlideChange={handleSlideChange}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}

export default Story;




























































