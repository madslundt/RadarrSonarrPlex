import * as React from 'react';
import { Image } from '../movies/MoviesStore';
import styled, {ThemedStyledProps} from 'styled-components';

interface IProps {
    images: Image[];
    status: string;
    downloaded: boolean;
    isAvailable: boolean;
    content?: string;
}

const Poster = (props: IProps) => {
    const imageUrl = getPoster(props.images);

    const label = getLabel(props);

    return (
        <PosterContainer style={{backgroundImage: `url('${imageUrl}')`}}>
            <Label
                downloaded={props.downloaded}
                available={props.isAvailable || props.status === 'released'}
                status={props.status}
                color={label.color}
                backgroundColor={label.backgroundColor}
            >
                {label.content}
            </Label>

        </PosterContainer>
    );
};

interface ILabel {
    backgroundColor?: string;
    color?: string;
    content: string
};
const getLabel = (props: IProps): ILabel => {
    if (props.downloaded) {
        return {
            backgroundColor: '#2CBD4E',
            color: '#fff',
            content: 'In Plex'
        };
    }
    if (props.isAvailable || props.status === 'released') {
        return {
            backgroundColor: '#D73939',
            color: '#fff',
            content: 'Available'
        };
    }

    switch (props.status) {
        case 'continuing':
        case 'announced':
        case 'inCinemas':
            if (props.content) {
                return {
                    content: props.content
                };
            }
        default:
            return {
                content: props.content || 'Coming soon'
            };
    }
}

const getPoster = (images: Image[]) => {
    const poster = images.find(image => image.coverType === 'poster');

    if (poster) {
        return poster.url;
    } else {
        return '';
    }
};

const PosterContainer = styled.div`
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 270px;
    width: 100%;
    position: relative;
`;

type LabelProps = ThemedStyledProps<{backgroundColor: string, color: string}, any>;
const Label = styled.div`
    text-align: right;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    display: block;
    box-sizing: border-box;
    z-index: 1;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 12px;
    padding: 10px;
    opacity: .8;
    background-color: ${(props: LabelProps) => props.backgroundColor || '#fff'};
    color: ${(props: LabelProps) => props.color || '#222'};
    &>span {

    }
` as ThemedStyledProps<any, void>;


export default Poster;