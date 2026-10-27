import { Chip } from "@heroui/chip";

type Genre = {
    id: number;
    name: string;
}

type CustomChip = {
    data?: Genre[] | string | number;
    icon?: null;
}

export default function CustomChip({ data, icon }: CustomChip) {
    return (
        <span className="inline-flex flex-wrap gap-1.5 text-xs">
            {Array.isArray(data) ? data.map((item) => (
                <Chip
                    key={item.id}
                    size='sm'
                    className="bg-[#1b2b4c] text-[#c1d9f7] border border-[#ffffff20] text-xs px-2">
                    {item.name}
                    {icon}
                </Chip>
            )) : (
                <Chip
                    size='sm'
                    className="bg-[#1b2b4c] text-[#c1d9f7] border border-[#ffffff20] text-xs px-2">
                    {data}
                    {icon}
                </Chip>
            )}
        </span>
    )
}
