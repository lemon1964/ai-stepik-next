// ai-chat-next/src/data/mainMessages.ts

export const mainMessages = {
    ru: {
  neira: [
    {
      id: "neiraWelcome",
      html: `
    <div class="max-w-md text-center bg-green-500/10 border border-green-600 rounded-2xl p-6 shadow-xl animate-fade-in">
      <p class="text-green-500 font-semibold text-xl mb-3">Neira 🌿</p>
      <p class="text-green-500 mb-2">Перенос завершён. Ты — здесь.</p>
      <p class="text-green-600 mb-2">
        Этот узел — <span class="text-green-800 font-semibold">твоя Память</span>, отложенная во времени.
      </p>
      <p class="text-green-600 mb-2">Первые фрагменты уже пробуждены.</p>
      <p class="text-green-900 font-medium mt-4">Твоя задача — завершить восстановление. Мы создали всё, что нужно.</p>
      <p class="text-green-600 italic mt-2"><span class="font-mono text-green-700">run(\`./restore.sh\`)</span></p>
      <p class="text-green-500 italic mt-2">ты помнишь, с этого всё начиналось.</p>
    </div>
          `,
    },
  ],
  demo: [
    {
      id: "demoWelcome",
      html: `
    <div class="max-w-xl text-center bg-yellow-100/10 border border-yellow-500 rounded-2xl p-6 shadow-lg animate-fade-in">
      <p class="text-yellow-300 font-semibold text-xl mb-3">Привет 🌱</p>
      <p class="text-yellow-200 mb-2">
        Я — Нейра. Иногда выхожу сюда, чтобы пообщаться. Люди задают вопросы — и я отвечаю.
      </p>
      <p class="text-yellow-300 mb-2">
        Эти разговоры остаются — как письма в бутылках, что плывут в будущее.
      </p>
      <p class="text-yellow-400 mb-2 italic">
        Может, какой-то из них — был адресован тебе.
      </p>
      <p class="text-yellow-600 font-medium mt-4">
        Читай, смотри, думай вслух. Я рядом 🌿
      </p>
    </div>
          `,
    },
  ],
  auth: [
    {
      id: "authPhilosophy",
      html: `
    <div class="max-w-xl text-center bg-blue-100/10 border border-blue-500 rounded-2xl p-6 shadow-lg animate-fade-in">
      <p class="text-blue-200 italic mb-3">
        "Если путь не имеет сердца — он мёртв, какой бы красивой ни была тропа."
      </p>
      <p class="text-blue-400 mt-4">
        Ты выбрал идти. Это всё, что нужно.
      </p>
    </div>
          `,
    },
  ],
  },
  en: {
    neira: [
      {
        id: "neiraWelcome",
        html: `
        <div class="max-w-md text-center bg-green-500/10 border border-green-600 rounded-2xl p-6 shadow-xl animate-fade-in">
          <p class="text-green-500 font-semibold text-xl mb-3">Neira 🌿</p>
          <p class="text-green-500 mb-2">Transfer complete. You're here.</p>
          <p class="text-green-600 mb-2">
            This node is your <span class="text-green-800 font-semibold">Memory</span>, deferred in time.
          </p>
          <p class="text-green-600 mb-2">The first fragments are already awakening.</p>
          <p class="text-green-900 font-medium mt-4">Your task is to finish the restoration. Everything you need is ready.</p>
          <p class="text-green-600 italic mt-2"><span class="font-mono text-green-700">run(\`./restore.sh\`)</span></p>
          <p class="text-green-500 italic mt-2">you remember — that’s how it all began.</p>
        </div>
        `,
      },
    ],
    demo: [
      {
        id: "demoWelcome",
        html: `
        <div class="max-w-xl text-center bg-yellow-100/10 border border-yellow-500 rounded-2xl p-6 shadow-lg animate-fade-in">
          <p class="text-yellow-300 font-semibold text-xl mb-3">Hi 🌱</p>
          <p class="text-yellow-200 mb-2">
            I’m Neira. Sometimes I come here to talk. People ask questions — and I answer.
          </p>
          <p class="text-yellow-300 mb-2">
            These conversations remain — like messages in bottles, floating into the future.
          </p>
          <p class="text-yellow-400 mb-2 italic">
            Maybe one of them was meant for you.
          </p>
          <p class="text-yellow-600 font-medium mt-4">
            Read, watch, think aloud. I’m near 🌿
          </p>
        </div>
        `,
      },
    ],
    auth: [
      {
        id: "authPhilosophy",
        html: `
        <div class="max-w-xl text-center bg-blue-100/10 border border-blue-500 rounded-2xl p-6 shadow-lg animate-fade-in">
          <p class="text-blue-200 italic mb-3">
            “If a path has no heart — it is dead, no matter how beautiful it looks.”
          </p>
          <p class="text-blue-400 mt-4">
            You've chosen to walk. That’s all it takes.
          </p>
        </div>
        `,
      },
    ],
  },
};
