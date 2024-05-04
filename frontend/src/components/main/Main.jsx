import React, { useState, useEffect, useRef } from 'react';
import styles from './Main.module.css';
import allImg from '../../assets/all.png';
import medicalImg from '../../assets/medical.png';
import fruitsImg from '../../assets/fruits.png';
import worldImg from '../../assets/world.png';
import Register from '../register/Register.jsx';
import Login from '../login/Login.jsx';
import Story from '../addstories/Addstories.jsx';
import userProfilePhoto from '../../assets/profilephoto.png';
import StoryDisplay from '../storydisplay/StoryDisplay'; // Import the StoryDisplay component
import { getBookmarkedStories } from '../../api/bookmarks.js'; // Import your API function for fetching bookmarked stories
import toast from "react-hot-toast";
import axios from 'axios';
import Bookmark from "../bookmarks/Bookmarks.jsx";
import movieImg from '../../assets/movie.png'
import travelImg from '../../assets/tavel.png'
//import { Link } from 'react-router-dom';
//import Bookmarks from '../bookmarks/Bookmarks.jsx'; // Adjust the import path as needed







function Main({userId}) {
  const [openModal, setOpenModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track user's login status
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [stories, setStories] = useState([]); // State to store created stories
  const [openStoryModal, setOpenStoryModal] = useState(false); // State for story creation modal
  const [menuActive, setMenuActive] = useState(false); // State to manage dropdown menu visibility
  const [userName, setUserName] = useState(''); // State to store the logged-in user's name
  const [currentStory, setCurrentStory] = useState(null);
  const [selectedStory, setSelectedStory] = useState(null);
  const [showAllStories, setShowAllStories] = useState(false);
  const [expandedClass, setExpandedClass] = useState('');
  const [bookmarkedStories, setBookmarkedStories] = useState([]);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false); // New state for dropdown visibility
  const [userStories, setUserStories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  


  // const { currentUser } = useSelector((state) => state.user);
  // const dispatch = useDispatch();



  const handleClickViewStory = (story) => {
   // setCurrentStory(story);
    setSelectedStory(story);
  };


  const bookmarkHandeler = () => {
    setBookmarkedStories(true);
  };


  const handleSignInClick = () => {
    setShowLoginForm(true);
    console.log("log in");
  };

  const handleCloseLoginForm = () => {
    setShowLoginForm(false);
  };


  const handleAddStory = (newStory) => {
    setStories([...stories, newStory]); // Add the new story to the stories state
    setOpenStoryModal(false); // Close the story creation modal after adding the story
  };

  const modalRef = useRef(null);
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const imageData = [
    { imageUrl: allImg, name: 'All' ,categoryName: "All"},
    { imageUrl: medicalImg, name: 'Medical', categoryName:'medical' },
    { imageUrl: fruitsImg, name: 'Food', categoryName: 'food' },
    { imageUrl: worldImg, name: 'World', categoryName: 'world' },
    { imageUrl: travelImg, name: 'Travel', categoryName: 'travel'},
    { imageUrl: movieImg, name: 'Movies', categoryName: 'movies'}
    // Add more image data as needed
  ];

  const handleClick = (categoryName) => {
    const filteredStories =
    categoryName === 'All'
      ? stories
      : stories.filter((story) => story.category === categoryName);

  // Update the stories state with the filtered stories
  setSelectedCategory(categoryName);
    // You can add your custom logic here
  };

  const handleClick1 = () => {
    setOpenModal(true);
  };


  const handleClick2 = () => {
    setOpenStoryModal(true); // Open the story creation modal
  };

  const handleCloseStory = () =>{
    setOpenStoryModal(false);
  }

  
  
  const handleCloseModal = () => {
    setOpenModal(false);
  };


  const handleMenuToggle = () => {
    setMenuActive(!menuActive); // Toggle menuActive state
    setShowDropdown(!showDropdown); // Toggle dropdown visibility
  };

 
  const handleLogout = () => {
    try {
      console.log("logout")
      localStorage.removeItem('token'); // Clear the token from localStorage
      setIsLoggedIn(false); // Set isLoggedIn state to false
      setMenuActive(false); // Close the dropdown menu if open
      setUserName(''); // Clear the userName state
      toast.success("Logged out successfully!"); // Show success message using toast
      console.log("logout");
    } catch (error) {
      console.error('Logout error:', error);
      alert('Error logging out. Please try again.'); // Show an alert for any errors during logout
    }
  };
  

  
  // const handleLogout = async () => {
  //   try {
  //     await newRequest.get(`/auth/logout`);
  //     dispatch(logout());
  //     toast.success("Logged out successfully!");
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Something went wrong!");
  //   }
  // };



  // const handleLogout = () => {
  //   // Clear user session (e.g., remove token from localStorage)
  //   localStorage.removeItem('token');
  
  //   // Update state and close dropdown menu
  //   setIsLoggedIn(false); // Set isLoggedIn to false
  //   setMenuActive(false); // Close the dropdown menu
  
  //   // Optionally clear other user-related states (e.g., userName)
  //   setUserName(''); // Clear userName state if needed
  
  //   alert('User Logged Out');
  // };
  const handleClickBookmarks = async () => {
    try {
      const response = await getBookmarkedStories(); // Assuming getBookmarkedStories fetches bookmarked stories
      setBookmarkedStories(response.data); // Update state with fetched bookmarked stories
      setShowBookmarks(true); // Show the bookmarked stories section
    } catch (error) {
      console.error('Error fetching bookmarked stories:', error);
    }
  };


  const handleSeeMoreClick = () => {
    setShowAllStories(true);
    setExpandedClass('expanded');
  };





  useEffect(() => {
    const fetchUserStories = async () => {
      try {
        const response = await axios.get(`/api/stories/${userId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setUserStories(response.data);
      } catch (error) {
        console.error('Error fetching user stories:', error);
      }
    };

    fetchUserStories();
  }, [userId]); 





  useEffect(() => {
    // Fetch user stories when the component mounts
    fetchUserStories();
  }, []);

  const fetchUserStories = async () => {
    try {
      // Make an API request to fetch user stories
      const response = await axios.get('/api/user-stories', {
        // Optionally pass any headers or parameters needed
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming you use JWT for authentication
        },
      });

      // Update state with fetched user stories
      setUserStories(response.data.stories);
    } catch (error) {
      console.error('Error fetching user stories:', error);
      // Handle error (e.g., show error message to the user)
    }
  };
  return (
    <div>
      <div className="App">
        {screenSize.width < 500 ? (
          <h1>Mobile View</h1>
        ) : (
          <div className={styles.App}>
            <div className={styles.header}>
              <div>
                <h1>SwipStory</h1>
              </div>
              <div>
                {isLoggedIn ? ( // Render different buttons based on login status
                  <>
                    {/* <button className={styles.bookmark}  onClick={() =>bookmarkedStories}>Bookmarks</button> */}
                <div className={styles.user}>
                  <button className={styles.bookmarks}>
                  
                    Bookmarks
                  </button>
            
                    <button className={styles.addStory} onClick={handleClick2}>Add Story</button>
                    <img src={userProfilePhoto} alt="User Profile" className={styles.profilePhoto} /> 
                    {/* Replace "userProfilePhoto" with the actual source for the user's profile photo */}
                     <button className={styles.hamburger} onClick={handleMenuToggle}>☰</button> 
                    

                    {showDropdown && (
                  <div className={`${styles.dropdown} ${menuActive ? styles.active : ''}`}>
                    <p>{userName}</p>
                    <button className={styles.logout} onClick={()=>handleLogout()}>Logout</button>
                  </div>
                  
                )}</div>
                  </>
                ) : (
                  <>
                    <button className={styles.register} onClick={handleClick1}>
                      Register Now
                    </button>
                    <button className={styles.signin} onClick={handleSignInClick}>Sign In</button>
                  </>
                )}
              
              </div>
            </div>

          
              
            <div className={styles.categories}>
              {imageData.map((image, index) => (
                <div key={index} className={styles.imageContainer}>
                  <img
                    src={image.imageUrl}
                    alt={image.name}
                    className={styles.image}
                    onClick={() => handleClick(image.name)}
                  />
                  <div className={styles.overlayText}>{image.name}</div>
                </div>
              ))}
            </div>
            {/* <div className={styles.stories}>
              <h1>Top Stories About food</h1>
              <div className={styles.stories1}>
                <span>No stories Available</span>
              </div>
            </div>
            <div className={styles.stories}>
              <h1>Top Stories About Medical</h1>
              <div className={styles.stories1}>
                <span>No stories Available</span>
              </div>
            </div> */}
            {isLoggedIn && userStories.length > 0 && (
        <div className={styles.stories}>
          <h1>Your Stories</h1>
          <div className={styles.stories1}>
            {userStories.map((story, index) => (
              <div key={index} className={styles.storyCard}>
                {/* Render your story card component */}
                <div className={styles.imageContainer}>
                  <img
                    src={story.imageUrl || 'placeholder.jpg'}
                    alt={story.heading}
                    className={styles.storyImage}
                    onClick={() => handleClickViewStory(story)}
                  />
                  <div className={styles.overlay}>
                    <h3>{story.heading}</h3>
                    <p>{story.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}


            <div className={styles.stories} >
              <h1>Top Stories About food</h1>
              <div className={styles.stories1}>
                {stories.filter(story => story.category === 'food').length > 0 ? (
                  stories
                    .filter(story => story.category === 'food')
                    .slice(0, showAllStories ? stories.length : 4)
                    .map((story, index) => (
                      <div key={index} className={styles.storyCard}>
                      <div className={styles.imageContainer}>
              <img
                src={story.imageUrl || 'placeholder.jpg'}
                alt={story.heading}
                className={styles.storyImage}
                onClick={() => handleClickViewStory(story)}
              />
              <div className={styles.overlay}>
                <h3>{story.heading}</h3>
                <p>{story.description}</p>
              </div>
              
              </div>
              <button className={styles.seeMoreButton} onClick={handleSeeMoreClick}>
            See More
          </button>
                      </div>
                      
                    ))
            
                ) : (
                  <span>No stories Available</span>
                )}

              </div>
            </div>
            <div className={styles.stories}>
              <h1>Top Stories About Medical</h1>
              <div className={styles.stories1}>
                {stories.filter(story => story.category === 'medical').length > 0 ? (
                  stories
                    .filter(story => story.category === 'medical')
                    .map((story, index) => (
                      <div key={index} className={styles.storyCard}>
                      <div className={styles.imageContainer}>
              <img
                src={story.imageUrl || 'placeholder.jpg'}
                alt={story.heading}
                className={styles.storyImage}
                onClick={() => handleClickViewStory(story)}
              />
              <div className={styles.overlay}>
                <h3>{story.heading}</h3>
                <p>{story.description}</p>
              </div>
                      </div>
                      </div>
                    ))
                ) : (
                  <span>No stories Available</span>
                )}
              </div>
            </div>
          

            <div className={styles.stories}>
              <h1>Top Stories About travel</h1>
              <div className={styles.stories1}>
                {stories.filter(story => story.category === 'travel').length > 0 ? (
                  stories
                    .filter(story => story.category === 'travel')
                    .map((story, index) => (
                      <div key={index} className={styles.storyCard}>
                      <div className={styles.imageContainer}>
              <img
                src={story.imageUrl || 'placeholder.jpg'}
                alt={story.heading}
                className={styles.storyImage}
                onClick={() => handleClickViewStory(story)}
              />
              <div className={styles.overlay}>
                <h3>{story.heading}</h3>
                <p>{story.description}</p>
              </div></div>
                      </div>
                    ))
                ) : (
                  <span>No stories Available</span>
                )}
              </div>
            </div>
            <div className={styles.stories}>
              <h1>Top Stories About Movie</h1>
              <div className={styles.stories1}>
                {stories.filter(story => story.category === 'movie').length > 0 ? (
                  stories
                    .filter(story => story.category === 'movie')
                    .map((story, index) => (
                      <div key={index} className={styles.storyCard}>
                      <div className={styles.imageContainer}>
              <img
                src={story.imageUrl || 'placeholder.jpg'}
                alt={story.heading}
                className={styles.storyImage}
                onClick={() => handleClickViewStory(story)}
              />
              <div className={styles.overlay}>
                <h3>{story.heading}</h3>
                <p>{story.description}</p>
              </div>
              </div>
                      </div>
                    ))
                ) : (
                  <span>No stories Available</span>
                )}
              </div>
            </div>
          

            <div className={styles.stories}>
              <h1>Top Stories About world</h1>
              <div className={styles.stories1}>
                {stories.filter(story => story.category === 'education').length > 0 ? (
                  stories
                    .filter(story => story.category === 'education')
                    .map((story, index) => (
                      <div key={index} className={styles.storyCard}>
                      <div className={styles.imageContainer}>
              <img
                src={story.imageUrl || 'placeholder.jpg'}
                alt={story.heading}
                className={styles.storyImage}
                onClick={() => handleClickViewStory(story)}
              />
              <div className={styles.overlay}>
                <h3>{story.heading}</h3>
                <p>{story.description}</p>
              </div></div>
                      </div>
                    ))
                ) : (
                  <span>No stories Available</span>
                )}
              </div>
            </div>
            <div className={styles.stories}>
              <h1>Top Stories About Health</h1>
              <div className={styles.stories1}>
                {stories.filter(story => story.category === 'health').length > 0 ? (
                  stories
                    .filter(story => story.category === 'health')
                    .map((story, index) => (
                      <div key={index} className={styles.storyCard}>
                      <div className={styles.imageContainer}>
              <img
                src={story.imageUrl || 'placeholder.jpg'}
                alt={story.heading}
                className={styles.storyImage}
                onClick={() => handleClickViewStory(story)}
              />
              <div className={styles.overlay}>
                <h3>{story.heading}</h3>
                <p>{story.description}</p>
              </div>
              </div>
                      </div>
                    ))
                ) : (
                  <span>No stories Available</span>
                )}
              </div>
            </div>
          
          

            {stories.filter(story => story.category === selectedCategory).length > 0 ? (
  stories
    .filter(story => story.category === selectedCategory)
    .map((story, index) => (
      <div key={index} className={styles.storyCard}>
        {/* Render your story card component */}
        <div className={styles.imageContainer}>
          <img
            src={story.imageUrl || 'placeholder.jpg'}
            alt={story.heading}
            className={styles.storyImage}
            onClick={() => handleClickViewStory(story)}
          />
          <div className={styles.overlay}>
            <h3>{story.heading}</h3>
            <p>{story.description}</p>
          </div>
        </div>
      </div>
    ))
  ) : (
    <span>No stories Available</span>
  )}

            


          </div>
          
          
        )}
        
        
      </div>
        
        






      {openModal &&<Register onClose={handleCloseModal}/>}
       {/* (
        <div className={styles.modalContainer}>
          <div className={styles.modalBackground} />
          <div className={styles.modalContent} >
            <Register />
          </div>
        </div>
      )} */}

      {showLoginForm && 
          <div className={styles.loginoverlay}>
          <div className={styles.logincontainer}>
            {/* <button className={styles.closelogin} onClick={handleCloseLoginForm}>
              &times;
            </button>  */}
          <Login onClose={handleCloseLoginForm} setIsLoggedIn={setIsLoggedIn} setUserName={setUserName}/>
           </div>
        </div> } 
        
        {openStoryModal && <Story onSubmit={handleAddStory} onClose={handleCloseStory}/>}


        {selectedStory && (
        <StoryDisplay story={selectedStory} onClose={() => setSelectedStory(null)} />
      )}
      


      {!showAllStories && (
          <button className={styles.seeMoreButton} onClick={() => setShowAllStories(true)}>
            See More
          </button>)}


          {bookmarkedStories && <Bookmark onclose={() => setBookmarkedStories(false)} />}
          {/* <Bookmarks handleClickViewStory={handleClickViewStory} /> */}
    </div>
  );
}

export default Main;
