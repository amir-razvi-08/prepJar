import mongoose, { Schema, model, Types, Document } from "mongoose";
import bcrypt from "bcryptjs";

interface IUser extends Document {
    fullName: string;
    email: string;
    password?: string;
    avatar?: string;
    googleId?: string;
    interviews: Types.ObjectId[];
    credits: number;
    createdAt: Date;
    isPasswordCorrect(password: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, select: false },
    avatar: { type: String },
    googleId: { type: String, unique: true },
    interviews: [{ type: Schema.Types.ObjectId, ref: "Interview" }],
    credits: { type: Number, default: 2 },
    createdAt: { type: Date, default: Date.now },
});

UserSchema.pre("save", async function (next) {
    if (this.password) {
        if (!this.isModified("password")) return next();
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } else next();
});

UserSchema.methods.isPasswordCorrect = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
};

export const User = mongoose.models.User || model<IUser>("User", UserSchema);
