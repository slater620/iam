import 'bootstrap/dist/css/bootstrap.min.css';
import Application from './Application';
import {useState} from 'react'

function App() {

  const [spaceName, setSpaceName] = useState('listUtilisateurs')
  return (
    <div className='container-fluid'> <Application spaceName={spaceName} setSpaceName={setSpaceName} /> </div>
  );
} 

export default App;
