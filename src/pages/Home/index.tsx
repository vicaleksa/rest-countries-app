import Search from '../../components/Search';
import Dropdown from '../../components/Dropdown';
import styles from './style.module.css';
import Countries from '../Countries';

export default function Home() {
    return (
        <div className={styles.home}>
            <Search />
            <Dropdown />
            <Countries />
        </div>
    );
}
