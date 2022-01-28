import '../Style/Common.css'
import '../Style/List.css'

import {useState} from 'react'

function SearchResult(){
    

    return(
        <div className="container">
             <div className="row headSection" style={{fontSize:"large"}}>
                <h4 className="col-4">Résultats de la recherche</h4>
                <div className="col-8 d-flex justify-content-end vertical-center hover-pointer">
                    <a id="delete" className="black-link" 
                    style={{marginRight:"10px"}}>
                        <span className="material-icons md-48" title="supprimer">delete</span>
                    </a>
                </div>
            </div>

           
            { 
                <div id="confirm-delete-alert" className="overlay">
                    <div className="container confirm-delete-alert bold-center" style={{fontSize:"large"}}>
                        <div className="row">
                           
                        </div>
                        <div className="row d-flex justify-content-around" style={{marginBottom:"5px"}}>
                            <div className="col-6" >
                            <a  href="#" >Oui</a>
                            </div>
                                
                            <a className="col-6" href="#">Annuler</a>
                        </div>
                    </div>
                </div> 
            }
        </div>
    );
}

export default SearchResult;