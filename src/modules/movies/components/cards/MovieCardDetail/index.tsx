// External Library

// Components
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Types
import type { Movie } from "@/modules/movies/types";

// Utils
import { getIconForGenre } from "@/modules/movies/utils/generator/generateGenreIcon";
import genreLabelMap from "@/modules/movies/utils/formatter/formatterGenreLabel";

interface MovieCardProps {
  movie: Movie;
}

export function MovieCardDetail({ movie }: MovieCardProps) {
  const IconComponent = getIconForGenre(movie.genre);
  const getGenreLabel = genreLabelMap[movie.genre];

  return (
    <Card className="h-full w-full overflow-hidden transition-transform duration-200 hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-bold line-clamp-2 h-[3.25rem]">
          {movie.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex items-center justify-center text-muted-foreground p-6">
        <IconComponent className="w-20 h-20 text-gray-700" />
      </CardContent>
      <CardFooter className="p-4 pt-2 flex flex-col items-start gap-2">
        <div className="flex justify-between items-center w-full">
          <Badge
            variant="secondary"
            className="capitalize bg-indigo-700 text-white"
          >
            {getGenreLabel}
          </Badge>
          <span className="text-sm font-medium text-muted-foreground">
            {movie.year}
          </span>
        </div>
        <p className="text-xs text-muted-foreground font-mono">
          ID: {movie.id}
        </p>
      </CardFooter>
    </Card>
  );
}
