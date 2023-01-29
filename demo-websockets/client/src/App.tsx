import { useState, useEffect } from "react";
// import { Manager } from "socket.io-client"

// const manager = new Manager("http://localhost:3000/", {
//   autoConnect: true,
//   reconnectionDelayMax: 2000
// })

// const socket = manager.socket("/")

function App() {
  const [input, setInput] = useState("");
  const messages: { name: string; textMessage: string }[] = [];

  const createMessage = (input: string) => {
  };
  
  useEffect(() => {
    // socket.on("message", () => {})
  }, [messages]);

  return (
    <div className="h-full w-full flex flex-col justify-center items-center gap-2 ">
      <div
        id="messages"
        className="w-full max-h-96 overflow-y-scroll flex flex-col py-5 px-4 border bg-zinc-900 border-zinc-700 rounded-sm"
      >
        {messages.map((message, idx) => (
          <span
            id={`${idx}`}
          >{`[${message.name}] ${message.textMessage}`}</span>
        ))}
      </div>
      <div className="w-full flex gap-2">
        <input
          type="text"
          onChange={(e) => setInput(e.target.value)}
          value={input}
          placeholder="Escribe algo"
          className="flex-1 py-2 px-2 rounded-sm bg-zinc-900 border-zinc-700"
        />
        <button
          onClick={() => createMessage(input)}
          className="hover:bg-indigo-900 border border-indigo-800"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
