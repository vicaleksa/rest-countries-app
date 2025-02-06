import React from 'react';
import { IoSearch } from 'react-icons/io5';
import { IconContext } from 'react-icons';
import styles from './style.module.css';

export default function Search({ onChange }) {
    return (
        <search className={styles.searchContainer}>
            <form>
                <div className={styles.search}>
                    <IoSearch />
                    <input
                        className={styles.searchInput}
                        type="search"
                        placeholder="Search for a country…"
                        onChange={onChange}
                    />
                </div>
            </form>
        </search>
    );
}
