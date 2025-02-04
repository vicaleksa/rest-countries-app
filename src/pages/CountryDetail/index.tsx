import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { IoArrowBack } from 'react-icons/io5';
import { IconContext } from 'react-icons';
import styles from './style.module.css';

const iconSize = { size: '1.125rem' };

interface Currency {
    name: string
}
interface NativeName {
    official: string
    common: string
}

interface Country {
    cca2: string,
    flags: {
        png: string
    },
    name: {
        common: string
        official: string
        nativeName:
        Record<string, NativeName>
    },
    population: number,
    region: string,
    subregion: string,
    tld: [
        string
    ]
    capital: [
        string
    ],
    currencies:
        Record<string, Currency>,
    languages:
        Record<string, string>,
    borders: [
        string
    ]
}
type Countries = Country[]

export default function CountryDetail() {
    const [country, setCountry] = useState<Country>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { id } = useParams();
    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const response = await fetch(`https://restcountries.com/v3.1/alpha/${id}`);
                const data = await response.json() as Countries;
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

    let currencies = '';
    if (country) {
        const currencyNames = (Object.values(country.currencies)).map((curr) => curr.name);
        currencies = currencyNames.join(', ');
    }

    let languages = '';
    if (country) {
        languages = (Object.values(country.languages)).join(', ');
    }

    let nativeNames = '';
    if (country) {
        const commonNames = (Object.values(country.name.nativeName)).map((name) => name.common);
        nativeNames = commonNames.join(', ');
    }

    let borderCountries: React.JSX.Element[] = [];
    if (country?.borders) {
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
            {country && (
                <div className={styles.countryDetail}>
                    <img
                        src={country.flags.png}
                        alt={`Flag of ${country.name.common}`}
                        className={styles.flag}
                    />
                    <div className={styles.countryInfo}>
                        <h2 className={styles.countryName}>{country.name.common}</h2>
                        <div className={styles.mainCountryInfo}>
                            <h3 className={styles.cardTitle}>
                                {'Native Names: '}
                                <span className={styles.cardDescription}>{nativeNames}</span>
                            </h3>
                            <h3 className={styles.cardTitle}>
                                {'Population: '}
                                <span className={styles.cardDescription}>{country.population.toLocaleString()}</span>
                            </h3>
                            <h3 className={styles.cardTitle}>
                                {'Region: '}
                                <span className={styles.cardDescription}>{country.region}</span>
                            </h3>
                            {country.subregion && (
                                <h3 className={styles.cardTitle}>
                                    {'Sub Region: '}
                                    <span className={styles.cardDescription}>{country.subregion}</span>
                                </h3>
                            )}
                            <h3 className={styles.cardTitle}>
                                {'Capital: '}
                                <span className={styles.cardDescription}>{country.capital}</span>
                            </h3>
                        </div>
                        <div className={styles.extraCountryInfo}>
                            <h3 className={styles.cardTitle}>
                                {'Top Level Domain: '}
                                <span className={styles.cardDescription}>{country.tld}</span>
                            </h3>
                            <h3 className={styles.cardTitle}>
                                {'Currencies: '}
                                <span className={styles.cardDescription}>{currencies}</span>
                            </h3>
                            <h3 className={styles.cardTitle}>
                                {'Languages: '}
                                <span className={styles.cardDescription}>{languages}</span>
                            </h3>
                        </div>
                    </div>
                    <div className={styles.borderInfo}>
                        <h4 className={styles.borderTitle}>Border Countries:</h4>
                        {country.borders ? (
                            <div className={styles.borderButtonsContainer}>
                                {borderCountries}
                            </div>
                        )
                            : <span className={styles.cardDescription}>No border countries.</span>}
                    </div>
                </div>
            )}
        </div>
    );
}
