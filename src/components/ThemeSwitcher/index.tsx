import { IoMoonOutline } from 'react-icons/io5';
import { IconContext } from 'react-icons';
import styles from './style.module.css';

const iconSize = { size: '1rem' };

export default function ThemeSwitcher() {
    return (
        <button className={styles.themeButton} type="button">
            <IconContext.Provider value={iconSize}>
                <IoMoonOutline />
            </IconContext.Provider>
            <span>Dark Mode</span>
        </button>
    );
}
