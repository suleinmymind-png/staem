export type ReviewRating =
  | 'Overwhelmingly Positive'
  | 'Very Positive'
  | 'Mostly Positive'
  | 'Mixed'
  | 'Mostly Negative'

export type Game = {
  slug: string
  title: string
  developer: string
  publisher: string
  /** Price in cents. 0 means free to play. */
  price: number
  /** Discount percentage, 0-100. */
  discount: number
  tags: string[]
  rating: ReviewRating
  reviewCount: number
  releaseDate: string
  comingSoon?: boolean
  shortDescription: string
  description: string[]
  image: string
  topSellerRank: number
  requirements: { os: string; processor: string; memory: string; graphics: string; storage: string }
}

export const STARTING_WALLET = 10000

export const games: Game[] = [
  {
    slug: 'elder-ring-doorbell',
    title: 'Elder Ring Doorbell',
    developer: 'FromHardware',
    publisher: 'Bandai Namcool',
    price: 5999,
    discount: 0,
    tags: ['Souls-like', 'Open World', 'Dark Fantasy', 'Difficult'],
    rating: 'Very Positive',
    reviewCount: 48211,
    releaseDate: '2026-09-18',
    shortDescription:
      'Rise, Tarnished, and ring the Elder Doorbell. Nobody is home. Nobody has ever been home. Ring it again.',
    description: [
      'The Lands Between have a new delivery problem. As a Tarnished courier, you must travel across six sprawling regions to ring the legendary Elder Doorbell and finally get a signature.',
      'Features over 160 bosses who refuse to sign for packages, a mount that judges you, and messages from other players like "try finger but hole" and "doorbell ahead, therefore despair".',
    ],
    image: '/games/elder-ring-doorbell.png',
    topSellerRank: 2,
    requirements: {
      os: 'Windows 10 (or patience)',
      processor: 'Intel Core i7-Gitgud',
      memory: '16 GB RAM, 0 GB composure',
      graphics: 'NVIDIA GeForce RTX "You Died"',
      storage: '60 GB, mostly death animations',
    },
  },
  {
    slug: 'red-bread-redemption-2',
    title: 'Red Bread Redemption 2',
    developer: 'Rockstale Games',
    publisher: 'Rockstale Games',
    price: 5999,
    discount: 67,
    tags: ['Western', 'Open World', 'Story Rich', 'Baking'],
    rating: 'Overwhelmingly Positive',
    reviewCount: 612004,
    releaseDate: '2019-12-05',
    shortDescription:
      'America, 1899. The age of sourdough is coming to an end. Arthur Morgan and the Van der Loaf gang are on the run with a very hungry starter.',
    description: [
      'Ride across a vast and atmospheric frontier where every loaf tells a story. Knead dough in real time. Watch it rise in real time. Watch it rise in more real time.',
      'Arthur needs to feed his horse, his gang, and his sourdough starter named "Dutch", who keeps saying he has a plan.',
    ],
    image: '/games/red-bread-redemption.png',
    topSellerRank: 4,
    requirements: {
      os: 'Windows 10 64-bit',
      processor: 'Intel Core i5-Rye',
      memory: '12 GB RAM',
      graphics: 'GeForce GTX 1060 Crumb Edition',
      storage: '150 GB of realistic horse physics',
    },
  },
  {
    slug: 'cyberjunk-2077',
    title: 'Cyberjunk 2077',
    developer: 'CD Projekt Rekt',
    publisher: 'CD Projekt Rekt',
    price: 5999,
    discount: 65,
    tags: ['RPG', 'Cyberpunk', 'Open World', 'Bugs (Feature)'],
    rating: 'Mostly Positive',
    reviewCount: 704512,
    releaseDate: '2020-12-10',
    shortDescription:
      'An open-world adventure in Night City, a megalopolis obsessed with power, glamour, and patches. Now with 40% fewer floating cars.',
    description: [
      'Become V, a mercenary outlaw going after a one-of-a-kind implant that is the key to immortality — or at least to a stable framerate.',
      'Version 2.7 adds a cop system, a new skill tree, and the ability to T-pose at will, which used to be mandatory.',
    ],
    image: '/games/cyberjunk-2077.png',
    topSellerRank: 6,
    requirements: {
      os: 'Windows 10 (patched)',
      processor: 'AMD Ryzen 7 Hotfix',
      memory: '16 GB RAM',
      graphics: 'RTX 3070 or a strong imagination',
      storage: '70 GB SSD + 70 GB of patches',
    },
  },
  {
    slug: 'balding-gate-3',
    title: "Balding's Gate 3",
    developer: 'Larian Shudios',
    publisher: 'Larian Shudios',
    price: 5999,
    discount: 20,
    tags: ['RPG', 'Turn-Based', 'Fantasy', 'Co-op'],
    rating: 'Overwhelmingly Positive',
    reviewCount: 590133,
    releaseDate: '2023-08-03',
    shortDescription:
      'Gather your party and return to the Forgotten Hairlines. A tale of fellowship, betrayal, and a wizard whose head shines brighter than any Fireball.',
    description: [
      'A mysterious tadpole has been placed in your brain and it is slowly stealing your hair. Only a party of companions — all of whom will eventually flirt with you — can help.',
      'Roll a natural 20 to persuade a bear. Roll a natural 1 to lose your eyebrows. Over 17,000 endings, most of them hats.',
    ],
    image: '/games/balding-gate-3.png',
    topSellerRank: 3,
    requirements: {
      os: 'Windows 10 64-bit',
      processor: 'Intel i7 8700K',
      memory: '16 GB RAM',
      graphics: 'NVIDIA 2060 Super (Shiny)',
      storage: '150 GB of cutscenes',
    },
  },
  {
    slug: 'counter-snack',
    title: 'Counter-Snack: Global Appetizer',
    developer: 'Valve-ish',
    publisher: 'Valve-ish',
    price: 0,
    discount: 0,
    tags: ['FPS', 'Competitive', 'Multiplayer', 'Free to Play'],
    rating: 'Very Positive',
    reviewCount: 8820311,
    releaseDate: '2023-09-27',
    shortDescription:
      'Terrorists want to eat the snacks. Counter-Snackers want to defend them. Rush B (for Burritos). The world’s most competitive kitchen.',
    description: [
      'Two teams. One bomb-sized burrito. Plant it at site A or site B and defend it until it gets cold. Classic maps include Dust Bunny II, Inferno Pizza, and Mirage of Nachos.',
      'Free to play, but the snack skins will cost you your entire college fund.',
    ],
    image: '/games/counter-snack.png',
    topSellerRank: 1,
    requirements: {
      os: 'Windows 10',
      processor: '4 hardware CPU threads',
      memory: '8 GB RAM',
      graphics: 'Anything that can render salsa',
      storage: '85 GB',
    },
  },
  {
    slug: 'elder-rolls-v',
    title: 'The Elder Rolls V: Skyrim Milk',
    developer: 'Bethesdough',
    publisher: 'Bethesdough Softworks',
    price: 3999,
    discount: 75,
    tags: ['RPG', 'Open World', 'Fantasy', 'Moddable'],
    rating: 'Overwhelmingly Positive',
    reviewCount: 402119,
    releaseDate: '2011-11-11',
    shortDescription:
      'Dragons have returned. They are made of cinnamon rolls. You are the Dragonbaker, the only one who can absorb their frosting.',
    description: [
      'Hey, you. You’re finally awake. You were trying to cross the border to buy cheaper flour, right? Walked right into that Imperial bake sale.',
      'Now available on 41 platforms, including your microwave. Next re-release planned for your refrigerator.',
    ],
    image: '/games/elder-rolls.png',
    topSellerRank: 9,
    requirements: {
      os: 'Any OS released after 2011',
      processor: 'Dual Core 2.0GHz',
      memory: '2 GB RAM (+ 32 GB for mods)',
      graphics: 'Direct X 9.0c compatible',
      storage: '6 GB + 400 GB of anime mods',
    },
  },
  {
    slug: 'grand-theft-autocorrect-v',
    title: 'Grand Theft Autocorrect V',
    developer: 'Rockstale North',
    publisher: 'Rockstale Games',
    price: 2999,
    discount: 50,
    tags: ['Action', 'Open World', 'Crime', 'Multiplayer'],
    rating: 'Mostly Positive',
    reviewCount: 1600210,
    releaseDate: '2015-04-14',
    shortDescription:
      'Three criminals. One heist. Every text message gets ducking autocorrected. Welcome to Los Sanitos.',
    description: [
      'When a young street hustler, a retired bank robber, and a terrifying psychopath find themselves texting the wrong people, they must pull off a series of dangerous heists without accidentally sending "I love you" to the police.',
      'GTA Offline included: the online mode, but your phone has no signal.',
    ],
    image: '/games/grand-theft-autocorrect.png',
    topSellerRank: 5,
    requirements: {
      os: 'Windows 10 64-bit',
      processor: 'Intel Core 2 Quad',
      memory: '4 GB RAM',
      graphics: 'NVIDIA 9800 GT 1GB',
      storage: '110 GB',
    },
  },
  {
    slug: 'portal-potty-2',
    title: 'Portal Potty 2',
    developer: 'Valve-ish',
    publisher: 'Valve-ish',
    price: 999,
    discount: 90,
    tags: ['Puzzle', 'Co-op', 'Comedy', 'Sci-fi'],
    rating: 'Overwhelmingly Positive',
    reviewCount: 380512,
    releaseDate: '2011-04-18',
    shortDescription:
      'The Aperture Sanitation Device lets you place portable toilets anywhere. GLaDOS is back. She has notes about your hygiene.',
    description: [
      'Solve mind-bending puzzles using portals and an ever-growing collection of portable restrooms. Think with portals. Flush with portals.',
      'The cake is a lie. The toilet paper is also a lie.',
    ],
    image: '/games/portal-potty-2.png',
    topSellerRank: 12,
    requirements: {
      os: 'Windows 7',
      processor: '3.0 GHz P4',
      memory: '2 GB RAM',
      graphics: 'Shader model 2.0',
      storage: '8 GB',
    },
  },
  {
    slug: 'dark-soles-remastered',
    title: 'Dark Soles: Remastered',
    developer: 'FromHardware',
    publisher: 'Bandai Namcool',
    price: 3999,
    discount: 0,
    tags: ['Souls-like', 'Difficult', 'Dark Fantasy', 'Action RPG'],
    rating: 'Very Positive',
    reviewCount: 120004,
    releaseDate: '2018-05-23',
    shortDescription:
      'Then, there were shoes. Venture into Lordran’s shoe district and face the Asylum Clog, the Bell Gargoyles (they wear sandals), and Ornstein & Sneakerough.',
    description: [
      'Prepare to die. Then prepare to buy insoles. Every boss drops a single left shoe.',
      'Includes the Artorias of the Abyss DLC, in which you finally find a matching right shoe. It is the wrong size.',
    ],
    image: '/games/dark-soles.png',
    topSellerRank: 14,
    requirements: {
      os: 'Windows 7 64-bit',
      processor: 'Intel Core i5-2300',
      memory: '6 GB RAM',
      graphics: 'GeForce GTX 460',
      storage: '8 GB',
    },
  },
  {
    slug: 'stardough-valley',
    title: 'Stardough Valley',
    developer: 'ConcernedBaker',
    publisher: 'ConcernedBaker',
    price: 1499,
    discount: 0,
    tags: ['Farming', 'Cozy', 'Pixel Graphics', 'Indie'],
    rating: 'Overwhelmingly Positive',
    reviewCount: 702455,
    releaseDate: '2016-02-26',
    shortDescription:
      'You’ve inherited your grandfather’s old bread farm. Armed with hand-me-down rolling pins, you set out to grow croissants and win the heart of a local baguette.',
    description: [
      'Turn overgrown fields into a thriving bakery farm. Plant baguette seeds, raise sourdough chickens, and ship bagels to Joja Bread Co. (evil).',
      'Make friends in Pelican Toast. Get married. Have two kids that never grow up. Classic.',
    ],
    image: '/games/stardough-valley.png',
    topSellerRank: 7,
    requirements: {
      os: 'Windows Vista or greater',
      processor: '2 GHz',
      memory: '2 GB RAM',
      graphics: '256 MB video memory',
      storage: '500 MB of pure love',
    },
  },
  {
    slug: 'hollow-night-shift',
    title: 'Hollow Night Shift',
    developer: 'Team Cherry Coke',
    publisher: 'Team Cherry Coke',
    price: 1499,
    discount: 50,
    tags: ['Metroidvania', '2D', 'Indie', 'Difficult'],
    rating: 'Overwhelmingly Positive',
    reviewCount: 310980,
    releaseDate: '2017-02-24',
    shortDescription:
      'Beneath the fading town of Dirtmouth lies Hallownest’s only 24-hour convenience store. You are the knight on the graveyard shift.',
    description: [
      'Restock shelves across a vast interconnected underground. Face over 30 customers who want refunds. Discover the ancient secret of the slushie machine.',
      'The sequel, Silk Shift, finally came out. We are still processing it emotionally.',
    ],
    image: '/games/hollow-night-shift.png',
    topSellerRank: 10,
    requirements: {
      os: 'Windows 7',
      processor: 'Intel Core 2 Duo E5200',
      memory: '4 GB RAM',
      graphics: 'GeForce 9800GTX+',
      storage: '9 GB',
    },
  },
  {
    slug: 'among-ducks',
    title: 'Among Ducks',
    developer: 'InnerQuackle',
    publisher: 'InnerQuackle',
    price: 499,
    discount: 0,
    tags: ['Party', 'Multiplayer', 'Social Deduction', 'Casual'],
    rating: 'Very Positive',
    reviewCount: 650221,
    releaseDate: '2018-11-16',
    shortDescription:
      'Play with 4-15 ducks online. Complete tasks to prep your spaceship for departure — but beware, one duck is a goose.',
    description: [
      'Crewducks win by completing tasks. The goose wins by honking at everyone until they leave.',
      'Red is sus. Red has always been sus. Red is, statistically, usually innocent.',
    ],
    image: '/games/among-ducks.png',
    topSellerRank: 13,
    requirements: {
      os: 'Windows 7 SP1+',
      processor: 'SSE2 instruction set support',
      memory: '1 GB RAM',
      graphics: 'Any. Seriously.',
      storage: '250 MB',
    },
  },
  {
    slug: 'euro-duck-simulator-2',
    title: 'Euro Duck Simulator 2',
    developer: 'SCS Quacktware',
    publisher: 'SCS Quacktware',
    price: 1999,
    discount: 75,
    tags: ['Simulation', 'Driving', 'Relaxing', 'Open World'],
    rating: 'Overwhelmingly Positive',
    reviewCount: 590441,
    releaseDate: '2012-10-18',
    shortDescription:
      'Travel across Europe as king of the road — a duck who delivers important cargo across impressive distances. Webbed feet on the pedals.',
    description: [
      'Over 70 European cities. Dozens of breadcrumb delivery contracts. Honk the horn. The horn is a quack.',
      'Stop at a rest area. Feed your fellow drivers. Get chased by a swan at a Belgian toll booth.',
    ],
    image: '/games/euro-duck-simulator.png',
    topSellerRank: 8,
    requirements: {
      os: 'Windows 7 64-bit',
      processor: 'Dual core CPU 2.4 GHz',
      memory: '4 GB RAM',
      graphics: 'GeForce GTS 450',
      storage: '25 GB',
    },
  },
  {
    slug: 'left-4-bread',
    title: 'Left 4 Bread',
    developer: 'Valve-ish',
    publisher: 'Valve-ish',
    price: 999,
    discount: 80,
    tags: ['Co-op', 'Zombies', 'FPS', 'Horror'],
    rating: 'Overwhelmingly Positive',
    reviewCount: 290330,
    releaseDate: '2009-11-17',
    shortDescription:
      'The bread has gone stale. And it’s hungry. Four survivors fight through hordes of infected baguettes in a co-op apocalypse.',
    description: [
      'Fight off the Tank (a pumpernickel the size of a bus), the Smoker (a burnt toast), and the Witch (a crying croissant — do not startle her).',
      'The AI Director dynamically adjusts the number of crumbs based on how badly your team is doing.',
    ],
    image: '/games/left-4-bread.png',
    topSellerRank: 15,
    requirements: {
      os: 'Windows 7',
      processor: 'Pentium 4 3.0GHz',
      memory: '2 GB RAM',
      graphics: '128 MB, Shader model 2.0',
      storage: '13 GB',
    },
  },
  {
    slug: 'civil-litigation-vi',
    title: 'Civil Litigation VI',
    developer: 'Fireaxis Games',
    publisher: '2K Lawsuits',
    price: 5999,
    discount: 90,
    tags: ['Strategy', 'Turn-Based', '4X', 'Historical'],
    rating: 'Very Positive',
    reviewCount: 189002,
    releaseDate: '2016-10-21',
    shortDescription:
      'Build an empire that will stand the test of time — or at least survive discovery. Sue Gandhi. Get sued by Gandhi. Gandhi has nukes.',
    description: [
      'Expand your legal empire across the map, advance your culture through precedent, and compete against history’s greatest litigators.',
      'Just one more turn. Just one more appeal. It is 4am. You have been served.',
    ],
    image: '/games/civil-litigation.png',
    topSellerRank: 11,
    requirements: {
      os: 'Windows 7 64-bit',
      processor: 'Intel Core i3 2.5 GHz',
      memory: '4 GB RAM',
      graphics: '1 GB DirectX 11',
      storage: '12 GB',
    },
  },
  {
    slug: 'half-wife-3',
    title: 'Half-Wife 3',
    developer: 'Valve-ish',
    publisher: 'Valve-ish',
    price: 5999,
    discount: 0,
    tags: ['FPS', 'Sci-fi', 'Story Rich', 'Action'],
    rating: 'Mixed',
    reviewCount: 3,
    releaseDate: '2099-01-01',
    comingSoon: true,
    shortDescription:
      'Gordon Freeman finally gets married. The ceremony is interrupted by an alien invasion. Developers cannot count to three, so this may take a while.',
    description: [
      'Rise and shine, Mr. Freeman. Rise and... shine. Not that I wish to imply you have been sleeping on the job. But your fiancée has been waiting at the altar since 2007.',
      'Release date: when it’s done. Pre-purchase: when it’s more done.',
    ],
    image: '/games/half-wife-3.png',
    topSellerRank: 99,
    requirements: {
      os: 'Steam Deck 7',
      processor: 'Source 3 compatible',
      memory: 'Unknown',
      graphics: 'Unknown',
      storage: 'Unknown',
    },
  },
]

export function getGameBySlug(slug: string) {
  return games.find((g) => g.slug === slug)
}

export function finalPrice(game: Game) {
  return Math.round(game.price * (1 - game.discount / 100))
}

export function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(2)}`
}

export function formatReleaseDate(game: Game) {
  if (game.comingSoon) return 'When it’s done™'
  return new Date(game.releaseDate + 'T00:00:00Z').toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

export const allTags = Array.from(new Set(games.flatMap((g) => g.tags))).sort()

export const ratingScore: Record<ReviewRating, number> = {
  'Overwhelmingly Positive': 5,
  'Very Positive': 4,
  'Mostly Positive': 3,
  Mixed: 2,
  'Mostly Negative': 1,
}
