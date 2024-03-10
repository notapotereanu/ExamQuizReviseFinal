import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import CourseInformation from './components/CourseInformation/CourseInformation';
import CourseSelection from './components/CourseSelection/CourseSelection';
import ModuleResponse from './components/QuizResponse/ModuleResponse';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import UserPage from './components/UserPage/UserPage';
import CreateQuestion from './components/CreateQuestion/CreateQuestion';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />--ok
        <Route path="/courseInformation/:module_id" element={<CourseInformation />} /> --klara
        <Route path="/courseSelection" element={<CourseSelection />} /> --klara
        <Route path="/moduleResponse/:module_id/:module_difficulty/:question_id?" element={<ModuleResponse />} />
        <Route path="/create-question" element={<CreateQuestion />} />--ok
        <Route path="/user/:userId" element={<UserPage />} />--ok
      </Routes>
      <Footer />
    </Router> 
  );
}
export default App;