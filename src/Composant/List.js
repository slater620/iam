import {useState} from 'react'
import '../Style/Common.css'
import '../Style/List.css'

function List({displaySuccessAlert, listType, data, setData, spaceName, setSpaceName, itemType, setItemType, item, setItem,  update, setUpdate, itemToUpdate, setItemToUpdate}){

      //message d'enregistrement
      const [registration,setRegistration] = useState('') 

      //etat contenant le message à afficher dans l'alerte de confirmation
      const [confirmAlertMsg, setConfirmAlertMsg] = useState('')
  
      //etat contenant la liste des éléments cochés de la liste
      const [checkedItems, setCheckedItems] = useState([])
  
      //etat contenant l'ID de l'élément de la liste sélectionné pour une action
      const [selectedItemId, setSelectedItemId] = useState('')
  
      //définition du titre de la liste
      let listTitle
  
      //définition du titre du bouton d'ajout
      let addButtonTitle
       
       //lien vers les utilisateurs et groupes
    const utilisateursRequestURL = 'http://127.0.0.1:8000/iam/personnes/'
    const groupesRequestURL = 'http://127.0.0.1:8000/iam/identite/'

    //paramètres de connexion à l'API
    var userName = "ruben";
    var passWord = "rubenslater";

    //fonction d'encodage des paramètres de connexion à l'API//
    function authenticateUser(user, password){
        var token = user + ":" + password;

        var hash = btoa(token); 

        return "Basic " + hash;
    }

   //fonction permettant de construire l'id du checkboxList d'un élément de la liste//
   function getCheckboxId(item){
        return 'checkbox_' + item['id']
    }

    //fonction permettant de construire l'id du bouton de suppression d'un élément//
    function getDeleteButtonId(item){
        return 'deleteButton_' + item['id']
    }

    //fonction permettant de construire l'id du bouton de mise à jour d'un élément//
    function getUpdateButtonId(item){
        return 'updateButton_' + item['id']
    }

    //fonction permettant de sélectionner tous les éléments de la liste
    function selectAll(){
        const checked = document.getElementById('selectAll').checked
        
        if(checked){
            const tmpList = []

            //on coche tous les checkboxs
            data.forEach(function(item){
                document.getElementById(getCheckboxId(item)).checked = true
                tmpList.push(item['id'])
            })

        }else{
            //on vide la liste des éléments cochés
            setCheckedItems([])

            //on décoche tous les checkboxs
            data.forEach(function(item){
                document.getElementById(getCheckboxId(item)).checked = false
            })
        }
    }

    //fonction permettant de retrouver l'id d'un élément à partir de l'id du checkbox correspondant//
    function getItemIdFromCheckboxId(checkboxId){
        const tmp = checkboxId.split('_')
        return tmp[1]
    }

    //fonction appelée lorqu'on clique sur un checkbox de la liste
    function handleCheckboxClick(event)
    {
        var checked = event.target.checked;

        if(checked){
            //si le checkbox est coché on récupère l'id de l'élément correspondant et on le stocke dans la lste des éléments sélectionnés de la liste
            setCheckedItems([...checkedItems, getItemIdFromCheckboxId(event.target.id)])
            
        }else{
            //on retire l'id de l'élément dans la liste des éléments cochés
            const itemId = getItemIdFromCheckboxId(event.target.id)
            const index = checkedItems.indexOf(itemId)
            if(index > -1){
                checkedItems.splice(index, 1)
            }        }
    }

    //fonction pour supprimer la liste des utilisateurs sélectionnées//
    function deleteItems(itemsList, checkedItemIndex){
        if(checkedItemIndex < checkedItems.length){
            const itemId = checkedItems[checkedItemIndex]
            switch(listType){
                case "utilisateurs":
                    //création de la requête
                    var requestURL = utilisateursRequestURL + itemId + "/"
                    break;
                case "groupes":
                    //création de la requête
                    var requestURL = groupesRequestURL + itemId + "/"
                    break;
            }
            var request = new XMLHttpRequest();
            
            request.open('DELETE', requestURL);
            request.setRequestHeader('Content-Type', 'application/json');
            request.setRequestHeader("Authorization", authenticateUser(userName, passWord)); 
            request.responseType = 'json';
            request.send();

            request.onload = function(){
                const requestStatus = request.status
    
                if(requestStatus === 204){
                    //succès de la suppression
                    //on supprime l'élément de la liste des data*/
                    const deletedItemIndex = itemsList.findIndex(item => item['id'] === itemId);
                    
    
                    if(deletedItemIndex > -1){
                        
                        //on retire l'élément supprimé de la liste
                        itemsList = itemsList.filter(function(value, index, arr){
                            return index != deletedItemIndex
                        })
                        
                        data = itemsList
                        

                        deleteItems(itemsList, checkedItemIndex + 1)
                    }
                }
            }

        }else{
            
            //on vide la liste des éléments sélectionnés
            setCheckedItems([])
        }
    }

    //fonction permettant de supprimer un élément ayant son id//
    function deleteItem(itemId){
         switch (listType){
                case "utilisateurs":
                    //création de la requête
                    var requestURL = utilisateursRequestURL + itemId + "/"
                    break;
                case "groupes":
                    //création de la requête
                    var requestURL = groupesRequestURL + itemId + "/"
                    break;
            }
        var request = new XMLHttpRequest();
        
        request.open('DELETE', requestURL);
        request.setRequestHeader('Content-Type', 'application/json');
        request.setRequestHeader("Authorization", authenticateUser(userName, passWord)); 
        request.responseType = 'json';
        request.send();

        request.onload = function(){
            const requestStatus = request.status

            if(requestStatus === 204){
                //succès de la suppression
                //on supprime l'élément de la liste des data*/
                const deletedItemIndex = data.findIndex(item => item['id'] === itemId);

                if(deletedItemIndex > -1){
                    
                    //on retire l'élément supprimé de la liste
                    const itemsList = data.filter(function(value, index, arr){
                        return index != deletedItemIndex
                    })
                    
                    data=itemsList
        }

                 //on vide la liste des éléments sélectionnés
                setCheckedItems([])
            }
        }

    }

    //fonction permettantt de récupérer la liste des utilisateurs//
    function getUtilisateurs(requestURL, tmpList){

        //création de la requête
        var request = new XMLHttpRequest();
        request.open('GET', utilisateursRequestURL);
        request.setRequestHeader('Content-Type', 'application/json');
        request.setRequestHeader("Authorization", authenticateUser(userName, passWord)); 
        request.responseType = 'json';
        request.send();    
        request.onload = function(){
            var response = request.response;
            var requestStatus = request.status
            if(requestStatus === 200){
                var next = response['next']
                tmpList = tmpList.concat(response['results'])
                console.log('bonjour')
                setData(tmpList)
                console.log('good')
                if(next != null){
                    getUtilisateurs(next, tmpList)
                }
            }
        }
    }

     //fonction permettantt de récupérer la liste des groupes//
    function getGroupes(requestURL, tmpList){

        //création de la requête
        var request = new XMLHttpRequest();
        request.open('GET', groupesRequestURL);
        request.setRequestHeader('Content-Type', 'application/json');
        request.setRequestHeader("Authorization", authenticateUser(userName, passWord)); 
        request.responseType = 'json';
        request.send();    
        request.onload = function(){
            var response = request.response;
            var requestStatus = request.status
            if(requestStatus === 200){
                var next = response['next']
                tmpList = tmpList.concat(response['results'])
                console.log('bonjour')
                setData(tmpList)
                console.log('good')
                if(next != null){
                    getGroupes(next, tmpList)
                }
            }
        }
    }
    //fonction d'affichage de la liste des groupes
    function displayGroupesList(){
        console.log('bien')
        return(
            <div>
                <div className="row">
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr className="no-gutters">
                                    <th className="col-1 text bold" style={{paddingLeft:"15px"}}>
                                        <input type="checkbox" id="selectAll" title="tout sélectionner" value="1" onClick={selectAll}></input>
                                    </th>
                                    <th className="col-2 text bold">
                                        <span>Nom</span>
                                    </th>
                                    <th className="col-2 text bold">
                                        <span>Description</span>
                                    </th> 
                                    <th className="col-1 text bold">
                                    </th>
                                </tr>
                            </thead>
                        </table>    
                    </div>
                </div>

                <div className="row overflow-auto form-div" style={{height:"65vh"}}>
                    <div class="table-responsive">
                        <table className="table">
                            <tbody>
                                { 
                                    data.map((groupes) => (
                                        <tr className="list-item no-gutters" key={groupes['id']} id={groupes['id']} onMouseOver={()=>{
                                            //on affiche le bouton de suppression de l'élément survolé
                                            document.getElementById(getDeleteButtonId(groupes)).style.visibility = "visible"
                                            document.getElementById(getUpdateButtonId(groupes)).style.visibility = "visible"
                                        }}
                                        onMouseOut={() =>{
                                            //on retire le bouton de suppression de l'élément survolé
                                            document.getElementById(getDeleteButtonId(groupes)).style.visibility = "hidden"
                                            document.getElementById(getUpdateButtonId(groupes)).style.visibility = "hidden"
                                        }}
                                        onClick={(event)=>{
                                            const parentTagName = event.target.parentElement.tagName

                                            if(parentTagName === "TR" || parentTagName === "TD"){
                                                setItem(groupes)
                                                setItemType(listType)
                                                setSpaceName('details')
                                            }
                                           
                                        }}>
                                            <td className="col-1" style={{paddingLeft:"15px"}}>
                                                <span>
                                                    <input type="checkbox" id={getCheckboxId(groupes)} onClick={(event)=>handleCheckboxClick(event)}></input>
                                                </span>
                                            </td>
                                            <td className="col-2 text"><span>{groupes['identite_name']}</span></td>
                                            <td className="col-2 text"><span>{groupes['description']}</span></td>
                                            <td className="col-1 vertical-center">
                                                <a className="item-delete material-icons md-48 delete-icon" id={getDeleteButtonId(groupes)}  title="supprimer" onClick={(event) =>{
                                                    //on vide la liste des checkbox sélectionnés
                                                    setCheckedItems([])

                                                    //affichage du popup de confirmation
                                                    document.getElementById(getDeleteButtonId(groupes)).href="#confirm-delete-alert"
                                                    setConfirmAlertMsg("Voulez-vous supprimer le groupe " + groupes['identite_name'] + " ?")
                                                
                                                    setSelectedItemId(groupes['id'])
                                                }} style={{marginRight:"10px"}}>
                                                    <span className="material-icons md-48 delete-icon">delete</span>
                                                </a>
                                                <a className="update-icon item-update" id={getUpdateButtonId(groupes)} onClick={(event) =>{
                                                        setSpaceName('createGroupes')
                                                        setUpdate(true)
                                                        setItemToUpdate(groupes)
                                                        event.preventDefault()
                                                    }}>
                                                    <span className="material-icons md-48 delete-icon">edit</span>
                                                </a>
                                                
                                            </td>
                                        </tr>
                                    
                                    ))
                                }
                                
                            </tbody>
                        </table>    
                    </div>
                </div>
            </div>
        );
    }
    
    //fonction d'affichage de la liste des utilisateurs
    function displayUtilisateursList(){
        console.log('bien')
        return(
            <div>
                <div className="row">
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr className="no-gutters">
                                    <th className="col-1 text bold" style={{paddingLeft:"15px"}}>
                                        <input type="checkbox" id="selectAll" title="tout sélectionner" value="1" onClick={selectAll}></input>
                                    </th>
                                    <th className="col-2 text bold">
                                        <span>Nom</span>
                                    </th>
                                    <th className="col-2 text bold">
                                        <span>prenom</span>
                                    </th> 
                                    <th className="col-1 text bold">
                                    </th>
                                </tr>
                            </thead>
                        </table>    
                    </div>
                </div>

                <div className="row overflow-auto form-div" style={{height:"65vh"}}>
                    <div class="table-responsive">
                        <table className="table">
                            <tbody>
                                { 
                                    data.map((utilisateurs) => (
                                        <tr className="list-item no-gutters" key={utilisateurs['id']} id={utilisateurs['id']} onMouseOver={()=>{
                                            //on affiche le bouton de suppression de l'élément survolé
                                            document.getElementById(getDeleteButtonId(utilisateurs)).style.visibility = "visible"
                                            document.getElementById(getUpdateButtonId(utilisateurs)).style.visibility = "visible"
                                        }}
                                        onMouseOut={() =>{
                                            //on retire le bouton de suppression de l'élément survolé
                                            document.getElementById(getDeleteButtonId(utilisateurs)).style.visibility = "hidden"
                                            document.getElementById(getUpdateButtonId(utilisateurs)).style.visibility = "hidden"
                                        }}
                                        onClick={(event)=>{
                                            const parentTagName = event.target.parentElement.tagName

                                            if(parentTagName === "TR" || parentTagName === "TD"){
                                                setItem(utilisateurs)
                                                setItemType(listType)
                                                setSpaceName('details')
                                            }
                                           
                                        }}>
                                            <td className="col-1" style={{paddingLeft:"15px"}}>
                                                <span>
                                                    <input type="checkbox" id={getCheckboxId(utilisateurs)} onClick={(event)=>handleCheckboxClick(event)}></input>
                                                </span>
                                            </td>
                                            <td className="col-2 text"><span>{utilisateurs['person_name']}</span></td>
                                            <td className="col-2 text"><span>{utilisateurs['surname']}</span></td>
                                            <td className="col-1 vertical-center">
                                                <a className="item-delete material-icons md-48 delete-icon" id={getDeleteButtonId(utilisateurs)}  title="supprimer" onClick={(event) =>{
                                                    //on vide la liste des checkbox sélectionnés
                                                    setCheckedItems([])

                                                    //affichage du popup de confirmation
                                                    document.getElementById(getDeleteButtonId(utilisateurs)).href="#confirm-delete-alert"
                                                    setConfirmAlertMsg("Voulez-vous supprimer l'utilisateur " + utilisateurs['person_name'] + " ?")
                                                
                                                    setSelectedItemId(utilisateurs['id'])
                                                }} style={{marginRight:"10px"}}>
                                                    <span className="material-icons md-48 delete-icon">delete</span>
                                                </a>
                                                <a className="update-icon item-update" id={getUpdateButtonId(utilisateurs)} onClick={(event) =>{
                                                        setSpaceName('createUtilisateurs')
                                                        setUpdate(true)
                                                        setItemToUpdate(utilisateurs)
                                                        event.preventDefault()
                                                    }}>
                                                    <span className="material-icons md-48 delete-icon">edit</span>
                                                </a>
                                                
                                            </td>
                                        </tr>
                                    ))
                                }
                                
                            </tbody>
                        </table>    
                    </div>
                </div>
            </div>
        );
    }


    //fonction permettant d'afficher la liste entrée
   function displayList(){
       switch(listType){
            case 'groupes':
                return displayGroupesList()
                break;
            
            case 'utilisateurs':
                return displayUtilisateursList()
                break;}
            
        //setRegistration('utilisateur enregistrée')
        switch(listType){
            case 'groupes':
                listTitle = "Liste des groupes"
                addButtonTitle="Nouveau groupe"
                break;
                
                case 'utilisateurs':
                    listTitle="Liste des utilisateurs"
                    addButtonTitle="Nouveau utilisateur"
                    break;
        
        }   
    }

    return(
        <div className="container">
            <div className="row headSection" style={{fontSize:"large"}}>
                <h4 className="col-4">{listTitle}</h4>
                <div className="col-8 d-flex justify-content-end vertical-center hover-pointer">
                    <a id="delete" style={{color:"black"}} onClick={() => {
                        if(checkedItems.length > 0) {
                            document.getElementById('delete').href="#confirm-delete-alert"
                            switch(listType){
                                    case 'utilisateurs':
                                        if(checkedItems.length === 1){
                                            setConfirmAlertMsg("Voulez-vous supprimer l'utilisateur sélectionné?")
                                        }else{
                                            setConfirmAlertMsg("Voulez-vous supprimer les utilisateurs sélectionnés?")
                                        } 
                                    break;
                                    case 'groupes':
                                        if(checkedItems.length === 1){
                                            setConfirmAlertMsg("Voulez-vous supprimer le groupe sélectionné?")
                                        }else{
                                            setConfirmAlertMsg("Voulez-vous supprimer les groupes sélectionnés?")
                                        } 
                                    break;
                            }
                           
                        }

                    }}
                    style={{marginRight:"10px"}}>
                        <span className="material-icons md-48" title="supprimer">delete</span>
                    </a>

                    <span className="fa fa-refresh" title="rafraîchir" style={{fontSize:"x-large"}} onClick={() =>{
                        //on rafraîchi la liste
                        switch(listType){
                            case 'utilisateurs':
                                getUtilisateurs(utilisateursRequestURL, [])
                                break;
                            case 'groupes':
                                getUtilisateurs(groupesRequestURL, [])
                                break;
                        }
                        
                    }}>h</span>
                </div>
            </div>
            

            { 
                <div id="confirm-delete-alert" className="overlay">
                    <div className="container confirm-delete-alert bold-center" style={{fontSize:"large"}}>
                        <div className="row">
                            {confirmAlertMsg}
                        </div>
                        <div className="row d-flex justify-content-around" style={{marginBottom:"5px"}}>
                            <div className="col-6" onClick={() => {

                                if(checkedItems.length > 0){
                                    //on supprime les éléments sélectionnés
                                    deleteItems(data, 0)
                                }else{
                                    //on supprime l'élément sélectionné
                                    deleteItem(selectedItemId)
                                }
                                
                            }
                            }>
                            <a  href="#" >Oui</a>
                            </div>
                                
                            <a className="col-6" href="#">Annuler</a>
                        </div>
                    </div>
                </div> 
            }
            {
                displayList()
            }
           
            
            
            {
                displaySuccessAlert && <div className="animated fadeOutDown delay-2s slower success-alert "> 
                    <div className="text-center" style={{paddingBottom:"5px"}}>
                        
                        <h2></h2>{registration}<h2></h2>
                    </div>
                </div>
            }
        </div> );
}

export default List;