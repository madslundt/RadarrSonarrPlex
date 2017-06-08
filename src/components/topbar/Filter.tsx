/*import * as React from 'react';

interface IProps {

}

const Filter = (props: IProps) => {
    const imageUrl = getImageUrl(props.root, getPoster(props.images));

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
};*/