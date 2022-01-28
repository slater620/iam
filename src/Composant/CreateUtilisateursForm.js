import '../Style/Form.css'
import '../Style/Common.css'
import React, {useState} from 'react'
function CreateUtilisateursForm({spaceName,setSpaceName ,utilisateursList, serUtilisateursList, groupesList , setGroupesList , update, setUpdate, itemToUpdate, setItemToUpdate}){

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
    function CreateUser(event){
        const person_name = document.querySelector('#name').value
        const surname = document.querySelector('#prenom').value
        const password = document.querySelector('#password').value
        const email = document.querySelector('#email').value

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
  
          if(person_name === ""){
              error = true
              setAlertMsg("Veuillez renseigner le champ nom!")
          }
          if(password === ""){
              error = true
              setAlertMsg("Veuillez renseigner le champ mot de passe!")
          }
          if(email === ""){
              error = true
              setAlertMsg("Veuillez renseigner le champ adresse email")
          }
          if(surname === ""){
            error = true
            setAlertMsg("Veuillez renseigner le champ prenom")
        }
        var utilisateur ={person_name,surname, email, password};
        if (!update) {
            var requestURL = 'http://127.0.0.1:8000/iam/personnes/';
            var request = new XMLHttpRequest();
            request.open('POST', requestURL);
            request.setRequestHeader("Authorization", authenticateUser(userName,passWord));
            request.responseType = 'json';
            request.send(JSON.stringify(utilisateur));
            request.onload = function() {
                const requestStatus = request.status;
                if (requestStatus === 201) {
                    console.log('good');
                    setSpaceName("listUtilisateurs")
                }
                else{
                    console.log('error')
                }
            } 
        }
        else {
            var requestURL = 'http://127.0.0.1:8000/iam/personnes/' + itemToUpdate['id'] + "/";
            var request = new XMLHttpRequest();
            request.open('PATCH', requestURL);
            request.setRequestHeader('Content-Type', 'application/json');
            request.setRequestHeader("Authorization", authenticateUser(userName,passWord));
            request.responseType = 'json';
            request.send(JSON.stringify(utilisateur));
            request.onload = function() {
                const requestStatus = request.status;
                if (requestStatus === 200) {

                    console.log('good');
                    //la requête a réussi
                        //on remplace l'élément dans la liste des données
                        const index = utilisateursList.findIndex(utilisateur => utilisateur['id'] === itemToUpdate['id'])

                        if(index > -1 && index < utilisateursList.length){
                            utilisateursList[index] = request.response
                        }

                        setUpdate(false)

                        //on retourne à la liste des utilisateurs
                        setSpaceName('listUtilisateurs')
                }
                else{
                    console.log('error')
                }
            }
            event.preventDefault(); 


        }
       
    }
    return(
        <div className="container">
            <div className="row headSection">
            {
            update ? <h4>Editer l'utilisateur {itemToUpdate['person_name']}</h4> : <h4>Créer un nouveau utilisateur</h4>
            }       
            </div>
            <div className="overflow-auto form-div" style={{height:"80vh"}}>
                <form>
                    <div className="form-section">
                        <div className="form-group row">
                            <label for="name" className="col-3 col-form-label label">Nom</label>
                            <div className="col-4">
                                <input type="text" className="form-control text-input" id="name" placeholder="nom de l'utilisateur"></input>
                            </div>
                        </div>
                        <div className="form-group row">
                                <label for="prenom" className="col-3 col-form-label label">Prenom</label>
                                <div className="col-4">
                                    <input type="text" className="form-control text-input" id="prenom" placeholder="prenom de l'utilisateur"/>                        
                                </div>
                        </div>
                        <div className="form-group row">
                                <label for="email" className="col-3 col-form-label label">Email</label>
                                <div className="col-4">
                                    <input type="email" className="form-control text-input" id="email" placeholder="addresse mail de l'utilisateur"/>                        
                                </div>
                        </div>

                        <div className="form-group row">
                                <label for="password" className="col-3 col-form-label label">mot de passe</label>
                                <div className="col-4">
                                    <input type="text" placeholder="mot de passe de l'utilisateur" className="form-control text-input" id="password"/>                         
                                </div>
                        </div>
                        

                    </div>            
                    <hr></hr>
                    <div className="d-flex justify-content-center" style={{marginBottom:"20px"}}>
                        <button className="save-button" type="submit" onClick={(event) => CreateUser(event)}>
                            <span className="fa fa-save form-control-feedback font-weight-bold"></span>
                            <span> Enregistrer</span>
                        </button>
                    </div>
    
                </form>     
                
            </div>
            
        </div>  
    );
}

export default CreateUtilisateursForm;