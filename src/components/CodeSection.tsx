import { Code2 } from "lucide-react";
import { motion } from "motion/react";

const codeString = `function nextGeneration(grid, rows, cols) {
  // Tworzymy nową pustą siatkę na kolejną generację
  const newGrid = Array(rows).fill().map(() => Array(cols).fill(0));
  
  // Wektory oznaczające 8 kierunków wokół komórki
  const dirs = [
    [-1, -1], [-1, 0], [-1, 1],
    [ 0, -1],          [ 0, 1],
    [ 1, -1], [ 1, 0], [ 1, 1]
  ];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let neighbors = 0;
      
      // Zliczamy żywych sąsiadów
      dirs.forEach(([x, y]) => {
        const newR = r + x;
        const newC = c + y;
        
        // Sprawdzamy czy nie wychodzimy poza ramy planszy
        if (newR >= 0 && newR < rows && newC >= 0 && newC < cols) {
          neighbors += grid[newR][newC];
        }
      });

      const isAlive = grid[r][c] === 1;

      // ZASADY GRY W ŻYCIE:
      if (isAlive && (neighbors === 2 || neighbors === 3)) {
        // Żywa komórka z 2 lub 3 sąsiadami - PRZEŻYWA
        newGrid[r][c] = 1;
      } else if (!isAlive && neighbors === 3) {
        // Martwa komórka z dokładnie 3 sąsiadami - BUDZI SIĘ DO ŻYCIA
        newGrid[r][c] = 1;
      }
      // W każdym innym przypadku (przeludnienie, samotność) komórka UMIERA (zostaje 0).
    }
  }
  
  return newGrid;
}`;

export function CodeSection() {
  return (
    <section className="flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <label className="text-xs font-bold text-slate-400 uppercase mb-3 tracking-widest block">
          Logika Implementacji (JavaScript)
        </label>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="bg-slate-900 rounded-xl p-6 flex-1 font-mono text-[13px] leading-relaxed shadow-inner border border-slate-800 overflow-x-auto"
      >
        <pre className="text-slate-300">
          <code dangerouslySetInnerHTML={{ __html: highlightCode(codeString) }} />
        </pre>
      </motion.div>
    </section>
  );
}

// Very basic custom regex syntax highlighter for aesthetics based on design
function highlightCode(code: string) {
  const safeCode = code.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const tokenRegex = /(\/\/.*)|\b(function|return|let|const|if|else)\b|\b(Array|Math|fill|map|forEach)\b|\b(newGrid|dirs|grid|rows|cols|neighbors|isAlive|newR|newC)\b|\b(\d+)\b/g;
  
  return safeCode.replace(tokenRegex, (match, p1, p2, p3, p4, p5) => {
    if (p1) return '<span class="text-slate-500">' + p1 + '</span>';
    if (p2) return '<span class="text-pink-400">' + p2 + '</span>';
    if (p3) return '<span class="text-blue-300">' + p3 + '</span>';
    if (p4) return '<span class="text-slate-400">' + p4 + '</span>';
    if (p5) return '<span class="text-indigo-400">' + p5 + '</span>';
    return match;
  });
}
