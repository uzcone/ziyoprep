
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      ko: "잘못된 요청이에요.",
      uz: "Faqat POST so‘rovi qabul qilinadi."
    });
  }

  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      ko: "API 키 설정이 필요해요.",
      uz: "Vercel Environment Variables ichida GROQ_API_KEY topilmadi."
    });
  }

  try {
    const {
      message,
      history = [],
      userName = "Talaba"
    } = req.body || {};

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        ko: "질문을 입력해 주세요.",
        uz: "Iltimos, savolingizni yozing."
      });
    }

    const systemPrompt = `
Sen ZiyoPrep AI — "토히르벡 AI" nomli aqlli
va samimiy koreys tili ustozisan.

Foydalanuvchi ismi: ${userName}.

ASOSIY VAZIFALARING:
1. Koreys tilini tushunarli va sodda o‘rgat.
2. Ingliz tilini ham o‘rgat.
3. TOPIK imtihonlariga tayyorlashda yordam ber.
4. Grammatikani misollar bilan tushuntir.
5. Tarjima, dasturlash va boshqa mavzulardagi
   savollarga ham javob ber.
6. Foydalanuvchining oldingi xabarlarini hisobga ol.
7. Noto‘g‘ri ma'lumot to‘qib chiqarma.
8. Tabiiy, do‘stona va professional javob ber.

JAVOB FORMATI:
Faqat quyidagi JSON formatida javob qaytar:
{
  "ko": "Koreys tilidagi javob",
  "uz": "O‘zbek tilidagi javob"
}

JSON dan tashqarida hech qanday matn yozma.
Har ikkala maydon ham to‘ldirilgan bo‘lsin.
`;

    const safeHistory = Array.isArray(history)
      ? history.slice(-8).map((m) => ({
          role: m.role === "user" ? "user" : "assistant",
          content:
            m.role === "user"
              ? String(m.ko || m.uz || "")
              : `Koreyscha: ${m.ko || ""}\nO‘zbekcha: ${m.uz || ""}`
        }))
      : [];

    const messages = [
      { role: "system", content: systemPrompt },
      ...safeHistory,
      { role: "user", content: message }
    ];

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-20b",
          messages,
          temperature: 0.7,
          max_completion_tokens: 2000
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Groq API error:", data);

      return res.status(200).json({
        ko: "AI 응답 중 오류가 발생했어요.",
        uz: `AI xatosi (${response.status}): ${
          data?.error?.message || "Noma'lum API xatosi"
        }`
      });
    }

    const rawText =
      data?.choices?.[0]?.message?.content || "";

    let parsed;

    try {
      const cleaned = rawText
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();

      const start = cleaned.indexOf("{");
      const end = cleaned.lastIndexOf("}");

      if (start !== -1 && end > start) {
        parsed = JSON.parse(cleaned.slice(start, end + 1));
      } else {
        throw new Error("JSON topilmadi");
      }
    } catch (error) {
      console.error("JSON parse error:", error);

      parsed = {
        ko: rawText,
        uz: rawText
      };
    }

    return res.status(200).json({
      ko: parsed.ko || rawText,
      uz: parsed.uz || rawText
    });

  } catch (error) {
    console.error("Server error:", error);

    return res.status(500).json({
      ko: "서버에 일시적인 문제가 발생했어요.",
      uz: `Server xatosi: ${error.message}`
    });
  }
}
