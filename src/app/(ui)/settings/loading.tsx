import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="w-full mx-auto p-8 pt-12 md:pt-8 bg-gray-100">
            <div className="w-full flex justify-between items-center mb-6">
                <h1 className="text-4xl font-bold text-gray-900">Settings</h1>
                <Skeleton className="h-10 w-20 bg-gray-400" />
            </div>
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Update Profile</CardTitle>
                </CardHeader>
                <CardContent className=" space-y-4">
                    <Skeleton className="h-6 w-28 bg-gray-400" />
                    <Skeleton className="h-6 w-full bg-gray-300" />
                    <Skeleton className="h-6 w-28 bg-gray-400" />
                    <Skeleton className="h-6 w-full bg-gray-300" />
                    <Skeleton className="h-8 w-24 bg-gray-400" />
                </CardContent>
            </Card>

            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-6 w-28 bg-gray-400" />
                    <Skeleton className="h-6 w-full bg-gray-300" />
                    <Skeleton className="h-8 w-24 bg-gray-400" />
                </CardContent>
            </Card>
        </div>
    );
}
