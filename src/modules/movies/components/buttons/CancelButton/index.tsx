"use client";

import { XIcon } from "lucide-react";

// Components
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Hooks
import { useNavigationHandler } from "@/shared/hooks/navigation/useNavigation";

export function CancelButton() {
  const { navigateTo } = useNavigationHandler();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button onClick={() => navigateTo("/")} variant="ghost" size="icon">
            <XIcon className="h-5 w-5" />
            <span className="sr-only">Cancelar</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Cancelar</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
