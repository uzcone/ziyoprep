export const snu2A = {
  code: '2A',
  label: '서울대 한국어 2A',
  range: 'TOPIK 2 · O‘rta-boshlang‘ich 1 (To‘liq)',
  lessons: [
    {
      id: '2a-1', num: 1, week: '2A · 1과', emoji: '🤝', title: '새 학기가 시작되었어요 (Tanishuv va Fe’l-atvor)',
      heroKo: '성격이 활발하고 친절해서 인기가 많아요', heroUz: 'Xarakteri quvnoq va mehribon bo‘lgani uchun mashhur',
      pinkTitle: 'A-(으)ㄴ 편이다 & N처럼', pinkSub: 'Moyillikni bildirish (-ga moyil / -roq) va o‘xshatish (-dek)',
      pinkGroups: [
        {
          cond: 'Sifat + -(으)ㄴ 편이에요 | Ot + 처럼',
          items: [
            { ko: '저는 키가 큰 편이에요.', uz: 'Men bo‘yim balandroq.' },
            { ko: '가수처럼 노래를 아주 잘 불러요.', uz: 'Qo‘shiqchidek qo‘shiqni juda yaxshi aytadi.' }
          ]
        }
      ],
      greenTitle: '문장 구조', greenFormula: '주어 + 는 + 형용사-(으)ㄴ 편이에요',
      greenRows: [
        { parts: ['한국어가', '재미있는', '편이에요'], res: '한국어가 재미있는 편이에요.', uz: 'Koreys tili qiziqarliroq.' }
      ],
      words: [
        { ko: '성격 / 활발하다 / 조용하다', uz: 'Xarakter / Quvnoq / Sokin' },
        { ko: '친절하다 / 부지런하다 / 게으르다', uz: 'Mehribon / Mehnatkash / Dangasa' },
        { ko: '인기가 많다 / 사귀다', uz: 'Mashhur bo‘lmoq / Do‘stlashmoq' }
      ],
      homework: {
        taskUz: "O‘zingizni tasvirlang: 'Men mehnatkashroqman' (저는 부지런한 ...).",
        sampleKo: '저는 부지런한 편이에요',
        hint: '저는 + 부지런한 + 편이에요'
      },
      quizzes: [
        { q: "‘Qo‘shiqchidek kuylaydi’ — o‘xshatish qo‘shimchasi:", opts: ['가수처럼', '가수 덕분에', '가수 탓에', '가수밖에'], ans: '가수처럼', exp: "Otga o‘xshatish uchun ‘-처럼’ qo‘shiladi." }
      ]
    },
    {
      id: '2a-2', num: 2, week: '2A · 2과', emoji: '🏠', title: '깨끗한 방을 구하고 있어요 (Uy-joy)',
      heroKo: '학교에서 가깝고 교통이 편리한 집을 찾고 있어요', heroUz: 'Maktabga yaqin va transporti qulay uy qidiryapman',
      pinkTitle: 'A-(으)ㄴ N & V-는 N (Sifatdoshlar)', pinkSub: 'Otni sifat yoki harakat fe’li bilan ta’riflash',
      pinkGroups: [
        {
          cond: 'Sifat: -(으)ㄴ N (큰 방) | Fe’l (Hozirgi): -는 N (사는 집)',
          items: [
            { ko: '창문이 커서 햇빛이 잘 들어오는 방이에요.', uz: 'Derazasi katta bo‘lgani uchun quyosh nuri yaxshi tushadigan xona.' },
            { ko: '제가 지금 사는 하숙집은 아주 깨끗해요.', uz: 'Men hozir yashayotgan yotoqxona juda toza.' }
          ]
        }
      ],
      greenTitle: '문장 구조', greenFormula: '형용사-(으)ㄴ + 명사 + 을/를 구하고 있어요',
      greenRows: [
        { parts: ['조용한', '방을', '구하고 있어요'], res: '조용한 방을 구하고 있어요.', uz: 'Tinch xona qidiryapman.' }
      ],
      words: [
        { ko: '하숙집 / 원룸 / 기숙사 / 아파트', uz: 'Pansionat / Bir xonali uy / Yotoqxona / Kvartira' },
        { ko: '보증금 / 월세 / 관리비', uz: 'Kafolat puli / Oylik ijara / Kommunal to‘lov' },
        { ko: '편리하다 / 햇빛이 잘 들다', uz: 'Qulay / Quyosh nuri yaxshi tushmoq' }
      ],
      homework: {
        taskUz: "Uy qidirish gapini yozing: 'Toza xona qidiryapman'.",
        sampleKo: '깨끗한 방을 구하고 있어요',
        hint: '깨끗한 + 방을 + 구하고 있어요'
      },
      quizzes: [
        { q: "‘Men yashayotgan uy’ (fe’lning hozirgi zamon sifatdoshi):", opts: ['제가 사는 집', '제가 산 집', '제가 살 집', '제가 살던 집'], ans: '제가 사는 집', exp: "Fe’l + ‘-는’ + Ot hozirgi zamonni bildiradi." }
      ]
    },
    {
      id: '2a-3', num: 3, week: '2A · 3과', emoji: '📦', title: '우체국에서 소포를 보냈어요 (Xizmatlar)',
      heroKo: '고향에 선물을 보내려고 우체국에 갔어요', heroUz: 'Vatanimga sovg‘a yuborish uchun pochtaga bordim',
      pinkTitle: 'V-(으)려고 & V-아/어 주다', pinkSub: 'Maqsad (-ish uchun) va biror kishi uchun bajarilgan ish',
      pinkGroups: [
        {
          cond: 'Maqsad: -(으)려고 | Birov uchun: -아/어 주다 (yordam bermoq: 도와주다)',
          items: [
            { ko: '한국 돈을 환전하려고 은행에 갔어요.', uz: 'Koreya pulini almashtirish uchun bankka bordim.' },
            { ko: '친구에게 한국어 숙제를 도와줬어요.', uz: 'Do‘stimga koreys tili uy vazifasida yordam berdim.' }
          ]
        }
      ],
      greenTitle: '문장 구조', greenFormula: '목적(V-(으)려고) + 장소에 갔어요',
      greenRows: [
        { parts: ['소포를 보내려고', '우체국에', '갔어요'], res: '소포를 보내려고 우체국에 갔어요.', uz: 'Posilka yuborish uchun pochtaga bordim.' }
      ],
      words: [
        { ko: '우체국 / 소포 / 편지 / 우표 / 주소', uz: 'Pochta / Posilka / Xat / Marka / Manzil' },
        { ko: '환전하다 / 계좌를 만들다 / 송금하다', uz: 'Pul almashtirmoq / Hisob ochmoq / Pul o‘tkazmoq' },
        { ko: '항공편 / 배편 / 무게를 재다', uz: 'Havo pochtasi / Dengiz pochtasi / Og‘irligini o‘lchamoq' }
      ],
      homework: {
        taskUz: "Maqsad gap yozing: 'Pul almashtirish uchun bankka bordim'.",
        sampleKo: '환전하려고 은행에 갔어요',
        hint: '환전하려고 + 은행에 + 갔어요'
      },
      quizzes: [
        { q: "‘Posilka yuborish uchun’ — maqsad qo‘shimchasi:", opts: ['소포를 보내려고', '소포를 보내지만', '소포를 보낸 후에', '소포를 보내거든요'], ans: '소포를 보내려고', exp: "Maqsad: ‘V-(으)려고’." }
      ]
    }
  ]
};

export const snu2B = {
  code: '2B',
  label: '서울대 한국어 2B',
  range: 'TOPIK 2–3 · O‘rta-boshlang‘ich 2 (To‘liq)',
  lessons: [
    {
      id: '2b-1', num: 1, week: '2B · 1과', emoji: '🎯', title: '취직 준비를 하고 있어요 (Karyera)',
      heroKo: '졸업한 후에 한국 회사에 취직하려고 해요', heroUz: 'Bitirganimdan keyin Koreya kompaniyasiga ishga kirmoqchiman',
      pinkTitle: 'V-(으)ㄴ 후에 & V-기 전에', pinkSub: 'Biror ishdan keyin (후에) va oldin (전에)',
      pinkGroups: [
        {
          cond: 'Keyin: -(으)ㄴ 후에 | Oldin: -기 전에',
          items: [
            { ko: '밥을 먹기 전에 손을 씻으세요.', uz: 'Ovqatlanishdan oldin qo‘lingizni yuving.' },
            { ko: '수업이 끝난 후에 도서관에서 복습해요.', uz: 'Dars tugagandan keyin kutubxonada takrorlayman.' }
          ]
        }
      ],
      greenTitle: '문장 구조', greenFormula: 'V1-(으)ㄴ 후에 + V2',
      greenRows: [
        { parts: ['수업이 끝난 후에', '도서관에', '가요'], res: '수업이 끝난 후에 도서관에 가요.', uz: 'Dars tugagandan keyin kutubxonaga boraman.' }
      ],
      words: [
        { ko: '졸업하다 / 취직하다 / 면접을 보다', uz: 'Bitirmoq / Ishga kirmoq / Suhbatdan o‘tmoq' },
        { ko: '이력서 / 자기소개서 / 자격증', uz: 'Rezyume / Tarjimai hol / Sertifikat' },
        { ko: '전공 / 경험 / 합격하다', uz: 'Mutaxassislik / Tajriba / Imtihondan o‘tmoq' }
      ],
      homework: {
        taskUz: "Oldin/Keyin gap yozing: 'Ovqatlanishdan oldin qo‘l yuving'.",
        sampleKo: '밥을 먹기 전에 손을 씻으세요',
        hint: '밥을 먹기 전에 + 손을 씻으세요'
      },
      quizzes: [
        { q: "‘Uxlashdan oldin’ — to‘g‘ri qo‘shimcha:", opts: ['자기 전에', '잔 후에', '자려고', '자니까'], ans: '자기 전에', exp: "‘-기 전에’ — ...-dan oldin." }
      ]
    },
    {
      id: '2b-2', num: 2, week: '2B · 2과', emoji: '🧥', title: '날씨가 추우니까 따뜻하게 입으세요',
      heroKo: '길이 미끄러우니까 조심해서 가세요', heroUz: 'Yo‘l sirpanchiq bo‘lgani uchun ehtiyot bo‘lib boring',
      pinkTitle: 'A/V-(으)니까 & A-게 (Ravish yasovchi)', pinkSub: 'Buyruq/taklif oldidan sabab va sifatdan ravish yasash',
      pinkGroups: [
        {
          cond: 'Sabab + (으)니까 → Buyruq (-세요) | Sifat + -게 (따뜻하게, 맛있게)',
          items: [
            { ko: '비가 오니까 우산을 가지고 가세요.', uz: 'Yomg‘ir yog‘ayotgani uchun soyabon olib keting.' },
            { ko: '음식을 아주 맛있게 먹었어요.', uz: 'Ovqatni juda mazali qilib yedim.' }
          ]
        }
      ],
      greenTitle: '문장 구조', greenFormula: '이유 + -(으)니까 + 명령문(-세요)',
      greenRows: [
        { parts: ['비가 오니까', '우산을', '가지고 가세요'], res: '비가 오니까 우산을 가지고 가세요.', uz: 'Yomg‘ir yog‘ayotgani uchun soyabon olib keting.' }
      ],
      words: [
        { ko: '미끄럽다 / 조심하다 / 따뜻하게', uz: 'Sirpanchiq / Ehtiyot bo‘lmoq / Iliq qilib' },
        { ko: '일기 예보 / 우산 / 장갑 / 목도리', uz: 'Ob-havo ma’lumoti / Soyabon / Qo‘lqop / Sharf' }
      ],
      homework: {
        taskUz: "Sabab va buyruq gap yozing: 'Yomg‘ir yog‘ayotgani uchun soyabon olib keting'.",
        sampleKo: '비가 오니까 우산을 가지고 가세요',
        hint: '비가 오니까 + 우산을 + 가지고 가세요'
      },
      quizzes: [
        { q: "Buyruq gap (-세요) oldidan qaysi sabab qo‘shimchasi ishlatiladi?", opts: ['-(으)니까', '-아서/어서', '-지만', '-거나'], ans: '-(으)니까', exp: "Buyruq va taklif gaplarda ‘-(으)니까’ ishlatiladi." }
      ]
    },
    {
      id: '2b-3', num: 3, week: '2B · 3과', emoji: '📈', title: '한국어 실력이 많이 좋아졌어요',
      heroKo: '매일 연습해서 한국어가 쉬워졌어요', heroUz: 'Har kuni mashq qilganim uchun koreys tili osonlashdi',
      pinkTitle: 'A-아/어지다 (Holat o‘zgarishi) & V-게 되다', pinkSub: 'Vaqt o‘tishi bilan o‘zgarish (-lashmoq / -adigan bo‘lmoq)',
      pinkGroups: [
        {
          cond: 'Sifat: -아/어지다 (좋아지다) | Fe’l: -게 되다 (먹게 되다)',
          items: [
            { ko: '한국에 온 후에 매운 음식을 잘 먹게 되었어요.', uz: 'Koreyaga kelganimdan keyin achchiq ovqatni yaxshi yeydigan bo‘ldim.' },
            { ko: '어제보다 날씨가 훨씬 따뜻해졌어요.', uz: 'Kechagidan ko‘ra havo ancha ilidi.' }
          ]
        }
      ],
      greenTitle: '문장 구조', greenFormula: '명사 + 이/가 + 형용사-아/어졌어요',
      greenRows: [
        { parts: ['한국어 실력이', '많이', '좋아졌어요'], res: '한국어 실력이 많이 좋아졌어요.', uz: 'Koreys tili darajam ancha yaxshilandi.' }
      ],
      words: [
        { ko: '실력 / 습관 / 생활 / 적응하다', uz: 'Mahorat / Odat / Hayot / Moslashmoq' },
        { ko: '훨씬 / 점점 / 예전보다', uz: 'Ancha / Asta-sekin / Oldingidan ko‘ra' }
      ],
      homework: {
        taskUz: "O‘zgarish gapini yozing: 'Koreys tili darajam yaxshilandi'.",
        sampleKo: '한국어 실력이 좋아졌어요',
        hint: '한국어 실력이 + 좋아졌어요'
      },
      quizzes: [
        { q: "‘Havo ilidi’ — holat o‘zgarishi shakli:", opts: ['날씨가 따뜻해졌어요', '날씨가 따뜻했어요', '날씨가 따뜻할 거예요', '날씨가 따뜻하지만'], ans: '날씨가 따뜻해졌어요', exp: "Holat o‘zgarishi: ‘A-아/어지다’." }
      ]
    }
  ]
};
