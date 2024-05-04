// bookmarks.js

// Example API function to get bookmarked stories
export const getBookmarkedStories = async () => {
    try {
      const response = await fetch('/api/bookmarks'); 
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching bookmarked stories:', error);
      throw error; 
    }
  };
  
