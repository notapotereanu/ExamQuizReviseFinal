import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useNavigate } from 'react-router-dom';

const CourseInformation = () => {

  const navigate = useNavigate();
  return (
    <div>
      <Header />
      <Footer />
    </div>
  );
};

export default CourseInformation;