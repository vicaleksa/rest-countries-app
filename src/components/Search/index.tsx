import React from 'react';
import { IoSearch } from 'react-icons/io5';
import styles from './style.module.css';

export default function Search({ onChange }) {
    return (
        <search>
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
