// External Library
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Loader2, TriangleAlertIcon, SearchIcon, SaveIcon } from "lucide-react";

// Hooks
import useUpdateMovie from "../../hooks/put/usePutMovie";
import useGetMovieById from "../../hooks/get/useGetMovieById";
import { useNavigationHandler } from "@/shared/hooks/navigation/useNavigation";

// Types
import type { Movie, Genre, PutMoviePayload } from "../../types";

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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CancelButton } from "../../components/buttons/CancelButton";

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

const movieFormSchema = z.object({
  name: z.string().min(1, { message: "O nome é obrigatório" }),
  genre: z.enum(GENRES, { message: "Selecione um gênero válido" }),
  year: z
    .string()
    .min(4, { message: "O ano deve ter 4 dígitos" })
    .max(4, { message: "O ano deve ter 4 dígitos" })
    .regex(/^\d+$/, { message: "O ano deve conter apenas números" }),
});

// Types
type MovieFormValues = z.infer<typeof movieFormSchema>;

export default function EditMoviePage() {
  type PageStatus = "searching" | "loading" | "editing" | "notFound";
  const [status, setStatus] = useState<PageStatus>("searching");
  const [searchId, setSearchId] = useState("");
  const [foundMovie, setFoundMovie] = useState<Movie | null>(null);

  const { navigateTo } = useNavigationHandler();

  const { updateMovie, isLoading: isUpdating } = useUpdateMovie();
  const { getMovie, isLoading: isSearching, error } = useGetMovieById();

  const form = useForm<MovieFormValues>({
    resolver: zodResolver(movieFormSchema),
    defaultValues: { name: "", genre: undefined, year: "" },
  });

  const handleSearch = async () => {
    if (searchId.trim() === "") {
      toast.error("Por favor, digite um ID.");
      return;
    }

    setStatus("loading");

    const result = await getMovie(searchId);

    if (result === null) {
      setStatus("notFound");
    } else {
      setFoundMovie(result);
      form.reset({
        name: result.name,
        genre: result.genre,
        year: result.year,
      });
      setStatus("editing");
    }
  };

  const onSubmit = async (data: MovieFormValues) => {
    if (!foundMovie) return;

    const payload: PutMoviePayload = {
      id: foundMovie.id,
      name: data.name,
      genre: data.genre,
      year: data.year,
    };

    const result = await updateMovie(payload);

    if (result) {
      toast.success("Filme alterado com sucesso!");
      navigateTo("/");
    }
  };

  if (status === "searching") {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex w-full justify-between">
            <CardTitle>Alterar Filme</CardTitle>
            <CancelButton />
          </div>
          <CardDescription>
            Digite o ID do filme que você deseja alterar.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="searchId" className="text-sm font-medium">
              ID do Filme
            </label>
            <Input
              id="searchId"
              placeholder="Digite o ID aqui..."
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              disabled={isSearching}
            />
          </div>
          <div className="flex flex-col-reverse sm:flex-row gap-2">
            <Button
              type="button"
              onClick={handleSearch}
              className="w-full"
              disabled={isSearching}
            >
              {isSearching ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <SearchIcon className="mr-2 h-4 w-4" />
              )}
              {isSearching ? "Buscando..." : "Procurar"}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (status === "notFound") {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Filme Não Encontrado</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert variant="destructive">
            <TriangleAlertIcon className="h-4 w-4" />
            <AlertTitle>Erro</AlertTitle>
            <AlertDescription>
              {error?.message ||
                "Nenhum filme foi encontrado com o ID fornecido."}
            </AlertDescription>
          </Alert>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setStatus("searching")}
          >
            Tentar Novamente
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (status === "editing") {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex w-full justify-between">
            <CardTitle>Alterar Filme</CardTitle>
            <CancelButton />
          </div>
          <CardDescription>
            Modifique os dados do filme: {foundMovie?.name}
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
                      <Input {...field} disabled={isUpdating} />
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
                      disabled={isUpdating}
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
                    <FormLabel>Ano</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        maxLength={4}
                        {...field}
                        disabled={isUpdating}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col-reverse sm:flex-row gap-2">
                <Button type="submit" className="w-full" disabled={isUpdating}>
                  {isUpdating ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <SaveIcon className="mr-2 h-4 w-4" />
                  )}
                  {isUpdating ? "Alterando..." : "Alterar"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    );
  }

  return null;
}
