


import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Bookmarks.module.css";
//import NoBookmarkImage from "../../assets/NoBookmarkImage.png";
//import Story from "../Story/Story";
import { Link } from "react-router-dom";

const Bookmark = () => {
  const [bookmarkedStories, setBookmarkedStories] = useState([]);
  const [seeMoreBookmarked, setSeeMoreBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarkedStories = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.get(
          "http://localhost:3000/api/v1/story/bookmarked"
        );
        setBookmarkedStories(response.data.bookmarkedStories);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bookmarked stories:", error);
        setLoading(false);
      }
    };
    fetchBookmarkedStories();
  }, []);

  const handleSeeMore = () => {
    setSeeMoreBookmarked((prevSeeMore) => !prevSeeMore);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.bookmarkContainer}>
      <div className={styles.bookmarkHeader}>Your Bookmarks</div>
      <div className={styles.storyContainer}>
        {bookmarkedStories.length > 0 ? (
          bookmarkedStories
            .slice(0, seeMoreBookmarked ? bookmarkedStories.length : 4)
            .map((story) => (
              {/* <Story
                key={story._id}
                story={story}
                handleSeeMore={handleSeeMore}
              /> */}
            ))
        ) : (
          <div className={styles.noBookmarkContainer}>
            <div className={styles.noBookmarkText}>
              You have no bookmarks!
            </div>
            {/* <img
              src={NoBookmarkImage}
              alt="No Bookmark"
              className={styles.noBookmarkImage}
            /> */}
          </div>
        )}
      </div>
      {bookmarkedStories.length > 4 && (
        <div className={styles.seeMoreButton} onClick={handleSeeMore}>
          {seeMoreBookmarked ? "See Less" : "See More"}
        </div>
      )}
      <div className={styles.backToHomeBtnContainer}>
        <Link to="/">
          <button className={styles.backToHomeBtn}>Back to Home</button>
        </Link>
      </div>
    </div>
  );
};

export default Bookmark;
