import type React from 'react';
import styles from './Card.module.css';
import { CardProps } from './types';

export const Card: React.FC<CardProps> = ({ title, children }: CardProps) => {
  return (
    <div className={styles.card}>
      {title && <h2 className={styles.title}>{title}</h2>}
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Card;
