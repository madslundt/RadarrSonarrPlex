import * as React from 'react';
import Movies from '../components/movies/Movies';
import Shows from '../components/shows/Shows';
import ShowsStore from '../components/shows/ShowsStore';
import MoviesStore from '../components/movies/MoviesStore';
import Topbar from '../components/topbar/Topbar';
import styled from 'styled-components';


const HomePage = () => (
    <div>
        <Topbar />

        <MediaContainer>
            <h2>Tv Shows</h2>
            <Shows store={new ShowsStore()} />
        </MediaContainer>

        <MediaContainer>
            <h2>Movies</h2>
            <Movies store={new MoviesStore()} />
        </MediaContainer>
    </div>
);

const MediaContainer = styled.div`
    &>h2 {
        text-transform: uppercase;
        letter-spacing: 1px;
        font-size: 16px;
    }
`;
export default HomePage;