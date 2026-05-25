import { motion } from "motion/react";
import { Cpu, Shuffle, UserX } from "lucide-react";

const facts = [
  {
    id: 1,
    title: "Gra bez Graczy",
    description: "Gra w Życie, mimo swojej nazwy, jest tak zwaną \"grą dla zera graczy\". Oznacza to, że jej ewolucja zależy całkowicie od stanu początkowego, bez żadnej dalszej interwencji człowieka. Wystarczy ułożyć początkowe komórki i patrzeć, jak żyją własnym życiem.",
    icon: UserX,
  },
  {
    id: 2,
    title: "Kompletność Turinga",
    description: "Choć to tylko zbiór bardzo prostych reguł, Gra w Życie jest \"kompletna w sensie Turinga\". Teoretycznie oznacza to, że w obrębie jej siatki można by zbudować działający komputer lub zasymulować dowolny program komputerowy, o ile siatka byłaby wystarczająco duża.",
    icon: Cpu,
  },
  {
    id: 3,
    title: "Szybowce i Statki (Glidery)",
    description: "Szybko po jej stworzeniu badacze odkryli wyjątkowe wzorce. Najbardziej znanym jest \"Glider\" (szybowiec) - mały układ 5 komórek, który samoczynnie wędruje wzdłuż planszy. Takie wzorce używane są do przesyłania informacji w konstrukcjach opartych o Grę w Życie.",
    icon: Shuffle,
  }
];

export function Facts() {
  return (
    <section className="mb-10">
      <div className="grid md:grid-cols-3 gap-6">
        {facts.map((fact, index) => (
          <motion.div
            key={fact.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-3 text-indigo-600">
              <fact.icon className="w-6 h-6" />
              <h3 className="font-bold text-slate-800 uppercase text-sm tracking-wider">{fact.title}</h3>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              {fact.description.split(/("(.*?)")/g).map((part, i) => 
                 i % 3 === 2 ? <strong key={i}>{part}</strong> : 
                 i % 3 === 0 ? part : null
              )}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
