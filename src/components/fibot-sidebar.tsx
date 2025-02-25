"use client";

import {
  MessageSquare,
  Plus,
  Settings,
  User,
  Trash2,
  MoreHorizontal,
  LogOut,
  Share,
  Edit,
  Archive,
  ChevronDown,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const conversations = {
  today: [
    { id: 1, name: "Com puc matricular-me?" },
    { id: 2, name: "Dubtes sobre pràctiques" },
  ],
  thisWeek: [
    { id: 3, name: "Horaris laboratori ETSEIB" },
    { id: 4, name: "Assignatures optatives" },
  ],
  lastWeek: [
    { id: 5, name: "Beques Erasmus 2024" },
    { id: 6, name: "Dubtes PAR vs AC" },
  ],
};

type Conversation = {
  id: number;
  name: string;
};

function ConversationItem({ conv }: { conv: Conversation }) {
  return (
    <SidebarMenuItem key={conv.id}>
      <SidebarMenuButton className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <MessageSquare className="mr-2 h-4 w-4" />
          <span className="truncate ">{conv.name}</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="ml-auto" asChild>
            <MoreHorizontal className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Share className="mr-2 h-4 w-4" />
              <span>Compartir</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              <span>Canviar nom</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Archive className="mr-2 h-4 w-4" />
              <span>Arxivar</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Eliminar</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

function ConversationGroup({
  label,
  convs,
}: {
  label: string;
  convs: Conversation[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {convs.map((conv) => (
            <ConversationItem key={conv.id} conv={conv} />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export function FIBotSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => window.location.reload()}
              className="w-full"
            >
              <Plus className="mr-2 h-4 w-4" />
              <span>Nova conversa</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <ConversationGroup label="Avui" convs={conversations.today} />
        <ConversationGroup
          label="Aquesta setmana"
          convs={conversations.thisWeek}
        />
        <ConversationGroup
          label="Setmana passada"
          convs={conversations.lastWeek}
        />
      </SidebarContent>
      <SidebarFooter className="border-t border-border p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="text-destructive hover:text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Eliminar consultes</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Settings className="mr-2 h-4 w-4" />
              <span>Configuració</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="w-full">
                  <User className="mr-2 h-4 w-4" />
                  <span>Perfil</span>
                  <ChevronDown className="ml-auto h-4 w-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Editar perfil</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>Eliminar compte</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Tancar sessió</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
