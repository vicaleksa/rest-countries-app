import { IoChevronDown, IoCloseCircle } from 'react-icons/io5';
import { IconContext } from 'react-icons';
import clsx from 'clsx';
import styles from './style.module.css';

const iconSize = { size: '1rem' };

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
                        onClick={() => { setRegionFilter(''); }}
                    >
                        <span>{regionFilter}</span>
                        <IconContext.Provider value={iconSize}>
                            <IoCloseCircle />
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
                <button
                    type="button"
                    className={styles.filterButton}
                    onClick={() => { onChange('Africa'); }}
                >
                    Africa
                </button>
                <button
                    type="button"
                    className={styles.filterButton}
                    onClick={() => { onChange('Americas'); }}
                >
                    America
                </button>
                <button
                    type="button"
                    className={styles.filterButton}
                    onClick={() => { onChange('Asia'); }}
                >
                    Asia
                </button>
                <button
                    type="button"
                    className={styles.filterButton}
                    onClick={() => { onChange('Europe'); }}
                >
                    Europe
                </button>
                <button
                    type="button"
                    className={styles.filterButton}
                    onClick={() => { onChange('Oceania'); }}
                >
                    Oceania
                </button>
            </div>
        </div>
    );
}
