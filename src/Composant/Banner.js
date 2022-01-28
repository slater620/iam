import ENSPY from '../Asset/ENSPY.png'
import '../Style/Logo.css'
import '../Style/Banner.css'
import Identity from './Identity';
import SearchBar from './SearchBar';
import Langue from './Langue';

function Banner(){
    return(
        <div className="row banner">
            <div className="col">
                <a className="navbar-brand" href="#"><img src={ENSPY} alt="ENSPY" className="logo"/></a>
            </div>

            <SearchBar/>

            <Langue/>
            
            <Identity />
        </div> 
    );
}
export default Banner