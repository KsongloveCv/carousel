export const services = [
  {
    slug: "bath",
    name: "精致洗浴",
    icon: "🛁",
    description: "温水预洗、深层清洁、护毛素护理、吹干梳理，选用进口低敏香波。",
    price_from: 68,
    sort_order: 1,
  },
  {
    slug: "grooming",
    name: "造型美容",
    icon: "✂️",
    description: "专业修剪、修甲、清耳、挤肛腺，根据品种定制可爱造型。",
    price_from: 128,
    sort_order: 2,
  },
  {
    slug: "spa",
    name: "SPA 护理",
    icon: "💆",
    description: "精油按摩、毛发滋养、皮肤舒缓，缓解换毛期不适与干燥。",
    price_from: 168,
    sort_order: 3,
  },
  {
    slug: "dental",
    name: "口腔护理",
    icon: "🦷",
    description: "牙齿检查、口气清新、牙龈护理，预防牙结石与口臭问题。",
    price_from: 58,
    sort_order: 4,
  },
];

export const packages = [
  {
    slug: "basic",
    name: "基础洗护",
    pet_type: "小型犬 / 猫咪",
    price: 88,
    features: ["全身洗浴 + 吹干", "修甲 + 清耳", "基础梳毛", "约 60 分钟"],
    featured: false,
    sort_order: 1,
  },
  {
    slug: "beauty",
    name: "精致美容",
    pet_type: "中小型犬",
    price: 168,
    features: ["洗浴 + 造型修剪", "护毛 SPA", "口腔基础护理", "约 90 分钟"],
    featured: true,
    sort_order: 2,
  },
  {
    slug: "luxury",
    name: "豪华全护",
    pet_type: "全品类",
    price: 268,
    features: ["全套美容 + SPA", "深度口腔护理", "皮毛滋养护理", "约 120 分钟"],
    featured: false,
    sort_order: 3,
  },
];

export const reviews = [
  {
    author_name: "豆豆妈",
    pet_info: "柯基 · 精致美容",
    content:
      "我家柯基特别怕水，之前别家洗一次哭一次。萌爪的小姐姐特别有耐心，出来还戴了小领结，毛蓬松得像个棉花糖！",
    stars: 5,
    avatar_emoji: "🐶",
  },
  {
    author_name: "糯米爸爸",
    pet_info: "布偶猫 · 豪华全护",
    content:
      "布偶猫长毛打结严重，美容师梳了一个多小时都没不耐烦。店里很干净，有独立猫房，猫咪压力小很多。",
    stars: 5,
    avatar_emoji: "🐱",
  },
  {
    author_name: "阿福主人",
    pet_info: "金毛 · 基础洗护",
    content:
      "价格透明，预约准时不用等。吹干很仔细，耳朵和指甲都处理得很到位。已经办卡成为老客户了。",
    stars: 5,
    avatar_emoji: "🐕",
  },
  {
    author_name: "橘子姐",
    pet_info: "橘猫 · 基础洗护",
    content: "第一次带猫来洗澡，工作人员很温柔，猫咪没有应激，回家香了好几天。",
    stars: 5,
    avatar_emoji: "🐱",
  },
  {
    author_name: "小黑爸",
    pet_info: "泰迪 · SPA 护理",
    content: "SPA 做完毛发特别顺滑，皮肤也不干燥了，性价比很高，会再约。",
    stars: 4,
    avatar_emoji: "🐩",
  },
];

export const bookings = [
  {
    customer_name: "张女士",
    phone: "13800001111",
    pet_type: "dog-small",
    service_slug: "beauty",
    note: "柯基，怕吹风机声音",
    status: "confirmed",
  },
  {
    customer_name: "李先生",
    phone: "13900002222",
    pet_type: "cat",
    service_slug: "luxury",
    note: "布偶猫，毛发打结",
    status: "completed",
  },
  {
    customer_name: "王小姐",
    phone: "13700003333",
    pet_type: "dog-medium",
    service_slug: "basic",
    note: "金毛，周末上午",
    status: "pending",
  },
  {
    customer_name: "赵先生",
    phone: "13600004444",
    pet_type: "dog-large",
    service_slug: "luxury",
    note: "阿拉斯加，需要两位美容师",
    status: "pending",
  },
  {
    customer_name: "陈女士",
    phone: "13500005555",
    pet_type: "cat",
    service_slug: "basic",
    note: "英短，仅洗浴",
    status: "confirmed",
  },
  {
    customer_name: "刘先生",
    phone: "13400006666",
    pet_type: "dog-small",
    service_slug: "beauty",
    note: "博美造型",
    status: "cancelled",
  },
];
