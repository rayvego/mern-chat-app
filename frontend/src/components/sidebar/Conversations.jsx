import Conversation from "./Conversation.jsx";

export const Conversations = () => {
    return (
        <div className={"flex flex-col py-2 overflow-auto"}>
            <Conversation/>
            <Conversation/>
            <Conversation/>
            <Conversation/>
        </div>
    )
}

export default Conversations