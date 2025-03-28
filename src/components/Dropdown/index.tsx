import { IoChevronDown, IoCloseCircle } from 'react-icons/io5';
import { IconContext } from 'react-icons';
import clsx from 'clsx';
import styles from './style.module.css';

const iconSize = { size: '1rem' };
const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

type ButtonProps = {
    onChange: (region: string) => void;
    regionFilter: string;
    setRegionFilter: (region: string) => void;
    isOpenDropdown: boolean;
    openDropdown: () => void;
    closeDropdown: () => void;
}

export default function Dropdown({
    onChange,
    regionFilter,
    setRegionFilter,
    isOpenDropdown,
    openDropdown,
    closeDropdown,
}: ButtonProps) {
    return (
        <div className={styles.dropdown}>
            {!regionFilter
                ? (
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
                )
                : (
                    <button
                        className={clsx(
                            styles.dropdownButton,
                            styles.filterSelected,
                        )}
                        type="button"
                        onClick={openDropdown}
                    >
                        <span>{regionFilter}</span>
                        <IconContext.Provider value={iconSize}>
                            <IoCloseCircle onClick={() => { setRegionFilter(''); }} />
                        </IconContext.Provider>
                    </button>
                )}
            {/* eslint-disable-next-line */}
            {isOpenDropdown && <div className={styles.backdrop} onClick={closeDropdown}/>}
            <div className={clsx(
                styles.dropdownContent,
                { [styles.openDropdown]: isOpenDropdown },
            )}
            >
                {regions.map((region) => (
                    <button
                        type="button"
                        className={styles.filterButton}
                        onClick={() => { onChange(region); }}
                    >
                        {region}
                    </button>
                ))}
            </div>
        </div>
    );
}
