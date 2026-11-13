export const snu1B = {
  code: '1B',
  label: '서울대 한국어 1B',
  range: 'TOPIK 1–2 · Boshlang‘ich 2 (9과–16과 To‘liq)',
  lessons: [
    {
      id: '1b-1', num: 9, week: '1B · 9과', emoji: '👨‍👩‍👧‍👦', title: '가족이 몇 명이에요? (Oila va Hurmat)',
      heroKo: '부모님께서 고향에 계세요', heroUz: 'Ota-onam vatanimda yashaydilar',
      pinkTitle: 'N께서 / V-(으)세요 / 계시다 · 드시다 · 주무시다', pinkSub: 'Kattalarga hurmat shakli (높임말)',
      pinkGroups: [
        {
          cond: '있다 → 계시다 | 먹다 → 드시다 | 자다 → 주무시다 | 말하다 → 말씀하시다',
          items: [
            { ko: '할아버지께서 신문을 읽으세요.', uz: 'Bobom gazeta o‘qiyaptilar.' },
            { ko: '어머니께서 부엌에서 요리하세요.', uz: 'Onam oshxonada ovqat pishiryaptilar.' },
            { ko: '부모님께서 지금 주무세요.', uz: 'Ota-onam hozir uxlayaptilar.' }
          ]
        }
      ],
      greenTitle: '문장 구조', greenFormula: '가족(Hurmat) + 께서 + 동사-(으)세요',
      greenRows: [
        { parts: ['부모님께서', '고향에', '계세요'], res: '부모님께서 고향에 계세요.', uz: 'Ota-onam vatanimda yashaydilar.' }
      ],
      words: [
        { ko: '할아버지 / 할머니', uz: 'Bobo / Buvi' },
        { ko: '아버지 / 어머니', uz: 'Ota / Ona' },
        { ko: '형 / 오빠 / 누나 / 언니', uz: 'Aka / Opa' },
        { ko: '동생 / 남동생 / 여동생', uz: 'Uka / Singil' },
        { ko: '연세 / 성함 / 댁', uz: 'Yosh / Ism / Uy (hurmat)' }
      ],
      homework: {
        taskUz: "Hurmat shaklida yozing: 'Ota-onam vatanimda yashaydilar' (부모님께서 ...).",
        sampleKo: '부모님께서 고향에 계세요',
        hint: '부모님께서 + 고향에 + 계세요'
      },
      quizzes: [
        { q: "‘자다’ (uxlamoq) fe’lining kattalarga nisbatan hurmat shakli:", opts: ['주무시다', '계시다', '드시다', '편찮으시다'], ans: '주무시다', exp: "Hurmat shaklida ‘자다’ → ‘주무시다’ bo‘ladi." }
      ]
    },
    {
      id: '1b-2', num: 10, week: '1B · 10과', emoji: '⏰', title: '지금 몇 시예요? (Vaqt va Kun tartibi)',
      heroKo: '오전 9시에 한국어 수업이 시작해요', heroUz: 'Ertalab soat 9 da koreys tili darsi boshlanadi',
      pinkTitle: 'Soat (Asl koreys) + 분 (Xitoy-koreys) & N부터 N까지', pinkSub: 'Boshlanish (부터) va tugash (까지) vaqti',
      pinkGroups: [
        {
          cond: '한 시, 두 시, 세 시, 네 시 + 십 분, 이십 분, 반 (yarim)',
          items: [
            { ko: '아침 7시 반에 일어나요.', uz: 'Ertalab 7:30 da uyg‘onaman.' },
            { ko: '9시부터 1시까지 수업이 있어요.', uz: '9 dan 1 gacha darsim bor.' }
          ]
        }
      ],
      greenTitle: '문장 구조', greenFormula: '시간1 + 부터 + 시간2 + 까지',
      greenRows: [
        { parts: ['9시부터', '1시까지', '공부해요'], res: '9시부터 1시까지 공부해요.', uz: '9 dan 1 gacha o‘qiyman.' }
      ],
      words: [
        { ko: '새벽 / 아침 / 점심 / 저녁 / 밤', uz: 'Tong / Ertalab / Tushlik / Kechqurun / Tun' },
        { ko: '일어나다 / 세수하다 / 씻다', uz: 'Uyg‘onmoq / Yuz-qo‘l yuvmoq / Yuvinmoq' },
        { ko: '출근하다 / 퇴근하다', uz: 'Ishga bormoq / Ishdan qaytmoq' },
        { ko: '시작하다 / 끝나다', uz: 'Boshlanmoq / Tugamoq' }
      ],
      homework: {
        taskUz: "Vaqt oralig‘ini yozing: '9 dan 1 gacha o‘qiyman' (9시부터 ...).",
        sampleKo: '9시부터 1시까지 공부해요',
        hint: '9시부터 + 1시까지 + 공부해요'
      },
      quizzes: [
        { q: "Soat 2:30 koreys tilida qanday aytiladi?", opts: ['두 시 반', '이 시 반', '두 시 이', '이 시 삼십'], ans: '두 시 반', exp: "Soat asl koreys soni (두 시) bilan aytiladi." }
      ]
    },
    {
      id: '1b-3', num: 11, week: '1B · 11과', emoji: '🏥', title: '감기에 걸렸어요 (Salomatlik)',
      heroKo: '열이 나고 목이 아파서 병원에 갔어요', heroUz: 'Isitmam chiqib tomog‘im og‘rigani uchun kasalxonaga bordim',
      pinkTitle: 'A/V-아서/어서 (Sabab) & V-(으)면 안 되다 (Taqiq)', pinkSub: 'Kasal bo‘lganda sabab aytish va shifokor tavsiyasi',
      pinkGroups: [
        {
          cond: 'Sabab: -아서/어서 | Taqiq (-ish mumkin emas): -(으)면 안 돼요',
          items: [
            { ko: '배가 아파서 약을 먹었어요.', uz: 'Qornim og‘rigani uchun dori ichdim.' },
            { ko: '오늘은 찬물을 마시면 안 돼요.', uz: 'Bugun sovuq suv ichish mumkin emas.' }
          ]
        }
      ],
      greenTitle: '문장 구조', greenFormula: '증상(Alomat) + -아서/어서 + 병원에 갔어요',
      greenRows: [
        { parts: ['머리가 아파서', '약을', '먹었어요'], res: '머리가 아파서 약을 먹었어요.', uz: 'Boshim og‘rigani uchun dori ichdim.' }
      ],
      words: [
        { ko: '머리 / 눈 / 코 / 입 / 귀', uz: 'Bosh / Ko‘z / Burun / Og‘iz / Quloq' },
        { ko: '목 / 배 / 손 / 발 / 다리', uz: 'Tomoq / Qorin / Qo‘l / Oyoq panjasi / Oyoq' },
        { ko: '감기에 걸리다 / 열이 나다', uz: 'Shamollab qolmoq / Isitmasi chiqmoq' },
        { ko: '기침을 하다 / 콧물이 나다', uz: 'Yo‘talmoq / Burni oqmoq' },
        { ko: '푹 쉬다 / 약을 먹다', uz: 'To‘yib dam olmoq / Dori ichmoq' }
      ],
      homework: {
        taskUz: "Sabab gap yozing: 'Boshim og‘rigani uchun dori ichdim'.",
        sampleKo: '머리가 아파서 약을 먹었어요',
        hint: '머리가 아파서 + 약을 먹었어요'
      },
      quizzes: [
        { q: "‘Sovuq suv ichish mumkin emas’ — to‘g‘ri taqiq shakli:", opts: ['찬물을 마시면 안 돼요', '찬물을 마셔서 안 돼요', '찬물을 마시고 싶어요', '찬물을 마실 거예요'], ans: '찬물을 마시면 안 돼요', exp: "Taqiq shakli: ‘V-(으)면 안 되다’." }
      ]
    },
    {
      id: '1b-4', num: 12, week: '1B · 12과', emoji: '📞', title: '여보세요? (Telefon suhbati)',
      heroKo: '지금 통화 중이니까 나중에 다시 걸게요', heroUz: 'Hozir band bo‘lgani uchun keyinroq qayta qo‘ng‘iroq qilaman',
      pinkTitle: 'V-(으)ㄹ게요 (Va’da/Niyat) & V-고 있다 (Davomiy zamon)', pinkSub: 'Telefonda gaplashish va hozir davom etayotgan ish',
      pinkGroups: [
        {
          cond: 'Hozir davom etmoqda: -고 있어요 | O‘z qarori/va’da: -(으)ㄹ게요',
          items: [
            { ko: '민수 씨는 지금 회의하고 있어요.', uz: 'Minsu hozir majlis o‘tkazyapti.' },
            { ko: '알겠습니다. 제가 다시 전화할게요.', uz: 'Tushunarli. Men qayta qo‘ng‘iroq qilaman.' }
          ]
        }
      ],
      greenTitle: '문장 구조', greenFormula: '주어 + 는 + 지금 + V-고 있어요',
      greenRows: [
        { parts: ['저는 지금', '한국어를 공부하고', '있어요'], res: '저는 지금 한국어를 공부하고 있어요.', uz: 'Men hozir koreys tilini o‘rganyapman.' }
      ],
      words: [
        { ko: '여보세요 / 실례지만', uz: 'Allo / Kechirasiz-u' },
        { ko: '전화를 걸다 / 받다 / 끊다', uz: 'Qo‘ng‘iroq qilmoq / Olmoq / Qo‘ymoq' },
        { ko: '통화 중이다 / 문자를 보내다', uz: 'Band bo‘lmoq / SMS yubormoq' },
        { ko: '나중에 / 다시 / 메모를 남기다', uz: 'Keyinroq / Qayta / Xabar qoldirmoq' }
      ],
      homework: {
        taskUz: "Hozirgi davomiy zamonda yozing: 'Men hozir koreys tilini o‘rganyapman'.",
        sampleKo: '저는 지금 한국어를 공부하고 있어요',
        hint: '저는 지금 + 한국어를 + 공부하고 있어요'
      },
      quizzes: [
        { q: "Hozir ayni damda davom etayotgan harakat qo‘shimchasi:", opts: ['-고 있다', '-았/었다', '-(으)ㄹ게요', '-(으)러 가다'], ans: '-고 있다', exp: "Davomiy zamon: ‘V-고 있다’." }
      ]
    },
    {
      id: '1b-5', num: 13, week: '1B · 13과', emoji: '🚇', title: '서울역까지 어떻게 가요? (Transport)',
      heroKo: '집에서 학교까지 지하철로 30분 걸려요', heroUz: 'Uydan maktabgacha metroda 30 daqiqa ketadi',
      pinkTitle: 'N(으)로 (Vosita/Yo‘nalish) & N에서 N까지', pinkSub: 'Transport turlari va yo‘l tushuntirish',
      pinkGroups: [
        {
          cond: 'Transport + (으)로 | Masofa: A에서 B까지 + 시간 걸리다',
          items: [
            { ko: '시청역에서 2호선으로 갈아타세요.', uz: 'Shichong bekatida 2-liniyaga almashing.' },
            { ko: '걸어서 10분쯤 걸려요.', uz: 'Piyoda 10 daqiqacha ketadi.' }
          ]
        }
      ],
      greenTitle: '문장 구조', greenFormula: 'A에서 B까지 + 교통수단(으)로 + 시간 걸려요',
      greenRows: [
        { parts: ['집에서 학교까지', '지하철로', '30분 걸려요'], res: '집에서 학교까지 지하철로 30분 걸려요.', uz: 'Uydan maktabgacha metroda 30 daqiqa ketadi.' }
      ],
      words: [
        { ko: '지하철 / 버스 / 택시 / 비행기', uz: 'Metro / Avtobus / Taksi / Samolyot' },
        { ko: '타다 / 내리다 / 갈아타다', uz: 'Minmoq / Tushmoq / Almashtirmoq' },
        { ko: '걸어서 가다 / 길을 건너다', uz: 'Piyoda bormoq / Yo‘ldan o‘tmoq' },
        { ko: '오른쪽 / 왼쪽 / 똑바로', uz: 'O‘ngga / Chapga / To‘g‘riga' }
      ],
      homework: {
        taskUz: "Transportni yozing: 'Metroda maktabga boraman' (지하철로 ...).",
        sampleKo: '지하철로 학교에 가요',
        hint: '지하철로 + 학교에 + 가요'
      },
      quizzes: [
        { q: "‘2-liniyaga almashing’ — to‘g‘ri ibora:", opts: ['2호선으로 갈아타세요', '2호선에서 내리세요', '2호선을 걸어가세요', '2호선에 있어요'], ans: '2호선으로 갈아타세요', exp: "Transport almashtirish: ‘-(으)로 갈아타다’." }
      ]
    },
    {
      id: '1b-6', num: 14, week: '1B · 14과', emoji: '👕', title: '이 옷을 입어 봐도 돼요? (Kiyim do‘koni)',
      heroKo: '이 코트가 더 따뜻하고 잘 어울려요', heroUz: 'Bu palto issiqroq va yaxshi yarashadi',
      pinkTitle: 'V-아/어 보다 & V-아/어도 되다 (Ruxsat)', pinkSub: 'Kiyib ko‘rish (-아/어 보다) va ruxsat so‘rash (-어도 돼요?)',
      pinkGroups: [
        {
          cond: 'Sinab ko‘rish: -아/어 보다 | Ruxsat: -아/어도 되다 (...-sam maylimi?)',
          items: [
            { ko: '이 바지를 한번 입어 봐도 돼요?', uz: 'Bu shimni bir kiyib ko‘rsam maylimi?' },
            { ko: '네, 탈의실은 저쪽에 있어요.', uz: 'Ha, kiyinish xonasi anavi tomonda.' }
          ]
        }
      ],
      greenTitle: '문장 구조', greenFormula: '명사 + 을/를 + V-아/어 봐도 돼요?',
      greenRows: [
        { parts: ['이 옷을', '입어 봐도', '돼요?'], res: '이 옷을 입어 봐도 돼요?', uz: 'Bu kiyimni kiyib ko‘rsam maylimi?' }
      ],
      words: [
        { ko: '옷 / 바지 / 치마 / 코트 / 구두', uz: 'Kiyim / Shim / Yubka / Palto / Tufli' },
        { ko: '입다 / 신다 / 쓰다 / 끼다', uz: 'Kiymoq (kiyim / poyabzal / bosh kiyim / qo‘lqop)' },
        { ko: '크다 / 작다 / 길다 / 짧다', uz: 'Katta / Kichik / Uzun / Kalta' },
        { ko: '어울리다 / 편하다 / 불편하다', uz: 'Yarashmoq / Qulay / Noqulay' }
      ],
      homework: {
        taskUz: "Do‘konda ruxsat so‘rang: 'Bu kiyimni kiyib ko‘rsam maylimi?'.",
        sampleKo: '이 옷을 입어 봐도 돼요?',
        hint: '이 옷을 + 입어 봐도 + 돼요?'
      },
      quizzes: [
        { q: "Poyabzal (운동화, 구두) kiyish uchun qaysi fe’l ishlatiladi?", opts: ['신다', '입다', '쓰다', '하다'], ans: '신다', exp: "Oyoq kiyimlar uchun ‘신다’ ishlatiladi." }
      ]
    },
    {
      id: '1b-7', num: 15, week: '1B · 15과', emoji: '✈️', title: '여행을 가고 싶어요 (Sayohat va Tajriba)',
      heroKo: '제주도에 가 본 적이 있어요', heroUz: 'Jeju oroliga borib ko‘rganman',
      pinkTitle: 'V-(으)ㄴ 적이 있다/없다 & V-(으)ㄹ 수 있다/없다', pinkSub: 'Hayotiy tajriba va imkoniyat (-a olmoq)',
      pinkGroups: [
        {
          cond: 'Tajriba: -(으)ㄴ 적이 있다 | Imkoniyat: -(으)ㄹ 수 있다',
          items: [
            { ko: '저는 김치를 만들어 본 적이 있어요.', uz: 'Men kimchi tayyorlab ko‘rganman.' },
            { ko: '저는 운전할 수 있어요.', uz: 'Men mashina hayday olaman.' }
          ]
        }
      ],
      greenTitle: '문장 구조', greenFormula: '장소 + 에 + 가 본 적이 있어요',
      greenRows: [
        { parts: ['제주도에', '가 본 적이', '있어요'], res: '제주도에 가 본 적이 있어요.', uz: 'Jeju oroliga borib ko‘rganman.' }
      ],
      words: [
        { ko: '여행 / 관광지 / 바다 / 산 / 섬', uz: 'Sayohat / Turistik joy / Dengiz / Tog‘ / Orol' },
        { ko: '사진을 찍다 / 구경하다', uz: 'Rasmga olmoq / Tomosha qilmoq' },
        { ko: '기념품 / 비행기 표 / 호텔', uz: 'Esdalik sovg‘a / Samolyot chiptasi / Mehmonxona' },
        { ko: '기억에 남다 / 즐겁다', uz: 'Xotirada qolmoq / Maroqli' }
      ],
      homework: {
        taskUz: "Tajribangizni yozing: 'Koreyaga borib ko‘rganman' (한국에 ...).",
        sampleKo: '한국에 가 본 적이 있어요',
        hint: '한국에 + 가 본 적이 + 있어요'
      },
      quizzes: [
        { q: "‘Mashina hayday olaman’ — imkoniyat qo‘shimchasi:", opts: ['운전할 수 있어요', '운전한 적이 있어요', '운전하면 안 돼요', '운전하고 있어요'], ans: '운전할 수 있어요', exp: "Imkoniyat: ‘V-(으)ㄹ 수 있다’." }
      ]
    },
    {
      id: '1b-8', num: 16, week: '1B · 16과', emoji: '🎉', title: '우리 집에 놀러 오세요 (Taklif va Uy)',
      heroKo: '집들이 선물로 휴지하고 세제를 샀어요', heroUz: 'Uy to‘yi sovg‘asi sifatida salfetka va kir yuvish kukuni sotib oldim',
      pinkTitle: 'V-(으)려고 하다 & V-아야/어야 되다', pinkSub: 'Reja va niyat (-moqchi) hamda majburiyat (-ish kerak)',
      pinkGroups: [
        {
          cond: 'Niyat: -(으)려고 해요 | Majburiyat: -아야/어야 돼요',
          items: [
            { ko: '주말에 친구들을 집에 초대하려고 해요.', uz: 'Dam olish kuni do‘stlarimni uyga taklif qilmoqchiman.' },
            { ko: '손님이 오기 전에 청소를 해야 돼요.', uz: 'Mehmon kelishidan oldin tozalash kerak.' }
          ]
        }
      ],
      greenTitle: '문장 구조', greenFormula: '명사 + 을/를 + V-(으)려고 해요',
      greenRows: [
        { parts: ['불고기를', '만들려고', '해요'], res: '불고기를 만들려고 해요.', uz: 'Bulgogi tayyorlamoqchiman.' }
      ],
      words: [
        { ko: '초대하다 / 방문하다 / 집들이', uz: 'Taklif qilmoq / Tashrif buyurmoq / Uy to‘yi' },
        { ko: '청소하다 / 준비하다 / 선물', uz: 'Tozalamoq / Tayyorlamoq / Sovg‘a' },
        { ko: '거실 / 부엌 / 방 / 화장실', uz: 'Mehmonxona / Oshxona / Xona / Hojatxona' },
        { ko: '감사합니다 / 잘 먹겠습니다', uz: 'Rahmat / Yoqimli ishtaha (ovqatdan oldin)' }
      ],
      homework: {
        taskUz: "Majburiyat gap yozing: 'Uy vazifasini qilishim kerak' (숙제를 ...).",
        sampleKo: '숙제를 해야 돼요',
        hint: '숙제를 + 해야 + 돼요'
      },
      quizzes: [
        { q: "‘Ovqat tayyorlamoqchiman’ — reja/niyat shakli:", opts: ['요리하려고 해요', '요리한 적이 있어요', '요리하면 안 돼요', '요리했어요'], ans: '요리하려고 해요', exp: "Reja/niyat: ‘V-(으)려고 하다’." }
      ]
    }
  ]
};
