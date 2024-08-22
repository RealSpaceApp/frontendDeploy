import React from 'react';
import { SvgXml } from 'react-native-svg';

const Events = ({opacity, color}) => {
  const svgContent = `
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path opacity=${opacity} d="M20 16V7H6V16H20ZM20 2C20.5304 2 21.0391 2.21071 21.4142 2.58579C21.7893 2.96086 22 3.46957 22 4V16C22 16.5304 21.7893 17.0391 21.4142 17.4142C21.0391 17.7893 20.5304 18 20 18H6C5.46957 18 4.96086 17.7893 4.58579 17.4142C4.21071 17.0391 4 16.5304 4 16V4C4 3.46957 4.21071 2.96086 4.58579 2.58579C4.96086 2.21071 5.46957 2 6 2H7V0H9V2H17V0H19V2H20ZM2 20H16V22H2C1.46957 22 0.960859 21.7893 0.585786 21.4142C0.210714 21.0391 0 20.5304 0 20V8H2V20ZM18 14H14V10H18V14Z" fill=${color}/>
  </svg>
  `;

  return <SvgXml xml={svgContent} />;
};

export default Events;