import { useContext, useState } from "react";
import { AuthContext } from "./context";

const initialChatHistory = [{ id: 0, message: "Ola!", sentByMe: false }];

function Chat() {
  const { sessionId } = useContext(AuthContext);

  const [chatHistory, setChatHistory] = useState(initialChatHistory);
  const [currentMessage, setCurrentMessage] = useState("");

  const handleSendMessage = () => {
    if (!currentMessage && !sessionId) return;

    setChatHistory((prevState) => [
      ...prevState,
      { id: Date.now(), message: currentMessage, sentByMe: true },
    ]);

    // POST request here with sessionId
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-screen w-screen text-white">
      <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-200 p-4 text-gray-800 selection:bg-green-700">
        <div className="flex w-full max-w-xl flex-grow flex-col overflow-auto rounded-lg bg-white shadow-xl">
          <div
            id="chat-container"
            className="flex h-0 flex-grow flex-col overflow-auto p-4"
          >
            {chatHistory.map(({ id, sentByMe, message }) => {
              if (sentByMe) {
                return (
                  <div
                    key={id}
                    className="ml-auto mt-4 flex w-full max-w-xs justify-end space-x-3"
                  >
                    <div>
                      <div className="rounded-l-lg rounded-br-lg bg-green-600 p-3 text-white">
                        <p className="text-sm">{message}</p>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div key={id} className="mt-4 flex w-full max-w-xs space-x-3">
                  <div>
                    <div className="rounded-r-lg rounded-bl-lg bg-gray-200 p-3">
                      <p className="text-sm">{message}</p>
                    </div>
                    {/* 
                      <span
                        className="cursor-pointer text-xs text-slate-600 transition-colors hover:text-slate-500"
                        // onClick={onOpen}
                      >
                        Reportar mensagem
                      </span>
                    */}
                  </div>
                </div>
              );
            })}

            {/* {loading && (
              <span className="mt-4 text-sm text-gray-500">Digitando...</span>
            )} */}
          </div>

          <div className="flex gap-2 bg-gray-200 p-4">
            <input
              className="flex h-10 w-full items-center rounded px-3 text-sm"
              type="text"
              placeholder="Digite uma pergunta"
              value={currentMessage}
              onChange={(event) => setCurrentMessage(event.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              className="rounded bg-green-600 p-2 text-sm font-medium text-white transition-colors hover:bg-slate-400"
              onClick={handleSendMessage}
            >
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
