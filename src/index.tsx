import { createRoot } from 'react-dom/client';
// import { BrowserRouter } from 'react-router';

function App() {
    return (
        <h1>Hello World</h1>
    );
}

const rootElement = document.getElementById('root');
if (rootElement) {
    createRoot(rootElement).render(<App />);
} else {
    // eslint-disable-next-line no-console
    console.error('root is not found');
}
