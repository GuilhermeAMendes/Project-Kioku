// External Library
import type { LucideIcon } from "lucide-react";
import {
  Bomb,
  Compass,
  Smile,
  VenetianMask,
  Wand2,
  Ghost,
  Heart,
  Rocket,
  Crosshair,
  Camera,
  FilmIcon,
} from "lucide-react";

// Types
import type { Genre } from "../../types";

const genreIconMap: Record<Genre, LucideIcon> = {
  Action: Bomb,
  Adventure: Compass,
  Comedy: Smile,
  Drama: VenetianMask,
  Fantasy: Wand2,
  Horror: Ghost,
  Romance: Heart,
  "Sci-Fi": Rocket,
  Thriller: Crosshair,
  Documentary: Camera,
};

export const getIconForGenre = (genre: Genre): LucideIcon => {
  return genreIconMap[genre] || FilmIcon;
};
