import ENSPY from '../Asset/ENSPY.png';
import '../Style/Common.css';
import Banner from './Banner'
import Contenu from './Contenu'
import {useState} from 'react'

function Application({spaceName , setSpaceName}) {

  //liste des ids des checkoxes des options de paramétre de la recherche
  const searchParamsCheckboxesIds=["utilisateurs_checkbox", "groupes_checkbox", "ressources_checkbox", "applications_checkbox", "caracteristiques_checkbox"]

  //états indiquant si les options de recherche sont sélectionnés ou pas
  const [findInUtilisateurs, setFindInUtilisateurs] = useState(true)
  const [findInGroupes, setFindInGroupes] = useState(true)
  const [findInRessources, setFindInRessources] = useState(true)
  const [findInApplications, setFindInApplications] = useState(true)
  const [findInCaracteristiques, setFindInCaracteristiques] = useState(true)

  //état contenant la chaîne à chercher
  const [stringToSearch, setStringToSearch] = useState('')


  //etat contenant la liste des utilisateurs
  const [utilisateursList, setUtilisateursList] = useState([])

  //etat contenant la liste des groupes
  const [groupesList, setGroupesList] = useState([])

  //etat contenant la liste des ressources
  const [ressourceList, setRessourcesList] = useState([])

  //etat contenant la liste des caracteristiques
  const [caracteristiquesList, setCaracteristiquesList] = useState([]) 

  //etat contenant la liste des applications
  const [applicationsList, setApplicationsList] = useState([]) 


  //etat indiquant une mise à jour de la liste des utilisateurs
  const [updateUtilisateursList, setUpdateUtilisateursList] = useState(true)

  //etat indiquant une mise à jour de la liste des groupes
  const [updateGroupesList, setUpdateGroupesList] = useState(true)

  //etat indiquant une mise à jour de la liste des ressources
  const [updateRessourcesList, setUpdateRessourcesList] = useState(true)

  
  //etat indiquant une mise à jour de la liste des caracteristiques
  const [updateCaracteristiquesList, setUpdateCaracteristiquesList] = useState(true)

  //etat indiquant une mise à jour de la liste des applications
  const [updateApplicationsList, setUpdateApplicationsList] = useState(true)


  //état contenant les résultats de la recherche dans les utilisateurs
  const [utilisateursResult, setUtilisateursResult] = useState([])

  //état contenant les résultats de la recherche dans les groupes
  const [groupesResult, setGroupesResult] = useState([])

    //état contenant les résultats de la recherche dans les ressources
   const [ressourcesResult, setRessourcesResult] = useState([])

   //état contenant les résultats de la recherche dans les caracteristiques
   const [caracteristiquesResult, setCaracteristiquesResult] = useState([])

   //état contenant les résultats de la recherche dans les applications
   const [applicationsResult, setApplicationsResult] = useState([])



  //fonction permettant de cocher une option de recherche
  function checkOption(optionId){
    document.getElementById(optionId).checked = true
  }

  //fonction permettant de décocher une option de recherche
  function unCheckOption(optionId){
    document.getElementById(optionId).checked = false
  }
  
  return (
    <div className="container-fluid">
      <div className="d-flex flex-column" style={{height:"100vh"}}>
        <Banner/>

        <Contenu setUpdateUtilisateursList={setUpdateUtilisateursList} updateUtilisateursList={updateUtilisateursList} updateGroupesList={updateGroupesList} setUpdateGroupesList={setUpdateGroupesList} spaceName={spaceName} setSpaceName={setSpaceName} utilisateursList={utilisateursList} setUtilisateursList={setUtilisateursList} groupesList={groupesList} setGroupesList={setGroupesList}  setSpaceName={setSpaceName} setFindInRessources={setFindInRessources} setFindInUtilisateurs={setFindInUtilisateurs} setFindInGroupes={setFindInGroupes} setFindInApplications={setFindInApplications} setFindInCaracteristiques={setFindInCaracteristiques} findInRessources={findInRessources} 
        findInUtilisateurs={findInUtilisateurs} findInApplications={findInApplications} findInGroupes={findInGroupes} findInCaracteristiques={findInCaracteristiques}  />
      </div>

      { 
        <div id="search-settings" className="search-settings-overlay">
            <div className="container search-settings" style={{fontSize:"large"}}>
                <div className="bold-center">
                    <span>Paramètres de recherche</span>
                </div>
                <div>
                  &nbsp;&nbsp;Rechercher dans:
                </div>
                <div className="row d-flex justify-content-left" style={{marginLeft:"30px"}}>
                  <div class="form-check">
                    <input type="checkbox" className="form-check-input" id="all_checkbox" onClick={(event) =>{
                      if(event.target.checked === true){
                        //on sélectionne toutes les options
                        searchParamsCheckboxesIds.forEach((checkbox) =>{
                          checkOption(checkbox)
                        })
                        setFindInUtilisateurs(true)
                        setFindInApplications(true)
                        setFindInRessources(true)
                        setFindInGroupes(true)
                        setFindInCaracteristiques(true)
                      }
                    }   
                    }/>
                    <label className="form-check-label" for="all_checkbox">Tous</label>
                  </div>
                </div>
                <div className="row d-flex justify-content-left" style={{marginLeft:"30px"}}>
                  <div class="form-check">
                    <input type="checkbox" className="form-check-input" id="utilisateurs_checkbox" defaultChecked="true" onClick={(event) =>{
                      if(event.target.checked === true){
                        setFindInUtilisateurs(true)
                      }else{
                        setFindInUtilisateurs(false)
                      }
                    }
                    }/>
                    <label className="form-check-label" for="utilisateurs_checkbox">Utilisateurs</label>
                  </div>
                </div>
                <div className="row d-flex justify-content-left" style={{marginLeft:"30px"}}>
                  <div class="form-check">
                    <input type="checkbox" className="form-check-input" id="ressources_checkbox"  defaultChecked="true" onClick={(event) =>{
                      if(event.target.checked === true){
                        setFindInRessources(true)
                      }else{
                        setFindInRessources(false)
                      }
                    }
                    }/>
                    <label className="form-check-label" for="conditionnings_checkbox">Ressources</label>
                  </div>
                </div>
                <div className="row d-flex justify-content-left" style={{marginLeft:"30px"}}>
                  <div class="form-check">
                    <input type="checkbox" className="form-check-input" id="applications_checkbox" defaultChecked="true" onClick={(event) =>{
                      if(event.target.checked === true){
                        setFindInApplications(true)
                      }else{
                        setFindInApplications(false)
                      }
                    }
                    }/>
                    <label className="form-check-label" for="applications_checkbox">Applications</label>
                  </div>
                </div>
                <div className="row d-flex justify-content-left" style={{marginLeft:"30px"}}>
                  <div class="form-check">
                    <input type="checkbox" className="form-check-input" id="groupes_checkbox"  defaultChecked="true" onClick={(event) =>{
                      if(event.target.checked === true){
                        setFindInGroupes(true)
                      }else{
                        setFindInGroupes(false)
                      }
                    }
                    }/>
                    <label className="form-check-label" for="groupes_checkbox">Produits</label>
                  </div>
                </div>
                <div className="row d-flex justify-content-left" style={{marginLeft:"30px"}}>
                  <div class="form-check">
                    <input type="checkbox" className="form-check-input" id="caracteristiques_checkbox"  defaultChecked="true" onClick={(event) =>{
                      if(event.target.checked === true){
                        setFindInCaracteristiques(true)
                      }else{
                        setFindInCaracteristiques(false)
                      }
                    }
                    }/>
                    <label className="form-check-label" for="caracteristiques_checkbox">Taxes</label>
                  </div>
                </div>
                <div className="d-flex justify-content-end" style={{marginBottom:"5px", marginRight:"10px"}}>
                    <div><a  href="#" >OK</a></div>
                </div>
            </div>
        </div> 
    } 

    </div>
  );
}
export default Application;
