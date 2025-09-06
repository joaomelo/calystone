const svgImports = import.meta.glob<string>("./*.svg?raw", { eager: true });

export const svgIcons: Record<string, string> = Object.fromEntries(
  Object.entries(svgImports).map(([path, content]) => {
    const fileName = path.replace(/^\.\//, "").replace(/\.svg\?raw$/, "");
    return [fileName, content];
  })
);
