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
        <span className="text-slate-900 inline-block space-x-1 space-y-1 text-xs">
            {Array.isArray(data) ? data.map((item) => (
                <Chip
                    key={item.id}
                    size='sm'
                    className="bg-yellow-600 text-xs px-1">
                    {item.name}
                    {icon}
                </Chip>
            )) : (
                <Chip
                    size='sm'
                    className="bg-yellow-600 text-xs px-1">
                    {data}
                    {icon}
                </Chip>
            )}
        </span>
    )
}
