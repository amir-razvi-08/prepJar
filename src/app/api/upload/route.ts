import cloudinary from "@/lib/cloudinary";
import { connectDB } from "@/lib/db";
import { getServerUser } from "@/lib/getUser";
import { User } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
    try {
        const user = await getServerUser();
        const userId = user?.id;

        const formData = await req.formData();
        const file = formData.get("file") as File | null;

        if (!userId) return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
        if (!file) return NextResponse.json({ error: "file not found" }, { status: 404 });

        await connectDB();

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream({ folder: "prepjar" }, (error, uploaded) => {
                if (error || !uploaded) return reject(error);
                resolve({ secure_url: uploaded.secure_url });
            });
            uploadStream.end(buffer);
        });

        const newUser = await User.findByIdAndUpdate(userId, { avatar: result.secure_url }, { new: true });
        if (!newUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, imageUrl: result.secure_url, user: newUser }, { status: 200 });
    } catch (error) {
        console.error("Upload Error:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
