import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils";
import { useGeneralStore } from "@/stores/useGeneralStore"

type Server = {
  serverUrl: string;
  serverName: string;
  default?: boolean;
}

type CustomTabProps = {
  data: Server[]
}

export default function CustomTab({ data }: CustomTabProps) {
  const { setSelectedServer, selectedServer, setShowBackdropImage } = useGeneralStore();

  const handleClick = (server: string) => {
    setSelectedServer(server);
    setShowBackdropImage(false);
  }

  return (
    <Tabs value={selectedServer ?? ''}>
      <TabsList className="gap-2 flex justify-start">
        {data?.map((item, index) => (
          <TabsTrigger
            key={index}
            value={item.serverUrl}
            onClick={() => handleClick(item.serverUrl)}
            className={cn
              "border border-gray-500 text-white px-4 py-2 rounded-lg cursor-pointer",
          "transition-all duration-300 ease-in-out",
          "hover:bg-slate-700 hover:scale-105",
          "data-[state=active]:bg-slate-700 data-[state=active]:text-white"
        )}
          >
        {item.serverName}
      </TabsTrigger>
        ))}
    </TabsList>
    </Tabs >
  )
}

