// External Library
import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigationHandler } from "@/shared/hooks/navigation/useNavigation";

export default function NotFoundPage() {
  const { navigateTo } = useNavigationHandler();

  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
      <SearchX className="h-24 w-24 text-muted-foreground/50" />
      <h1 className="mt-8 text-5xl font-bold tracking-tight text-primary">
        404
      </h1>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight">
        Página Não Encontrada
      </h2>
      <p className="mt-4 text-lg text-muted-foreground max-w-md">
        Desculpe, a página que você está procurando não existe ou foi movida
        para outro local.
      </p>
      <Button onClick={() => navigateTo("/")} className="mt-8" size="lg">
        Voltar para o Início
      </Button>
    </div>
  );
}
