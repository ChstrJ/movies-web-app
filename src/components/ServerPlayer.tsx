import { useGeneralStore } from '@/stores/useGeneralStore';
type Server = { serverUrl: string; serverName: string; default?: boolean };
export default function ServerPlayer({ data, name }: { data: Server[] | undefined | null; name: string }) {
  const { setSelectedServer, selectedServer, setShowBackdropImage } = useGeneralStore();
  return <div className="player-options"><p>{name}</p>{data?.map(item => <button key={item.serverName} className="player-option" aria-pressed={item.serverUrl === selectedServer} onClick={() => { setSelectedServer(item.serverUrl); setShowBackdropImage(false); }}>{item.serverName}</button>)}</div>;
}
