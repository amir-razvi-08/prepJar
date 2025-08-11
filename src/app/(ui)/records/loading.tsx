import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="p-8 pt-12 md:pt-8 bg-gray-100">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Records</h1>
            <div className="grid gap-6 grid-cols-1">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="p-4 bg-white rounded-xl shadow-sm space-y-4">
                        <div className="flex justify-between py-6">
                            <div className="flex gap-2 items-center">
                                <Skeleton className="h-10 w-10 rounded-full bg-gray-400" />
                                <Skeleton className="h-8 w-40 bg-gray-400" />
                            </div>

                            <Skeleton className="h-8 w-24 bg-gray-400" />
                        </div>

                        <Skeleton className="h-4 w-1/3 bg-gray-400" />
                        <Skeleton className="h-4 w-48 bg-gray-400" />
                    </div>
                ))}
            </div>
        </div>
    );
}
