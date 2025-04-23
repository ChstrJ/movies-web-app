import { useGeneralStore } from "@/stores/useGeneralStore";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

type Server = {
  serverUrl: string;
  serverName: string;
  default?: boolean;
};

type CustomTabProps = {
  data: Server[] | undefined | null;
  name: string;
};


export default function ServerPlayer({ data, name }: CustomTabProps) {
  const { setSelectedServer, selectedServer, setShowBackdropImage } = useGeneralStore();

  return (
    <div className="flex flex-col w-full text-white mb-2 p-2">
      <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
        <p className="col-span-full font-semibold">{name}</p>
        {data && data.map((item, index) => (
          <Button
            key={index}
            onClick={() => {
              setSelectedServer(item.serverUrl)
              setShowBackdropImage(false);
            }}
            className={cn(`bg-sky-500/30 cursor-pointer hover:bg-sky-950 border border-sky-500/30 ${item.serverUrl === selectedServer && 'bg-sky-950'}`)}
          >
            {item.serverName}
          </Button>
        ))}
      </div>
    </div>
  )
}
