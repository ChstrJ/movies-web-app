import { getImagePath } from "@/lib/utils";

type MovieCardProps = {
  img: string,
  title: string
}

const MovieCard = ({ img, title }: MovieCardProps) => {
  const src = getImagePath();
  return (
    <div className="relative aspect-[2/3] overflow-hidden">
      <img
        src={`${src}/w500/${img}`}
        alt={title}
        className="object-cover w-full h-full transition-transform duration-200 hover:scale-110"
      />
    </div>

  );
};

export default MovieCard;
