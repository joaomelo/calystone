const svgImports = import.meta.glob<string>("./*.svg", {
  eager: true,
  import: "default",
  query: "?raw",
});

export const svgIcons: Record<string, string> = Object.fromEntries(
  Object.entries(svgImports).map(([path, content]) => {
    const fileName = path.replace(/^\.\//, "").replace(/\.svg$/, "");
    return [fileName, content];
  })
);
