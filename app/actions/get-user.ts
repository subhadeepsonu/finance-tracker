import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function getCurrentUser() {
    const clerkUser = await currentUser();

    if (!clerkUser) {
        return null;
    }

    const userId = clerkUser.id;

    // Check if user exists in DB
    let dbUser = await prisma.user.findUnique({
        where: { ClerkId: userId },
    });

    // If not, create user
    if (!dbUser) {
        const email =
            clerkUser.emailAddresses.find(
                (e) => e.id === clerkUser.primaryEmailAddressId
            )?.emailAddress || clerkUser.emailAddresses[0]?.emailAddress;

        dbUser = await prisma.user.create({
            data: {
                ClerkId: userId,
                email: email || "no-email",
            },
        });
    }

    return dbUser;
}