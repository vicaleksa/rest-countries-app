import React from 'react';
import { IoMoonOutline, IoSunny } from 'react-icons/io5';
import { IconContext } from 'react-icons';
import styles from './style.module.css';
import { useTheme } from '../../contexts/ThemeContext';

const iconSize = { size: '1rem' };

export default function ThemeSwitcher() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button className={styles.themeButton} type="button" onClick={toggleTheme}>
            <IconContext.Provider value={iconSize}>
                {theme === 'light' ? <IoMoonOutline /> : <IoSunny />}
            </IconContext.Provider>
            <span>
                {theme === 'light' ? 'Dark ' : 'Light '}
                Mode
            </span>
        </button>
    );
}
