import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import './App.scss';
import Header from './ui/Static/Header';
import Home from './ui/Home/Home';
import OpenAgenda from './ui/OpenAgenda/OpenAgenda';
import CreateAgenda from './ui/CreateAgenda/CreateAgenda';
import EditAgenda from './ui/EditAgenda/EditAgenda';
import {URL} from './service';

export const AppContext = React.createContext({});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.updateState = this.updateState.bind(this);
    this.state = {
      agendas: [ 
        {
          id: 1, 
          date: "8/12/20",
          Opening_Prayer: "Jill Thorton",
          Closing_Prayer: "Neil Buckles",
          Opening_Hymn: 112,
          Closing_Hymn: 302,
          Sacrament_Hymn: 189,
          Intermediate_Hymn: 231,
          Presiding: "Dallis Herny",
          Conduction: "Dallis Herny",
          Speakers: [
            {name: "Brave Man 1", id: 1},
            {name: "Brave Man 2", id: 2},
            {name: "Brave Man 3", id: 3}
          ]
        }, 
        {id: 2, date: "3/4/12"}, 
        {id: 3, date: "12/3/19"} ],
      updateState: this.updateState,
    };
  }



   

  updateState(key, value) { this.setState({[key]: value}) }

  render() {
    return(
      <BrowserRouter>
        <AppContext.Provider value={this.state}>
          <Header />
          <Switch>
            <Route exact={true} path="/" component={Home} />
            <Route exact={true} path="/CreateAgenda" component={CreateAgenda} />
            <Route exact={true} path="/EditAgenda/:id" component={EditAgenda} />
            <Route exact={true} path="/OpenAgenda/:id" component={OpenAgenda} />
          </Switch>
          {/* <Footer /> */}
        </AppContext.Provider>
      </BrowserRouter>
    );
  }
}

export default App;
