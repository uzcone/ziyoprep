export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      ko: 'API 키 설정이 필요해요!',
      uz: 'Vercel Settings da GROQ_API_KEY topilmadi!'
    });
  }

  try {
    const { message, history = [], userName = 'Talaba' } = req.body;

    const systemPrompt = `Sen ZiyoPrep ilovasining aqlli, samimiy va bilimdon koreys tili AI ustozi "토히르벡 (Tokhirbek AI)"san.
Foydalanuvchi ismi: ${userName}.
Qoidalar:
1. Foydalanuvchi nima yozsa ham, xuddi jonli ustozdek tabiiy, aqlli va batafsil javob ber.
2. Javobingni FAQAT quyidagi JSON formatida qaytar: {"ko": "koreyscha tabiiy javob", "uz": "o'zbekcha batafsil tushuntirish"}`;

    const messages = [
      { role: "system", content: systemPrompt },
      ...history.slice(-6).map((m) => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.role === 'user' ? m.ko : `${m.ko}\n${m.uz || ''}`
      })),
      { role: "user", content: message }
    ];

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages,
        temperature: 0.7
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(200).json({
        ko: 'API 오류가 발생했어요.',
        uz: `Groq xatosi (${response.status}): ${data?.error?.message || JSON.stringify(data)}`
      });
    }

    const rawText = data?.choices?.[0]?.message?.content || '';
    
    let parsed;
    try {
      const jsonMatch = rawText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsed = JSON.parse(jsonMatch[0]);
      } else {
        parsed = { ko: rawText, uz: "Javob qabul qilindi." };
      }
    } catch {
      parsed = { ko: rawText, uz: rawText };
    }

    return res.status(200).json(parsed);
  } catch (err) {
    return res.status(200).json({
      ko: '잠시 오류가 발생했어요.',
      uz: `Server xatosi: ${err.message}`
    });
  }
}