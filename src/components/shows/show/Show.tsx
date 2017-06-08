import * as React from 'react';
import Poster from '../../poster/Poster';
import {IShow, isAvailable} from '../ShowsStore';
import {MediaInfo} from '../../media/MediaStyles';
import * as moment from 'moment';
import * as momentTZ from 'moment-timezone';

interface IProps {
    show: IShow;
}

const Show = (props: IProps) => {
    const { show } = props;
    const available = isAvailable(show.airDateUtc);

    let content;
    if (!available) {
        content = getHumanTime(show.airDateUtc);
    }

    return (
        <div>
            <Poster
                isAvailable={available}
                status={show.series.status}
                images={show.series.images}
                downloaded={show.hasFile}
                content={content}
            />
            <MediaInfo>
                <p className="title episode-title"
                    title={show.title}>
                        <span className="episode-number">{getAtleastTwoDigitNumber(show.seasonNumber)}x{getAtleastTwoDigitNumber(show.episodeNumber)}</span>
                        {show.title}
                </p>
                <p className="title">{show.series.title}</p>
            </MediaInfo>
        </div>
    );
};

const getAtleastTwoDigitNumber = (number: number): string => {
    if (number > 9) {
        return number.toString();
    } else {
        const result = ("0" + number).slice(-2);

        return result;
    }
}

const getHumanTime = (dateString: string) => {
    const date = momentTZ.tz(dateString, momentTZ.tz.guess());

    if (moment().diff(date, 'month') >= 0) {
        return moment(date).fromNow();
    } else {
        return date.format('dddd D.');
    }
}


export default Show;