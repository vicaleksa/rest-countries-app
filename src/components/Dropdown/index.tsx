import { IoChevronDown } from 'react-icons/io5';
import { IconContext } from 'react-icons';
import { useState } from 'react';
import clsx from 'clsx';
import styles from './style.module.css';

const iconSize = { size: '0.75rem' };

export default function Dropdown() {
    const [open, setOpen] = useState(false);

    const openDropdown = () => {
        setOpen(true);
    };

    const closeDropdown = () => {
        setOpen(false);
    };

    return (
        <div className={styles.dropdown}>
            <button
                className={styles.dropdownButton}
                type="button"
                onClick={openDropdown}
            >
                <span>Filter by Region</span>
                <IconContext.Provider value={iconSize}>
                    <IoChevronDown />
                </IconContext.Provider>
            </button>
            {/* eslint-disable-next-line */}
            {open && <div className={styles.backdrop} onClick={closeDropdown}/>}
            <div className={clsx(
                styles.dropdownContent,
                { [styles.openDropdown]: open },
            )}
            >
                <button className={styles.filterButton} type="button">Africa</button>
                <button type="button" className={styles.filterButton}>America</button>
                <button type="button" className={styles.filterButton}>Asia</button>
                <button type="button" className={styles.filterButton}>Europe</button>
                <button type="button" className={styles.filterButton}>Oceania</button>
            </div>
        </div>
    );
}
