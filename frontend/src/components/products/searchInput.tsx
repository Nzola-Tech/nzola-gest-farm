import { Input } from "@heroui/input";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export const SearchInput: React.FC<{
  filterValue: string;
  setFilterValue: (value: string) => void;
}> = ({ filterValue, setFilterValue }) => (
  <div className="">
    <Input
      isClearable
      classNames={{
        base: "w-full",
        inputWrapper: "border-1",
      }}
      placeholder="Buscar por nome..."
      size="md"
      startContent={<MagnifyingGlassIcon className="size-5" />}
      value={filterValue}
      variant="bordered"
      onClear={() => setFilterValue("")}
      onValueChange={setFilterValue}
    />
  </div>
);
