import './App.css';
import StudentTable from './component';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* calling student table component */}
        <StudentTable/> 
      </header>
    </div>
  );
}

export default App;
