import React from 'react';
import UpdateForm from '../components/update/UpdateForm';
import AppNavBar from '../components/common/AppNavBar';
import { useParams } from 'react-router';

const UpdatePage = () => {

    const params = useParams();
    return (
        <div>
            <AppNavBar/>
            <UpdateForm id={params['id']}/> 
        </div>
    );
};

export default UpdatePage;