export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      ko: 'API 키 설정이 필요해요!',
      uz: 'Vercel Settings -> Environment Variables bo‘limida GEMINI_API_KEY topilmadi!'
    });
  }

  try {
    const { message, history = [], userName = 'Talaba' } = req.body;

    const systemPrompt = `Sen ZiyoPrep ilovasining aqlli, samimiy va bilimdon koreys tili AI ustozi "토히르벡 (Tokhirbek AI)"san.
Foydalanuvchi ismi: ${userName}.
Qoidalar:
1. Foydalanuvchi o'zbekcha, koreyscha yoki aralash nima yozsa ham, xuddi jonli ustozdek tabiiy, aqlli va batafsil javob ber.
2. Javobingni har doim JSON formatida qaytar: {"ko": "koreyscha tabiiy javob (ovozli o'qish uchun)", "uz": "o'zbekcha batafsil tushuntirish, misollar yoki suhbat javobi"}.
3. Agar foydalanuvchi koreyscha gap yozsa, xatosini muloyim tuzatib, to'g'ri variantini ko'rsat.`;

    const contents = [
      ...history.slice(-6).map((m) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.role === 'user' ? m.ko : `${m.ko}\n${m.uz || ''}` }]
      })),
      { role: 'user', parts: [{ text: message }] }
    ];

    // Model nomi (gemini-1.5-flash barqaror ishlaydi)
    let url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';
    const headers = { 'Content-Type': 'application/json' };

    // Agar kalit AIza bilan boshlansa ?key= orqali, AQ. bilan boshlansa Bearer token sifatida yuboramiz
    if (apiKey.startsWith('AIza')) {
      url += `?key=${apiKey}`;
    } else {
      headers['Authorization'] = `Bearer ${apiKey}`;
    }

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemPrompt }] },
        contents,
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.7
        }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(200).json({
        ko: 'API 오류가 발생했어요.',
        uz: `Google AI xatosi (${response.status}): ${data?.error?.message || JSON.stringify(data)}`
      });
    }

    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    const parsed = JSON.parse(rawText);
    return res.status(200).json(parsed);
  } catch (err) {
    return res.status(200).json({
      ko: '잠시 오류가 발생했어요.',
      uz: `Server xatosi: ${err.message}`
    });
  }
}
