import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 px-10 py-16 md:px-20 lg:px-28">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-[10px] tracking-[0.2em] text-white/30 uppercase">
          &copy; {new Date().getFullYear()} garciaaan
        </p>
        <div className="flex gap-6">
          <a
            href="https://x.com/garciaaan1994"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] tracking-[0.2em] text-white/30 uppercase transition-colors hover:text-white/60"
          >
            X/Twitter
          </a>
          <Link
            href="/contact"
            className="text-[10px] tracking-[0.2em] text-white/30 uppercase transition-colors hover:text-white/60"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
