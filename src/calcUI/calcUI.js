import React from 'react';
import CalcLogic from '../calcLogic/calcLogic';
import './calcUI.css';


const CalcLayout = () => {
  return (
    <div>
      <CalcLogic className="Calculator" />
    </div>
  )
}

export default CalcLayout;
