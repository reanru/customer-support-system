import { createContext, useContext } from "react";
import { Socket } from "socket.io-client";

export const SocketContext = createContext<Socket | null>(null);

// export const useSocket = () : Socket => {
//     const socket = useContext(SocketContext);

//     if(!socket){
//         throw new Error("Socket not available in context");
//     }

//     return socket;
// }