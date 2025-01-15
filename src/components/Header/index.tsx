import { Link } from 'react-router';
import styles from './style.module.css';
import ThemeSwitcher from '../ThemeSwitcher';

export default function Header() {
    return (
        <header className={styles.header}>
            <Link className={styles.logo} to="/">Where in the world?</Link>
            <ThemeSwitcher />
        </header>
    );
}
