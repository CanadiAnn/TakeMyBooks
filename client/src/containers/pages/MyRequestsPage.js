import {useState, useEffect} from 'react'
import RequestDetail from '../../components/myRequestsPage/RequestDetail';
import RequestList from '../../components/myRequestsPage/RequestList';
import { getRequestsByOwnerId, getRequestsByRequesterId } from '../../fetches/RequestFetch';

const MyRequestsPage = ({currentUser}) => {
    const [requestsShare, setRequestsShare] = useState([])
    const [requestsBorrow, setRequestsBorrow] = useState([])
    const [selectedRequest, setSelectedRequest] = useState({})
    const [requestIsSelected, setRequestIsSelected] = useState(false)

    useEffect(() => {
        if (Object.keys(currentUser).length === 0 && currentUser.constructor === Object){
            return null;
        }
        console.log(currentUser.id)
        getRequestsByOwnerId(currentUser.id)
        .then((data) => {
        setRequestsShare(data);
        });
    }, [currentUser, selectedRequest]);

    useEffect(()=>{
        if(Object.keys(currentUser).length === 0 && currentUser.constructor === Object){
            return null;
        }
        getRequestsByRequesterId(currentUser.id)
        .then((data) => {
        setRequestsBorrow(data);
        });
    }, [currentUser, selectedRequest]);

    const handleSelectRequest = (event)=>{
        setSelectedRequest(JSON.parse(event.target.value));
        setRequestIsSelected(true);
    };

    const resetSelectRequest = () => {
        setSelectedRequest(null);
        setRequestIsSelected(false);
    };
    
    if (Object.keys(currentUser).length === 0 && currentUser.constructor === Object) {
        return <p>Please login to continue</p>
    }
    if(!requestIsSelected){
        return(
            <>
            <h2>Books I'm Sharing:</h2>
            <RequestList currentUser={currentUser} requests={requestsShare} handleSelectRequest={handleSelectRequest}/>
            <h2>Books I'm Receiving:</h2>
            <RequestList currentUser={currentUser} requests={requestsBorrow} handleSelectRequest=  {handleSelectRequest}/>
            </>
        )
    } else {
        return(
            <RequestDetail resetSelectRequest={resetSelectRequest} currentUser={currentUser} selectedRequest={selectedRequest}/>
        );
    };
};
export default MyRequestsPage;
