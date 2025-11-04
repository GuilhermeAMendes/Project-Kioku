// External Library
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

// Hooks
import useCreateMovie from "../../hooks/post/useCreateMovie";

// Types
import type { Genre } from "../../types";

// Components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CancelButton } from "../../components/buttons/CancelButton";
import { useNavigationHandler } from "../../../../shared/hooks/navigation/useNavigation";

// Constants
const GENRES: [Genre, ...Genre[]] = [
  "Action",
  "Comedy",
  "Drama",
  "Sci-Fi",
  "Horror",
  "Romance",
  "Adventure",
  "Thriller",
  "Documentary",
  "Fantasy",
];

const createMovieSchema = z.object({
  name: z.string().min(1, { message: "O nome é obrigatório" }),
  genre: z.enum(GENRES, { message: "Selecione um gênero válido" }),
  year: z
    .string()
    .min(4, { message: "O ano deve ter 4 dígitos" })
    .max(4, { message: "O ano deve ter 4 dígitos" })
    .regex(/^\d+$/, { message: "O ano deve conter apenas números" }),
});

type CreateMovieFormValues = z.infer<typeof createMovieSchema>;

export default function CreateMoviePage() {
  const form = useForm<CreateMovieFormValues>({
    resolver: zodResolver(createMovieSchema),
    defaultValues: {
      name: "",
      genre: undefined,
      year: "",
    },
  });

  const { createMovie, error, isLoading } = useCreateMovie();
  const { navigateTo } = useNavigationHandler();

  const onSubmit = async (payload: CreateMovieFormValues) => {
    const result = await createMovie(payload);

    if (result === null) {
      toast.error("Falha ao criar filme", {
        description: error?.message || "Erro interno no servidor.",
      });
      return;
    }

    toast.success(`Filme criado com sucesso!`, {
      description: "Redirecionando para a página inicial...",
    });
    navigateTo("/");
  };

  return (
    <div>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex w-full justify-between">
            <CardTitle className="text-2xl font-bold">Criar Filme</CardTitle>
            <CancelButton />
          </div>
          <CardDescription>
            Preencha os dados para adicionar um novo filme ao catálogo.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Clube da Luta"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="genre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gênero</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isLoading}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um gênero" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {GENRES.map((genre) => (
                          <SelectItem key={genre} value={genre}>
                            {genre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ano de Lançamento</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        inputMode="numeric"
                        maxLength={4}
                        placeholder="1999"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col-reverse sm:flex-row gap-2">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isLoading ? "Criando..." : "Criar Filme"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
