import { getImagePath } from "@/lib/utils";
import { Play } from "lucide-react";

type MovieCardProps = {
  img?: string;
  title?: string;
};

const MovieCard = ({ img, title }: MovieCardProps) => {
  const src = getImagePath();
  return (
    <div className="relative aspect-[2/3] overflow-hidden group">
      <img
        src={`${src}/w500/${img}`}
        alt={title}
        className="object-cover w-full h-full transition-all duration-300 group-hover:scale-110 group-hover:blur-[1px]"
      />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Play className="w-16 h-16 text-white" />
      </div>
    </div>
  );
};

export default MovieCard;
