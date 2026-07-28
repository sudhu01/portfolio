/**
 * Full-bleed wrapper: lets a decorative band span the entire viewport width
 * while living inside the centered, padded content column.
 */
export default function FullBleed({
  className = "",
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={`relative left-1/2 w-screen -translate-x-1/2 ${className}`}>
      {children}
    </div>
  );
}
