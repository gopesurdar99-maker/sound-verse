type Props = {
  title: string;
  description: string;
};

export default function AdminPageHeader({ title, description }: Props) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-semibold text-white md:text-4xl">{title}</h1>
      <p className="mt-2 text-zinc-400">{description}</p>
    </div>
  );
}
