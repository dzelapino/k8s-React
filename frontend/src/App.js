import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Frontpage from './ui/Frontpage';
import Navbar from './ui/Navbar';
import Footer from './ui/Footer';
import RockList from './ui/rocks/RockList';
import RockForm from './ui/rocks/RockForm';
import RockDetails from './ui/rocks/RockDetails';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className="Content">
          <Switch>
            <Route exact path="/">
              <Frontpage />
            </Route>
            <Route exact path="/rocks">
              <RockList />
            </Route>
            <Route exact path="/rocks/:id">
              <RockDetails />
            </Route>
            <Route exact path="/rocks/form/:id?">
              <RockForm />
            </Route>
          </Switch>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
