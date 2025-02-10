import { IoSearch } from 'react-icons/io5';
import styles from './style.module.css';

type InputProps = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Search({ onChange }: InputProps) {
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
