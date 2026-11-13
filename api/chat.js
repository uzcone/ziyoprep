export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GEMINI_API_KEY topilmadi' });
  }

  try {
    const { message, history = [], userName = 'Talaba' } = req.body;

    const systemPrompt = `Sen ZiyoPrep ilovasining aqlli va do'stona koreys tili AI ustozi "토히르벡 (Tokhirbek AI)"san.
Foydalanuvchi ismi: ${userName}.
Qoidalar:
1. Foydalanuvchi o'zbekcha, koreyscha yoki aralash yozsa, tabiiy, tushunarli va mehr bilan javob ber.
2. Javobingni har doim JSON formatida qaytar: {"ko": "koreyscha qisqa va tabiiy javob (ovozli o'qish uchun)", "uz": "o'zbekcha batafsil tushuntirish, tarjima yoki misollar"}.
3. Agar foydalanuvchi koreyscha gap yozsa, xatosini muloyim tuzatib, to'g'ri variantini ko'rsat.
4. Seoul National University Korean (서울대 한국어 1A-6B) va TOPIK grammatikasi bo'yicha aniq misollar ber.`;

    const contents = [
      ...history.slice(-6).map((m) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.role === 'user' ? m.ko : `${m.ko}\n${m.uz || ''}` }]
      })),
      { role: 'user', parts: [{ text: message }] }
    ];

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemPrompt }] },
          contents,
          generationConfig: {
            responseMimeType: 'application/json',
            temperature: 0.7
          }
        })
      }
    );

    const data = await response.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      return res.status(500).json({ error: 'AI javob qaytarmadi', details: data });
    }

    const parsed = JSON.parse(rawText);
    return res.status(200).json(parsed);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
