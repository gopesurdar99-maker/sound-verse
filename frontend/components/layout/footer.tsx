import Logo from "@/components/shared/logo";

export default function Footer() {
  return (
    <footer className="border-t border-white/8 py-10">
      <div className="container-width flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <Logo />

        <div className="text-sm text-zinc-500">
          © {new Date().getFullYear()} SoundVerse. Premium sound, modern choice.
        </div>
      </div>
    </footer>
  );
}
