"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SearchBar({ onSearch }: { onSearch: (type: string, query: string) => void }) {
    const [searchType, setSearchType] = useState("name");
    const [query, setQuery] = useState("");

    const handleSearch = () => {
        if (query.trim()) {
            onSearch(searchType, query);
        }
    };

    return (
        <div className="flex items-center gap-2 w-full max-w-xl mx-auto p-4">
            {/* Dropdown */}
            <Select defaultValue="name" onValueChange={(val: any) => setSearchType(val)}>
                <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="skill">Skill</SelectItem>
                    <SelectItem value="company">Company Name</SelectItem>
                </SelectContent>
            </Select>

            {/* Input Field */}
            <Input
                type="text"
                placeholder="Enter your search"
                className="flex-1"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

            {/* Button */}
            <Button onClick={handleSearch}>Search</Button>
        </div>
    );
}