import {
  useState,
  useEffect,
  useRef,
} from "react";
import { io } from "socket.io-client";

const socket = io("http://192.168.68.61:3000//", {
  autoConnect: true,
  reconnectionDelayMax: 2000,
});

type Message = { name: string; textMessage: string };

function App() {
  const textMessage = useRef<HTMLInputElement | null>(null);
  const name = useRef<HTMLInputElement | null>(null);
  const [joined, setJoined] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const createMessage = () => {
    socket.emit(
      "createMessage",
      { name: "Luis", textMessage: textMessage.current?.value },
      (response: Message) => {
        console.log(response);
      }
    );
  };

  const joinRoom = () => {
    socket.emit("joinRoom", { name: name.current?.value }, () => {
      setJoined(true);
    });
  };

  useEffect(() => {
    socket.emit("findAll", {}, (response: Message[]) => {
      setMessages(response);
    });
  }, [messages]);

  return (
    <div className="h-full w-full flex flex-col justify-center items-center gap-2 ">
      <div
        id="messages"
        className="w-full max-h-96 overflow-y-scroll flex flex-col py-5 px-4 border bg-zinc-900 border-zinc-700 rounded-sm"
      >
        {messages.map((message, idx) => (
          <span
            key={`${idx}`}
          >{`[${message.name}] ${message.textMessage}`}</span>
        ))}
      </div>
      {!joined ? (
        <div className="w-full flex gap-2">
          <input
            ref={name}
            type="text"
            placeholder="Cual es tu nombre?"
            className="flex-1 py-2 px-2 rounded-sm bg-zinc-900 border-zinc-700"
          />
          <button
            onClick={joinRoom}
            className="hover:bg-indigo-900 border border-indigo-800"
          >
            Confirm
          </button>
        </div>
      ) : (
        <div className="w-full flex gap-2">
          <input
            ref={textMessage}
            type="text"
            placeholder="Escribe algo"
            className="flex-1 py-2 px-2 rounded-sm bg-zinc-900 border-zinc-700"
          />
          <button
            onClick={createMessage}
            className="hover:bg-indigo-900 border border-indigo-800"
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
