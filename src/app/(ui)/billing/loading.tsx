import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="w-full mx-auto p-8 pt-12 md:pt-8 bg-gray-100">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">Simple, transparent pricing</h1>
                    <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">Choose the perfect plan for your business needs</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="p-4 bg-white rounded-xl shadow-sm space-x-4 h-[25rem] flex flex-col justify-between">
                        <div className="space-y-2 mt-6">
                            <Skeleton className="h-8 w-32 bg-gray-400" />
                            <Skeleton className="h-8 w-24 bg-gray-400" />
                        </div>
                        <div className="w-full flex justify-center">
                            <Skeleton className="h-12 w-48 bg-gray-400" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
