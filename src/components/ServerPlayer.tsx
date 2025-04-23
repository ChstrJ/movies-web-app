import { useGeneralStore } from "@/stores/useGeneralStore";
import { Button } from "./ui/button";

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
    <div className="flex flex-col w-full text-white">
      <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
        <p className="col-span-full font-semibold">{name}</p>
        {data && data.map((item) => (
          <Button
            onClick={() => {
              setSelectedServer(item.serverUrl)
              setShowBackdropImage(false);
            }}
            className={`${selectedServer === item.serverUrl ? 'bg-blue-900' : ''
              } cursor-pointer`}
          >
            {item.serverName}
          </Button>
        ))}
      </div>
    </div>
  )
}
