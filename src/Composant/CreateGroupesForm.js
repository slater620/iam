import '../Style/Form.css'
import '../Style/Common.css'
import React, {useState} from 'react'
function CreateGroupesForm({spaceName,setSpaceName ,utilisateursList, setUtilisateursList, groupesList , setGroupesList , update, setUpdate, itemToUpdate, setItemToUpdate}){

    const[alertMsg ,setAlertMsg] = useState('')
    var userName = "ruben"; 
    var passWord = "rubenslater";
    function authenticateUser(user, password ){
        var token = user + ":" + password ;
        // Should i be encoding this value????? does it matter???
        // Base64 Encoding -> btoa
        var hash = btoa(token); 

        return "Basic " + hash;
    }
    function CreateGroupes(event){
        const identite_name = document.querySelector('#name').value
        const description = document.querySelector('#description').value

          //variable qui signale la présence d'une erreur dans le formulaire
          var error = false

          //variable qui signale la présence d'une erreur au niveau du serveur
           var server_error = false
  
          //variable indiquant si l'utilisateur est connecté à internet
          var connected = window.navigator.onLine
  
          if(!connected){
              error = true
              setAlertMsg("Vous n'êtes pas connecté à internet!")
          }
  
          if(identite_name === ""){
              error = true
              setAlertMsg("Veuillez renseigner le champ nom!")
          }
          if(description === ""){
            error = true
            setAlertMsg("Veuillez renseigner le champ nom!")
        }
        var groupe ={identite_name, description};
        if (!update) {
            var requestURL = 'http://127.0.0.1:8000/iam/identite/';
            var request = new XMLHttpRequest();
            request.open('POST', requestURL);
            request.setRequestHeader('Content-Type', 'application/json');
            request.setRequestHeader("Authorization", authenticateUser(userName,passWord));
            request.responseType = 'json';
            request.send(JSON.stringify(groupe));
            console.log('groupe');
            request.onload = function() {
                const requestStatus = request.status;
                if (requestStatus === 201) {
                  
                    setSpaceName("listGroupes")
                }
                else{
                    console.log('error')
                }
            }
        }
        else {
            var requestURL = 'http://127.0.0.1:8000/iam/identite/' + itemToUpdate['id'] + "/";
            var request = new XMLHttpRequest();
            request.open('PATCH', requestURL);
            request.setRequestHeader('Content-Type', 'application/json');
            request.setRequestHeader("Authorization", authenticateUser(userName,passWord));
            request.responseType = 'json';
            request.send(JSON.stringify(groupe));
            console.log('patch groupe');
            request.onload = function() {
                const requestStatus = request.status;
                if (requestStatus === 200) {

                 
                    //la requête a réussi
                        //on remplace l'élément dans la liste des données
                        const index = groupesList.findIndex(groupe => groupe['id'] === itemToUpdate['id'])

                        if(index > -1 && index < groupesList.length){
                            groupesList[index] = request.response
                        }

                        setUpdate(false)

                        //on retourne à la liste des utilisateurs
                        setSpaceName('listGroupes')
                } 
                else{
                    console.log('error') 
                }
            }


        }
        event.preventDefault(); 
       
    }
    return(
        <div className="container">
            <div className="row headSection">
            {
                update ? <h4>Editer le groupe {itemToUpdate['identite_name']}</h4> : <h4>Créer un nouveau groupe</h4>
            }       
            </div>
            <div className="overflow-auto form-div" style={{height:"80vh"}}>
                <form>
                    <div className="form-section">
                        <div className="form-group row">
                            <label for="name" className="col-3 col-form-label label">Nom</label>
                            <div className="col-4">
                                <input type="text" className="form-control text-input" id="name" placeholder="nom du groupe"></input>
                            </div>
                        </div>
                        <div className="form-group row">
                                <label for="description" className="col-3 col-form-label label">Description</label>
                                <div className="col-4">
                                    <input type="text" className="form-control text-input" id="description" placeholder="Description"/>                        
                                </div>
                        </div>
                    </div>            
                    <hr></hr>
                    <div className="d-flex justify-content-center" style={{marginBottom:"20px"}}>
                        <button className="save-button" type="submit" onClick={(event) => CreateGroupes(event)}>
                            <span className="fa fa-save form-control-feedback font-weight-bold"></span>
                            <span> Enregistrer</span>
                        </button> 
                    </div>
    
                </form>     
                
            </div>
            
        </div>  
    );
}

export default CreateGroupesForm;