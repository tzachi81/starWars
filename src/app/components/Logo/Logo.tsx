import React from 'react';
import classes from './Logo.module.scss';

interface ILogoProps {
  imageUrl: string;
}

export const Logo: React.FC<ILogoProps> = ({ imageUrl }) => {
  return (
    <div>
      <img className={classes.logo} src={imageUrl} alt="Star wars logo" />
    </div>
  );
};