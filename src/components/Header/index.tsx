import { NavLink } from 'react-router';
import styles from './style.module.css';
import ThemeSwitcher from '../ThemeSwitcher';

export default function Header() {
    return (
        <header className={styles.header}>
            <NavLink
                to="/"
                className={styles.logo}
            >
                Where in the world?
            </NavLink>
            <ThemeSwitcher />
        </header>
    );
}
