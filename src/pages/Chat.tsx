import { useEffect, useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
import { socket } from "../socket";
import { MessageSenderProfile } from "../components/types";
import { v4 as uuidv4 } from "uuid";

export interface Message {
  id: string;
  text: string;
  sender: MessageSenderProfile;
}

const Chat = () => {
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Halo, bagaimana saya bisa membantu anda?",
      sender: MessageSenderProfile.BOT,
    },
    // { id: "2", text: "I need some information.", sender: MessageSenderProfile.USER },
  ]);

  const [inputMsg, setInputMsg] = useState("");

  const updateMessageToGemini = (e: any) => {
    setInputMsg(e.target.value);
  };

  const sendUserMessage = (e: any) => {
    e.preventDefault();

    if (!inputMsg.trim()) return;

    console.log("tes", inputMsg);

    socket.emit("chat message", inputMsg);
    // socket.emit('response message', inputMsg);

    setInputMsg("");
  };

  useEffect(() => {
    console.log(inputMsg);
  }, [inputMsg]);

  useEffect(() => {
    socket.emit("join-room", `room-1`);

    return () => {
      socket.emit("leave-room", `room-1`);
    };
  }, []);

  useEffect(() => {
    socket.off("chat message");
    socket.off("response message");

    socket.on("chat message", (msg) => {
      const data = {
        id: uuidv4(),
        text: msg,
        sender: MessageSenderProfile.USER,
      };

      console.log("user menerima: ", msg);

      setMessages((prevMessages) => [...prevMessages, data]);
    });

    socket.timeout(5000).on("response message", (msg) => {
      setTimeout(() => {
        const data = {
          id: uuidv4(),
          text: msg,
          sender: MessageSenderProfile.BOT,
        };

        console.log("bot menerima: ", msg);

        setMessages((prevMessages) => [...prevMessages, data]);
      }, 100); // 2000 ms = 2 detik
    });

    return () => {
      socket.off("chat message");
      socket.off("response message");
    };
  }, []);

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendUserMessage(e);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="font-poppins">
      <Sidebar />
      <ul className="space-y-5 max-h-[400px] overflow-y-auto">
        {messages.map((message) => {
          if (message.sender === MessageSenderProfile.BOT) {
            return (
              <li className="max-w-4xl flex gap-x-2 sm:gap-x-4 me-11 ml-[18rem]">
                <img
                  className="inline-block size-9 rounded-full w-10 h-10"
                  src="https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&&auto=format&fit=facearea&facepad=3&w=300&h=300&q=80"
                  alt="Avatar"
                />

                <div>
                  <div className="bg-white border border-gray-200 rounded-2xl p-4 space-y-3 dark:bg-neutral-900 dark:border-neutral-700">
                    {/* <h2 className="font-medium text-gray-800 dark:text-white">
                      How can we help?
                    </h2> */}
                    <div className="space-y-1.5">
                      <ul className="list-none space-y-1.5">
                        <li className="text-sm text-gray-800 dark:text-white">
                          {message.text}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
            );
          } else {
            return (
              <li className="flex ms-auto gap-x-2 sm:gap-x-4 mr-[2rem]">
                <div className="grow text-end space-y-3">
                  <div className="inline-flex flex-col justify-end">
                    <div className="inline-block bg-blue-600 rounded-2xl p-4 shadow-sm">
                      <p className="text-sm text-white">{message.text}</p>
                    </div>
                  </div>
                </div>

                <span className="inline-block w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
                  <span className="text-sm font-medium text-white leading-none">
                    AZ
                  </span>
                </span>
              </li>
            );
          }
        })}
        <div ref={messagesEndRef} />
      </ul>

      {/* Chat textbox */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-neutral-900 py-9 px-6 w-full max-w-4xl ml-[20rem]">
        <form className="relative">
          <textarea
            onChange={updateMessageToGemini}
            onKeyDown={handleKeyDown}
            className="border-2 p-4 pb-12 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
            placeholder="Ask me anything..."
            value={inputMsg}
          ></textarea>

          <div className="absolute bottom-px inset-x-px p-2 rounded-b-lg bg-white dark:bg-neutral-900">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                {/* <button
                  type="button"
                  className="inline-flex shrink-0 justify-center items-center size-8 rounded-lg text-gray-500 hover:bg-gray-100 focus:z-10 focus:outline-none focus:bg-gray-100 dark:text-neutral-500 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                >
                  <svg
                    className="shrink-0 size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                    <line x1="9" x2="15" y1="15" y2="9"></line>
                  </svg>
                </button>
                <button
                  type="button"
                  className="inline-flex shrink-0 justify-center items-center size-8 rounded-lg text-gray-500 hover:bg-gray-100 focus:z-10 focus:outline-none focus:bg-gray-100 dark:text-neutral-500 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                >
                  <svg
                    className="shrink-0 size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
                  </svg>
                </button> */}
              </div>
              <div className="flex items-center gap-x-1">
                {/* <button
                  type="button"
                  className="inline-flex shrink-0 justify-center items-center size-8 rounded-lg text-gray-500 hover:bg-gray-100 focus:z-10 focus:outline-none focus:bg-gray-100 dark:text-neutral-500 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                >
                  <svg
                    className="shrink-0 size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                    <line x1="12" x2="12" y1="19" y2="22"></line>
                  </svg>
                </button> */}
                <button
                  onClick={sendUserMessage}
                  type="button"
                  className="inline-flex shrink-0 justify-center items-center size-8 rounded-lg text-white bg-blue-600 hover:bg-blue-500 focus:z-10 focus:outline-none focus:bg-blue-500"
                >
                  <svg
                    className="shrink-0 size-3.5"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chat;
