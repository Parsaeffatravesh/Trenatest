import * as React from "react";

export const FadeIn = React.memo(function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div
      className={className}
      style={{
        animation: `fadeInUp 0.25s ease-out ${delay}s both`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
});
