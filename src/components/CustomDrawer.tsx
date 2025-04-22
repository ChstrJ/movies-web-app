import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { useGeneralStore } from "@/stores/useGeneralStore";
import { Link } from "react-router-dom";

type CustomDrawerProps = {
  open: boolean;
}

export default function CustomDrawer({ open }: CustomDrawerProps) {

  const { setShowDrawer } = useGeneralStore();

  return (
    <Drawer open={open}>
      <DrawerContent
        className="border border-[#252528] bg-[#09090b] text-white"
        onInteractOutside={() => setShowDrawer(false)}
      >
        <DrawerHeader className="gap-2">
          <Link to={'/shows'}
            onClick={() => setShowDrawer(false)}
          >
            <DrawerTitle className="underline text-white">Shows</DrawerTitle>
          </Link>
          <Link to={'/movies'}
            onClick={() => setShowDrawer(false)}
          >
            <DrawerTitle className="underline text-white">Movies</DrawerTitle>
          </Link>

        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  )
}
