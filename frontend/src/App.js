
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import { Route, Switch } from "react-router-dom";
import Spots from "./components/Spots";
import SpotDetails from "./components/Spots/SpotDetails";
import SpotCurrentUser from "./components/Spots/SpotCurrentUser";
import CreateNewSpotForm from "./components/Spots/CreateNewSpotForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <Switch>
        
        <Route exact path='/spots/current/new'>
          <CreateNewSpotForm />
        </Route>

        <Route exact path={'/spots/current'}>
          <SpotCurrentUser />
        </Route>

        <Route exact path={'/spots/:spotId'}>
          <SpotDetails />
        </Route>


        <Route exact path='/'>
          <Spots />
        </Route>

      </Switch>
    </>
  );
}

export default App;
