import {BrowserRouter, Link, Route} from 'react-router-dom'
import HomeScreen from './Screens/HomeScreen';
import HelpScreen from './Screens/HelpScreen';
import Profile from './Screens/Profile';
import NewsScreen from './Screens/NewsScreen';
import FunctionScreen from './Screens/FunctionScreen';
import ProfileADD from './Screens/ProfileADD';
import ProfileEdit from './Screens/ProfileEdit';
import FunctionADD from './Screens/FunctionADD';
import FunctionEdit from './Screens/FunctionEdit';

function App() {
  return (
    <BrowserRouter>
    <div className="container">
      <header className="header">
            <div>
              <Link to="/"> Página Inicial</Link>
            </div>
            <div>
              <Link to="/profile">Perfis</Link>
            </div>
            <div>
              <Link to="/functions"> Funções/Cargos</Link>
            </div>
            <div>
              <Link to="/help"> Ajuda</Link>
            </div>
      </header>
      <main>
            <Route path="/" component={HomeScreen} exact></Route>
            <Route path="/help" component={HelpScreen}></Route>
            <Route path="/profile" component= {Profile}></Route>
            <Route path="/news" component={NewsScreen}></Route>
            <Route path="/functions" component={FunctionScreen}></Route>
            <Route path="/add" component={ProfileADD}></Route>
            <Route path="/edit/:id" component={ProfileEdit}></Route>
            <Route path="/function/add" component={FunctionADD}></Route>
            <Route path="/function/edit/:id" component={FunctionEdit}></Route>

      </main>
      <footer className="footer">  
      Marcos André&copy; &nbsp; ||  &nbsp; <a href="https://www.instagram.com/marcosart_baybay/" rel="noreferrer" target="_blank"> Marcos André</a>
      </footer>
      
    </div>
    </BrowserRouter>
  );
}

export default App;
