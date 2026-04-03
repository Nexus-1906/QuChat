import HomeContext from "../../contexts/HomeContext";
import { useContext } from "react";
import EmptyChatWindow from "./ChatWindowComponents/EmptyChatWindow";
import NewRequest from "./ChatWindowComponents/NewRequest";
import RequestsToMe from "./ChatWindowComponents/RequestsToMe";
import EavesdroppableRequests from "./ChatWindowComponents/EavesdroppableRequests";
import ChatSession from "./ChatWindowComponents/ChatSession";

function ChatWindow() {
    const {
        showNewRequest, showRequestsToMe,
        showEavesdroppableRequests, showChatSession
    } = useContext(HomeContext)

    if (showNewRequest) 
        return <NewRequest />;
    if (showRequestsToMe) 
        return <RequestsToMe />;
    if (showEavesdroppableRequests)
        return <EavesdroppableRequests />;
    if (showChatSession)
        return <ChatSession />;
    return <EmptyChatWindow />;
}

export default ChatWindow;