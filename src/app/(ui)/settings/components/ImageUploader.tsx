"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, Pencil } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

export default function ImageUploader() {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0] || null;
        setFile(f);
        setPreview(f ? URL.createObjectURL(f) : null);
    };

    const handleUpload = async () => {
        if (!file) {
            toast.error("Please select an image first");
            return;
        }

        setLoading(true);
        try {
            const form = new FormData();
            form.append("file", file);

            await axios.post("/api/upload", form, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            toast.success("Upload successful!");
        } catch (error) {
            const message = "Something went wrong while uploading";
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    type="button"
                    size="icon"
                    variant="secondary"
                    className=" rounded-full shadow-md hover:bg-black bg-black text-white opacity-80 hover:opacity-100 cursor-pointer"
                >
                    <Pencil className="w-4 h-4" />
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Upload Profile Picture</DialogTitle>
                    <DialogDescription>Choose a photo to upload as your new profile picture.</DialogDescription>
                </DialogHeader>

                <div className="flex flex-col items-center gap-4 py-4">
                    <Avatar className="w-24 h-24">
                        {preview ? <AvatarImage src={preview} alt="Preview" /> : <AvatarFallback>Profile</AvatarFallback>}
                    </Avatar>

                    <Input type="file" accept="image/*" onChange={handleFileChange} />

                    <Button onClick={handleUpload} disabled={loading || !file} className="w-full">
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {loading ? "Uploading..." : "Upload"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
