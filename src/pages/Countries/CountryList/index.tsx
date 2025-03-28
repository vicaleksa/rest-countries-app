import { Link } from 'react-router';
import { Country } from '../../../types';
import styles from './style.module.css';

type CountryListProps = {
    countries: Country[],
}

export default function CountryList({ countries }: CountryListProps) {
    return (
        <div className={styles.countryList}>
            {countries.map((country) => (
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
                            <p className={styles.cardTitle}>
                                {'Population: '}
                                <span className={styles.cardDescription}>{country.population.toLocaleString()}</span>
                            </p>
                            <p className={styles.cardTitle}>
                                {'Region: '}
                                <span className={styles.cardDescription}>{country.region}</span>
                            </p>
                            <p className={styles.cardTitle}>
                                {'Capital: '}
                                <span className={styles.cardDescription}>
                                    {country.capital ? country.capital.join(', ') : '-'}
                                </span>
                            </p>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
}
