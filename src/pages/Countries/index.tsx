import { useEffect, useState } from 'react';
import styles from './style.module.css';

interface Country {
    cca2: string,
    flags: {
        png: string
    },
    name: {
        official: string
    },
    population: number,
    region: string,
    capital: [
        string
    ]
}
type Countries = Country[]

export default function Countries() {
    const [countries, setCountries] = useState<Countries>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
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

    const countryElements = countries.map((country) => (
        <div key={country.cca2} className={styles.countryTile}>
            <img
                src={country.flags.png}
                alt={`Flag of ${country.name.official}`}
                className={styles.flag}
                loading="lazy"
            />
            <div className={styles.countryInfo}>
                <h2 className={styles.countryName}>{country.name.official}</h2>
                <h3 className={styles.cardTitle}>
                    {'Population: '}
                    <span className={styles.cardDescription}>{country.population}</span>
                </h3>
                <h3 className={styles.cardTitle}>
                    {'Region: '}
                    <span className={styles.cardDescription}>{country.region}</span>
                </h3>
                <h3 className={styles.cardTitle}>
                    {'Capital: '}
                    <span className={styles.cardDescription}>{country.capital}</span>
                </h3>
            </div>
        </div>
    ));

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
        <div className={styles.countryList}>
            {countryElements}
        </div>
    );
}
