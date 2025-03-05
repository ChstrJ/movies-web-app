import { getMovieUrl } from "@/lib/utils";
import { useParams } from "react-router-dom";

const MoviePage = () => {
    const { id } = useParams();
    const movieUrl = getMovieUrl(id);

    console.log(movieUrl);

    return (
        <div className="flex justify-center items-center h-screen">
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
