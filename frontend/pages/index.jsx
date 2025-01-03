import React from 'react';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

const Home = () => {
  return (
    (<div className={styles.container}>
      <h1 className={styles.heading}>Welcome to Our Restaurant</h1>
      <p className={styles.description}>Book your table now!</p>
      <Link href="/booking" className={styles.button}>
        Go to Booking
      </Link>
    </div>)
  );
};

export default Home;