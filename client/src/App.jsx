// -------------------- PACKAGE IMPORT FILES -------------------- //
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// -------------------- Importing Other Files -------------------- //
import Header from './components/layout/Header.jsx';
import LeaderboardPage from './pages/LeaderboardPage.jsx';
import UserHistoryPage from './pages/UserHistoryPage.jsx';
import Container from './components/layout/Container.jsx';

function App() {
  return (
    <Router>
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<LeaderboardPage />} />
          <Route path="/history/:userId" element={<UserHistoryPage />} />
          <Route path='/leaderboard' element={<LeaderboardPage />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;