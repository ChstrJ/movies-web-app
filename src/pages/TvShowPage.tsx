import { getVideoPath } from "@/lib/utils";
import { useSearchStore } from "@/stores/useSearchStore";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const TvShowPage = () => {
    const { setResultsDropdown } = useSearchStore();
    const { id } = useParams();
    const basePath = getVideoPath();
    const showUrl = `${basePath}/tv/${id}`;

    useEffect(() => {
        setResultsDropdown(false);
    }, []);

    return (
        <div className="h-screen">
            <iframe
                src={showUrl}
                width="100%"
                height="100%"
                allowFullScreen
                sandbox="allow-scripts allow-same-origin allow-forms"
            >
            </iframe>
        </div>
    );
};

export default TvShowPage;

