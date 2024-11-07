import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StudentList from './components/StudentList';
import StudentSkills from './components/StudentSkills';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StudentList />} />
        <Route path="/skills/:studentCode" element={<StudentSkills />} />
      </Routes>
    </Router>
  );
};

export default App;
