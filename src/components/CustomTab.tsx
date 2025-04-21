import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useGeneralStore } from "@/stores/useGeneralStore"

type Server = {
  serverUrl: string;
  serverName: string;
}

type CustomTabProps = {
  data: Server[]
}

export default function CustomTab({ data }: CustomTabProps) {
  const { setSelectedServer, selectedServer } = useGeneralStore();

  const handleClick = (server: string) => {
    setSelectedServer(server)
  }

  return (
    <Tabs defaultValue="" className="w-full">
      <TabsList
        className="gap-2"
      >
        {data?.map((item, index) => (
          <TabsTrigger
            className={`border p-2 border-gray-400 text-white hover:bg-slate-700 cursor-pointer ${selectedServer === item.serverUrl && 'bg-black'}`}
            onClick={() => handleClick(item.serverUrl)}
            key={index} value={item.serverUrl}>{item.serverName}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}

