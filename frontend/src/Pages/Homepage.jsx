import React from 'react'
import Main from '../components/main/Main';

function HomePage() {
  return (
    <div style={{ display: 'flex' }}>
      <Main/>
    </div>
  )
}

export default HomePage





// import React from 'react';
// import { BrowserRouter as Routes, Route, Router } from 'react-router-dom';
// import Main from '../components/main/Main';
// import BookmarkPage from '../components/bookmarks/Bookmarks';

// function HomePage() {
//   return (
//     <Router>
//     <Routes>
      
//     <Route exact path="/" element={<Main />} /> {/* Use 'element' instead of 'component' */}
//         <Route path="/bookmarks" element={<BookmarkPage />} /> {/* Use 'element' instead of 'component' */}
      
//     </Routes>
//     </Router>
//   );
// }

// export default HomePage;
