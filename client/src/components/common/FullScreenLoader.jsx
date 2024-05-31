import React from 'react';
import loader from '../../assets/images/loader.svg'

const FullScreenLoader = () => {
    return (
        <div className='ProcessingDiv'>
            <div className='center-screen'>
                <img className='loader-size' src={loader} alt="" />
            </div>
        </div>
    );
};

export default FullScreenLoader;