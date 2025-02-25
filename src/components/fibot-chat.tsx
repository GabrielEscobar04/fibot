"use client";

import Image from "next/image";
import {
  ClipboardCheck,
  Send,
  ShieldAlert,
  Sidebar,
  Sparkles,
} from "lucide-react";
import { useState, FormEvent } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useSidebar } from "./ui/sidebar";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Separator } from "./ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const capabilities = [
  {
    title: "Respondre preguntes",
    description:
      "Puc respondre a una àmplia gamma de preguntes sobre temes relacionats amb la FIB i la UPC.",
    icon: Sparkles,
  },
  {
    title: "Ajudar amb tasques",
    description:
      "Puc ajudar-te a planificar i organitzar les teves tasques diàries.",
    icon: ClipboardCheck,
  },
  {
    title: "Precaucions",
    description:
      "Puc donar respostes incorrectes o poc precíses. Siusplau, no confiïs en mi per a informació crítica.",
    icon: ShieldAlert,
  },
];

const defaultResponses = [
  "Entenc el que dius. Com puc ajudar-te més?",
  "Això és interessant. Pots explicar-me més sobre això?",
  "Gràcies per compartir. Tens alguna altra pregunta?",
  "Estic aquí per ajudar-te. Què més vols saber?",
  "Aquesta és una bona observació. Vols que aprofundim en aquest tema?",
];

type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

export function FIBotChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toggleSidebar } = useSidebar();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim()) {
      const userMessage: Message = {
        id: Date.now(),
        role: "user",
        content: input,
      };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInput("");
      setIsLoading(true);

      // Simulate AI response
      setTimeout(() => {
        const randomResponse =
          defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
        const aiMessage: Message = {
          id: Date.now(),
          role: "assistant",
          content: randomResponse,
        };
        setMessages((prevMessages) => [...prevMessages, aiMessage]);
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <section className="flex flex-col h-screen w-full">
      <div className="flex items-center gap-4">
        <Sidebar
          size={32}
          className="hover:bg-muted p-1 rounded-lg text-muted-foreground hover:text-black transition-colors"
          onClick={() => toggleSidebar()}
        />
        <Separator orientation="vertical" className="h-6" />
        <Select value="FIBot-v1">
          <SelectTrigger className="w-28">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="FIBot-v1">FIBot v1</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="max-w-5xl w-full h-full mx-auto flex flex-col p-4">
        {/* Main content area */}
        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="flex flex-col h-full">
              <div className="flex flex-col items-center justify-center">
                <Image
                  src="/fibot.png"
                  alt="FIBot"
                  width={300}
                  height={300}
                  className="mx-auto"
                />
                <h1 className="text-3xl font-bold mb-6 text-center"></h1>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6 w-full">
                  {capabilities.map((capability, index) => (
                    <Card key={index} className="relative overflow-hidden">
                      <CardHeader>
                        <h2 className="text-xl font-semibold">
                          {capability.title}
                        </h2>
                      </CardHeader>
                      <CardContent>
                        <p>{capability.description}</p>
                      </CardContent>
                      <capability.icon
                        className="absolute text-red-500 -right-8 -bottom-8 opacity-5 -z-1"
                        size={164}
                      />
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-lg ${
                      m.role === "user"
                        ? "bg-blue-500 text-white rounded-br-none"
                        : "bg-gray-100 text-black rounded-bl-none"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-4">
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escriu el teu missatge..."
              type="text"
              disabled={isLoading}
            />
            <Button size="icon" type="submit" disabled={isLoading}>
              <Send size={20} />
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
