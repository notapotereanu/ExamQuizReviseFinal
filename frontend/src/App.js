import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import CourseInformation from './components/CourseInformation/CourseInformation';
import CourseSelection from './components/CourseSelection/CourseSelection';
import QuizCreation from './components/QuizCreation/QuizCreation';
import QuizResponse from './components/QuizResponse/QuizResponse';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import UserPage from './components/UserPage/UserPage';
import CreateQuestion from './components/CreateQuestion/CreateQuestion';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courseInformation/:module_id" element={<CourseInformation />} />
        <Route path="/courseSelection" element={<CourseSelection />} />
        <Route path="/quizCreation" element={<QuizCreation />} />
        <Route path="/quizResponse" element={<QuizResponse />} />
        <Route path="/create-question" element={<CreateQuestion />} />
        <Route path="/user/:userId" element={<UserPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}
export default App;