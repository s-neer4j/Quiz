import { LeaderboardUser, QuizData, Difficulty, Achievement, User } from './types';

// Mock user accounts for the simulated Google login
export const MOCK_USERS: User[] = [
  {
    name: 'Alex Chen',
    email: 'alex.chen@example.com',
    picture: 'https://api.dicebear.com/8.x/adventurer/svg?seed=Alex',
    unlockedAchievements: [],
  },
  {
    name: 'Brenda Smith',
    email: 'brenda.smith@example.com',
    picture: 'https://api.dicebear.com/8.x/adventurer/svg?seed=Brenda',
    unlockedAchievements: [],
  },
  {
    name: 'Carlos Garcia',
    email: 'carlos.garcia@example.com',
    picture: 'https://api.dicebear.com/8.x/adventurer/svg?seed=Carlos',
    unlockedAchievements: [],
  },
  {
    name: 'Diana Ivanova',
    email: 'diana.ivanova@example.com',
    picture: 'https://api.dicebear.com/8.x/adventurer/svg?seed=Diana',
    unlockedAchievements: [],
  },
  {
    name: 'CodeNinja',
    email: 'codeninja@example.dev',
    picture: 'https://api.dicebear.com/8.x/bottts/svg?seed=CodeNinja',
    unlockedAchievements: [],
  },
  {
    name: 'Eve Jobs',
    email: 'eve.jobs@icloud.com',
    picture: 'https://api.dicebear.com/8.x/adventurer/svg?seed=Eve',
    unlockedAchievements: [],
  }
];

export const AVATAR_LIST: string[] = [
  'https://api.dicebear.com/8.x/bottts-neutral/svg?seed=Gizmo',
  'https://api.dicebear.com/8.x/bottts-neutral/svg?seed=Zorp',
  'https://api.dicebear.com/8.x/bottts-neutral/svg?seed=Orbit',
  'https://api.dicebear.com/8.x/bottts-neutral/svg?seed=Comet',
  'https://api.dicebear.com/8.x/bottts-neutral/svg?seed=Pulsar',
  'https://api.dicebear.com/8.x/bottts-neutral/svg?seed=Quasar'
];

export const ACHIEVEMENTS_LIST: Achievement[] = [
  { id: 'FIRST_QUIZ', name: 'First Steps', description: 'Complete your first quiz.', icon: '🎓' },
  { id: 'PERFECT_BEGINNER', name: 'Beginner\'s Perfection', description: 'Get 100% on a Beginner quiz.', icon: '⭐' },
  { id: 'PERFECT_INTERMEDIATE', name: 'Intermediate Ace', description: 'Get 100% on an Intermediate quiz.', icon: '🌟' },
  { id: 'PERFECT_ADVANCED', name: 'Advanced Scholar', description: 'Get 100% on an Advanced quiz.', icon: '🏆' },
  { id: 'STREAK_5', name: 'On a Roll!', description: 'Achieve a 5-answer streak in a single quiz.', icon: '🔥' },
  { id: 'STREAK_10', name: 'Unstoppable', description: 'Achieve a 10-answer streak in a single quiz.', icon: '🚀' },
  { id: 'POLYGLOT_3', name: 'Globetrotter', description: 'Complete quizzes in 3 different languages.', icon: '🌍' },
  { id: 'DEDICATION', name: 'Dedicated Learner', description: 'Complete 10 quizzes in total.', icon: '📚' },
];

export const LEADERBOARD_DATA: Omit<LeaderboardUser, 'picture'>[] = [
  { name: 'CosmicCoder', score: 2500 },
  { name: 'GalacticGamer', score: 2310 },
  { name: 'QuantumQuizzer', score: 2150 },
  { name: 'LogicLion', score: 1980 },
  { name: 'PuzzlePioneer', score: 1800 },
];

export const QUIZ_DATA: QuizData = [
  {
    name: 'English',
    code: 'EN',
    flag: 'https://flagcdn.com/w320/gb.png',
    description: 'The global lingua franca, used in international business, science, and media.',
    levels: [
      {
        name: 'A1 - Beginner',
        difficulty: Difficulty.BEGINNER,
        quizLength: 5,
        questions: [
          { id: 1, text: 'I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?', options: ['A Dream', 'A Computer', 'A Map', 'A Book'], correctAnswer: 'A Map' },
          { id: 2, text: 'Which word completes the sentence? "An ___ a day keeps the doctor away."', options: ['Orange', 'Apple', 'Banana', 'Egg'], correctAnswer: 'Apple' },
          { id: 3, text: 'Which sentence sounds the most natural?', options: ['I like pizza very much.', 'Pizza I like much very.', 'Much I like very pizza.', 'Very pizza I like much.'], correctAnswer: 'I like pizza very much.' },
          { id: 4, text: 'A farmer had 15 sheep and all but 8 died. How many are left?', options: ['7', '15', '8', '23'], correctAnswer: '8' },
          { id: 5, text: 'What is the opposite of "happy"?', options: ['Angry', 'Sad', 'Tired', 'Excited'], correctAnswer: 'Sad' },
        ]
      },
      {
        name: 'A2 - Elementary',
        difficulty: Difficulty.BEGINNER,
        quizLength: 5,
        questions: [
          { id: 1, text: 'Which word means "a place where you borrow books"?', options: ['Bookstore', 'Library', 'School', 'Museum'], correctAnswer: 'Library' },
          { id: 2, text: 'There isn\'t ___ milk in the fridge.', options: ['some', 'any', 'a', 'many'], correctAnswer: 'any' },
          { id: 3, text: 'He is ___ than his brother.', options: ['tall', 'taller', 'tallest', 'more tall'], correctAnswer: 'taller' },
          { id: 4, text: 'What do you call the meal you eat in the morning?', options: ['Lunch', 'Dinner', 'Breakfast', 'Snack'], correctAnswer: 'Breakfast' },
          { id: 5, text: 'She bought a ___ dress.', options: ['beautiful', 'beauty', 'beautifully', 'beautify'], correctAnswer: 'beautiful' },
        ]
      },
      {
        name: 'B1 - Intermediate',
        difficulty: Difficulty.INTERMEDIATE,
        quizLength: 10,
        questions: [
          { id: 1, text: 'If I ___ you, I would study harder.', options: ['was', 'were', 'am', 'be'], correctAnswer: 'were' },
          { id: 2, text: 'He has been working here ___ 2010.', options: ['since', 'for', 'at', 'in'], correctAnswer: 'since' },
          { id: 3, text: 'I\'m looking forward ___ you soon.', options: ['to see', 'to seeing', 'seeing', 'see'], correctAnswer: 'to seeing' },
          { id: 4, text: 'You should ___ smoking. It\'s bad for your health.', options: ['give up', 'give in', 'give away', 'give back'], correctAnswer: 'give up' },
          { id: 5, text: 'My flight was ___ because of the storm.', options: ['cancelled', 'refused', 'denied', 'stopped'], correctAnswer: 'cancelled' },
          { id: 6, text: 'Could you tell me where ___?', options: ['is the station', 'the station is', 'is station', 'station is'], correctAnswer: 'the station is' },
          { id: 7, text: 'She is used to ___ up early.', options: ['get', 'getting', 'got', 'have gotten'], correctAnswer: 'getting' },
          { id: 8, text: 'He speaks English ___', options: ['fluent', 'fluently', 'more fluent', 'fluency'], correctAnswer: 'fluently' },
          { id: 9, text: 'I haven\'t seen him ___ ages.', options: ['since', 'for', 'in', 'at'], correctAnswer: 'for' },
          { id: 10, text: 'Which of these is a famous landmark in London?', options: ['The Colosseum', 'The Eiffel Tower', 'The Statue of Liberty', 'Big Ben'], correctAnswer: 'Big Ben' },
        ]
      },
      {
        name: 'B2 - Upper-Intermediate',
        difficulty: Difficulty.INTERMEDIATE,
        quizLength: 10,
        questions: [
          { id: 1, text: 'By the time we arrived, the film ___ started.', options: ['already', 'has already', 'had already', 'was already'], correctAnswer: 'had already' },
          { id: 2, text: 'He suggested ___ to the cinema.', options: ['to go', 'going', 'go', 'we to go'], correctAnswer: 'going' },
          { id: 3, text: 'Hardly ___ the phone rung than she answered it.', options: ['had', 'did', 'has', 'was'], correctAnswer: 'had' },
          { id: 4, text: 'I wish I ___ known about the party earlier.', options: ['have', 'had', 'would have', 'did'], correctAnswer: 'had' },
          { id: 5, text: 'It\'s high time you ___ your homework.', options: ['do', 'did', 'have done', 'were doing'], correctAnswer: 'did' },
          { id: 6, text: 'He is believed ___ a fortune in the lottery.', options: ['to win', 'winning', 'to have won', 'having won'], correctAnswer: 'to have won' },
          { id: 7, text: '___ being a great singer, she is also a talented actress.', options: ['Besides', 'Despite', 'However', 'Although'], correctAnswer: 'Besides' },
          { id: 8, text: 'I\'d rather you ___ that.', options: ['don\'t do', 'didn\'t do', 'haven\'t done', 'won\'t do'], correctAnswer: 'didn\'t do' },
          { id: 9, text: 'The company is on the ___ of a major breakthrough.', options: ['edge', 'verge', 'side', 'point'], correctAnswer: 'verge' },
          { id: 10, text: 'He was ___ for his crime with a long prison sentence.', options: ['punished', 'rewarded', 'accused', 'sentenced'], correctAnswer: 'punished' },
        ]
      },
      {
        name: 'C1 - Advanced',
        difficulty: Difficulty.ADVANCED,
        quizLength: 10,
        questions: [
          { id: 1, text: 'The idiom "bite the bullet" means to:', options: ['eat something quickly', 'face a difficult situation with courage', 'chew on a metal object', 'go to the dentist'], correctAnswer: 'face a difficult situation with courage' },
          { id: 2, text: '___ the bad weather, the match went ahead.', options: ['Despite', 'Although', 'Even though', 'In spite'], correctAnswer: 'Despite' },
          { id: 3, text: 'The new regulations will be ___ from the first of January.', options: ['effective', 'efficient', 'affective', 'effected'], correctAnswer: 'effective' },
          { id: 4, text: 'Her performance was absolutely ___.', options: ['flawless', 'flowless', 'flawful', 'flowful'], correctAnswer: 'flawless' },
          { id: 5, text: 'The politician\'s speech was full of empty ___.', options: ['rhetoric', 'eloquence', 'discourse', 'prose'], correctAnswer: 'rhetoric' },
          { id: 6, text: 'I have a ___ feeling that something bad is about to happen.', options: ['ominous', 'auspicious', 'propitious', 'favorable'], correctAnswer: 'ominous' },
          { id: 7, text: 'The police are looking for a ___ witness to the crime.', options: ['credible', 'credulous', 'incredulous', 'incredible'], correctAnswer: 'credible' },
          { id: 8, text: 'His arguments were so ___ that we were all convinced.', options: ['cogent', 'potent', 'forceful', 'strong'], correctAnswer: 'cogent' },
          { id: 9, text: 'The project was ___ with difficulties from the very beginning.', options: ['beset', 'bestowed', 'besotted', 'besieged'], correctAnswer: 'beset' },
          { id: 10, text: 'The children were running ___ in the playground.', options: ['amok', 'amuck', 'amiss', 'astray'], correctAnswer: 'amok' },
        ]
      }
    ]
  },
  {
    name: 'Spanish',
    code: 'ES',
    flag: 'https://flagcdn.com/w320/es.png',
    description: 'The official language of Spain and most countries in Central and South America.',
    levels: [
      {
        name: 'A1 - Básico',
        difficulty: Difficulty.BEGINNER,
        quizLength: 5,
        questions: [
          { id: 1, text: '¿Cómo se dice "hello"?', options: ['Hola', 'Adiós', 'Gracias', 'Por favor'], correctAnswer: 'Hola' },
          { id: 2, text: 'El color del cielo es...', options: ['Azul', 'Rojo', 'Verde', 'Amarillo'], correctAnswer: 'Azul' },
          { id: 3, text: '¿Qué fruta es amarilla y larga?', options: ['Una piña', 'Una manzana', 'Un plátano', 'Una naranja'], correctAnswer: 'Un plátano' },
          { id: 4, text: 'Yo ___ de México.', options: ['soy', 'estoy', 'tengo', 'voy'], correctAnswer: 'soy' },
          { id: 5, text: 'What does "gato" mean?', options: ['Dog', 'Cat', 'House', 'Book'], correctAnswer: 'Cat' },
        ],
      },
      {
        name: 'A2 - Elemental',
        difficulty: Difficulty.BEGINNER,
        quizLength: 5,
        questions: [
          { id: 1, text: 'Ayer, yo (hablar) ___ con mi amigo.', options: ['hablé', 'hablaba', 'hablo', 'hablaré'], correctAnswer: 'hablé' },
          { id: 2, text: '¿Cuál de estas frutas es roja y redonda?', options: ['Manzanas', 'Naranjas', 'Plátanos', 'Uvas'], correctAnswer: 'Manzanas' },
          { id: 3, text: '¿Qué fruta es pequeña y roja?', options: ['Fresas', 'Manzanas', 'Plátanos', 'Uvas'], correctAnswer: 'Fresas' },
          { id: 4, text: '¿Qué animal dice "muuu"?', options: ['Un caballo', 'Un perro', 'Un gato', 'Una vaca'], correctAnswer: 'Una vaca' },
          { id: 5, text: '¿(Tú) ___ ir a la fiesta mañana?', options: ['Vas a', 'Fuiste a', 'Ibas a', 'Irás a'], correctAnswer: 'Vas a' },
        ],
      },
      {
        name: 'B1 - Intermedio',
        difficulty: Difficulty.INTERMEDIATE,
        quizLength: 10,
        questions: [
          { id: 1, text: 'Si (yo) ___ más tiempo, viajaría por el mundo.', options: ['tuviera', 'tengo', 'tendré', 'tenía'], correctAnswer: 'tuviera' },
          { id: 2, text: 'Me alegro de que (tú) ___ venido.', options: ['hayas', 'has', 'habías', 'hayan'], correctAnswer: 'hayas' },
          { id: 3, text: 'Cuando ___ niño, jugaba mucho en el parque.', options: ['era', 'fui', 'soy', 'seré'], correctAnswer: 'era' },
          { id: 4, text: 'El profesor nos pidió que (nosotros) ___ silencio.', options: ['hiciéramos', 'hacemos', 'haremos', 'hicimos'], correctAnswer: 'hiciéramos' },
          { id: 5, text: 'La película ya había comenzado cuando ___.', options: ['llegamos', 'llegábamos', 'llegaremos', 'lleguemos'], correctAnswer: 'llegamos' },
          { id: 6, text: 'Es necesario ___ para el examen.', options: ['estudiar', 'estudiando', 'estudie', 'estudió'], correctAnswer: 'estudiar' },
          { id: 7, text: 'Te llamaré tan pronto como ___ a casa.', options: ['llegue', 'llego', 'llegaré', 'llegara'], correctAnswer: 'llegue' },
          { id: 8, text: 'No he visto a nadie ___ pueda ayudarte.', options: ['que', 'quien', 'el que', 'cuyo'], correctAnswer: 'que' },
          { id: 9, text: 'El coche fue reparado ___ el mecánico.', options: ['por', 'para', 'con', 'de'], correctAnswer: 'por' },
          { id: 10, text: 'Sigue ___ la calle y encontrarás el banco.', options: ['todo recto', 'derecho', 'directo', 'rectamente'], correctAnswer: 'todo recto' },
        ],
      },
      {
        name: 'B2 - Intermedio Alto',
        difficulty: Difficulty.INTERMEDIATE,
        quizLength: 10,
        questions: [
          { id: 1, text: 'No creo que ___ a tiempo.', options: ['llegue', 'llegará', 'llegaría', 'llegó'], correctAnswer: 'llegue' },
          { id: 2, text: 'El libro ___ por el autor en 1999.', options: ['fue escrito', 'escribió', 'ha sido escrito', 'escribía'], correctAnswer: 'fue escrito' },
          { id: 3, text: 'Por mucho que ___, no cambiará de opinión.', options: ['insistas', 'insistes', 'insistirás', 'insististe'], correctAnswer: 'insistas' },
          { id: 4, text: 'Me hubiera gustado ___ la película contigo.', options: ['haber visto', 'ver', 'viendo', 'visto'], correctAnswer: 'haber visto' },
          { id: 5, text: 'La empresa busca un candidato ___ hable tres idiomas.', options: ['que', 'quien', 'el cual', 'cuyo'], correctAnswer: 'que' },
          { id: 6, text: 'En caso de que ___, avísame.', options: ['llueva', 'llueve', 'lloverá', 'llovió'], correctAnswer: 'llueva' },
          { id: 7, text: 'Se arrepintió de no ___ más.', options: ['haber estudiado', 'estudiar', 'estudiando', 'estudiado'], correctAnswer: 'haber estudiado' },
          { id: 8, text: 'El problema es ___ no tenemos suficiente dinero.', options: ['que', 'de que', 'lo que', 'cuyo'], correctAnswer: 'que' },
          { id: 9, text: 'A medida que ___, la situación empeoraba.', options: ['pasaba el tiempo', 'pasa el tiempo', 'pasará el tiempo', 'pase el tiempo'], correctAnswer: 'pasaba el tiempo' },
          { id: 10, text: 'Llevo dos horas ___ a que llegues.', options: ['esperando', 'esperar', 'esperado', 'espero'], correctAnswer: 'esperando' },
        ],
      },
      {
        name: 'C1 - Avanzado',
        difficulty: Difficulty.ADVANCED,
        quizLength: 10,
        questions: [
            { id: 1, text: 'Aun a riesgo de ___ pesado, voy a repetirlo.', options: ['ser', 'siendo', 'sido', 'sea'], correctAnswer: 'ser' },
            { id: 2, text: 'De ___ sabido antes, habría actuado de otra forma.', options: ['haberlo', 'tenerlo', 'hacerlo', 'poderlo'], correctAnswer: 'haberlo' },
            { id: 3, text: 'La expresión "no tener pelos en la lengua" significa:', options: ['Hablar sin rodeos', 'Ser calvo', 'Comer algo picante', 'Tener buena dicción'], correctAnswer: 'Hablar sin rodeos' },
            { id: 4, text: 'El ___ de la cuestión es más complejo de lo que parece.', options: ['meollo', 'centro', 'corazón', 'punto'], correctAnswer: 'meollo' },
            { id: 5, text: 'Se necesita personal que ___ trabajar bajo presión.', options: ['sepa', 'sabe', 'sabrá', 'supo'], correctAnswer: 'sepa' },
            { id: 6, text: 'El acusado se negó a ___ ante el tribunal.', options: ['declarar', 'decir', 'hablar', 'comunicar'], correctAnswer: 'declarar' },
            { id: 7, text: 'La situación económica ha ___ en los últimos meses.', options: ['empeorado', 'peorado', 'empeorando', 'peorando'], correctAnswer: 'empeorado' },
            { id: 8, text: 'Con tal de que ___, haré lo que sea.', options: ['vengas', 'vienes', 'vendrás', 'viniste'], correctAnswer: 'vengas' },
            { id: 9, text: 'El nuevo director ___ una serie de cambios importantes.', options: ['implementó', 'implantó', 'puso', 'hizo'], correctAnswer: 'implementó' },
            { id: 10, text: 'La película está basada en hechos ___.', options: ['verídicos', 'verdaderos', 'reales', 'auténticos'], correctAnswer: 'verídicos' },
        ],
      },
    ],
  },
  {
    name: 'Mandarin',
    code: 'ZH',
    flag: 'https://flagcdn.com/w320/cn.png',
    description: 'The official language of China, with over 1 billion speakers worldwide.',
    levels: [
       {
        name: 'HSK 1',
        difficulty: Difficulty.BEGINNER,
        quizLength: 5,
        questions: [
          { id: 1, text: '你好 means?', options: ['Hello', 'Goodbye', 'Thank you', 'Sorry'], correctAnswer: 'Hello' },
          { id: 2, text: 'What does 猫 (māo) mean?', options: ['Cat', 'Dog', 'Fish', 'Bird'], correctAnswer: 'Cat' },
          { id: 3, text: 'What is this number? "三"', options: ['One', 'Two', 'Three', 'Four'], correctAnswer: 'Three' },
          { id: 4, text: 'How do you say "I"?', options: ['我', '你', '他', '她'], correctAnswer: '我' },
          { id: 5, text: 'What does "苹果" (píngguǒ) mean?', options: ['Apple', 'Banana', 'Orange', 'Grape'], correctAnswer: 'Apple' },
        ]
      },
      {
        name: 'HSK 2',
        difficulty: Difficulty.BEGINNER,
        quizLength: 5,
        questions: [
          { id: 1, text: 'What is the pinyin for "医生" (doctor)?', options: ['yīshēng', 'xuésheng', 'lǎoshī', 'péngyou'], correctAnswer: 'yīshēng' },
          { id: 2, text: 'What does 跑步 (pǎobù) mean?', options: ['Running', 'Reading', 'Eating', 'Sleeping'], correctAnswer: 'Running' },
          { id: 3, text: 'Which word means "yesterday"?', options: ['昨天 zuótiān', '今天 jīntiān', '明天 míngtiān', '现在 xiànzài'], correctAnswer: '昨天 zuótiān' },
          { id: 4, text: 'How do you ask "How are you?"', options: ['你好吗？ nǐ hǎo ma?', '你叫什么名字？ nǐ jiào shénme míngzì?', '谢谢 xièxiè', '再见 zàijiàn'], correctAnswer: '你好吗？ nǐ hǎo ma?' },
          { id: 5, text: 'What does "门" (mén) mean?', options: ['Door', 'Window', 'Chair', 'Table'], correctAnswer: 'Door' },
        ]
      },
      {
        name: 'HSK 3',
        difficulty: Difficulty.INTERMEDIATE,
        quizLength: 10,
        questions: [
          { id: 1, text: 'The character "看" means:', options: ['To see/look', 'To eat', 'To drink', 'To go'], correctAnswer: 'To see/look' },
          { id: 2, text: 'What is the pinyin for "中国"?', options: ['zhōng guó', 'rì běn', 'měi guó', 'yīng guó'], correctAnswer: 'zhōng guó' },
          { id: 3, text: 'Fill in the blank: 我 ___ 坐飞机去上海。(I plan to go to Shanghai by plane.)', options: ['打算 dǎsuàn', '觉得 juéde', '希望 xīwàng', '知道 zhīdào'], correctAnswer: '打算 dǎsuàn' },
          { id: 4, text: 'Which measure word is used for books?', options: ['本 běn', '个 gè', '只 zhī', '条 tiáo'], correctAnswer: '本 běn' },
          { id: 5, text: 'The opposite of "快" (kuài - fast) is:', options: ['慢 màn', '长 cháng', '高 gāo', '大 dà'], correctAnswer: '慢 màn' },
          { id: 6, text: 'What does "服务员" (fúwùyuán) mean?', options: ['Waiter/Waitress', 'Teacher', 'Student', 'Doctor'], correctAnswer: 'Waiter/Waitress' },
          { id: 7, text: 'Choose the correct word: 这件衣服有点儿 ___。(This dress is a bit expensive.)', options: ['贵 guì', '便宜 piányi', '好 hǎo', '新 xīn'], correctAnswer: '贵 guì' },
          { id: 8, text: 'What does "西瓜" (xīguā) mean?', options: ['Watermelon', 'Rice', 'Noodles', 'Tea'], correctAnswer: 'Watermelon' },
          { id: 9, text: 'How do you express "because"?', options: ['因为...所以... yīnwèi...suǒyǐ...', '虽然...但是... suīrán...dànshì...', '如果...就... rúguǒ...jiù...', '不但...而且... bùdàn...érqiě...'], correctAnswer: '因为...所以... yīnwèi...suǒyǐ...' },
          { id: 10, text: 'What is the meaning of "机场" (jīchǎng)?', options: ['Airport', 'Train station', 'Bus stop', 'Port'], correctAnswer: 'Airport' },
        ]
      },
      {
        name: 'HSK 4',
        difficulty: Difficulty.INTERMEDIATE,
        quizLength: 10,
        questions: [
          { id: 1, text: '他把我的手机弄坏了 (Tā bǎ wǒ de shǒjī nòng huài le). What happened?', options: ['He fixed my phone', 'He broke my phone', 'He bought a new phone', 'He lost my phone'], correctAnswer: 'He broke my phone' },
          { id: 2, text: 'Which word means "environment"?', options: ['环境 huánjìng', '健康 jiànkāng', '教育 jiàoyù', '经济 jīngjì'], correctAnswer: '环境 huánjìng' },
          { id: 3, text: 'What is the meaning of "竟然" (jìngrán)?', options: ['unexpectedly', 'certainly', 'probably', 'gradually'], correctAnswer: 'unexpectedly' },
          { id: 4, text: 'Fill in the blank: 他说的话，我一点儿也听不___。 (I can\'t understand what he is saying at all.)', options: ['懂 dǒng', '见 jiàn', '完 wán', '到 dào'], correctAnswer: '懂 dǒng' },
          { id: 5, text: 'Which of the following means "to be responsible for"?', options: ['负责 fùzé', '放弃 fàngqì', '符合 fúhé', '丰富 fēngfù'], correctAnswer: '负责 fùzé' },
          { id: 6, text: 'The word "幽默" (yōumò) is a loanword from English. What does it mean?', options: ['Humor', 'Yoga', 'Yogurt', 'Union'], correctAnswer: 'Humor' },
          { id: 7, text: 'What does "质量" (zhìliàng) refer to?', options: ['Quality', 'Quantity', 'Weight', 'Temperature'], correctAnswer: 'Quality' },
          { id: 8, text: 'Select the correct usage: 我 ___ 作业做完了。', options: ['把 bǎ', '被 bèi', '让 ràng', '叫 jiào'], correctAnswer: '把 bǎ' },
          { id: 9, text: 'The idiom "马马虎虎" (mǎmǎhuhu) means:', options: ['so-so, careless', 'very good', 'horse and tiger', 'very fast'], correctAnswer: 'so-so, careless' },
          { id: 10, text: 'Which word is the synonym of "高兴" (gāoxìng)?', options: ['愉快 yúkuài', '难过 nánguò', '生气 shēngqì', '担心 dānxīn'], correctAnswer: '愉快 yúkuài' },
        ]
      },
      {
        name: 'HSK 5',
        difficulty: Difficulty.ADVANCED,
        quizLength: 10,
        questions: [
          { id: 1, text: 'What does the idiom "画蛇添足" (huà shé tiān zú) mean?', options: ['To ruin something by adding something superfluous', 'To draw a snake with feet', 'A beautiful painting', 'A quick action'], correctAnswer: 'To ruin something by adding something superfluous' },
          { id: 2, text: 'Select the correct character for "bó" in "博士" (bóshì - Ph.D.).', options: ['博', '薄', '波', '播'], correctAnswer: '博' },
          { id: 3, text: 'What does "谦虚" (qiānxū) mean?', options: ['Modest', 'Proud', 'Generous', 'Brave'], correctAnswer: 'Modest' },
          { id: 4, text: 'Fill in the blank: 我们要为下一代___一个好的榜样。(We should set a good example for the next generation.)', options: ['树立 shùlì', '建立 jiànlì', '成立 chénglì', '创造 chuàngzào'], correctAnswer: '树立 shùlì' },
          { id: 5, text: 'The word "居然" (jūrán) expresses:', options: ['Surprise or disbelief', 'Certainty', 'Regret', 'Hope'], correctAnswer: 'Surprise or disbelief' },
          { id: 6, text: 'What is the main meaning of "宣传" (xuānchuán)?', options: ['To publicize / propaganda', 'To criticize', 'To praise', 'To announce'], correctAnswer: 'To publicize / propaganda' },
          { id: 7, text: 'Choose the appropriate word: 这家公司的___很好。(The benefits of this company are very good.)', options: ['待遇 dàiyù', '态度 tàidù', '制度 zhìdù', '水平 shuǐpíng'], correctAnswer: '待遇 dàiyù' },
          { id: 8, text: 'The idiom "一举两得" (yī jǔ liǎng dé) is equivalent to which English phrase?', options: ['To kill two birds with one stone', 'To add fuel to the fire', 'To beat around the bush', 'To let the cat out of the bag'], correctAnswer: 'To kill two birds with one stone' },
          { id: 9, text: 'What does "毫无疑问" (háo wú yíwèn) mean?', options: ['Without a doubt', 'Full of questions', 'Probably not', 'Maybe'], correctAnswer: 'Without a doubt' },
          { id: 10, text: 'Which of the following words means "to hesitate"?', options: ['犹豫 yóuyù', '决定 juédìng', '承诺 chéngnuò', '拒绝 jùjué'], correctAnswer: '犹豫 yóuyù' },
        ]
      },
      {
        name: 'HSK 6',
        difficulty: Difficulty.ADVANCED,
        quizLength: 5,
        questions: [
          { id: 1, text: 'What does the Chengyu "津津有味" (jīnjīnyǒuwèi) describe?', options: ['To eat with great relish/interest', 'A very boring story', 'To be very wealthy', 'A famous historical place'], correctAnswer: 'To eat with great relish/interest' },
          { id: 2, text: 'Which of the following means "to issue; to promulgate"?', options: ['颁布 (bānbù)', '分布 (fēnbù)', '宣布 (xuānbù)', '公布 (gōngbù)'], correctAnswer: '颁布 (bānbù)' },
          { id: 3, text: 'The word "含蓄" (hánxù) best describes someone who is:', options: ['Implicit; veiled; reserved', 'Explicit; open; direct', 'Humorous and outgoing', 'Quiet and shy'], correctAnswer: 'Implicit; veiled; reserved' },
          { id: 4, text: 'Choose the correct word: 他对这个项目的前景感到很___。(He feels very optimistic about the prospects of this project.)', options: ['乐观 (lèguān)', '悲观 (bēiguān)', '主观 (zhǔguān)', '客观 (kèguān)'], correctAnswer: '乐观 (lèguān)' },
          { id: 5, text: 'What is the meaning of "得不偿失" (dé bù cháng shī)?', options: ['The loss outweighs the gain', 'To gain a lot from a small effort', 'To lose something important', 'To compensate for a loss'], correctAnswer: 'The loss outweighs the gain' },
        ]
      }
    ]
  },
  {
    name: 'Hindi',
    code: 'HI',
    flag: 'https://flagcdn.com/w320/in.png',
    description: 'One of the official languages of India, spoken by over 500 million people.',
    levels: [
      {
        name: 'A1 - शुरुआती (Beginner)',
        difficulty: Difficulty.BEGINNER,
        quizLength: 5,
        questions: [
          { id: 1, text: 'How do you say "Hello" in Hindi?', options: ['नमस्ते (Namaste)', 'धन्यवाद (Dhanyavaad)', 'अलविदा (Alvida)', 'माफ़ कीजिये (Maaf Kijiye)'], correctAnswer: 'नमस्ते (Namaste)' },
          { id: 2, text: 'What does "घर" (Ghar) mean?', options: ['House', 'Car', 'Tree', 'Water'], correctAnswer: 'House' },
          { id: 3, text: 'What is the color "लाल" (Laal)?', options: ['Red', 'Blue', 'Green', 'Yellow'], correctAnswer: 'Red' },
          { id: 4, text: 'The number "दो" (Do) is:', options: ['One', 'Two', 'Three', 'Four'], correctAnswer: 'Two' },
          { id: 5, text: 'What is "पानी" (Paani)?', options: ['Food', 'Water', 'Air', 'Fire'], correctAnswer: 'Water' }
        ]
      },
      {
          name: 'B1 - मध्यवर्ती (Intermediate)',
          difficulty: Difficulty.INTERMEDIATE,
          quizLength: 5,
          questions: [
              { id: 1, text: 'Correctly translate: "I am reading a book."', options: ['मैं एक किताब पढ़ रहा हूँ।', 'वह एक किताब पढ़ रहा है।', 'तुम एक किताब पढ़ रहे हो।', 'हम एक किताब पढ़ रहे हैं।'], correctAnswer: 'मैं एक किताब पढ़ रहा हूँ।' },
              { id: 2, text: 'What is the past tense of "जाना" (jaana - to go) for a male subject?', options: ['गया (gaya)', 'गई (gayi)', 'गए (gaye)', 'जाता (jaata)'], correctAnswer: 'गया (gaya)' },
              { id: 3, text: 'The word "मित्रता" (mitrata) means:', options: ['Friendship', 'Enemy', 'Family', 'Love'], correctAnswer: 'Friendship' },
              { id: 4, text: 'Choose the correct postposition: "The book is ___ the table."', options: ['मेज पर (mez par)', 'मेज में (mez mein)', 'मेज से (mez se)', 'मेज को (mez ko)'], correctAnswer: 'मेज पर (mez par)' },
              { id: 5, text: 'What does "मुझे भूख लगी है" (mujhe bhookh lagi hai) mean?', options: ["I am hungry", "I am thirsty", "I am tired", "I am happy"], correctAnswer: "I am hungry" }
          ]
      },
      {
          name: 'C1 - उन्नत (Advanced)',
          difficulty: Difficulty.ADVANCED,
          quizLength: 5,
          questions: [
              { id: 1, text: 'What does the idiom "ऊँट के मुँह में जीरा" mean?', options: ['A drop in the ocean', 'To build castles in the air', 'To add fuel to the fire', 'To see eye to eye'], correctAnswer: 'A drop in the ocean' },
              { id: 2, text: 'Which word means "inevitable"?', options: ['अपरिहार्य (apariharya)', 'अविश्वसनीय (avishvasniya)', 'असंभव (asambhav)', 'अद्वितीय (advitiya)'], correctAnswer: 'अपरिहार्य (apariharya)' },
              { id: 3, text: 'Complete the proverb: "अब पछताए होत क्या, जब..."', options: ['चिड़िया चुग गई खेत', 'पानी सर से ऊपर गया', 'नाव नदी में डूब गई', 'समय हाथ से निकल गया'], correctAnswer: 'चिड़िया चुग गई खेत' },
              { id: 4, text: 'The word "सर्वसम्मति" (sarvasammati) means:', options: ['Unanimous consent', 'Disagreement', 'Majority vote', 'Public opinion'], correctAnswer: 'Unanimous consent' },
              { id: 5, text: 'Choose the correct formal command for "to do".', options: ['कीजिए (keejiye)', 'करो (karo)', 'कर (kar)', 'करिये (kariye)'], correctAnswer: 'कीजिए (keejiye)' }
          ]
      }
    ]
  },
  {
    name: 'German',
    code: 'DE',
    flag: 'https://flagcdn.com/w320/de.png',
    description: 'The official language of Germany and Austria, and one of the official languages of Switzerland.',
    levels: [
        {
            name: 'A1 - Anfänger (Beginner)',
            difficulty: Difficulty.BEGINNER,
            quizLength: 5,
            questions: [
                { id: 1, text: 'How do you say "Thank you"?', options: ['Danke', 'Hallo', 'Bitte', 'Tschüss'], correctAnswer: 'Danke' },
                { id: 2, text: 'What does "Apfel" mean?', options: ['Apple', 'Banana', 'Car', 'House'], correctAnswer: 'Apple' },
                { id: 3, text: 'The number "drei" is:', options: ['One', 'Two', 'Three', 'Four'], correctAnswer: 'Three' },
                { id: 4, text: 'What color is "rot"?', options: ['Red', 'Blue', 'Green', 'Yellow'], correctAnswer: 'Red' },
                { id: 5, text: 'What does "Wasser" mean?', options: ['Water', 'Bread', 'Milk', 'Fire'], correctAnswer: 'Water' }
            ]
        },
        {
            name: 'B1 - Mittelstufe (Intermediate)',
            difficulty: Difficulty.INTERMEDIATE,
            quizLength: 5,
            questions: [
                { id: 1, text: 'Which case follows the preposition "mit"?', options: ['Dativ', 'Akkusativ', 'Genitiv', 'Nominativ'], correctAnswer: 'Dativ' },
                { id: 2, text: 'What is the correct past participle of "sehen" (to see)?', options: ['gesehen', 'gesahen', 'gesieht', 'sehend'], correctAnswer: 'gesehen' },
                { id: 3, text: 'If I had time... (translate):', options: ['Wenn ich Zeit hätte...', 'Wenn ich Zeit habe...', 'Wenn ich Zeit hatte...', 'Wenn ich Zeit gehabt hätte...'], correctAnswer: 'Wenn ich Zeit hätte...' },
                { id: 4, text: 'The word "Umwelt" means:', options: ['Environment', 'Weather', 'Government', 'Traffic'], correctAnswer: 'Environment' },
                { id: 5, text: 'Choose the correct relative pronoun: "Das ist der Mann, ___ ich gestern traf."', options: ['den', 'der', 'dem', 'dessen'], correctAnswer: 'den' }
            ]
        },
        {
            name: 'C1 - Fortgeschritten (Advanced)',
            difficulty: Difficulty.ADVANCED,
            quizLength: 5,
            questions: [
                { id: 1, text: 'What does the expression "Tomaten auf den Augen haben" mean?', options: ['To be oblivious to something obvious', 'To have good eyesight', 'To be a vegetarian', 'To wear red glasses'], correctAnswer: 'To be oblivious to something obvious' },
                { id: 2, text: 'The word "anspruchsvoll" means:', options: ['Demanding', 'Helpful', 'Friendly', 'Careless'], correctAnswer: 'Demanding' },
                { id: 3, text: 'Complete the sentence: "___ er krank war, ging er zur Arbeit."', options: ['Obwohl', 'Weil', 'Deshalb', 'Trotzdem'], correctAnswer: 'Obwohl' },
                { id: 4, text: 'What is the Genitiv form of "das Herz"?', options: ['des Herzens', 'des Herzes', 'dem Herzen', 'des Herzen'], correctAnswer: 'des Herzens' },
                { id: 5, text: 'The term "die Rechnungslegung" refers to:', options: ['Accounting', 'Manufacturing', 'Marketing', 'Legislation'], correctAnswer: 'Accounting' }
            ]
        }
    ]
  },
  {
    name: 'French',
    code: 'FR',
    flag: 'https://flagcdn.com/w320/fr.png',
    description: 'A global language of culture, diplomacy, and cuisine, spoken on five continents.',
    levels: [
        {
            name: 'A1 - Débutant (Beginner)',
            difficulty: Difficulty.BEGINNER,
            quizLength: 5,
            questions: [
                { id: 1, text: 'How do you say "Hello"?', options: ['Bonjour', 'Au revoir', 'Merci', 'Oui'], correctAnswer: 'Bonjour' },
                { id: 2, text: 'What does "un chat" mean?', options: ['A cat', 'A dog', 'A bird', 'A fish'], correctAnswer: 'A cat' },
                { id: 3, text: 'What is "fromage"?', options: ['Cheese', 'Bread', 'Wine', 'Water'], correctAnswer: 'Cheese' },
                { id: 4, text: '"Je suis" means:', options: ['I am', 'I have', 'He is', 'She has'], correctAnswer: 'I am' },
                { id: 5, text: 'The color "rouge" is:', options: ['Red', 'Blue', 'Green', 'Yellow'], correctAnswer: 'Red' }
            ]
        },
        {
            name: 'B1 - Intermédiaire (Intermediate)',
            difficulty: Difficulty.INTERMEDIATE,
            quizLength: 5,
            questions: [
                { id: 1, text: 'Which tense is used for habitual actions in the past?', options: ['Imparfait', 'Passé composé', 'Futur simple', 'Présent'], correctAnswer: 'Imparfait' },
                { id: 2, text: 'Choose the correct pronoun: "Tu ___ donnes le livre."', options: ['me', 'moi', 'je', 'mon'], correctAnswer: 'me' },
                { id: 3, text: 'The phrase "il faut que" must be followed by:', options: ['the subjunctive', 'the indicative', 'the infinitive', 'the conditional'], correctAnswer: 'the subjunctive' },
                { id: 4, text: 'What is "une boulangerie"?', options: ['A bakery', 'A pharmacy', 'A library', 'A supermarket'], correctAnswer: 'A bakery' },
                { id: 5, text: 'Translate "I have been waiting for an hour."', options: ["J'attends depuis une heure.", "J'ai attendu pour une heure.", "J'attendais une heure.", "J'attendrai une heure."], correctAnswer: "J'attends depuis une heure." }
            ]
        },
        {
            name: 'C1 - Avancé (Advanced)',
            difficulty: Difficulty.ADVANCED,
            quizLength: 5,
            questions: [
                { id: 1, text: 'What does the idiom "poser un lapin à quelqu\'un" mean?', options: ['To stand someone up', 'To give someone a rabbit', 'To play a trick on someone', 'To cook a rabbit stew'], correctAnswer: 'To stand someone up' },
                { id: 2, text: 'The word "néanmoins" is a synonym for:', options: ['cependant', 'parce que', 'donc', 'toujours'], correctAnswer: 'cependant' },
                { id: 3, text: 'Which is the most formal way to ask a question?', options: ['Inversion (e.g., "Parlez-vous français?")', 'Est-ce que', 'Intonation (e.g., "Vous parlez français?")', 'N\'est-ce pas'], correctAnswer: 'Inversion (e.g., "Parlez-vous français?")' },
                { id: 4, text: 'The literary tense "passé simple" is primarily used for:', options: ['Written narration', 'Spoken conversation', 'Describing future events', 'Expressing opinions'], correctAnswer: 'Written narration' },
                { id: 5, text: 'What does "aborder" mean in the context "aborder un problème"?', options: ['To tackle / to address', 'To avoid', 'To create', 'To board'], correctAnswer: 'To tackle / to address' }
            ]
        }
    ]
  },
  {
    name: 'Japanese',
    code: 'JA',
    flag: 'https://flagcdn.com/w320/jp.png',
    description: 'The official language of Japan, known for its unique writing system and rich cultural context.',
    levels: [
        {
            name: 'N5 - Beginner',
            difficulty: Difficulty.BEGINNER,
            quizLength: 5,
            questions: [
                { id: 1, text: 'What does ねこ (neko) mean?', options: ['cat', 'dog', 'bird', 'fish'], correctAnswer: 'cat' },
                { id: 2, text: 'What does「こんにちは」 (Konnichiwa) mean?', options: ['Hello', 'Goodbye', 'Thank you', 'Excuse me'], correctAnswer: 'Hello' },
                { id: 3, text: 'Which particle marks the subject of a sentence?', options: ['は (wa) / が (ga)', 'を (o)', 'に (ni)', 'で (de)'], correctAnswer: 'は (wa) / が (ga)' },
                { id: 4, text: 'What is this?「水」', options: ['Water (mizu)', 'Fire (hi)', 'Mountain (yama)', 'River (kawa)'], correctAnswer: 'Water (mizu)' },
                { id: 5, text: 'What is「寿司」?', options: ['Sushi', 'Ramen', 'Tempura', 'Udon'], correctAnswer: 'Sushi' }
            ]
        },
        {
            name: 'N3 - Intermediate',
            difficulty: Difficulty.INTERMEDIATE,
            quizLength: 5,
            questions: [
                { id: 1, text: 'What does the grammar point「～うちに」express?', options: ['While a certain state holds, ...', 'Because of...', 'In order to...', 'Even if...'], correctAnswer: 'While a certain state holds, ...' },
                { id: 2, text: 'The verb「食べさせられる」(tabesaserareru) is in which form?', options: ['Causative-Passive', 'Causative', 'Passive', 'Potential'], correctAnswer: 'Causative-Passive' },
                { id: 3, text: 'What does "賑やか" (nigiyaka) mean?', options: ['Lively', 'Quiet', 'Dark', 'Cold'], correctAnswer: 'Lively' },
                { id: 4, text: 'Choose the correct particle: 「会議__、新しいプロジェクトについて話した。」', options: ['で (de)', 'に (ni)', 'を (o)', 'が (ga)'], correctAnswer: 'で (de)' },
                { id: 5, text: 'What is the meaning of「尊敬語」(sonkeigo)?', options: ['Honorific language', 'Humble language', 'Polite language', 'Casual language'], correctAnswer: 'Honorific language' }
            ]
        },
        {
            name: 'N1 - Advanced',
            difficulty: Difficulty.ADVANCED,
            quizLength: 5,
            questions: [
                { id: 1, text: 'What nuance does「～ Vる + べくして」add?', options: ['As expected; it was inevitable', 'In order to', 'Only just', 'On the verge of'], correctAnswer: 'As expected; it was inevitable' },
                { id: 2, text: 'The expression「否めない」(inamenai) means:', options: ['Cannot deny', 'Cannot understand', 'Cannot forgive', 'Cannot decide'], correctAnswer: 'Cannot deny' },
                { id: 3, text: 'What does the four-character idiom「一期一会」(ichigo ichie) signify?', options: ['A once-in-a-lifetime encounter', 'All or nothing', 'A win-win situation', 'Survival of the fittest'], correctAnswer: 'A once-in-a-lifetime encounter' },
                { id: 4, text: 'Which of the following means "ambiguous"?', options: ['曖昧 (aimai)', '明確 (meikaku)', '重要 (juuyou)', '深刻 (shinkoku)'], correctAnswer: '曖昧 (aimai)' },
                { id: 5, text: 'The grammar「～ものを」at the end of a sentence expresses:', options: ['Regret or dissatisfaction', 'Certainty', 'A strong command', 'A question'], correctAnswer: 'Regret or dissatisfaction' }
            ]
        }
    ]
  },
  {
    name: 'Italian',
    code: 'IT',
    flag: 'https://flagcdn.com/w320/it.png',
    description: 'The language of music, art, and cuisine, primarily spoken in Italy and Switzerland.',
    levels: [
        {
            name: 'A1 - Principiante (Beginner)',
            difficulty: Difficulty.BEGINNER,
            quizLength: 5,
            questions: [
                { id: 1, text: 'How do you say "Hello"?', options: ['Ciao', 'Grazie', 'Prego', 'Arrivederci'], correctAnswer: 'Ciao' },
                { id: 2, text: 'What does "Gatto" mean?', options: ['Cat', 'Dog', 'House', 'Book'], correctAnswer: 'Cat' },
                { id: 3, text: 'The number "cinque" is:', options: ['Three', 'Four', 'Five', 'Six'], correctAnswer: 'Five' },
                { id: 4, text: 'What is "Pizza"?', options: ['Pizza', 'Pasta', 'Salad', 'Soup'], correctAnswer: 'Pizza' },
                { id: 5, text: '"Io sono" means:', options: ['I am', 'You are', 'He is', 'We are'], correctAnswer: 'I am' }
            ]
        },
        {
            name: 'B1 - Intermedio (Intermediate)',
            difficulty: Difficulty.INTERMEDIATE,
            quizLength: 5,
            questions: [
                { id: 1, text: 'Which auxiliary verb does "andare" (to go) use in the "passato prossimo"?', options: ['essere', 'avere', 'stare', 'fare'], correctAnswer: 'essere' },
                { id: 2, text: '"If I were you..." translates to:', options: ['Se fossi in te...', 'Se sono in te...', 'Se sarò in te...', 'Se fui in te...'], correctAnswer: 'Se fossi in te...' },
                { id: 3, text: 'The particle "ci" can mean:', options: ['There', 'Us', 'About it', 'All of the above'], correctAnswer: 'All of the above' },
                { id: 4, text: 'What is the "imperfetto" tense used for?', options: ['Describing past habits and states', 'Single completed actions in the past', 'Future actions', 'Commands'], correctAnswer: 'Describing past habits and states' },
                { id: 5, text: 'What does "bere un caffè" mean?', options: ['To drink a coffee', 'To eat pasta', 'To sleep', 'To read a book'], correctAnswer: 'To drink a coffee' }
            ]
        },
        {
            name: 'C1 - Avanzato (Advanced)',
            difficulty: Difficulty.ADVANCED,
            quizLength: 5,
            questions: [
                { id: 1, text: 'The phrase "in bocca al lupo" is used to say:', options: ['Good luck!', 'Watch out!', 'Bon appétit!', 'Congratulations!'], correctAnswer: 'Good luck!' },
                { id: 2, text: 'The "congiuntivo trapassato" is used to express:', options: ['A past action that occurred before another past action in a subjective clause', 'A future possibility', 'A present certainty', 'A past repeated action'], correctAnswer: 'A past action that occurred before another past action in a subjective clause' },
                { id: 3, text: 'What does "qualora" mean?', options: ['In the event that / if', 'Although', 'Because', 'Wherever'], correctAnswer: 'In the event that / if' },
                { id: 4, text: 'The verb "bisogna" is always:', options: ['Impersonal (used in the 3rd person singular)', 'Used with "avere"', 'Reflexive', 'Followed by an adjective'], correctAnswer: 'Impersonal (used in the 3rd person singular)' },
                { id: 5, text: 'A "menefreghista" is someone who:', options: ["Doesn't care about anything", 'Is very generous', 'Works very hard', 'Is always late'], correctAnswer: "Doesn't care about anything" }
            ]
        }
    ]
  },
  {
    name: 'Arabic',
    code: 'AR',
    flag: 'https://flagcdn.com/w320/sa.png',
    description: 'A Semitic language spoken by hundreds of millions, and the liturgical language of Islam.',
    levels: [
        {
            name: 'A1 - مبتدئ (Beginner)',
            difficulty: Difficulty.BEGINNER,
            quizLength: 5,
            questions: [
                { id: 1, text: 'How do you say "Hello"?', options: ['مرحباً (Marhaban)', 'شكراً (Shukran)', 'مع السلامة (Ma\'a as-salama)', 'نعم (Na\'am)'], correctAnswer: 'مرحباً (Marhaban)' },
                { id: 2, text: 'What does قط (Qiṭṭ) mean?', options: ['Cat', 'Dog', 'Book', 'Sun'], correctAnswer: 'Cat' },
                { id: 3, text: 'The number "ثلاثة" (Thalāthah) is:', options: ['One', 'Two', 'Three', 'Four'], correctAnswer: 'Three' },
                { id: 4, text: 'What does ماء (Mā\') mean?', options: ['Water', 'House', 'Man', 'Bread'], correctAnswer: 'Water' },
                { id: 5, text: 'What color is "أحمر" (Aḥmar)?', options: ['Red', 'Blue', 'Green', 'Black'], correctAnswer: 'Red' }
            ]
        },
        {
            name: 'B1 - متوسط (Intermediate)',
            difficulty: Difficulty.INTERMEDIATE,
            quizLength: 5,
            questions: [
                { id: 1, text: 'In Arabic, a sentence that starts with a verb is called:', options: ['جملة فعلية (Jumla Fi\'liyya)', 'جملة اسمية (Jumla Ismiyya)', 'شبه جملة (Shibhu Jumla)', 'جملة شرطية (Jumla Shartiyya)'], correctAnswer: 'جملة فعلية (Jumla Fi\'liyya)' },
                { id: 2, text: 'What is the dual form of "كتاب" (kitāb - book)?', options: ['كتابان (kitābān)', 'كتب (kutub)', 'كاتب (kātib)', 'مكتبة (maktaba)'], correctAnswer: 'كتابان (kitābān)' },
                { id: 3, text: 'The word "لكن" (lākin) means:', options: ['But', 'Because', 'If', 'So'], correctAnswer: 'But' },
                { id: 4, text: 'The case ending for a direct object is typically:', options: ['Fatḥah (-a)', 'Ḍammah (-u)', 'Kasrah (-i)', 'Sukūn'], correctAnswer: 'Fatḥah (-a)' },
                { id: 5, text: 'The concept of "Idafa" (إضافة) describes:', options: ['A possessive construction', 'A verb conjugation', 'An adjective agreement', 'A type of question'], correctAnswer: 'A possessive construction' }
            ]
        },
        {
            name: 'C1 - متقدم (Advanced)',
            difficulty: Difficulty.ADVANCED,
            quizLength: 5,
            questions: [
                { id: 1, text: 'What does the term "البلاغة" (al-balāgha) refer to?', options: ['Rhetoric and eloquence', 'Grammar and syntax', 'History and literature', 'Calligraphy and art'], correctAnswer: 'Rhetoric and eloquence' },
                { id: 2, text: 'The "five verbs" (الأفعال الخمسة) are conjugated with:', options: ['A final nūn (ن), except in the subjunctive and jussive moods', 'A final wāw (و)', 'A final alif (ا)', 'A predictable vowel ending'], correctAnswer: 'A final nūn (ن), except in the subjunctive and jussive moods' },
                { id: 3, text: 'The word "حتماً" (ḥatman) means:', options: ['Inevitably / definitely', 'Approximately', 'Unfortunately', 'Fortunately'], correctAnswer: 'Inevitably / definitely' },
                { id: 4, text: 'What is a "masdar" (مصدر)?', options: ['A verbal noun', 'A past tense verb', 'A broken plural', 'An active participle'], correctAnswer: 'A verbal noun' },
                { id: 5, text: 'The saying "الوقت من ذهب" (al-waqt min dhahab) means:', options: ['Time is golden', 'Patience is a virtue', 'Knowledge is power', 'Health is wealth'], correctAnswer: 'Time is golden' }
            ]
        }
    ]
  },
  {
    name: 'Russian',
    code: 'RU',
    flag: 'https://flagcdn.com/w320/ru.png',
    description: 'The most widely spoken Slavic language, with a rich literary tradition.',
    levels: [
        {
            name: 'A1 - Начальный (Beginner)',
            difficulty: Difficulty.BEGINNER,
            quizLength: 5,
            questions: [
                { id: 1, text: 'How do you say "Hello" (informal)?', options: ['Привет (Privet)', 'Спасибо (Spasibo)', 'Да (Da)', 'Пока (Poka)'], correctAnswer: 'Привет (Privet)' },
                { id: 2, text: 'What does "Кошка" (koshka) mean?', options: ['Cat', 'Dog', 'House', 'Water'], correctAnswer: 'Cat' },
                { id: 3, text: 'The number "три" (tri) is:', options: ['One', 'Two', 'Three', 'Four'], correctAnswer: 'Three' },
                { id: 4, text: 'What does "Меня зовут..." mean?', options: ['My name is...', 'I am...', 'I have...', 'I want...'], correctAnswer: 'My name is...' },
                { id: 5, text: 'What does "Дом" (dom) mean?', options: ['House', 'Yes', 'No', 'Please'], correctAnswer: 'House' }
            ]
        },
        {
            name: 'B1 - Средний (Intermediate)',
            difficulty: Difficulty.INTERMEDIATE,
            quizLength: 5,
            questions: [
                { id: 1, text: 'Which case is used to show possession?', options: ['Genitive', 'Accusative', 'Dative', 'Prepositional'], correctAnswer: 'Genitive' },
                { id: 2, text: 'Verbs of motion like "идти" and "ходить" distinguish between:', options: ['Unidirectional and multidirectional movement', 'Fast and slow movement', 'Past and present movement', 'Land and sea movement'], correctAnswer: 'Unidirectional and multidirectional movement' },
                { id: 3, text: 'What is the perfective partner of "читать" (to read)?', options: ['прочитать', 'написать', 'сказать', 'видеть'], correctAnswer: 'прочитать' },
                { id: 4, text: 'Where is the Red Square located?', options: ['In Moscow', 'In Paris', 'In London', 'In Rome'], correctAnswer: 'In Moscow' },
                { id: 5, text: 'Choose the correct form: "Я интересуюсь ___."', options: ['музыкой (muzykoy)', 'музыка (muzyka)', 'музыку (muzyku)', 'музыке (muzyke)'], correctAnswer: 'музыкой (muzykoy)' }
            ]
        },
        {
            name: 'C1 - Продвинутый (Advanced)',
            difficulty: Difficulty.ADVANCED,
            quizLength: 5,
            questions: [
                { id: 1, text: 'What are verbal adverbs (деепричастия) used for?', options: ['To describe a secondary action performed by the subject', 'To modify nouns', 'To express a command', 'To show possession'], correctAnswer: 'To describe a secondary action performed by the subject' },
                { id: 2, text: 'The expression "вешать лапшу на уши" means:', options: ["To pull someone's leg / to lie", 'To cook noodles', 'To listen carefully', 'To give a compliment'], correctAnswer: "To pull someone's leg / to lie" },
                { id: 3, text: 'The word "несмотря на" (+ Accusative) means:', options: ['despite', 'because of', 'in addition to', 'instead of'], correctAnswer: 'despite' },
                { id: 4, text: 'What is the function of the particle "-то" attached to a pronoun (e.g., кто-то)?', options: ['It adds a sense of indefiniteness (someone, something)', 'It adds emphasis', 'It forms a question', 'It indicates a plural'], correctAnswer: 'It adds a sense of indefiniteness (someone, something)' },
                { id: 5, text: 'The word "предположительно" means:', options: ['Presumably / supposedly', 'Definitely', 'Unfortunately', 'Specifically'], correctAnswer: 'Presumably / supposedly' }
            ]
        }
    ]
  },
  {
    name: 'Portuguese',
    code: 'PT',
    flag: 'https://flagcdn.com/w320/pt.png',
    description: 'Spoken in Portugal and Brazil, it is one of the most spoken languages in the world.',
    levels: [
        {
            name: 'A1 - Iniciante (Beginner)',
            difficulty: Difficulty.BEGINNER,
            quizLength: 5,
            questions: [
                { id: 1, text: 'How do you say "Hello"?', options: ['Olá', 'Obrigado', 'Adeus', 'Por favor'], correctAnswer: 'Olá' },
                { id: 2, text: 'What does "Cachorro" mean?', options: ['Dog', 'Cat', 'House', 'Car'], correctAnswer: 'Dog' },
                { id: 3, text: 'The number "quatro" is:', options: ['Two', 'Three', 'Four', 'Five'], correctAnswer: 'Four' },
                { id: 4, text: 'What is "Maçã"?', options: ['Apple', 'Banana', 'Orange', 'Grape'], correctAnswer: 'Apple' },
                { id: 5, text: '"Eu sou" means:', options: ['I am', 'He is', 'We are', 'They are'], correctAnswer: 'I am' }
            ]
        },
        {
            name: 'B1 - Intermediário (Intermediate)',
            difficulty: Difficulty.INTERMEDIATE,
            quizLength: 5,
            questions: [
                { id: 1, text: 'The difference between "ser" and "estar" is primarily:', options: ['Permanent vs. temporary states', 'Past vs. present', 'Singular vs. plural', 'Formal vs. informal'], correctAnswer: 'Permanent vs. temporary states' },
                { id: 2, text: 'What does "embora" mean in "Ele foi embora"?', options: ['Away', 'Although', 'Inside', 'Quickly'], correctAnswer: 'Away' },
                { id: 3, text: 'The future subjunctive tense (futuro do subjuntivo) is used after conjunctions like:', options: ['Se (if), quando (when)', 'Porque (because)', 'Mas (but)', 'E (and)'], correctAnswer: 'Se (if), quando (when)' },
                { id: 4, text: 'The word "saudade" describes:', options: ['A feeling of nostalgic longing', 'Happiness', 'Anger', 'Fear'], correctAnswer: 'A feeling of nostalgic longing' },
                { id: 5, text: 'Translate "You have to study".', options: ['Você tem que estudar.', 'Você tem de estudar.', 'Both are correct.', 'Neither is correct.'], correctAnswer: 'Both are correct.' }
            ]
        },
        {
            name: 'C1 - Avançado (Advanced)',
            difficulty: Difficulty.ADVANCED,
            quizLength: 5,
            questions: [
                { id: 1, text: 'What does the expression "engolir sapos" mean?', options: ['To put up with a difficult situation without complaining', 'To eat frogs', 'To be very hungry', 'To tell a lie'], correctAnswer: 'To put up with a difficult situation without complaining' },
                { id: 2, text: 'The "infinitivo pessoal" is a unique feature of Portuguese. When is it used?', options: ["When the infinitive has its own subject", "When describing a past action", "Only in formal writing", "To form a question"], correctAnswer: "When the infinitive has its own subject" },
                { id: 3, text: 'The word "aliás" is used to:', options: ['Add a clarification or correction (by the way, incidentally)', 'Show contrast (however)', 'Indicate a cause (because)', 'Express a conclusion (therefore)'], correctAnswer: 'Add a clarification or correction (by the way, incidentally)' },
                { id: 4, text: 'What does "cujo/cuja" mean?', options: ['Whose', 'Which', 'Who', 'That'], correctAnswer: 'Whose' },
                { id: 5, text: 'The difference between "ao encontro de" and "de encontro a" is:', options: ['Agreement vs. opposition/collision', 'Coming vs. going', 'Near vs. far', 'Positive vs. negative'], correctAnswer: 'Agreement vs. opposition/collision' }
            ]
        }
    ]
  },
];
