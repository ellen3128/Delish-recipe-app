import './App.css';
import Pages from './pages/Main';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
        <Header />
        <h1>Delish</h1>
        <Pages />
    </div>
  );
}

export default App;
