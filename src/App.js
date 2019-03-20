import React, { Component } from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import NewQuestion from "./components/NewQuestion";
import Home from "./components/Home";
import NewTest from "./components/NewTest";
import EditQuestion from "./components/EditQuestion";
import Navigation from "./components/Navigation";
import Error from "./components/Error";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Navigation />
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/newQuestion" component={NewQuestion} />
            <Route path="/questionGroups" component={NewTest} />
            <Route path="/editQuestion/:id" component={EditQuestion} />
            <Route component={Error} />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
