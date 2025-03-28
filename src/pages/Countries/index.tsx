import { useEffect, useState } from 'react';
import styles from './style.module.css';
import Dropdown from '../../components/Dropdown';
import Search from '../../components/Search';
import { Country } from '../../types';
import CountryList from './CountryList';

export default function Countries() {
    const [countries, setCountries] = useState<Country[]>([]);
    const [searchFilter, setSearchFilter] = useState('');
    const [regionFilter, setRegionFilter] = useState('');
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
                const data = await response.json() as Country[];
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

    const displayedCountries = countries.filter((country) => {
        if (regionFilter && country.region !== regionFilter) {
            return false;
        }
        if (searchFilter && !country.name.common.toLowerCase().includes(searchFilter.toLowerCase())) {
            return false;
        }
        return true;
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setSearchFilter(value);
    };

    const handleFilterChange = (region:string) => {
        setRegionFilter(region);
        closeDropdown();
    };

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
            <CountryList countries={displayedCountries} />
        </div>
    );
}
