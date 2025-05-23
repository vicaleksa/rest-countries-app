import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { IoArrowBack } from 'react-icons/io5';
import { IconContext } from 'react-icons';
import styles from './style.module.css';
import { Country } from '../../types';

const iconSize = { size: '1.125rem' };

export default function CountryDetail() {
    const [country, setCountry] = useState<Country>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { id } = useParams<{id: string}>();
    useEffect(() => {
        async function fetchData() {
            if (!id) {
                throw new Error('Id is not defined');
            }
            setLoading(true);
            try {
                const response = await fetch(`https://restcountries.com/v3.1/alpha/${id}`);
                const data = await response.json() as Country[];
                setCountry(data[0]);
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
    }, [id]);

    if (error) {
        return (
            <h1>
                There was an error:
                {error}
            </h1>
        );
    }

    if (loading || !country) {
        return <h1>Loading...</h1>;
    }

    let nativeNames = '';
    if (country.name.nativeName) {
        const commonNames = (Object.values(country.name.nativeName)).map((name) => name.common);
        nativeNames = commonNames.join(', ');
    } else {
        nativeNames = '-';
    }

    let subregion = '';
    if (country.subregion) {
        subregion = country.subregion;
    } else {
        subregion = '-';
    }

    let capitals = '';
    if (country.capital) {
        capitals = country.capital.join(', ');
    } else {
        capitals = '-';
    }

    let domains = '';
    if (country.tld) {
        domains = country.tld.join(' ');
    } else {
        domains = '-';
    }

    let currencies = '';
    if (country.currencies) {
        const currencyNames = (Object.values(country.currencies)).map((curr) => curr.name);
        currencies = currencyNames.join(', ');
    } else {
        currencies = '-';
    }

    let languages = '';
    if (country.languages) {
        languages = (Object.values(country.languages)).join(', ');
    } else {
        languages = '-';
    }

    let borderCountries: React.JSX.Element[] = [];
    if (country.borders) {
        borderCountries = country.borders.map((borderCountry) => (
            <Link
                to={`/${borderCountry}`}
                className={styles.bordersButton}
                key={borderCountry}
            >
                {borderCountry}
            </Link>
        ));
    }

    return (
        <div className={styles.countryDetailContainer}>
            <Link
                to=".."
                relative="path"
                className={styles.backButton}
            >
                <IconContext.Provider value={iconSize}>
                    <IoArrowBack />
                </IconContext.Provider>
                <span>Back</span>
            </Link>
            <div className={styles.countryDetail}>
                <div className={styles.flagContainer}>
                    <img
                        src={country.flags.png}
                        alt={`Flag of ${country.name.common}`}
                        className={styles.flag}
                    />
                </div>
                <div className={styles.countryInfo}>
                    <h2 className={styles.countryName}>{country.name.common}</h2>
                    <div className={styles.countryInfoFirst}>
                        <p className={styles.cardTitle}>
                            {'Native Names: '}
                            <span className={styles.cardDescription}>{nativeNames}</span>
                        </p>
                        <p className={styles.cardTitle}>
                            {'Population: '}
                            <span className={styles.cardDescription}>
                                {country.population.toLocaleString()}
                            </span>
                        </p>
                        <p className={styles.cardTitle}>
                            {'Region: '}
                            <span className={styles.cardDescription}>{country.region}</span>
                        </p>
                        <p className={styles.cardTitle}>
                            {'Sub Region: '}
                            <span className={styles.cardDescription}>{subregion}</span>
                        </p>
                        <p className={styles.cardTitle}>
                            {'Capital: '}
                            <span className={styles.cardDescription}>{capitals}</span>
                        </p>
                    </div>
                    <div className={styles.countryInfoSecond}>
                        <p className={styles.cardTitle}>
                            {'Top Level Domain: '}
                            <span className={styles.cardDescription}>{domains}</span>
                        </p>
                        <p className={styles.cardTitle}>
                            {'Currencies: '}
                            <span className={styles.cardDescription}>{currencies}</span>
                        </p>
                        <p className={styles.cardTitle}>
                            {'Languages: '}
                            <span className={styles.cardDescription}>{languages}</span>
                        </p>
                    </div>
                    <div className={styles.borderInfo}>
                        <h3 className={styles.borderTitle}>Border Countries:</h3>
                        {
                            country.borders
                                ? (
                                    <div className={styles.borderButtonsContainer}>
                                        {borderCountries}
                                    </div>
                                )
                                : <span className={styles.cardDescription}>No border countries.</span>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
