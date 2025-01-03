import React from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

const Header = () => {
    return (
        (<header className={styles.header}>
            <div className={styles.logo}>
                <Link href="/">
                    Restaurant Name
                </Link>
            </div>
            <nav className={styles.nav}>
                <Link href="/">
                    Home
                </Link>
                <Link href="/booking">
                    Booking
                </Link>
                <Link href="/menu">
                    Menu
                </Link>
                <Link href="/contact">
                    Contact
                </Link>
            </nav>
        </header>)
    );
};

export default Header;