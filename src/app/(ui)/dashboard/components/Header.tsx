import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import React from "react";

function Header() {
    const user = useAppSelector((state) => state.user.user);
    return (
        <div className="flex items-center gap-8 mb-6">
            <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full overflow-hidden border shadow-md">
                <Image src={user?.image ?? "/avatar.png"} alt="User" width={76} height={76} className="object-cover w-full h-full" />
            </div>
            <div>
                <h1 className="text-xl sm:text-3xl font-bold text-gray-800">Welcome back, {user?.name}</h1>
                <p className="text-gray-500 text-sm sm:text-lg">{"Let's sharpen your skills"}</p>
            </div>
        </div>
    );
}

export default Header;
