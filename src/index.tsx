import 'normalize.css';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout';
import Countries from './pages/Countries';
import CountryDetail from './pages/CountryDetail';
import './index.css';

function App() {
    return (
        <ThemeProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Countries />} />
                        <Route path=":id" element={<CountryDetail />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

const rootElement = document.getElementById('root');
if (rootElement) {
    createRoot(rootElement).render(
        <StrictMode>
            <App />
        </StrictMode>,
    );
} else {
    // eslint-disable-next-line no-console
    console.error('root is not found');
}
