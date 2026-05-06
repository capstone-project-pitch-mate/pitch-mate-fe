import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description: string;
  action?: ReactNode;
}

export default function PageHeader({
  title,
  description,
  action,
}: PageHeaderProps) {
  return (
    <section className="flex flex-row items-start justify-between gap-6">
      <div className="flex min-w-0 flex-col gap-1.5">
        <h1 className="text-4xl leading-14 font-medium">{title}</h1>
        <p className="text-2xl leading-9 text-[#71718A]">{description}</p>
      </div>
      {action}
    </section>
  );
}
