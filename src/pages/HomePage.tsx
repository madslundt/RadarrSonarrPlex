import * as React from 'react';
import Movies from '../components/movies/Movies';
import Shows from '../components/shows/Shows';
import ShowsStore from '../components/shows/ShowsStore';
import MoviesStore from '../components/movies/MoviesStore';
import Topbar from '../components/topbar/Topbar';
import styled from 'styled-components';
import {RouteComponentProps} from "react-router-dom";
import { getOptions } from '../infrastructure/Storage';
import Filter from '../components/topbar/Filter';

class HomePage extends React.Component<RouteComponentProps<{}>, any> {
    private _moviesStore: MoviesStore;
    private _showsStore: ShowsStore;

    constructor(props: RouteComponentProps<{}>) {
        super(props);

        this.state = {
            options: null
        };

        this._moviesStore = new MoviesStore();
        this._showsStore = new ShowsStore();
    }

    componentDidMount() {
        getOptions().then((options: any) => {
            this.setState({
                options
            });
        });
    }

    private _renderShows() {
        const { options } = this.state;
        if (options && options.api && options.api.sonarr_enabled) {
            return (
                <MediaContainer>
                    <h2>Tv Shows</h2>
                    <Shows store={this._showsStore} />
                </MediaContainer>
            )
        } else {
            return '';
        }
    }

    private _renderMovies() {
        const { options } = this.state;
        if (options && options.api && options.api.radarr_enabled) {
            return (
                <MediaContainer>
                    <h2>Movies</h2>
                    <Movies store={this._moviesStore} />
                </MediaContainer>
            );
        } else {
            return '';
        }
    }

    render() {
        console.log(this.state);
        return (
            <div>
                <Topbar />
                <Filter />
                {this._renderShows()}
                {this._renderMovies()}
            </div>
        );
    }
}

const MediaContainer = styled.div`
    &>h2 {
        text-transform: uppercase;
        letter-spacing: 1px;
        font-size: 16px;
    }
`;
export default HomePage;