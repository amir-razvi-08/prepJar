import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="p-8 pt-8 md:pt-16 bg-gray-100">
            <div className="p-8">
                <Skeleton className="h-10 w-1/6 mb-6 bg-gray-400" />
                <Skeleton className="h-6 w-32 mb-4 bg-gray-400" />
                <Skeleton className="h-6 w-full mb-6 bg-gray-300" />
                <Skeleton className="h-6 w-32 mb-4 bg-gray-400" />
                <Skeleton className="h-28 w-full mb-4 bg-gray-300" />
                <Skeleton className="h-6 w-32 mb-4 bg-gray-400" />
                <div className="flex gap-4 mb-4">
                    <Skeleton className="h-6 w-24 rounded-full bg-gray-300" />
                    <Skeleton className="h-6 w-24 rounded-full bg-gray-300" />
                    <Skeleton className="h-6 w-24 rounded-full bg-gray-300" />
                    <Skeleton className="h-6 w-24 rounded-full bg-gray-300" />
                    <Skeleton className="h-6 w-24 rounded-full bg-gray-300" />
                    <Skeleton className="h-6 w-24 rounded-full bg-gray-300" />
                    <Skeleton className="h-6 w-24 rounded-full bg-gray-300" />
                </div>
                <div className="grid grid-cols-3 mb-4">
                    <div>
                        <Skeleton className="h-6 w-32 mb-2 rounded-full bg-gray-400" />
                        <Skeleton className="h-6 w-24 rounded-full bg-gray-300" />
                    </div>
                    <div>
                        <Skeleton className="h-6 w-32 mb-2 rounded-full bg-gray-400" />
                        <Skeleton className="h-6 w-24 rounded-full bg-gray-300" />
                    </div>
                </div>
                <div className="w-full flex justify-end">
                    <Skeleton className="h-8 w-32 bg-gray-400" />
                </div>
            </div>
        </div>
    );
}
