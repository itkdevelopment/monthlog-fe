// app/page.tsx
"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
    const router = useRouter();

    return (
        <main className="flex min-h-screen items-center justify-center">
            <div>
                Login to get access token
                <a
										href="/signin_email"
                    className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Sign In
                </a>
            </div>

						<div>
								See image upload sample
								* must be sigend in before uploading image
                <a
                    href="/sample/image-upload"
                    className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Upload Image
                </a>
            </div>
        </main>
    );
}
