export const snu1A = {
  code: '1A',
  label: '서울대 한국어 1A',
  range: 'TOPIK 1 · Boshlang‘ich 1 (1과–8과 To‘liq)',
  lessons: [
    {
      id: '1a-1', num: 1, week: '1A · 1과', emoji: '👋', title: '안녕하세요? (Tanishuv)',
      heroKo: '저는 우즈베키스탄 사람이에요', heroUz: 'Men O‘zbekistonlikman',
      pinkTitle: 'N은/는 N이에요 / 예요', pinkSub: 'Millat, kasb va ismni tanishtirish',
      pinkGroups: [
        {
          cond: '받침이 없으면 (Unli bilan tugasa) → 예요',
          items: [
            { ko: '저는 유나예요.', uz: 'Men Yunaman.' },
            { ko: '저는 가수예요.', uz: 'Men qo‘shiqchiman.' },
            { ko: '저는 의사예요.', uz: 'Men shifokorman.' }
          ]
        },
        {
          cond: '받침이 있으면 (Undosh bilan tugasa) → 이에요',
          items: [
            { ko: '저는 학생이에요.', uz: 'Men talabaman.' },
            { ko: '저는 회사원이에요.', uz: 'Men kompaniya xodimiman.' },
            { ko: '저는 선생님이에요.', uz: 'Men o‘qituvchiman.' }
          ]
        }
      ],
      greenTitle: '문장 구조', greenFormula: '저는 + 명사 + 예요 / 이에요',
      greenRows: [
        { parts: ['저는', '학생', '이에요'], res: '저는 학생이에요.', uz: 'Men talabaman.' },
        { parts: ['저는', '가수', '예요'], res: '저는 가수예요.', uz: 'Men qo‘shiqchiman.' }
      ],
      words: [
        { ko: '한국 / 우즈베키스탄', uz: 'Koreya / O‘zbekiston' },
        { ko: '학생 / 선생님', uz: 'Talaba / O‘qituvchi' },
        { ko: '회사원 / 의사', uz: 'Kompaniya xodimi / Shifokor' },
        { ko: '이름 / 국적', uz: 'Ism / Millat' },
        { ko: '만나서 반갑습니다', uz: 'Tanishganimdan xursandman' }
      ],
      homework: {
        taskUz: "O‘zingizni tanishtiring: 'Men talabaman' deb koreyscha yozing.",
        sampleKo: '저는 학생이에요',
        hint: '저는 + 학생 + 이에요'
      },
      quizzes: [
        { q: "‘저는 학생___’ — to‘g‘ri qo‘shimcha:", opts: ['이에요', '예요', '을', '에'], ans: '이에요', exp: "‘학생’ undosh bilan tugagani uchun ‘이에요’ qo‘shiladi." },
        { q: "‘저는 의사___’ — to‘g‘ri qo‘shimcha:", opts: ['예요', '이에요', '에서', '를'], ans: '예요', exp: "‘의사’ unli bilan tugagani uchun ‘예요’ qo‘shiladi." }
      ]
    },
    {
      id: '1a-2', num: 2, week: '1A · 2과', emoji: '🎒', title: '이거 뭐예요? (Buyumlar)',
      heroKo: '이것은 한국어 사전이에요', heroUz: 'Bu koreys tili lug‘ati',
      pinkTitle: '이것 / 그것 / 저것 & N이/가 아니에요', pinkSub: 'Ko‘rsatish olmoshlari va inkor shakli (-emas)',
      pinkGroups: [
        {
          cond: '이거 (bu), 그거 (u), 저거 (anavi) | Inkor: 이/가 아니에요',
          items: [
            { ko: '이거는 핸드폰이에요.', uz: 'Bu telefon.' },
            { ko: '저거는 시계가 아니에요. 카메라예요.', uz: 'Anavi soat emas. Kamera.' },
            { ko: '그거는 제 우산이에요.', uz: 'U mening soyabonim.' }
          ]
        }
      ],
      greenTitle: '문장 구조', greenFormula: '이거는 + 명사 + 이/가 아니에요',
      greenRows: [
        { parts: ['이거는', '책이', '아니에요'], res: '이거는 책이 아니에요.', uz: 'Bu kitob emas.' }
      ],
      words: [
        { ko: '책 / 공책', uz: 'Kitob / Daftar' },
        { ko: '사전 / 연필', uz: 'Lug‘at / Qalam' },
        { ko: '시계 / 안경', uz: 'Soat / Ko‘zoynak' },
        { ko: '우산 / 모자', uz: 'Soyabon / Bosh kiyim' }
      ],
      homework: {
        taskUz: "Inkor gap yozing: 'Bu kitob emas' (이거는 ...).",
        sampleKo: '이거는 책이 아니에요',
        hint: '이거는 + 책이 + 아니에요'
      },
      quizzes: [
        { q: "‘Bu soat emas’ — to‘g‘ri tarjima:", opts: ['이거는 시계가 아니에요', '이거는 시계예요', '이거는 시계 있어요', '이거는 시계를 아니에요'], ans: '이거는 시계가 아니에요', exp: "Inkor shaklida ‘이/가 아니에요’ ishlatiladi." }
      ]
    },
    {
      id: '1a-3', num: 3, week: '1A · 3과', emoji: '📚', title: '한국어를 공부해요 (Kundalik ishlar)',
      heroKo: '도서관에서 한국어를 공부해요', heroUz: 'Kutubxonada koreys tilini o‘rganaman',
      pinkTitle: 'V-아요 / 어요 & N에서', pinkSub: 'Hozirgi zamon fe’li va harakat joyi',
      pinkGroups: [
        {
          cond: 'ㅏ, ㅗ → 아요  |  Boshqa unlilar → 어요  |  하다 → 해요',
          items: [
            { ko: '카페에서 친구를 만나요.', uz: 'Kafeda do‘stim bilan uchrashaman.' },
            { ko: '식당에서 비빔밥을 먹어요.', uz: 'Oshxonada bibimbap yeyman.' },
            { ko: '집에서 텔레비전을 봐요.', uz: 'Uyda televizor ko‘raman.' }
          ]
        }
      ],
      greenTitle: '문장 구조', greenFormula: '장소 + 에서 + 목적어 + 을/를 + V-아요/어요',
      greenRows: [
        { parts: ['도서관에서', '한국어를', '공부해요'], res: '도서관에서 한국어를 공부해요.', uz: 'Kutubxonada koreys tilini o‘rganaman.' }
      ],
      words: [
        { ko: '도서관 / 식당', uz: 'Kutubxona / Oshxona' },
        { ko: '공부하다 / 일하다', uz: 'O‘qimoq / Ishlamoq' },
        { ko: '먹다 / 마시다', uz: 'Yemoq / Ichmoq' },
        { ko: '보다 / 읽다', uz: 'Ko‘rmoq / O‘qimoq' }
      ],
      homework: {
        taskUz: "Harakat joyini yozing: 'Kutubxonada koreys tilini o‘rganaman'.",
        sampleKo: '도서관에서 한국어를 공부해요',
        hint: '도서관에서 + 한국어를 + 공부해요'
      },
      quizzes: [
        { q: "Harakat bajarilayotgan joyga qaysi qo‘shimcha qo‘shiladi?", opts: ['에서', '에', '도', '와'], ans: '에서', exp: "Harakat fe’li bilan joyga ‘-에서’ qo‘shiladi." }
      ]
    },
    {
      id: '1a-4', num: 4, week: '1A · 4과', emoji: '📍', title: '어디에 있어요? (Joylashuv)',
      heroKo: '은행은 병원 옆에 있어요', heroUz: 'Bank kasalxonaning yonida joylashgan',
      pinkTitle: 'N에 있어요 / 없어요 & Joy otlari', pinkSub: '위 (ustida), 아래 (ostida), 앞 (oldida), 뒤 (orqasida), 옆 (yonida)',
      pinkGroups: [
        {
          cond: 'Narsa + 이/가 + Joy + 에 있어요',
          items: [
            { ko: '가방이 의자 위에 있어요.', uz: 'Sumka stulning ustida turibdi.' },
            { ko: '약국이 은행하고 병원 사이에 있어요.', uz: 'Dorixona bank va kasalxona orasida joylashgan.' }
          ]
        }
      ],
      greenTitle: '문장 구조', greenFormula: '명사1 + 은/는 + 명사2 + 앞/뒤/옆 + 에 있어요',
      greenRows: [
        { parts: ['은행은', '병원 옆', '에 있어요'], res: '은행은 병원 옆에 있어요.', uz: 'Bank kasalxona yonida.' }
      ],
      words: [
        { ko: '은행 / 병원 / 약국', uz: 'Bank / Kasalxona / Dorixona' },
        { ko: '위 / 아래 / 밑', uz: 'Ustida / Ostida / Tagida' },
        { ko: '앞 / 뒤 / 옆', uz: 'Oldida / Orqasida / Yonida' },
        { ko: '안 / 밖 / 사이', uz: 'Ichida / Tashqarisida / Orasida' }
      ],
      homework: {
        taskUz: "Joylashuvni yozing: 'Sumka stul ustida bor' (가방이 의자 ...).",
        sampleKo: '가방이 의자 위에 있어요',
        hint: '가방이 + 의자 위에 + 있어요'
      },
      quizzes: [
        { q: "‘Kasalxona yonida’ koreys tilida qanday bo‘ladi?", opts: ['병원 옆에', '병원 위에', '병원 안에', '병원 밑에'], ans: '병원 옆에', exp: "‘옆’ — yonida." }
      ]
    },
    {
      id: '1a-5', num: 5, week: '1A · 5과', emoji: '📅', title: '주말에 친구를 만났어요 (O‘tgan zamon)',
      heroKo: '어제 친구하고 영화를 봤어요', heroUz: 'Kecha do‘stim bilan kino ko‘rdim',
      pinkTitle: 'V-았어요 / 었어요 & N하고', pinkSub: 'O‘tgan zamon va birgalik (-bilan)',
      pinkGroups: [
        {
          cond: 'ㅏ, ㅗ → 았어요 | Boshqa unlilar → 었어요 | 하다 → 했어요',
          items: [
            { ko: '토요일에 백화점에서 쇼핑했어요.', uz: 'Shanba kuni univermagda xarid qildim.' },
            { ko: '일요일에 집에서 책을 읽었어요.', uz: 'Yakshanba kuni uyda kitob o‘qidim.' }
          ]
        }
      ],
      greenTitle: '문장 구조', greenFormula: '언제 + 누구하고 + 무엇을 + V-았/었어요',
      greenRows: [
        { parts: ['어제', '친구하고 영화를', '봤어요'], res: '어제 친구하고 영화를 봤어요.', uz: 'Kecha do‘stim bilan kino ko‘rdim.' }
      ],
      words: [
        { ko: '어제 / 오늘 / 내일', uz: 'Kecha / Bugun / Ertaga' },
        { ko: '월요일 ~ 일요일', uz: 'Dushanba ~ Yakshanba' },
        { ko: '쇼핑하다 / 운동하다', uz: 'Xarid qilmoq / Sport qilmoq' },
        { ko: '산책하다 / 쉬다', uz: 'Sayr qilmoq / Dam olmoq' }
      ],
      homework: {
        taskUz: "O‘tgan zamonda yozing: 'Kecha kino ko‘rdim'.",
        sampleKo: '어제 영화를 봤어요',
        hint: '어제 + 영화를 + 봤어요'
      },
      quizzes: [
        { q: "‘먹다’ (yemoq) fe’lining o‘tgan zamon shakli:", opts: ['먹었어요', '먹았어요', '먹해요', '먹을 거예요'], ans: '먹었어요', exp: "‘ㅓ’ unlisidan keyin ‘-었어요’ qo‘shiladi." }
      ]
    },
    {
      id: '1a-6', num: 6, week: '1A · 6과', emoji: '🍎', title: '얼마예요? (Xarid va Sonlar)',
      heroKo: '사과 다섯 개하고 오렌지 두 개 주세요', heroUz: 'Beshta olma va ikkita apelsin bering',
      pinkTitle: 'Asl Koreys Sonlari + 개, 병, 잔, 명, 권', pinkSub: '하나(한), 둘(두), 셋(세), 넷(네), 다섯...',
      pinkGroups: [
        {
          cond: 'Buyum: 개 | Shisha: 병 | Stakan: 잔 | Odam: 명 | Kitob: 권',
          items: [
            { ko: '아이스 아메리카노 두 잔 주세요.', uz: 'Ikkita muzli amerikano bering.' },
            { ko: '학생이 모두 열 명 있어요.', uz: 'Jami o‘n nafar talaba bor.' }
          ]
        }
      ],
      greenTitle: '문장 구조', greenFormula: '명사 + 수량(한/두/세) + 단위(개/잔) + 주세요',
      greenRows: [
        { parts: ['사과', '다섯 개', '주세요'], res: '사과 다섯 개 주세요.', uz: 'Beshta olma bering.' }
      ],
      words: [
        { ko: '하나 / 둘 / 셋 / 넷 / 다섯', uz: '1 / 2 / 3 / 4 / 5 (Asl koreys)' },
        { ko: '일 / 이 / 삼 / 사 / 오', uz: '1 / 2 / 3 / 4 / 5 (Xitoy-koreys)' },
        { ko: '얼마예요? / 싸다 / 비싸다', uz: 'Qancha? / Arzon / Qimmat' },
        { ko: '깎아 주세요', uz: 'Narxini tushirib bering' }
      ],
      homework: {
        taskUz: "Do‘konda so‘rang: 'Ikki stakan kofe bering'.",
        sampleKo: '커피 두 잔 주세요',
        hint: '커피 + 두 잔 + 주세요'
      },
      quizzes: [
        { q: "Odamlarni sanashda qaysi hisob so‘zi ishlatiladi?", opts: ['명', '개', '잔', '권'], ans: '명', exp: "Odamlar ‘명’ (yoki hurmatda ‘분’) bilan sanaladi." }
      ]
    },
    {
      id: '1a-7', num: 7, week: '1A · 7과', emoji: '☀️', title: '날씨가 어때요? (Ob-havo va Fasllar)',
      heroKo: '한국은 봄에 따뜻하고 꽃이 많이 펴요', heroUz: 'Koreyada bahorda havo iliq bo‘ladi va gullar ko‘p ochiladi',
      pinkTitle: 'A/V-고 (Va) & ㅂ-noto‘g‘ri sifatlar', pinkSub: '춥다 → 추워요, 덥다 → 더워요, 아름답다 → 아름다워요',
      pinkGroups: [
        {
          cond: 'Bog‘lovchi (-va): -고 | ㅂ tushishi: 춥다 → 추워요',
          items: [
            { ko: '오늘은 날씨가 맑고 시원해요.', uz: 'Bugun havo ochiq va salqin.' },
            { ko: '겨울에는 눈이 오고 아주 추워요.', uz: 'Qishda qor yog‘adi va juda sovuq bo‘ladi.' }
          ]
        }
      ],
      greenTitle: '문장 구조', greenFormula: '계절 + 에는 + 형용사1-고 + 형용사2-아요/어요',
      greenRows: [
        { parts: ['오늘은', '맑고', '시원해요'], res: '오늘은 맑고 시원해요.', uz: 'Bugun havo ochiq va salqin.' }
      ],
      words: [
        { ko: '봄 / 여름 / 가을 / 겨울', uz: 'Bahor / Yoz / Kuz / Qish' },
        { ko: '따뜻하다 / 덥다', uz: 'Iliq / Issiq' },
        { ko: '시원하다 / 춥다', uz: 'Salqin / Sovuq' },
        { ko: '비가 오다 / 눈이 오다', uz: 'Yomg‘ir yog‘moq / Qor yog‘moq' }
      ],
      homework: {
        taskUz: "Ob-havoni tasvirlang: 'Bugun havo sovuq' (오늘 날씨가 ...).",
        sampleKo: '오늘 날씨가 추워요',
        hint: '오늘 날씨가 + 추워요'
      },
      quizzes: [
        { q: "‘덥다’ (issiq) sifatining hozirgi zamon shakli:", opts: ['더워요', '덥아요', '덥어요', '더웠어요'], ans: '더워요', exp: "‘ㅂ’ undoshi ‘우’ ga aylanib ‘더워요’ bo‘ladi." }
      ]
    },
    {
      id: '1a-8', num: 8, week: '1A · 8과', emoji: '🎬', title: '주말에 같이 영화 볼까요? (Taklif)',
      heroKo: '토요일 오후에 같이 등산할까요?', heroUz: 'Shanba tushdan keyin birga toqqa chiqaylikmi?',
      pinkTitle: 'V-(으)ㄹ까요? & V-고 싶다', pinkSub: 'Taklif bildirish (-aylikmi?) va istak (-moqchi)',
      pinkGroups: [
        {
          cond: 'Taklif: -(으)ㄹ까요? | Istak: -고 싶어요',
          items: [
            { ko: '우리 내일 같이 점심 먹을까요?', uz: 'Ertaga birga tushlik qilaylikmi?' },
            { ko: '저는 한국 음식을 만들고 싶어요.', uz: 'Men koreys taomini tayyorlamoqchiman.' }
          ]
        }
      ],
      greenTitle: '문장 구조', greenFormula: '같이 + 명사 + 을/를 + V-(으)ㄹ까요?',
      greenRows: [
        { parts: ['같이', '영화를', '볼까요?'], res: '같이 영화를 볼까요?', uz: 'Birga kino ko‘raylikmi?' }
      ],
      words: [
        { ko: '등산하다 / 수영하다', uz: 'Toqqa chiqmoq / Suzmoq' },
        { ko: '노래방에 가다', uz: 'Karaokega bormoq' },
        { ko: '시간이 있다 / 없다', uz: 'Vaqti bor / yo‘q' },
        { ko: '미안하지만 / 좋아요', uz: 'Kechirasiz-u, lekin / Yaxshi, mayli' }
      ],
      homework: {
        taskUz: "Do‘stingizga taklif qiling: 'Birga tushlik qilaylikmi?'.",
        sampleKo: '같이 점심을 먹을까요?',
        hint: '같이 + 점심을 + 먹을까요?'
      },
      quizzes: [
        { q: "‘Kino ko‘rmoqchiman’ — to‘g‘ri istak shakli:", opts: ['영화를 보고 싶어요', '영화를 볼까요', '영화를 봤어요', '영화를 보세요'], ans: '영화를 보고 싶어요', exp: "Istak qo‘shimchasi: ‘V-고 싶다’." }
      ]
    }
  ]
};