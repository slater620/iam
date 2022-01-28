import '../Style/SearchBar.css'
import '../Style/Common.css'

function SearchBar(){


    return(
        <div className="col-6 vertical-center"> 
            <div className="row no-gutters form-group has-search vertical-center">
                <div className="col-11 vertical-center">
                    <span className="fa fa-search form-control-feedback"></span>
                    <input type="text" className="form-control searchbar" placeholder="Search..." />
                </div>

                <div className="col-auto vertical-center">
                    <a id='search-settings-button'>
                        <button className="param-button" title="paramètres de recherche">
                            <i className="fa fa-sliders fa-2x"></i>
                        </button>
                    </a>
                </div>
            </div>      
        </div>
    );
}

export default SearchBar