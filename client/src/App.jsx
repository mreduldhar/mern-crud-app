import React, { Fragment } from 'react';
import { BrowserRouter} from 'react-router-dom';
import {Route, Switch} from "react-router";
import ReadPage from './pages/ReadPage';
import CreatePage from './pages/CreatePage';
import UpdatePage from './pages/UpdatePage';
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import { Toaster } from 'react-hot-toast';


const App = () => {
  return (
    <Fragment>
            <BrowserRouter>
            <Toaster />
                <Switch>
                    <Route exact path="/" render={(props)=><ReadPage {...props} key={Date.now()} />}/>
                    <Route exact path="/create" render={(props)=><CreatePage {...props} key={Date.now()} />}/>
                    <Route exact path="/update/:id" render={(props)=><UpdatePage {...props} key={Date.now()} />}/>
                </Switch>
            </BrowserRouter>
        </Fragment>
  );
};

export default App;