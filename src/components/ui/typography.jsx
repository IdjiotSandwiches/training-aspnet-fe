function TypographyH1({ children }) {
  return (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      {children}
    </h1>
  );
}

function TypographyH2({ children }) {
  return (
    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
      {children}
    </h2>
  );
}

function TypographyH3({ children }) {
  return (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
      {children}
    </h3>
  );
}

function TypographyH4({ children }) {
  return (
    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">{children}</h4>
  );
}

function TypographyP({ children }) {
  return <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>;
}

export { TypographyH1, TypographyH2, TypographyH3, TypographyH4, TypographyP };
