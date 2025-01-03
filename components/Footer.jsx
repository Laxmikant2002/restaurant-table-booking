import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.contact}>
                <p>123 Restaurant St, Food City</p>
                <p>Phone: (123) 456-7890</p>
                <p>Email: info@restaurant.com</p>
            </div>
            <div className={styles.social}>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            </div>
            <div className={styles.copyright}>
                <p>&copy; 2023 Restaurant Name. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;