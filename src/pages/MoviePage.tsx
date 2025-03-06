import { getMovieUrl } from "@/lib/utils";
import { useParams } from "react-router-dom";

const MoviePage = () => {
    const { id } = useParams();
    const movieUrl = getMovieUrl(id);

    return (
        <div className="h-screen">
            <iframe
                src={movieUrl}
                width="100%"
                height="100%"
                allowFullScreen
            >
            </iframe>
        </div>
    );
}

export default MoviePage;
