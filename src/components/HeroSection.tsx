import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">
        Welcome to CSE,MBSTU Alumni Network
      </h1>
      <p className="text-lg">Connecting past, present, and future of our proud alumni.</p>
      <button className="mt-6 px-6 py-3 bg-white text-blue-800 font-semibold rounded shadow">
        <Link href="/sign-up">
            <span>Join Now</span>
        </Link>
      </button>
    </section>
  );
}

export default HeroSection;
