import React from 'react';
import './App.css';
import BurnPage from './pages/Burnpage';

/**
 * Main component representing the entire application.
 * @returns {JSX.Element} - JSX element representing the entire application.
 */
function App() {
  return (
    <div className="app-container">
      <BurnPage />
    </div>
  );
}

export default App;
