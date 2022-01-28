import '../Style/Contenu.css'
import Workspace from './Workspace'
import Menu from './Menu'
import {useState} from 'react'

function Contenu({spaceName ,setUpdateGroupesList,updateGroupesList,setUpdateUtilisateursList,updateUtilisateursList, setSpaceName, setUtilisateursList, setGroupesList, utilisateursList, groupesList ,findInApplications, setFindInRessources , setFindInUtilisateurs , setFindInGroupes , setFindInApplications , setFindInCaracteristiques , findInRessources , findInUtilisateurs , findInGroupes , findInCaracteristiques}){

     //etat pour l'affichage de l'alerte de confirmation de l'ajout d'un utilisateur
     const [displaySuccessAlert, setDisplaySuccessAlert] = useState(false)

    return(
        <div className="row flex-grow-1">
            <Menu setUpdateUtilisateursList={setUpdateUtilisateursList} updateUtilisateursList={updateUtilisateursList} updateGroupesList={updateGroupesList} setUpdateGroupesList={setUpdateGroupesList} spaceName={spaceName} setSpaceName={setSpaceName} utilisateursList={utilisateursList} setUtilisateursList={setUtilisateursList} groupesList={groupesList} setGroupesList={setGroupesList}  setSpaceName={setSpaceName} setFindInRessources={setFindInRessources} setFindInUtilisateurs={setFindInUtilisateurs} setFindInGroupes={setFindInGroupes} setFindInApplications={setFindInApplications} setFindInCaracteristiques={setFindInCaracteristiques} findInRessources={findInRessources} 
            findInUtilisateurs={findInUtilisateurs} findInApplications={findInApplications} findInGroupes={findInGroupes} findInCaracteristiques={findInCaracteristiques} />
            <div className="col container workspace-div">
                <Workspace displaySuccessAlert={ displaySuccessAlert } setDisplaySucessAlert={setDisplaySuccessAlert} utilisateursList={utilisateursList} setUtilisateursList={setUtilisateursList} groupesList={groupesList} setGroupesList={setGroupesList} setSpaceName={setSpaceName} spaceName={spaceName} />
            </div>
        </div>
    );
}

export default Contenu;