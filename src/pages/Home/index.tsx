import Search from '../../components/Search';
import styles from './style.module.css';

export default function Home() {
    return (
        <div className={styles.home}>
            <Search />
        </div>
    );
}
