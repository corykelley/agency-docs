import Link from "next/link";

export default function NavBar() {
  return (
    <header>
      <nav className="border-b py-4 backdrop-blur w-full">
        <div className="flex flex-row justify-between items-center container mx-auto">
          <Link href="/">AgencyDocs</Link>
          <ul className="flex flex-row gap-x-4 items-center">
            <li>Features</li>
            <li>How it Works</li>
            <li>
              <Link href="/features">All Features</Link>
            </li>
          </ul>
          <div className="flex">Account</div>
        </div>
      </nav>
    </header>
  );
}
