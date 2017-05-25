import * as React from 'react';
import Routes from './Routes';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

const App = () => (
    <div>
        <Header />
        <Routes />
        <Footer />
    </div>
);

export default App;