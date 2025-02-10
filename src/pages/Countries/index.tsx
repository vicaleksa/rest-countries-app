import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import styles from './style.module.css';
import Dropdown from '../../components/Dropdown';
import Search from '../../components/Search';

interface Country {
    cca2: string,
    flags: {
        png: string
    },
    name: {
        common: string
        official: string
    },
    population: number,
    region: string,
    capital?: [
        string
    ]
}
type Countries = Country[]

export default function Countries() {
    const [countries, setCountries] = useState<Countries>([]);
    const [searchFilter, setSearchFilter] = useState('');
    const [regionFilter, setRegionFilter] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isOpenDropdown, setIsOpenDropdown] = useState(false);
    const openDropdown = () => {
        setIsOpenDropdown(true);
    };
    const closeDropdown = () => {
        setIsOpenDropdown(false);
    };
    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const response = await fetch('https://restcountries.com/v3.1/all');
                const data = await response.json() as Countries;
                setCountries(data);
            } catch (e) {
                if (e instanceof Error) {
                    setError(e.message);
                } else {
                    throw e;
                }
            } finally {
                setLoading(false);
            }
        }
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        fetchData();
    }, []);

    const displayedCountries = countries.filter((country) => {
        if (regionFilter && country.region !== regionFilter) {
            return false;
        }
        if (searchFilter && !country.name.common.toLowerCase().includes(searchFilter.toLowerCase())) {
            return false;
        }
        return true;
    });

    const countryElements = displayedCountries.map((country) => (
        <div key={country.cca2} className={styles.countryTile}>
            <Link
                to={country.cca2}
            >
                <img
                    src={country.flags.png}
                    alt={`Flag of ${country.name.common}`}
                    className={styles.flag}
                    loading="lazy"
                />
                <div className={styles.countryInfo}>
                    <h2 className={styles.countryName}>{country.name.common}</h2>
                    <h3 className={styles.cardTitle}>
                        {'Population: '}
                        <span className={styles.cardDescription}>{country.population.toLocaleString()}</span>
                    </h3>
                    <h3 className={styles.cardTitle}>
                        {'Region: '}
                        <span className={styles.cardDescription}>{country.region}</span>
                    </h3>
                    <h3 className={styles.cardTitle}>
                        {'Capital: '}
                        <span className={styles.cardDescription}>
                            {country.capital ? country.capital.join(', ') : '-'}
                        </span>
                    </h3>
                </div>
            </Link>
        </div>
    ));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setSearchFilter(value);
    };

    const handleFilterChange = (region:string) => {
        setRegionFilter(region);
        closeDropdown();
    };

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (error) {
        return (
            <h1>
                There was an error:
                {error}
            </h1>
        );
    }

    return (
        <div className={styles.countryListContainer}>
            <div className={styles.filters}>
                <Search onChange={handleChange} />
                <Dropdown
                    onChange={handleFilterChange}
                    regionFilter={regionFilter}
                    setRegionFilter={setRegionFilter}
                    isOpenDropdown={isOpenDropdown}
                    openDropdown={openDropdown}
                    closeDropdown={closeDropdown}
                />
            </div>
            <div className={styles.countryList}>
                {countryElements}
            </div>
        </div>
    );
}
