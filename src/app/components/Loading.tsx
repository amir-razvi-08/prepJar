import React from "react";

interface LoadingProps{
    content:string
}

function Loading({content}:LoadingProps) {
    return (
        <div>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-16 w-16 animate-spin rounded-full border-4 border-t-transparent border-white" />
                    <p className="text-white text-lg font-medium animate-pulse p-8">{content}</p>
                    
                </div>
            </div>
        </div>
    );
}

export default Loading;
