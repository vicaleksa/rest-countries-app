import
    React, {
    createContext,
    useState,
    useCallback,
    useContext,
    useEffect,
    PropsWithChildren,
    useMemo,
} from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextValue {
    theme: Theme,
    toggleTheme: () => void,
}

const ThemeContext = createContext<ThemeContextValue>({
    theme: 'light',
    toggleTheme: () => {},
});

export function ThemeProvider({ children }: PropsWithChildren) {
    const [theme, setTheme] = useState<Theme>('light');

    useEffect(() => {
        let savedTheme = localStorage.getItem('theme');
        if (savedTheme !== 'light' && savedTheme !== 'dark') {
            savedTheme = 'light';
        }
        setTheme(savedTheme as Theme);
        document.body.className = savedTheme;
    }, []);

    const toggleTheme = useCallback(() => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.body.className = newTheme;
        localStorage.setItem('theme', newTheme);
    }, [theme]);

    const value = useMemo(
        () => ({ theme, toggleTheme }),
        [theme, toggleTheme],
    );

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);
