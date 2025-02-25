import { FIBotChat } from "@/components/fibot-chat";
import { FIBotSidebar } from "@/components/fibot-sidebar";

export default function Home() {
  return (
    <main className="w-full h-screen flex p-4 overflow-hidden">
      <FIBotSidebar />
      <FIBotChat />
    </main>
  );
}
