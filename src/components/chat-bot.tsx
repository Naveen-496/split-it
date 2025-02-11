import { Bot, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import axios from "axios";

export const ChatBot = ({
  expenseCallback,
}: {
  expenseCallback: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");

  const fetchMessages = async () => {
    const response = await axios.get("/api/ai/messages");
    if (response.status === 200) {
      setMessages(response.data);
    }
  };

  const sendMessage = async () => {
    if (userMessage) {
      const messageData = {
        content: userMessage,
        role: "user",
      };

      //   const savedUserMessageResponse = await axios.post("/api/ai/messages", [
      //     messageData,
      //   ]);

      //   if (savedUserMessageResponse.status !== 200) {
      //     return;
      //   }

      //   const data = savedUserMessageResponse.data[0];
      //   setMessages((prev) => ({ ...prev, data }));

      const response = await axios.post("/api/ai/messages/send", [
        ...messages,
        messageData,
      ]);
      if (response.status === 200) {
        const data = response.data;
        if (data.shouldReload) {
          expenseCallback();
        }
        console.log("Ai Message: ", data);
        const aiMessage = { role: "model", content: data.message };
        const messagesResponse = await axios.post("/api/ai/messages", [
          messageData,
          aiMessage,
        ]);
        if (messagesResponse.status === 200) {
          fetchMessages();
        }
      }
      setUserMessage("");
    }
  };

  const handleScroll = () => {
    if (scrollRef) {
      scrollRef.current?.scrollIntoView({ behavior: "instant", block: "end" });
    }
  };

  useEffect(() => {
    fetchMessages();
    handleScroll();
  }, []);

  useEffect(() => {
    handleScroll();
  }, [messages]);
  return (
    <div>
      <div
        className="fixed right-8 bottom-8 z-10 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <Bot className="size-10" />
      </div>
      {isOpen && (
        <div className="fixed inset-0 bg-transparent z-10">
          <div
            className={`h-0 ${
              isOpen ? "h-screen" : ""
            } transition-[height] duration-1000 relative z-10 bg-white w-[40%] border-l float-end`}
          >
            <div className="flex items-center justify-between border-b mb-2 p-4">
              <h2 className="text-lg font-semibold">
                Chat with your personal assistant
              </h2>
              <Button
                className="px-3"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                <X className="size-5" />
              </Button>
            </div>

            <div className="h-[85%] relative flex flex-col">
              <ScrollArea className="h-full w-full flex-1">
                <div className="p-2 flex flex-col gap-2">
                  {messages.map((message) => {
                    return (
                      <div
                        className={`w-full flex items-center ${
                          message.role === "model"
                            ? "justify-start"
                            : "justify-end"
                        }`}
                        key={message.id}
                      >
                        <div
                          className={`p-2 rounded-lg ${
                            message.role === "user" ? "bg-gray-200" : "border"
                          }`}
                          dangerouslySetInnerHTML={{ __html: message.content }}
                        ></div>
                      </div>
                    );
                  })}
                </div>
                <div ref={scrollRef}></div>
              </ScrollArea>
              <div className="h-20 w-full ">
                <Separator className="mb-2" />
                <div className="p-4 flex items-center gap-3">
                  <Input
                    onKeyPress={(event) => {
                      if (event.key === "Enter") {
                        sendMessage();
                      }
                    }}
                    type="text"
                    className="w-full"
                    value={userMessage}
                    onChange={({ target }) => setUserMessage(target.value)}
                  />
                  <Button onClick={sendMessage}>
                    <Send />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
