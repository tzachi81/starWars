import React from 'react';
import classes from './Logo.module.scss';
import { Segment } from 'semantic-ui-react';

interface ILogoProps {
  imageUrl: string;
}

export const Logo: React.FC<ILogoProps> = ({ imageUrl }) => {
  return (
    <Segment basic>
      <img className={classes.logo} src={imageUrl} alt="Star wars logo" />
    </Segment>
  );
};