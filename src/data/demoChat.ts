// ai-chat-next/src/data/demoChat.ts

export const demoCategories = [
  { id: "productivity", name: "Продуктивность" },
  { id: "trips", name: "Путешествия" },
  { id: "education", name: "Образование" }
];

export const demoCategoryIds = demoCategories.map(cat => cat.id);

export type Message = {
  id: string;
  prompt: string;
  answers: {
    id: string;
    content: string;
  }[];
};

export const demoMessages: Record<string, Message[]> = {
  productivity: [
    {
      id: "p1",
      prompt: "Как быстро разобрать завал в задачах?",
      answers: [{
        id: "a1",
        content: [
          "**Метод 1-3-5:**",
          "1. 1 большая задача",
          "2. 3 средние",
          "3. 5 мелких",
          "- **Пример:**",
          "```python",
          "tasks = pick_tasks()",
          "for t in tasks:",
          "    do(t)",
          "```",
          "📌 Работает лучше списков!"
        ].join("\n")
      }]
    },
    {
      id: "p2",
      prompt: "Покажи схему метода",
      answers: [{ id: "a1", content: "/images/sample/productivity-pyramid.png" }]
    }
  ],

  trips: [
    {
      id: "t1",
      prompt: "Как быстро собрать вещи в дорогу?",
      answers: [{
        id: "a1",
        content: [
          "**Минимальный набор:**",
          "1. Документы и зарядка",
          "2. Удобная одежда",
          "3. Щётка и пластыри",
          "- **Код чемодана:**",
          "```javascript",
          "const bag = {",
          "  docs: ['паспорт'],",
          "  gear: ['одежда', 'гаджеты'],",
          "  care: ['щётка', 'пластыри']",
          "};",
          "```"
        ].join("\n")
      }]
    },
    {
      id: "t2",
      prompt: "Покажи список упаковки",
      answers: [{ id: "a1", content: "/images/sample/packing-list.png" }]
    }
  ],

  education: [
    {
      id: "e1",
      prompt: "Как запомнить сложную тему?",
      answers: [{
        id: "a1",
        content: [
          "**Метод Фейнмана:**",
          "1. Объясните тему просто",
          "2. Найдите пробелы",
          "3. Переформулируйте",
          "- **Код памяти:**",
          "```python",
          "while not understand(topic):",
          "    explain(topic)",
          "    revise(topic)",
          "```",
          "🌟 Работает всегда!"
        ].join("\n")
      }]
    },
    {
      id: "e2",
      prompt: "Что почитать для развития?",
      answers: [{
        id: "a1",
        content: [
          "**Рекомендации:**",
          "- Deep Work — Кал Ньюпорт",
          "- Make it Stick — Рёдигер",
          "- Учебник ML — Ян Лекун",
          "```python",
          "print(learn('ML'))",
          "```"
        ].join("\n")
      }]
    },
    {
      id: "e3",
      prompt: "Покажи визуализацию метода",
      answers: [{ id: "a1", content: "/images/sample/feynman-technique.png" }]
    }
  ]
};
