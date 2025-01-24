import { IoSearch } from 'react-icons/io5';
import { IconContext } from 'react-icons';
import styles from './style.module.css';

const iconColor = { color: 'var(--clr-input)' };

export default function Search() {
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
