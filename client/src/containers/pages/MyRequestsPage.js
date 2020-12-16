import {useState, useEffect} from 'react'
import RequestDetail from '../../components/myRequestsPage/RequestDetail';
import RequestList from '../../components/myRequestsPage/RequestList';
import { getRequestsByOwnerId, getRequestsByRequesterId } from '../../fetches/RequestFetch';

const MyRequestsPage = ({currentUser}) => {
    const [requestsShare, setRequestsShare] = useState([])
    const [requestsBorrow, setRequestsBorrow] = useState([])
    const [selectedRequest, setSelectedRequest] = useState({})
    

    useEffect(() => {
        if(currentUser != null){
        console.log(currentUser.id)    
		getRequestsByOwnerId(currentUser.id).then((data) => {
			setRequestsShare(data);
        });}
    }, [currentUser]);

    useEffect(()=>{
        if(currentUser != null){
        getRequestsByRequesterId(currentUser.id).then((data) => {
            setRequestsBorrow(data);
        });}
    }, [currentUser]);

    const handleSelectRequest = (event)=>{
        setSelectedRequest(JSON.parse(event.target.value));
    }

    return(
        <>
            <h2>Books I'm Sharing:</h2>
            <RequestList currentUser={currentUser} requests={requestsShare}/>
            <h2>Books I'm Receiving:</h2>
            <RequestList currentUser={currentUser} requests={requestsBorrow} handleSelectRequest={handleSelectRequest}/>
            <RequestDetail selectedRequest={selectedRequest}/>
        </>
    );
};

export default MyRequestsPage;