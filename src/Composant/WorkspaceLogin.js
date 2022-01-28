import Account from "./Account";
import Login from "./Login";
import Application from "./Application";

function WorkspaceLogin({spaceName , setSpaceName}){

    switch (spaceName) {
        case 'createAccount':
            return <Account spaceName={spaceName} setSpaceName={setSpaceName}/>; 
            break;
        case 'login':
            return <Login spaceName={spaceName} setSpaceName={setSpaceName} />;
            break;
        case 'isLogin' :
            return <Application spaceName={spaceName} setSpaceName={setSpaceName}/>;
            break;
        }
}
export default WorkspaceLogin;