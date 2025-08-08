import React, { useState } from "react";
import { Command, CommandInput, CommandList, CommandItem, CommandEmpty } from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

const SKILLS = [
    "C",
    "C++",
    "Java",
    "Python",
    "JavaScript",
    "TypeScript",
    "HTML",
    "CSS",
    "Bootstrap",
    "Tailwind CSS",
    "React",
    "Next.js",
    "Redux",
    "Angular",
    "Vue.js",
    "Node.js",
    "Express.js",
    "NestJS",
    "Spring Boot",
    "Django",
    "Flask",
    "REST APIs",
    "GraphQL",
    "MySQL",
    "PostgreSQL",
    "MongoDB",
    "Supabase",
    "Data Structures",
    "Algorithms",
    "OOPs",
    "DBMS",
    "Operating Systems",
    "Computer Networks",
    "System Design",
    "Git",
    "GitHub",
    "CI/CD",
    "Docker",
    "GitLab",
    "Firebase",
    "AWS",
    "Google Cloud (GCP)",
    "Azure (Basics)",
    "Postman",
    "Cypress",
    "NumPy",
    "Pandas",
    "Scikit-learn",
    "Matplotlib",
    "Data Analysis",
    "ML Algorithms",
    "VS Code",
    "IntelliJ IDEA",
    "Android Studio",
    "Figma",
    "Git Basics",
    "Git Branching",
    "Pull Requests",
    "Merge Conflicts",
    "Communication",
    "Teamwork",
    "Leadership",
    "Critical Thinking",
    "Time Management",
    "Adaptability",
    "Conflict Resolution",
    "Presentation Skills",
];

function SkillSelector({ selected, onChange }: { selected: string[]; onChange: (skills: string[]) => void }) {
    const [query, setQuery] = useState("");

    const handleSelect = (skill: string) => {
        if (!selected.includes(skill)) {
            onChange([...selected, skill]);
        }
        setQuery("");
    };

    const handleRemove = (skill: string) => {
        onChange(selected.filter((s) => s !== skill));
    };

    const filtered = SKILLS.filter((s) => s.toLowerCase().includes(query.toLowerCase()) && !selected.includes(s));

    return (
        <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
                {selected.map((skill) => (
                    <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                        {skill}
                        <button type="button" onClick={() => handleRemove(skill)} className="ml-1">
                            <X className="h-3 w-3 cursor-pointer" />
                        </button>
                    </Badge>
                ))}
            </div>
            <Command className="border rounded-md">
                <CommandInput placeholder="Search skills..." value={query} onValueChange={setQuery} />
                <CommandList className="h-24 overflow-y-auto">
                    {filtered.length ? (
                        filtered.map((skill) => (
                            <CommandItem key={skill} value={skill} onSelect={() => handleSelect(skill)}>
                                {skill}
                            </CommandItem>
                        ))
                    ) : (
                        <CommandEmpty>No matching skill</CommandEmpty>
                    )}
                </CommandList>
            </Command>
        </div>
    );
}

export default SkillSelector;
