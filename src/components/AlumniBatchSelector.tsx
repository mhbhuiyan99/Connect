"use client";
import Link from "next/link";

const MAX_BATCH = 22; // You can change this to your desired number

const batches = Array.from({ length: MAX_BATCH }, (_, i) => i + 1);

// Optional: You can define batch-specific background images if you want different images per card.
const defaultBackground =
    "https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"; // Change to your preferred image

export default function AlumniBatchSelector() {
    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-8 text-center">Explore Alumni by Batch</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {batches.map((batch) => (
                    <Link
                        key={batch}
                        href={`/alumni/batch/${batch}`}
                        className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105"
                    >
                        <div
                            className="w-full h-40 bg-cover bg-center flex items-center justify-center"
                            style={{
                                backgroundImage: `url(${defaultBackground})`,
                            }}
                        >
                            <div className="bg-black bg-opacity-60 w-full h-full flex items-center justify-center">
                                <h2 className="text-white text-2xl font-bold">Batch {batch}</h2>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
