import CreateGroupesForm from './CreateGroupesForm'
import CreateUtilisateursForm from './CreateUtilisateursForm'
import List from './List'
import Details from './Details'
import SearchResult from './SearchResult'
import {useState} from 'react'

function Workspace({displaySuccessAlert , setDisplaySucessAlert , spaceName , setSpaceName, utilisateursList , groupesList , setUtilisateursList , setGroupesList}){
 
    //etat définissant le type d'élément à afficher dans la fenêtre des détails
     const [itemType, setItemType] = useState('')

    //etat contenant l'élément à afficher dans détails
    const [item, setItem] = useState({})

    //etat indiquant si on doit charger les formulaires pour un update ou pas
    const [update, setUpdate] = useState(false)

    //etat contenant l'élément à update dans le cas d'une mise à jour
    const [itemToUpdate, setItemToUpdate] = useState({})

    //etat indiquant si l'élément à afficher en détails est le résutat d'une recherche
    const [isASearchResult, setIsASearchResult] = useState(false)

    switch(spaceName){
        case 'createUtilisateurs':
            
            return(
                    <CreateUtilisateursForm utilisateursList={utilisateursList} setUtilisateursList={setUtilisateursList} update={update} setUpdate={setUpdate} itemToUpdate={itemToUpdate} setItemToUpdate={setItemToUpdate} groupesList={groupesList} setGroupesList={setGroupesList} utilisateursList={utilisateursList} setUtilisateursList={setUtilisateursList}  spaceName={spaceName} setSpaceName={setSpaceName}/>
            );
            break;
        case 'createGroupes':
              console.log('good')
                return(
                        <CreateGroupesForm utilisateursList={utilisateursList} setUtilisateursList={setUtilisateursList} update={update} setUpdate={setUpdate} itemToUpdate={itemToUpdate} setItemToUpdate={setItemToUpdate} groupesList={groupesList} setGroupesList={setGroupesList} utilisateursList={utilisateursList} setUtilisateursList={setUtilisateursList}  spaceName={spaceName} setSpaceName={setSpaceName}/>
                );
                break;

        case 'listUtilisateurs':
            return(
                <List listType={"utilisateurs"}  displaySuccessAlert={displaySuccessAlert}
                data={utilisateursList} setData={setUtilisateursList}
                itemType={itemType} setItemType={setItemType}
                item={item} setItem={setItem} update={update} setUpdate={setUpdate} itemToUpdate={itemToUpdate} setItemToUpdate={setItemToUpdate}  setSpaceName={setSpaceName} spaceName={spaceName}  />
            );
            break;

            case 'listGroupes':
                return(
                    <List listType={"groupes"}  displaySuccessAlert={displaySuccessAlert} data={groupesList} setData={setGroupesList}
                    itemType={itemType} setItemType={setItemType}
                    item={item} setItem={setItem} update={update} setUpdate={setUpdate} itemToUpdate={itemToUpdate} setItemToUpdate={setItemToUpdate}  setSpaceName={setSpaceName} spaceName={spaceName}  />
                );
                break;
         
    
        case 'details':
            switch(itemType){
                case 'utilisateurs':
                    return(
                        <Details  itemType={itemType} item={item} setItem={setItem} data={utilisateursList} setData={setUtilisateursList} isASearchResult={isASearchResult} setIsASearchResult={setIsASearchResult}/>
                    );
                    case 'groupes':
                        return(
                            <Details  itemType={itemType} item={item} setItem={setItem} data={groupesList} setData={setGroupesList} isASearchResult={isASearchResult} setIsASearchResult={setIsASearchResult}/>
                        );
                   
            }
           
            break;

        case 'searchResults':
            return(
                <SearchResult/>
            );
    }

   return null
}

export default Workspace;