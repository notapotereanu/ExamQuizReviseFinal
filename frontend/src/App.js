import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import CourseInformation from './components/CourseInformation/CourseInformation';
import CourseSelection from './components/CourseSelection/CourseSelection';
import QuizCreation from './components/QuizCreation/QuizCreation';
import QuizResponse from './components/QuizResponse/QuizResponse';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courseInformation" element={<CourseInformation />} />
        <Route path="/courseSelection" element={<CourseSelection />} />
        <Route path="/quizCreation" element={<QuizCreation />} />
        <Route path="/quizResponse" element={<QuizResponse />} />
      </Routes>
    </Router>
  );
}

export default App;