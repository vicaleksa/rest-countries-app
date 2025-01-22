import { IoMoonOutline } from 'react-icons/io5';
import styles from './style.module.css';

export default function ThemeSwitcher() {
    return (
        <button className={styles.themeButton} type="button">
            <IoMoonOutline />
            <span>Dark Mode</span>
        </button>
    );
}
