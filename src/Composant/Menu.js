import '../Style/Menu.css'

function Menu({displaySuccessAlert, setDisplaySuccessAlert, utilisateursList, setUtilisateursList, setGroupesList,groupesList, updateUtilisateursList, updateGroupesList,setUpdateUtilisateursList,  setUpdateGroupesList, spaceName, setSpaceName}){    
    //utilisateurs request url
    var utilisateursRequestURL = 'http://localhost:8000/iam/personnes/'

    //groupes request url
    var groupesRequestURL = 'http://localhost:8000/iam/identite/'

    //paramètres de connexion à l'API
    var userName = "ruben";
    var passWord = "rubenslater";

    //fonction d'encodage des paramètres de connexion à l'API//
    function authenticateUser(user, password){
        var token = user + ":" + password;

        var hash = btoa(token); 

        return "Basic " + hash;
    }

    //fonction permettantt de récupérer la liste des catégories//
    function getUtilisateurs(requestURL, tmpList){
        //création de la requête
        var request = new XMLHttpRequest();
        
        request.open('GET', requestURL);
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
                console.log("tmplist: " + tmpList.length)
                setUtilisateursList(tmpList)
                console.log("catlist: " + utilisateursList.length)

                if(next != null){
                    tmpList = getUtilisateurs(next, tmpList)
                }
            }
        } 
    }



    //fonction permettant de récupérer la liste des groupes disponibles//
    function getGroupes(requestURL, tmpList){
        //création de la requête
        var request = new XMLHttpRequest();
        
        request.open('GET', requestURL);
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

                //tri de la liste récupérée dans l'ordre croissant
                tmpList.sort((a, b) => (a['identite_name'] > b['identite_name'] ? 1 : (b['identite_name'] > a['identite_name'] ? -1 : 0)))

                setGroupesList(tmpList)
                
                if(next != null){
                    tmpList = getGroupes(next, tmpList)
                }
            }
        }
    }

    

    return(
        <div className="col-2">
            <div className="row d-flex justify-content-center" 
                    style={{marginBottom:"15px", marginTop:"15px"}}>
                <button className="col-12 menu-button" onClick={() => {

                        if(updateUtilisateursList){
                            getUtilisateurs(utilisateursRequestURL, [])
                            setUpdateUtilisateursList(false)
                        }
                        setSpaceName("listUtilisateurs")
                        }}><i className="fa fa-list-ul link-item" ></i>Utilisateurs</button>
            </div>

            <div className="row d-flex justify-content-center" 
                    style={{marginBottom:"15px", marginTop:"15px"}}>
                <button className="col-12 menu-button" onClick={() => {
                        if(updateGroupesList){
                            getGroupes(groupesRequestURL, [])
                            setUpdateGroupesList(false)
                        }
                        setSpaceName("listGroupes")
                        }}><i className="fa fa-product-hunt link-item" ></i>Groupes</button>
            </div>
        
            <div className="row d-flex justify-content-center" 
                    style={{marginBottom:"15px", marginTop:"15px"}}>
                <button className="col-12 menu-button"><i className="fa fa-language link-item" ></i>Applications</button>
            </div>

            <div className="row d-flex justify-content-left" 
                    style={{marginBottom:"15px", marginTop:"15px"}}>
                <button className="col-12 menu-button"><i className="fa fa-money link-item" ></i>Ressources</button>
            </div>
        </div> 
  );

}

export default Menu;



