import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

const Headbar: React.FC = () => {
    return (
        <header style={styles.header} className='z-10 fixed mb-[30px] w-full'>
            {/* <h1 style={styles.title}>Custom Spotify</h1> */}
            <Image
                src="/globe.svg"
                alt="Logo"
                width={100}
                height={50}
                style={{ marginRight: '20px' }}
            />
            <nav style={styles.nav}>
                <Link href="/mylist"> MyList </Link>
                <a href="#home" style={styles.link}>Home</a>
                <a href="#about" style={styles.link}>About</a>
                <a href="#contact" style={styles.link}>Contact</a>
            </nav>
        </header>
    );
};

const styles = {
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 40px',
        backgroundColor: '#1DB954',
        color: '#fff',
    },
    title: {
        margin: 0,
        fontSize: '24px',
    },
    nav: {
        display: 'flex',
        gap: '15px',
    },
    link: {
        color: '#fff',
        textDecoration: 'none',
        fontSize: '16px',
    },
};

export default Headbar;