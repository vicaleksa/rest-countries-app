import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import Layout from './components/Layout';
import Home from './pages/Home';
import './index.css';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                </Route>
            </Routes>
        </BrowserRouter>
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
