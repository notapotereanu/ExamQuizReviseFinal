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
        <Route path="/" element={<HomePage />} />                                     -- Andrian
        <Route path="/courseInformation/:courseId" element={<CourseInformation />} /> -- Klara   TODO ()
        <Route path="/courseSelection" element={<CourseSelection />} />               -- Klara   TODO (To link the user and gather information about courses)
        <Route path="/quizResponse" element={<QuizResponse />} />                     -- Andrian TODO (To initialize)
        <Route path="/create-question" element={<CreateQuestion />} />                -- Burce   TODO (To link the user)
        <Route path="/user/:userId" element={<UserPage />} />                         -- Andrian
      </Routes>
      <Footer />
    </Router>
  );
}
export default App;