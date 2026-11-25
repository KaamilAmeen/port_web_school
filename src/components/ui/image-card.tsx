import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ImageCardProps = {
  src: string;
  alt: string;
  title?: string;
  description?: string;
  href?: string;
  sizes?: string;
  priority?: boolean;
  aspect?: "square" | "portrait" | "landscape" | "wide";
  className?: string;
};

const aspectClasses = {
  square: "aspect-square",
  portrait: "aspect-[4/5]",
  landscape: "aspect-[4/3]",
  wide: "aspect-[16/9]",
} as const;

export function ImageCard({
  src,
  alt,
  title,
  description,
  href,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  priority = false,
  aspect = "landscape",
  className,
}: ImageCardProps) {
  const content = (
    <>
      <div className={cn("image-frame", aspectClasses[aspect])}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
      {title || description ? (
        <div className="pt-5">
          {title ? (
            <h3 className="font-display text-xl text-navy">{title}</h3>
          ) : null}
          {description ? (
            <p className="mt-2 text-sm leading-relaxed text-charcoal/70">
              {description}
            </p>
          ) : null}
        </div>
      ) : null}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cn("group block", className)}>
        {content}
      </Link>
    );
  }

  return <figure className={className}>{content}</figure>;
}
