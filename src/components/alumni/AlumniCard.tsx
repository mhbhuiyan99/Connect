import Alumni from "@/models/Alumni";
import { FaEnvelope, FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AlumniCard({ alumni }: { alumni: Alumni }) {
  const router = useRouter();

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest("a")) return;
    router.push(`/alumni/${alumni.id}`);
  };

  return (
    <div
      className="border rounded-xl p-4 bg-white shadow hover:shadow-lg transition-all h-full"
      onClick={handleCardClick}>
      <div className="flex flex-col items-center text-center">
        <Image
          src={alumni.profile_photo || "/default-avatar.png"}
          alt={alumni.name}
          width={100}
          height={100}
          className="w-24 h-24 rounded-full object-cover mb-3 border"
        />
        <h3 className="text-xl font-semibold">{alumni.name}</h3>
        <p className="text-sm text-gray-500">{alumni.student_id}</p>
        <p className="text-sm text-gray-600">{alumni.industries[0]?.position || ""}</p>
        <p className="text-sm text-black font-medium mt-0.5">{alumni.industries[0]?.industry || ""}</p>

        {alumni.skills.length > 0 && (
          <p className="text-sm text-gray-700 mt-2">
            <strong>Skills:</strong> {alumni.skills.join(", ")}
          </p>
        )}

        <div className="flex flex-col gap-2 mt-4 text-sm items-start w-full">
          {alumni.email && (
            <a
              href={`mailto:${alumni.email}`}
              className="flex items-center gap-2 hover:underline">
              <FaEnvelope className="text-gray-600" />
              <span>{alumni.email}</span>
            </a>
          )}
          {alumni.github && (
            <a
              href={alumni.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:underline"
              onClick={(e) => e.stopPropagation()}>
              <FaGithub className="text-black-700" />
              <span>GitHub</span>
            </a>
          )}
          {alumni.linked_in && (
            <a
              href={alumni.linked_in}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:underline"
              onClick={(e) => e.stopPropagation()}>
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
              onClick={(e) => e.stopPropagation()}>
              <FaFacebook className="text-blue-600" />
              <span>Facebook</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
