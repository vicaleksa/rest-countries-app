import { IoSearch } from 'react-icons/io5';
import { IconContext } from 'react-icons';
import { useMemo } from 'react';
import styles from './style.module.css';

export default function Search() {
    const iconColor = useMemo(() => ({ color: 'var(--clr-input)' }), []);

    return (
        <search>
            <form>
                <div className={styles.search}>
                    <IconContext.Provider value={iconColor}>
                        <IoSearch />
                    </IconContext.Provider>
                    <input
                        className={styles.searchInput}
                        type="search"
                        placeholder="Search for a country…"
                    />
                </div>
            </form>
        </search>
    );
}
