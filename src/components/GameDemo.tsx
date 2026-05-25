import { useState, useCallback, useRef, useEffect } from "react";
import { Play, Pause, RotateCcw, Shuffle } from "lucide-react";
import { motion } from "motion/react";

const NUM_ROWS = 25;
const NUM_COLS = 40;

const DIRS = [
  [-1, -1], [-1, 0], [-1, 1],
  [0, -1],           [0, 1],
  [1, -1],  [1, 0],  [1, 1]
];

const generateEmptyGrid = () => {
  const rows = [];
  for (let i = 0; i < NUM_ROWS; i++) {
    rows.push(Array.from(Array(NUM_COLS), () => 0));
  }
  return rows;
};

const generateRandomGrid = () => {
  const rows = [];
  for (let i = 0; i < NUM_ROWS; i++) {
    rows.push(Array.from(Array(NUM_COLS), () => (Math.random() > 0.75 ? 1 : 0)));
  }
  return rows;
};

export function GameDemo() {
  const [grid, setGrid] = useState(() => generateEmptyGrid());
  const [running, setRunning] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const runningRef = useRef(running);
  runningRef.current = running;

  const runSimulation = useCallback(() => {
    if (!runningRef.current) return;

    setGrid((g) => {
      const nextGen = generateEmptyGrid();
      for (let r = 0; r < NUM_ROWS; r++) {
        for (let c = 0; c < NUM_COLS; c++) {
          let neighbors = 0;
          DIRS.forEach(([x, y]) => {
            const newR = r + x;
            const newC = c + y;
            if (newR >= 0 && newR < NUM_ROWS && newC >= 0 && newC < NUM_COLS) {
              neighbors += g[newR][newC];
            }
          });

          if (g[r][c] === 1 && (neighbors === 2 || neighbors === 3)) {
            nextGen[r][c] = 1;
          } else if (g[r][c] === 0 && neighbors === 3) {
            nextGen[r][c] = 1;
          }
        }
      }
      return nextGen;
    });

    setTimeout(runSimulation, 100);
  }, []);

  const toggleCell = (r: number, c: number) => {
    setGrid((g) => {
      const newGrid = [...g];
      newGrid[r] = [...newGrid[r]];
      newGrid[r][c] = g[r][c] ? 0 : 1;
      return newGrid;
    });
  };

  const handleMouseEnter = (r: number, c: number) => {
    if (!isMouseDown) return;
    setGrid((g) => {
      if (g[r][c] === 1) return g;
      const newGrid = [...g];
      newGrid[r] = [...newGrid[r]];
      newGrid[r][c] = 1;
      return newGrid;
    });
  };

  useEffect(() => {
    // Add specific glider for cool starting point if desired
    const startGrid = generateEmptyGrid();
    // Add Glider
    startGrid[1][2] = 1;
    startGrid[2][3] = 1;
    startGrid[3][1] = 1;
    startGrid[3][2] = 1;
    startGrid[3][3] = 1;
    setGrid(startGrid);
  }, []);

  return (
    <section className="flex flex-col select-none"
             onMouseUp={() => setIsMouseDown(false)}
             onMouseLeave={() => setIsMouseDown(false)}>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <label className="text-xs font-bold text-slate-400 uppercase mb-3 tracking-widest block">
          Interaktywna Demonstracja (Symulacja)
        </label>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="bg-white border border-slate-200 rounded-xl p-6 flex-1 flex flex-col items-center shadow-sm"
      >
        <div className="flex flex-wrap justify-center gap-3 mb-6 w-full">
          <button
            onClick={() => {
              setRunning(!running);
              if (!running) {
                runningRef.current = true;
                runSimulation();
              }
            }}
            className={"flex items-center gap-2 px-5 py-2 rounded-full font-medium text-sm transition-colors border " + (
              running 
                ? 'bg-rose-50 text-rose-600 border-rose-200 hover:bg-rose-100' 
                : 'bg-indigo-50 text-indigo-600 border-indigo-200 hover:bg-indigo-100'
            )}
          >
            {running ? <Pause size={16} /> : <Play size={16} />}
            {running ? "Zatrzymaj" : "Uruchom"}
          </button>
          
          <button
            onClick={() => setGrid(generateRandomGrid())}
            className="flex items-center gap-2 px-5 py-2 rounded-full font-medium text-sm transition-colors border bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
          >
            <Shuffle size={16} />
            Losuj
          </button>

          <button
            onClick={() => {
              setRunning(false);
              setGrid(generateEmptyGrid());
            }}
            className="flex items-center gap-2 px-5 py-2 rounded-full font-medium text-sm transition-colors border bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
          >
            <RotateCcw size={16} />
            Wyczyść
          </button>
        </div>

        <div className="w-full flex justify-center overflow-x-auto">
          <div className="bg-slate-100 border border-slate-200 p-2 rounded-xl block">
            <div 
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(" + NUM_COLS + ", minmax(0, 1fr))",
              }}
              onMouseDown={() => setIsMouseDown(true)}
              className="gap-[1px] bg-slate-200 border border-slate-300"
            >
              {grid.map((rows, r) =>
                rows.map((val, c) => (
                  <div
                    key={r + "-" + c}
                    onMouseDown={() => toggleCell(r, c)}
                    onMouseEnter={() => handleMouseEnter(r, c)}
                    style={{
                      backgroundColor: val ? "#4f46e5" : "#f8fafc", // indigo-600 : slate-50
                    }}
                    className="w-3 h-3 md:w-4 md:h-4 lg:w-[14px] lg:h-[14px] transition-colors duration-300 cursor-pointer hover:bg-indigo-400"
                  />
                ))
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 w-full p-4 bg-amber-50 border border-amber-100 rounded-lg">
          <p className="text-xs text-amber-800 leading-tight">
            <strong>Zasada działania:</strong> Kliknij na wybrane komórki siatki i uruchom symulację. Zobacz jak z 4 zasad i stanu początkowego powstaje złożona ewolucja.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
