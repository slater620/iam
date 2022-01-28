import "../Style/Langue.css"
import "../Style/Common.css"

function Langue(){
    return(
        <div className="col vertical-center">
            <div className="row  no-gutters">
                <div className="col-4 vertical-center">
                    <p className="vertical-center">Langue</p>
                </div>
                <div className="col-5">
                    <select className="form-control select-input">
                        <option selected>Fr</option>
                        <option>En</option>
                    </select>                            
                </div>
 
            </div>
        </div>
    );
}

export default Langue