import { FaEnvelope, FaFacebook, FaLinkedin } from "react-icons/fa";

export interface Alumni {
    student_id: string;
    batch: number;
    name: string;
    email: string;
    current_industry: string;
    job_title: string;
    skills: string[];
    linked_in: string;
    facebook: string;
    role: string;
    sorting_order: number;
    profile_photo: string;
}


export default function AlumniCard({ alumni }: { alumni: Alumni }) {
    return (
        <div className="border rounded-xl p-4 bg-white shadow hover:shadow-lg transition-all">
            <div className="flex flex-col items-center text-center">
                <img
                    src={alumni.profile_photo || "/default-avatar.png"}
                    alt={alumni.name}
                    className="w-24 h-24 rounded-full object-cover mb-3 border"
                />
                <h3 className="text-xl font-semibold">{alumni.name}</h3>
                <p className="text-sm text-gray-600">{alumni.job_title}</p>
                <p className="text-sm text-gray-700 font-medium mt-0.5">{alumni.current_industry}</p>

                {alumni.skills.length > 0 && (
                    <p className="text-sm text-gray-700 mt-2">
                        <strong>Skills:</strong> {alumni.skills.join(", ")}
                    </p>
                )}

                <div className="flex flex-col gap-2 mt-4 text-sm items-start w-full">
                    {alumni.email && (
                        <a
                            href={`mailto:${alumni.email}`}
                            className="flex items-center gap-2 hover:underline"
                        >
                            <FaEnvelope className="text-gray-600" />
                            <span>{alumni.email}</span>
                        </a>
                    )}
                    {alumni.linked_in && (
                        <a
                            href={alumni.linked_in}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 hover:underline"
                        >
                            <FaLinkedin className="text-blue-700" />
                            <span>LinkedIn</span>
                        </a>
                    )}
                    {alumni.facebook && (
                        <a
                            href={alumni.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 hover:underline"
                        >
                            <FaFacebook className="text-blue-600" />
                            <span>Facebook</span>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
