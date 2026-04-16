import fs from "fs";
import path from "path";

const productsDir = path.join(process.cwd(), "out", "products");

if (!fs.existsSync(productsDir)) {
  console.log("No products directory found, skipping postbuild.");
  process.exit(0);
}

fs.readdirSync(productsDir).forEach((file) => {
  // Ignore folders and index.html
  if (!file.endsWith(".html") || file === "index.html") return;

  const name = file.replace(".html", "");
  const folder = path.join(productsDir, name);

  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }

  fs.renameSync(
    path.join(productsDir, file),
    path.join(folder, "index.html")
  );

  console.log(`✔ Moved ${file} → ${name}/index.html`);
});