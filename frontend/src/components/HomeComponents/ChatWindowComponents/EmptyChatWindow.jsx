function EmptyChatWindow({
    setShowRequestsToMe, setShowEavesdroppableRequests, setShowNewRequest
}) {
    
    function cbRequestsToMe() {
        setShowEavesdroppableRequests(false);
        setShowNewRequest("");
        setShowRequestsToMe(true);
    }

    function cbEavesdroppableRequests() {
        setShowRequestsToMe(false);
        setShowNewRequest("");
        setShowEavesdroppableRequests(true);
    }

    /**
     * Contains links to RequestsToMe and EavesdroppableRequests
     * When clicked on a link, use the setState functions provided above to set it to true (all others must be false)
     */
    return (
        <>
        </>
    );

}

export default EmptyChatWindow;