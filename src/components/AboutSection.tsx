import Link from 'next/link';

const AboutSection = () => {
  return (
    <section className="bg-gradient-to-r text-black py-16 text-center">
      <h1 className="text-2xl font-bold mb-4 text-red-800">
        About CSE,MBSTU Alumni
      </h1>
      <div>
        <p className="text-lg text-justify">
          To create a purposeful and forward-looking organization for the alumni of CSE,MBSTU
          for their social, cultural, and professional pursuits; for fostering greater cohesion
          and fellowship among themselves; for rendering all possible support to the transformation
          of the beloved alma mater into an institution of higher learning in technical and science
          education that is among the best in the world; and for contributing to accelerated and
          sustainable national ...
          <Link href="/AboutFull" className="text-red-800 hover:underline ml-1">
            see more
          </Link>
        </p>
      </div>
    </section>
  );
};

export default AboutSection;
