import '../Style/Common.css'

import {useState} from 'react'

function Details({spaceName, setSpaceName, itemType, item, setItem, data, setData, isASearchResult, setIsASearchResult}){
    //utilisateurs request url
    var utilisateursRequestURL = 'http://127.0.0.1:8000/iam/personnes/'

    //groupes request url
    var groupesRequestURL = 'http://127.0.0.1:8000/iam/identite/'


    //etat contenant le message à afficher dans l'alerte de confirmation
    const [confirmAlertMsg, setConfirmAlertMsg] = useState('')

    //définition du titre de l'espace de travail
    let titleType

    //paramètres de connexion à l'API
    var userName = "ruben";
    var passWord = "rubenslater";

    //fonction d'encodage des paramètres de connexion à l'API//
    function authenticateUser(user, password){
        var token = user + ":" + password;

        // Should i be encoding this value????? does it matter???
        // Base64 Encoding -> btoa
        var hash = btoa(token); 

        return "Basic " + hash;
    }

    switch(itemType){
        case 'utilisateurs':
            titleType = "Liste des utilisateurs"
            break;
        case 'groupes':
            titleType = "Liste des groupes"
            break;
       }

    //fonction permettant de supprimer un élément//
    function deleteItem(){
        let requestURL

        //création de la requête
        switch(itemType){
            case 'utilisateurs':
                requestURL = utilisateursRequestURL + item['id'] + "/"
                break;
             case 'groupes':
                requestURL = utilisateursRequestURL + item['id'] + "/"
                    break;
        }

        var request = new XMLHttpRequest();
        
        request.open('DELETE', requestURL);
        request.setRequestHeader("Authorization", authenticateUser(userName, passWord)); 
        request.responseType = 'json';
        request.send();

        request.onload = function(){
            const requestStatus = request.status

            if(requestStatus === 204){
                //succès de la suppression
                //on supprime l'élément de la liste des data*/
                const deletedItemIndex = data.findIndex(tmpItem => tmpItem['id'] === item['id']);

                if(deletedItemIndex > -1){
                    
                    //on retire l'élément supprimé de la liste
                    const itemsList = data.filter(function(value, index, arr){
                        return index != deletedItemIndex
                    })
                    
                    setData(itemsList)

                     //on affiche l'élément suivant de la liste des datas
                    setItem(itemsList[(deletedItemIndex + 1) % itemsList.length])
                }
            }
        }

    }

    //fonction pour afficher l'élément reçu
    function displayItem(item){
        switch(itemType){
            case 'utilisateurs':
                return(
                    <div className="container" style={{marginTop: "10px"}}>
                        <div className="row d-flex justify-content-center">

                            <div className="col-6">
                                <div className="row">
                                    <span className="bold">Nom:&nbsp; </span> {item['person_name']}
                                </div>
                                <div className="row">
                                    <span className="bold">Date de création:&nbsp; </span>  {item['created_at']}
                                </div>
                                <div className="row">
                                    <span className="bold">Dernière modification:&nbsp; </span>  {item['update_at']}
                                </div>
                            </div>
                        </div>

                    </div>

                );
                break;
                case 'groupes':
                    return(
                    <div className="container" style={{marginTop: "10px"}}>
                        <div className="row d-flex justify-content-center">
                            <div className="col-6">
                                <div className="row">
                                    <span className="bold">Nom:&nbsp; </span> {item['identite_name']}
                                </div>
                                <div className="row">
                                    <span className="bold">Description:&nbsp; </span> {item['description']}
                                </div>
                                <div className="row">
                                    <span className="bold">Date de création:&nbsp; </span>  {item['created_at']}
                                </div>
                                <div className="row">
                                    <span className="bold">Dernière modification:&nbsp; </span>  {item['update_at']}
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center" style={{marginLeft:"70%" ,  marginTop:"100px" }}>
                            <button className="save-button">
                                <span className="fa fa-save form-control-feedback font-weight-bold"></span>
                                <span> Ajouter un utilisateur</span>
                            </button> 
                        </div>
                    </div>
                );
            break;
        }
    }

    return(
        <div className="container">
             <div className="row headSection" style={{fontSize:"large"}}>
                 {
                    isASearchResult ? <h4 className="col-4">Résultats de la recherche</h4> :
                    <h4 className="col-4">{titleType}</h4>
                 }
                
                <div className="col-8 d-flex justify-content-end vertical-center hover-pointer">
                    <a id="delete" className="black-link" style={{color:"black", marginRight:"20px"}} 
                        onClick={() =>{
                        document.getElementById('delete').href="#confirm-delete-alert"
                        
                        switch(itemType){
                            case 'utilisateurs':
                                setConfirmAlertMsg("Voulez-vous supprimer l'utilisateur sélectionnée " + item['person_name'] + " ?")
                                break;
                            case 'groupes':
                                  setConfirmAlertMsg("Voulez-vous supprimer le groupe sélectionné " + item['identite_name'] + " ?")
                                  break;
                        }
                    }
                    }>
                        <span className="material-icons md-48" title="supprimer">delete</span>
                    </a>

                    <span className="fa fa-caret-up" title="précédent" style={{fontSize:"x-large", marginRight:"10px"}} onClick={() =>{
                        //on remplace l'élément affiché par l'élément précédent dans la liste des datas
                        const itemIndex = data.findIndex(tmpItem => tmpItem['id'] === item['id']);

                        setItem(data[(itemIndex - 1 + data.length) % data.length])                        
                    }
                        
                    }></span>

                    <span className="fa fa-caret-down" title="suivant" style={{fontSize:"x-large"}} onClick={() =>{
                        //on remplace l'élément affiché par l'élément suivant dans la liste des datas
                        const itemIndex = data.findIndex(tmpItem => tmpItem['id'] === item['id']);

                        setItem(data[(itemIndex + 1) % data.length])                        
                    }
                        
                    }></span>
                </div>
            </div>

            {
                displayItem(item)
            }
            

            { 
                <div id="confirm-delete-alert" className="overlay">
                    <div className="container confirm-delete-alert bold-center" style={{fontSize:"large"}}>
                        <div className="row">
                            {confirmAlertMsg}
                        </div>
                        <div className="row d-flex justify-content-around" style={{marginBottom:"5px"}}>
                            <div className="col-6" onClick={() => {
                                //on supprime l'élément
                                deleteItem()
                            }
                            }>
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

export default Details;