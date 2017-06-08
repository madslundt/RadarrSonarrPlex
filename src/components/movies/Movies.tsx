import * as React from 'react';
import { inject, observer } from 'mobx-react';
import MoviesStore from "./MoviesStore";
import ApiStatus from '../../infrastructure/api/apiStatus';
import Movie from './movie/Movie';
import {MediaList, MediaElement, Center, Error, Button} from '../media/MediaStyles';
import TopbarStore, {TOPBAR_STORE} from "../topbar/TopbarStore";
import {autorun} from "mobx";

interface IProps {
    store: MoviesStore
}

@inject(TOPBAR_STORE) @observer
class Movies extends React.Component<IProps, void> {
    private MoviesStore: MoviesStore;
    private TopbarStore: TopbarStore;

    constructor(props: IProps & {TOPBAR_STORE: TopbarStore}) {
        super(props);

        this.update = this.update.bind(this);

        this.MoviesStore = props.store;
        this.TopbarStore = props[TOPBAR_STORE];
    }

    update() {
        this.MoviesStore.fetchMovies();
    }

    componentWillMount() {
        autorun(() => {
            this.MoviesStore.setMonthOffset(this.TopbarStore.monthOffset);
        });
    }


    private _renderRequest() {
        return <Center>Requesting...</Center>;
    }
    private _renderSuccess() {
        const { movies } = this.MoviesStore;

        if (!movies || !movies.length) {
            return <Center>No movies in {this.TopbarStore.currentMonth}</Center>;
        } else {
            return (
                <MediaList>
                    {movies.map(movie =>
                        <MediaElement key={movie.id}>
                            <Movie movie={movie} />
                        </MediaElement>
                    )}
                </MediaList>
            );
        }
    }
    private _renderError() {
        const { error } = this.MoviesStore;
        return (
            <Center>
                <p>Error retrieving movies.</p>
                {!!error ? <div><Error>{error}</Error></div> : ''}
                <Button className="btn btn-lg btn-default" onClick={this.update}>Try again</Button>
            </Center>
        );
    }

    render() {
        const { apiStatus } = this.MoviesStore;

        switch (apiStatus) {
            case ApiStatus.Request:
                return this._renderRequest();
            case ApiStatus.Success:
                return this._renderSuccess();
            default:
                return this._renderError();
        };
    }
}

export default Movies;