export const snu3AB = {
  code: '3A-3B',
  label: '서울대 한국어 3A & 3B',
  range: 'TOPIK 3–4 · O‘rta Bosqich (To‘liq)',
  lessons: [
    {
      id: '3a-1', num: 1, week: '3A · 1과', emoji: '🗣️', title: '친구가 내일 온다고 했어요 (Bilvosita nutq)',
      heroKo: '일기 예보에서 내일 비가 온다고 했어요', heroUz: 'Ob-havo ma’lumotida ertaga yomg‘ir yog‘adi deb aytdi',
      pinkTitle: 'A/V-다고 하다 · -(으)라고 하다 · -자고 하다', pinkSub: 'Darak, buyruq va taklif gaplarni yetkazish',
      pinkGroups: [
        {
          cond: 'Darak: -ㄴ/는다고 하다 | Buyruq: -(으)라고 하다 | Taklif: -자고 하다',
          items: [
            { ko: '선생님께서 숙제를 꼭 하라고 하셨어요.', uz: 'O‘qituvchi uy vazifasini albatta qiling deb aytdilar.' },
            { ko: '친구가 주말에 같이 등산하자고 했어요.', uz: 'Do‘stim dam olish kuni birga toqqa chiqaylik deb aytdi.' }
          ]
        }
      ],
      greenTitle: '문장 구조', greenFormula: 'Ega + 이/가 + V-ㄴ/는다고 했어요',
      greenRows: [
        { parts: ['친구가', '내일 온다고', '했어요'], res: '친구가 내일 온다고 했어요.', uz: 'Do‘stim ertaga kelaman deb aytdi.' }
      ],
      words: [
        { ko: '전하다 / 소식 / 일기 예보 / 약속', uz: 'Yetkazmoq / Xabar / Ob-havo ma’lumoti / Va’da' }
      ],
      homework: {
        taskUz: "Bilvosita nutq yozing: 'Do‘stim ertaga kelaman deb aytdi'.",
        sampleKo: '친구가 내일 온다고 했어요',
        hint: '친구가 + 내일 온다고 + 했어요'
      },
      quizzes: [
        { q: "‘Birga ovqatlanaylik deb aytdi’ (taklif bilvosita nutqi):", opts: ['같이 밥을 먹자고 했어요', '같이 밥을 먹는다고 했어요', '같이 밥을 먹으라고 했어요', '같이 밥을 먹냐고 했어요'], ans: '같이 밥을 먹자고 했어요', exp: "Taklif gap: ‘-자고 하다’." }
      ]
    },
    {
      id: '3a-2', num: 2, week: '3A · 2과', emoji: '🤔', title: '밖에 비가 올 것 같아요 (Taxmin)',
      heroKo: '하늘이 흐린 걸 보니까 비가 올 것 같아요', heroUz: 'Osmon bulutligiga qaraganda yomg‘ir yog‘adiganga o‘xshaydi',
      pinkTitle: 'A/V-(으)ㄴ/는/(으)ㄹ 것 같다 & V-(으)ㄴ 걸 보니까', pinkSub: 'Dalilga asoslangan taxmin bildirish',
      pinkGroups: [
        {
          cond: 'O‘tgan: -(으)ㄴ 것 같다 | Hozirgi: -는 것 같다 | Kelajak: -(으)ㄹ 것 같다',
          items: [
            { ko: '지금은 길이 많이 막히는 것 같아요.', uz: 'Hozir yo‘l ancha tirbandga o‘xshaydi.' },
            { ko: '내일은 오늘보다 더 추울 것 같아요.', uz: 'Ertaga bugungidan sovuqroq bo‘ladiganga o‘xshaydi.' }
          ]
        }
      ],
      greenTitle: '문장 구조', greenFormula: '문장 + -(으)ㄹ 것 같아요',
      greenRows: [
        { parts: ['비가', '올 것', '같아요'], res: '비가 올 것 같아요.', uz: 'Yomg‘ir yog‘adiganga o‘xshaydi.' }
      ],
      words: [
        { ko: '흐리다 / 아마 / 분위기 / 어울리다', uz: 'Bulutli / Ehtimol / Muhit / Mos kelmoq' }
      ],
      homework: {
        taskUz: "Taxmin gap yozing: 'Ertaga yomg‘ir yog‘adiganga o‘xshaydi'.",
        sampleKo: '내일 비가 올 것 같아요',
        hint: '내일 + 비가 올 것 + 같아요'
      },
      quizzes: [
        { q: "‘Hozir yo‘l tirbandga o‘xshaydi’ (hozirgi zamon taxmini):", opts: ['길이 막히는 것 같아요', '길이 막힌 것 같아요', '길이 막힐 것 같아요', '길이 막혔거든요'], ans: '길이 막히는 것 같아요', exp: "Hozirgi zamon taxmini: ‘-는 것 같다’." }
      ]
    },
    {
      id: '3b-1', num: 3, week: '3B · 1과', emoji: '😱', title: '비행기를 놓칠 뻔했어요 (Sal qolish)',
      heroKo: '늦잠을 자서 중요한 면접에 늦을 뻔했어요', heroUz: 'Uxlab qolib muhim suhbatga kech qolishimga sal qoldi',
      pinkTitle: 'V-(으)ㄹ 뻔하다 & V-기로 하다', pinkSub: 'Salbiy hodisaga bir bahya qolish va qat’iy qaror',
      pinkGroups: [
        {
          cond: 'Sal qolish: -(으)ㄹ 뻔했어요 | Qaror: -기로 했어요',
          items: [
            { ko: '길이 미끄러워서 넘어질 뻔했어요.', uz: 'Yo‘l sirpanchiq bo‘lgani uchun yiqilib tushishimga sal qoldi.' },
            { ko: '매일 아침 운동하기로 했어요.', uz: 'Har kuni ertalab sport bilan shug‘ullanishga qaror qildim.' }
          ]
        }
      ],
      greenTitle: '문장 구조', greenFormula: '원인 + V-(으)ㄹ 뻔했어요',
      greenRows: [
        { parts: ['늦잠을 자서', '지각할', '뻔했어요'], res: '늦잠을 자서 지각할 뻔했어요.', uz: 'Uxlab qolib kech qolishimga sal qoldi.' }
      ],
      words: [
        { ko: '놓치다 / 넘어지다 / 지각하다 / 결심하다', uz: 'O‘tkazib yubormoq / Yiqilmoq / Kech qolmoq / Qaror qilmoq' }
      ],
      homework: {
        taskUz: "Sal qolish gapini yozing: 'Yiqilib tushishimga sal qoldi'.",
        sampleKo: '넘어질 뻔했어요',
        hint: '넘어질 + 뻔했어요'
      },
      quizzes: [
        { q: "‘Yiqilishimga sal qoldi’ — to‘g‘ri grammatika:", opts: ['넘어질 뻔했어요', '넘어지기로 했어요', '넘어진 적이 있어요', '넘어질 수 있어요'], ans: '넘어질 뻔했어요', exp: "Sal qolish holati: ‘-(으)ㄹ 뻔하다’." }
      ]
    }
  ]
};

export const snu4AB = {
  code: '4A-4B',
  label: '서울대 한국어 4A & 4B',
  range: 'TOPIK 4–5 · Yuqori-o‘rta (To‘liq)',
  lessons: [
    {
      id: '4a-1', num: 1, week: '4A · 1과', emoji: '⚖️', title: '편리한 반면에 물가가 비싸요',
      heroKo: '도시 생활은 편리한 반면에 스트레스가 많아요', heroUz: 'Shahar hayoti qulay bo‘lgani holda, stress ko‘p',
      pinkTitle: 'V-는 반면에 & N뿐만 아니라', pinkSub: 'Qiyosiy tahlil va qo‘shimcha ma’lumot',
      pinkGroups: [
        {
          cond: 'Qiyoslash: -는 반면에 | Nafaqat ... balki: -뿐만 아니라',
          items: [
            { ko: '그는 한국어뿐만 아니라 영어도 유창하게 구사해요.', uz: 'U nafaqat koreys, balki ingliz tilida ham ravon gapiradi.' }
          ]
        }
      ],
      greenTitle: '문장 구조', greenFormula: '장점 + -는 반면에 + 단점',
      greenRows: [
        { parts: ['편리한 반면에', '물가가', '비싸요'], res: '편리한 반면에 물가가 비싸요.', uz: 'Qulay bo‘lgani holda narxlar qimmat.' }
      ],
      words: [
        { ko: '물가 / 장단점 / 구사하다 / 직접', uz: 'Narx-navo / Yutuq-kamchilik / Ravon gapirmoq / Bevosita' }
      ],
      homework: {
        taskUz: "Qiyosiy gap yozing: 'Qulay bo‘lgani holda narxlar qimmat'.",
        sampleKo: '편리한 반면에 물가가 비싸요',
        hint: '편리한 반면에 + 물가가 비싸요'
      },
      quizzes: [
        { q: "‘Nafaqat koreys, balki ingliz tilini ham biladi’:", opts: ['한국어뿐만 아니라 영어도', '한국어 덕분에 영어도', '한국어 탓에 영어도', '한국어 대신에 영어도'], ans: '한국어뿐만 아니라 영어도', exp: "‘N뿐만 아니라’ — nafaqat ..., balki ... ham." }
      ]
    },
    {
      id: '4b-1', num: 2, week: '4B · 1과', emoji: '🏆', title: '선생님 덕분에 장학금을 받았어요',
      heroKo: '열심히 도와준 친구들 덕분에 성공할 수 있었어요', heroUz: 'Astoydil yordam bergan do‘stlarim sharofati bilan muvaffaqiyatga erishdim',
      pinkTitle: 'N 덕분에 vs V-는 바람에', pinkSub: 'Ijobiy sabab (덕분에) va kutilmagan salbiy sabab (-는 바람에)',
      pinkGroups: [
        {
          cond: 'Ijobiy natija → 덕분에 | Salbiy natija → -는 바람에',
          items: [
            { ko: '갑자기 비가 쏟아지는 바람에 옷이 다 젖었어요.', uz: 'To‘satdan jala quygani sababli kiyimlarim hammasi ho‘l bo‘ldi.' }
          ]
        }
      ],
      greenTitle: '문장 구조', greenFormula: '긍정 원인 + 덕분에',
      greenRows: [
        { parts: ['선생님 덕분에', '장학금을', '받았어요'], res: '선생님 덕분에 장학금을 받았어요.', uz: 'Ustozim sharofati bilan stipendiya oldim.' }
      ],
      words: [
        { ko: '장학금 / 응원 / 이겨내다 / 쏟아지다', uz: 'Stipendiya / Qo‘llab-quvvatlash / Yengib o‘tmoq / Jala quymoq' }
      ],
      homework: {
        taskUz: "Ijobiy sabab yozing: 'Ustozim sharofati bilan stipendiya oldim'.",
        sampleKo: '선생님 덕분에 장학금을 받았어요',
        hint: '선생님 덕분에 + 장학금을 받았어요'
      },
      quizzes: [
        { q: "Kutilmagan salbiy sababni ifodalovchi qo‘shimcha:", opts: ['-는 바람에', '덕분에', '뿐만 아니라', '기로 하다'], ans: '-는 바람에', exp: "Salbiy kutilmagan sabab: ‘-는 바람에’." }
      ]
    }
  ]
};

export const snu56 = {
  code: '5A-6B',
  label: '서울대 한국어 5A ~ 6B',
  range: 'TOPIK 5–6 · Oliy Akademik (To‘liq)',
  lessons: [
    {
      id: '5a-1', num: 1, week: '5A · 1과', emoji: '📊', title: '이 정도면 성공한 셈이에요',
      heroKo: '수출이 증가한 데 반해 내수 시장은 위축되었다', heroUz: 'Eksport oshgan bir paytda ichki bozor qisqardi',
      pinkTitle: 'A/V-(으)ㄴ/는 셈이다 & V-는 데 반해', pinkSub: 'TOPIK 5 rasmiy xulosa va keskin qiyoslash',
      pinkGroups: [
        {
          cond: 'Xulosa: -(으)ㄴ/는 셈이다 | Keskin qarama-qarshilik: -는 데 반해',
          items: [
            { ko: '1년 만에 TOPIK 5급을 땄으니 대단한 셈이다.', uz: '1 yil ichida TOPIK 5-darajani olgani uchun katta yutuq hisoblanadi.' }
          ]
        }
      ],
      greenTitle: '문장 구조', greenFormula: '결과 + -(으)ㄴ/는 셈이다',
      greenRows: [
        { parts: ['이 정도면', '성공한', '셈이에요'], res: '이 정도면 성공한 셈이에요.', uz: 'Bu daraja bo‘lsa muvaffaqiyatga erishilgan hisoblanadi.' }
      ],
      words: [
        { ko: '수출 / 수입 / 급성장하다 / 위축되다', uz: 'Eksport / Import / Tez o‘smoq / Qisqarmoq' }
      ],
      homework: {
        taskUz: "TOPIK 5 xulosasi: 'Deyarli tugatgan hisoblanamiz'.",
        sampleKo: '다 끝낸 셈이에요',
        hint: '다 끝낸 + 셈이에요'
      },
      quizzes: [
        { q: "‘Deyarli tugatgan hisoblanamiz’ — TOPIK 5 shakli:", opts: ['다 끝낸 셈이에요', '다 끝낼 뻔했어요', '다 끝내거든요', '다 끝내러 가요'], ans: '다 끝낸 셈이에요', exp: "Umumiy xulosa: ‘-(으)ㄴ/는 셈이다’." }
      ]
    },
    {
      id: '6a-1', num: 2, week: '6A · 1과', emoji: '🎓', title: '남녀노소를 막론하고 참여할 수 있다',
      heroKo: '본 연구는 AI 교육의 효율성을 규명한 바이다', heroUz: 'Ushbu tadqiqot AI ta’limi samaradorligini isbotlab berdi',
      pinkTitle: 'N을/를 막론하고 & V-는 바이다 & V-다시피 하다', pinkSub: 'TOPIK 6 oliy rasmiy uslub va ilmiy maqolalar tili',
      pinkGroups: [
        {
          cond: 'Qat’i nazar: -을/를 막론하고 | Deyarli ... qilmoq: -다시피 하다',
          items: [
            { ko: '시험 기간에는 하루 종일 도서관에서 살다시피 했어요.', uz: 'Imtihon paytida kun bo‘yi kutubxonada yashagandek bo‘ldim.' }
          ]
        }
      ],
      greenTitle: '문장 구조', greenFormula: '명사 + 을/를 막론하고',
      greenRows: [
        { parts: ['남녀노소를', '막론하고', '참여할 수 있다'], res: '남녀노소를 막론하고 참여할 수 있다.', uz: 'Yoshu qaridan qat’i nazar hamma qatnasha oladi.' }
      ],
      words: [
        { ko: '막론하다 / 규명하다 / 인재 / 전환되다', uz: 'Qat’i nazar / Isbotlamoq / Iqtidorli kadr / O‘zgarmoq' }
      ],
      homework: {
        taskUz: "TOPIK 6 iborasi: 'Kutubxonada yashagandek bo‘ldim'.",
        sampleKo: '도서관에서 살다시피 했어요',
        hint: '도서관에서 + 살다시피 + 했어요'
      },
      quizzes: [
        { q: "‘Yoshu qaridan qat’i nazar’ — TOPIK 6 iborasi:", opts: ['남녀노소를 막론하고', '남녀노소 덕분에', '남녀노소 탓에', '남녀노소지만'], ans: '남녀노소를 막론하고', exp: "‘N을/를 막론하고’ — ...-dan qat’i nazar." }
      ]
    }
  ]
};