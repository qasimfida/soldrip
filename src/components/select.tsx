"use client"

import * as React from "react"
import { ChevronDown, ChevronDownIcon } from "lucide-react"

import { cn, debounce } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"



export function Select({ value, setValue, className = "absolute right-2.5 top-1.5 z-10 !w-max rounded-full flex hover:bg-transparent bg-transparent border-none  " }: any) {
    const [open, setOpen] = React.useState<boolean>(false)
    const [assets, setAssets] = React.useState<any[]>([]);
    const [error, setError] = React.useState<any>(null);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [query, setQuery] = React.useState<string>("")

    const fetchAssets = async () => {
        try {
            const res = await fetch(`https://datapi.jup.ag/v1/assets/search?query=${query}&sortBy=verified`);
            const allAssets = await res.json();

            // const filtered = allAssets.filter((asset: any) => asset.id === SOL_DRIP_MINT || asset.id === SOL_MINT);
            setAssets(allAssets);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }
    const debounceQuoteCall = React.useCallback(debounce(fetchAssets, 500), [query]);
    React.useEffect(() => {
        debounceQuoteCall();
    }, [query, debounceQuoteCall]);

    let sortedAssets = assets.length && value ? [
        ...assets.filter(asset => asset.id === value.id),
        ...assets.filter(asset => asset.id !== value.id)
    ] : assets;
    if (value && value.id && !assets.some(asset => asset.id === value.id)) {
        sortedAssets = [value, ...assets];
    }
    console.log({ value, sortedAssets })

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    role="combobox"
                    aria-expanded={open}
                    className={cn("justify-between w-[200px]", className)}
                >
                    <div className="bg-card">
                        <ChevronDown className="ml-2 !w-6 !h-6  shrink-0 !p-0" />
                    </div>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-auto" side="left" align="start" >
                <Command value={query} onChange={(e) => { setQuery(e.target.value) }}>
                    <CommandInput disabled={loading} placeholder="Search" />
                    <CommandList>
                        <CommandEmpty>{error ? error : "No asset found."}</CommandEmpty>
                        <CommandGroup>
                            {sortedAssets.map((asset) => (
                                <CommandItem
                                    key={asset.id}
                                    value={asset.id}
                                    onSelect={() => {
                                        setValue(asset)
                                        setOpen(false)
                                    }}
                                    className={cn(value?.id === asset?.id && "bg-gradient-primary")}
                                >
                                    <Avatar>
                                        <AvatarImage src={asset.icon} />
                                        <AvatarFallback>{(asset.symbol).charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    {asset.symbol}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}