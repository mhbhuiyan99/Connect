import Link from "next/link";

export default function Footer() {
  return (
    <footer
      id="colophon"
      className="site-footer bg-cover bg-center bg-no-repeat text-white py-14"
      style={{
        backgroundImage:
          'url("https://cdn-ilddgbh.nitrocdn.com/KCiiUwRzwPIrRDjogfTRMgHMpGyyzAgg/assets/images/optimized/rev-f7111be/mbstu.ac.bd/wp-content/uploads/2022/10/Mbstu-Footer.jpg")',
      }}>
      <div className="container mx-auto px-4">
        <div className="row flex flex-col md:flex-row justify-between">
          {/* Logo and University Info */}
          <div className="mb-6 md:mb-0 w-full md:w-1/4">
            <div className="flex flex-col items-center space-y-4">
              <Link href="/">
                <img
                  loading="lazy"
                  decoding="async"
                  width={210}
                  height={209}
                  className="attachment-full size-full"
                  alt="MBSTU Logo"
                  src="https://cdn-ilddgbh.nitrocdn.com/KCiiUwRzwPIrRDjogfTRMgHMpGyyzAgg/assets/images/optimized/rev-f7111be/mbstu.ac.bd/wp-content/uploads/2023/08/MBSTU_logo.png"
                  srcSet="https://cdn-ilddgbh.nitrocdn.com/KCiiUwRzwPIrRDjogfTRMgHMpGyyzAgg/assets/images/optimized/rev-f7111be/mbstu.ac.bd/wp-content/uploads/2023/08/MBSTU_logo.png 210w, https://cdn-ilddgbh.nitrocdn.com/KCiiUwRzwPIrRDjogfTRMgHMpGyyzAgg/assets/images/optimized/rev-f7111be/mbstu.ac.bd/wp-content/uploads/2023/08/MBSTU_logo-32x32.png 32w, https://cdn-ilddgbh.nitrocdn.com/KCiiUwRzwPIrRDjogfTRMgHMpGyyzAgg/assets/images/optimized/rev-f7111be/mbstu.ac.bd/wp-content/uploads/2023/08/MBSTU_logo-192x192.png 192w, https://cdn-ilddgbh.nitrocdn.com/KCiiUwRzwPIrRDjogfTRMgHMpGyyzAgg/assets/images/optimized/rev-f7111be/mbstu.ac.bd/wp-content/uploads/2023/08/MBSTU_logo-180x180.png 180w, https://cdn-ilddgbh.nitrocdn.com/KCiiUwRzwPIrRDjogfTRMgHMpGyyzAgg/assets/images/optimized/rev-f7111be/mbstu.ac.bd/wp-content/uploads/2023/08/MBSTU_logo-150x150.png 150w, https://cdn-ilddgbh.nitrocdn.com/KCiiUwRzwPIrRDjogfTRMgHMpGyyzAgg/assets/images/optimized/rev-f7111be/mbstu.ac.bd/wp-content/uploads/2023/08/MBSTU_logo-100x100.png 100w, https://cdn-ilddgbh.nitrocdn.com/KCiiUwRzwPIrRDjogfTRMgHMpGyyzAgg/assets/images/optimized/rev-f7111be/mbstu.ac.bd/wp-content/uploads/2023/08/MBSTU_logo-16x16.png 16w, https://cdn-ilddgbh.nitrocdn.com/KCiiUwRzwPIrRDjogfTRMgHMpGyyzAgg/assets/images/optimized/rev-f7111be/mbstu.ac.bd/wp-content/uploads/2023/08/MBSTU_logo-64x64.png 64w"
                  sizes="(max-width: 210px) 100vw, 210px"
                />
              </Link>
              <div className="text-center">
                <p className="text-sm text-gray-400">
                  <Link
                    href="/"
                    target="_blank"
                    rel="nofollow">
                    MAWLANA BHASHANI SCIENCE AND TECHNOLOGY UNIVERSITY
                  </Link>
                </p>
                <p className="text-xs text-red-500 flex items-center justify-center">
                  <span className="mr-2">📍</span> Santosh, Tangail - 1902
                </p>
              </div>
            </div>
          </div>

          {/* Academic Column 
                    <div className="mb-6 md:mb-0 w-full md:w-1/4">
                        <h4 className="text-lg font-semibold mb-4 text-gray-300">Academic</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link href="/academics-detail/" target="_blank" rel="nofollow">Undergraduate Programs</Link></li>
                            <li><Link href="/faculty-of-engineering/" target="_blank" rel="nofollow">Faculty of Engineering</Link></li>
                            <li><Link href="/faculty-of-life-science/" target="_blank" rel="nofollow">Faculty of Life Science</Link></li>
                            <li><Link href="/faculty-of-science/" target="_blank" rel="nofollow">Faculty of Science</Link></li>
                            <li><Link href="/faculty-of-business-studies/" target="_blank" rel="nofollow">Faculty of Business Studies</Link></li>
                            <li><Link href="/faculty-of-social-science/" target="_blank" rel="nofollow">Faculty of Social Science</Link></li>
                            <li><Link href="/faculty-of-arts/" target="_blank" rel="nofollow">Faculty of Arts</Link></li>
                        </ul>
                    </div>
                    */}
          {/* Useful Links Column */}
          <div className="mb-6 md:mb-0 w-full md:w-1/4">
            <h4 className="text-lg font-semibold mb-4 text-gray-300">Useful Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link
                  href="/bhashani/ict-cell/"
                  target="_blank"
                  rel="nofollow">
                  ICT Cell
                </Link>
              </li>
              <li>
                <Link
                  href="/bncc/"
                  target="_blank"
                  rel="nofollow">
                  BNCC
                </Link>
              </li>
              <li>
                <Link
                  href="/central-library/"
                  target="_blank"
                  rel="nofollow">
                  Central Library
                </Link>
              </li>
              <li>
                <Link
                  href="/residential-halls/"
                  target="_blank"
                  rel="nofollow">
                  Residential Halls
                </Link>
              </li>
              <li>
                <Link
                  href="/students-welfare-and-counseling/"
                  target="_blank"
                  rel="nofollow">
                  Students’ Welfare and Counseling
                </Link>
              </li>
              <li>
                <Link
                  href="/registrar-office/"
                  target="_blank"
                  rel="nofollow">
                  Registrar Office
                </Link>
              </li>
              <li>
                <Link
                  href="/research-cell/"
                  target="_blank"
                  rel="nofollow">
                  Research Cell
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="mb-6 md:mb-0 w-full md:w-1/4">
            <h4 className="text-lg font-semibold mb-4 text-gray-200">Contact Us</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-center">
                <span className="text-red-500 mr-2">✉️</span> alumni@mbstu.ac.bd
              </li>
              <li className="flex items-center">
                <span className="text-red-500 mr-2">📞</span> +880921 55399
              </li>
              <li className="flex items-center">
                <span className="text-red-500 mr-2">📞</span> +880921 55399
              </li>
            </ul>
            <h4 className="text-lg font-semibold mt-4 mb-2 text-gray-200">Alumni Office</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-center">
                <span className="text-red-500 mr-2">📍</span>
                MAWLANA BHASHANI SCIENCE AND TECHNOLOGY UNIVERSITY, Tangail, Bangladesh
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section with Back to Top and Copyright */}
        <div className="mt-6 pt-4 border-t border-gray-500 flex flex-col md:flex-row justify-center items-center">
          <div className="mb-4 md:mb-0">
            <Link
              href="https://mbstu.ac.bd/"
              className="text-sm text-white hover:text-gray-300">
              © {new Date().getFullYear()} Mawlana Bhashani Science and Technology University Alumni Association
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
