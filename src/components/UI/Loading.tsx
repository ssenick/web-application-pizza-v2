import React, {FC} from 'react';
import {loading} from "../../assets/images";

const Loading: FC = () => {
    return (
        <div className='content content--loading'>
            <img src={loading} alt="Pizza logo" />
        </div>

    );
};

export default Loading;