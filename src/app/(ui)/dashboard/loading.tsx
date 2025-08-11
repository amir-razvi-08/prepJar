import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="p-8 pt-12 md:pt-8 bg-gray-100 space-y-8">
            <div className=" flex gap-8">
                <Skeleton className="h-24 w-24 rounded-full bg-gray-400" />
                <div className="space-y-2">
                    <Skeleton className="h-10 w-76 bg-gray-400" />
                    <Skeleton className="h-8 w-56 bg-gray-300" />
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="p-4 bg-white rounded-xl shadow-sm space-y-4 flex justify-between items-center">
                        <div className="space-y-2">
                            <Skeleton className="h-6 w-24 bg-gray-400" />
                            <Skeleton className="h-4 w-16 bg-gray-400" />
                        </div>
                        <Skeleton className="h-16 w-16 rounded-full bg-gray-400" />
                    </div>
                ))}
            </div>
            <div className="grid gap-6 md:grid-cols-2">
                {Array.from({ length: 2 }).map((_, i) => (
                    <div key={i} className="p-4 bg-white rounded-xl shadow-sm space-y-8">
                        <Skeleton className="h-6 w-32 mb-12 bg-gray-400" />
                        <Skeleton className="h-4 w-full bg-gray-300" />
                        <Skeleton className="h-4 w-full bg-gray-300" />
                        <Skeleton className="h-4 w-full bg-gray-300" />
                        <Skeleton className="h-4 w-full bg-gray-300" />
                        <Skeleton className="h-4 w-full bg-gray-300" />
                    </div>
                ))}
            </div>
        </div>
    );
}
