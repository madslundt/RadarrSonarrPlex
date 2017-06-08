import styled from 'styled-components';

export const Error = styled.label`
    background-color: red;
    padding: 5px 10px;
    color: #fff;
`;
export const Center = styled.div`
    text-align: center;
    letter-spacing: 1px;
    padding: 20px;
    fontSize: 14px;
    margin: 10px auto;
`;

export const MediaList = styled.ul`
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    padding: 0;
    justify-content: flex-start;
`;
export const MediaElement = styled.li`
    display: inline-block;
    padding: 10px;
    box-sizing: border-box;
    flex-grow: 1;
    min-width: 190px;
    max-width: 190px
`;

export const MediaInfo = styled.div`
    text-align: center;

    &>.title {
        margin: 5px 0;
        font-size: 13px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;

        &.movie-title {
            white-space: normal;
        }
        &.episode-title {
            font-size: 12px;

            &>.episode-number {
                font-weight: 700;
                margin-right: 5px;
                font-size: 14px;
            }
        }
    }
`;

export const Button = styled.button`
    text-transform: uppercase;
    letter-spacing: 1px;
`;