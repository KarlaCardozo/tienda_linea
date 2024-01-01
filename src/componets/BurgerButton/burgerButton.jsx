import React, { useState } from 'react';
import './BurgerButton.css';

const BurgerButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`burger-button ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
      <div className="bar"></div>
      <div className="bar"></div>
      <div className="bar"></div>
    </div>
  );
};

export default BurgerButton;
