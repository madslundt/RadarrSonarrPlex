import Counter from '../pages/CounterPage';
import Routes from './Routes';
import Header from './Header';
import Footer from './Footer';
import * as React from 'react';

const App = () => (
    <div>
        <Header />
        <Counter />
        <Footer />
    </div>
);

export default App;