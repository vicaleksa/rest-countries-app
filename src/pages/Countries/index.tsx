import { useEffect, useState } from 'react';

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
    const [error, setError] = useState<unknown>(null);
    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const response = await fetch('https://restcountries.com/v3.1/all');
                const data = await response.json() as Countries;
                setCountries(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        fetchData();
    }, []);

    const countryElements = countries.map((country) => (
        <div key={country.cca2}>
            <img src={country.flags.png} alt={`Flag of ${country.name.official}`} />
            <h2>{country.name.official}</h2>
            <h3>
                {'Population: '}
                <span>{country.population}</span>
            </h3>
            <h3>
                {'Region: '}
                <span>{country.region}</span>
            </h3>
            <h3>
                {'Capital: '}
                <span>{country.capital}</span>
            </h3>
        </div>
    ));

    return (
        <div>
            {countryElements}
        </div>
    );
}
