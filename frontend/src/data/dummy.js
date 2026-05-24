export const products = [
  {
    id: 1,
    name: "Fast Charge Adapter 65W",
    category: "Chargers",
    price: 899,
    rating: 4.5,
    reviews: 128,
    image:
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&q=80",
    stock: 15,
    description:
      "65W GaN fast charger compatible with all USB-C devices. Compact design with smart chip protection.",
    features: [
      "65W GaN Technology",
      "Universal Compatibility",
      "Overheat Protection",
      "Compact Design",
    ],
  },
  {
    id: 2,
    name: "Transparent Phone Cover",
    category: "Covers",
    price: 199,
    rating: 4.2,
    reviews: 89,
    image:
      "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&q=80",
    stock: 42,
    description:
      "Crystal clear TPU case with military-grade drop protection. Fits perfectly without adding bulk.",
    features: [
      "Military Drop Protection",
      "Crystal Clear",
      "Anti-Yellow Coating",
      "Precise Cutouts",
    ],
  },
  {
    id: 3,
    name: "Tempered Glass Screen Guard",
    category: "Screen Guards",
    price: 149,
    rating: 4.7,
    reviews: 203,
    image:
      "https://images.unsplash.com/photo-1512054502232-10a0a035d672?w=400&q=80",
    stock: 60,
    description:
      "9H hardness tempered glass with oleophobic coating. Full coverage with easy installation kit.",
    features: [
      "9H Hardness",
      "Oleophobic Coating",
      "Full Coverage",
      "Easy Install Kit",
    ],
  },
  {
    id: 4,
    name: "Wireless Earbuds Pro",
    category: "Headphones",
    price: 1499,
    rating: 4.4,
    reviews: 76,
    image:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=80",
    stock: 8,
    description:
      "True wireless earbuds with active noise cancellation and 30hr battery life.",
    features: [
      "Active Noise Cancellation",
      "30Hr Battery",
      "IPX5 Water Resistant",
      "Touch Controls",
    ],
  },
  {
    id: 5,
    name: "USB-C Braided Cable 2m",
    category: "Accessories",
    price: 299,
    rating: 4.3,
    reviews: 154,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
    stock: 35,
    description:
      "Nylon braided USB-C cable with 100W power delivery support. 2 meter length for convenience.",
    features: [
      "100W Power Delivery",
      "Nylon Braided",
      "2 Meter Length",
      "10Gbps Data Transfer",
    ],
  },
  {
    id: 6,
    name: "Magnetic Car Mount",
    category: "Accessories",
    price: 449,
    rating: 4.1,
    reviews: 62,
    image:
      "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&q=80",
    stock: 20,
    description:
      "Strong magnetic car mount with 360° rotation. Dashboard and vent mount options included.",
    features: [
      "Strong N52 Magnet",
      "360° Rotation",
      "Universal Fit",
      "Dashboard & Vent Mount",
    ],
  },
  {
    id: 7,
    name: "20W PD Wall Charger",
    category: "Chargers",
    price: 599,
    rating: 4.6,
    reviews: 91,
    image:
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&q=80",
    stock: 25,
    description:
      "20W Power Delivery wall charger. Fast charges iPhone and Android devices.",
    features: [
      "20W Power Delivery",
      "Foldable Pins",
      "LED Indicator",
      "Universal Voltage",
    ],
  },
  {
    id: 8,
    name: "Leather Flip Cover",
    category: "Covers",
    price: 349,
    rating: 4.0,
    reviews: 44,
    image:
      "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&q=80",
    stock: 18,
    description:
      "Premium PU leather flip cover with card slots and magnetic closure.",
    features: [
      "PU Leather",
      "Card Slots",
      "Magnetic Closure",
      "Stand Function",
    ],
  },
];

export const repairs = [
  {
    id: "MC-001",
    customer: "Rahul Sharma",
    phone: "9876543210",
    device: "iPhone 13",
    issue: "Screen Damage",
    status: "Repairing",
    date: "2025-01-10",
    eta: "2025-01-12",
    notes: "Screen cracked on left side, touch unresponsive",
  },
  {
    id: "MC-002",
    customer: "Priya Nair",
    phone: "9123456789",
    device: "Samsung S22",
    issue: "Battery Problem",
    status: "Completed",
    date: "2025-01-09",
    eta: "2025-01-11",
    notes: "Battery swollen, replaced with genuine part",
  },
  {
    id: "MC-003",
    customer: "Arun Kumar",
    phone: "9988776655",
    device: "OnePlus 11",
    issue: "Charging Problem",
    status: "Pending",
    date: "2025-01-11",
    eta: "2025-01-13",
    notes: "Charging port damaged, needs replacement",
  },
  {
    id: "MC-004",
    customer: "Meera Pillai",
    phone: "9765432109",
    device: "Redmi Note 12",
    issue: "Water Damage",
    status: "Waiting for Parts",
    date: "2025-01-08",
    eta: "2025-01-14",
    notes: "Motherboard cleaning required, parts ordered",
  },
  {
    id: "MC-005",
    customer: "Suresh Menon",
    phone: "9654321098",
    device: "Realme 10",
    issue: "Camera Issue",
    status: "Delivered",
    date: "2025-01-07",
    eta: "2025-01-09",
    notes: "Rear camera module replaced",
  },
  {
    id: "MC-006",
    customer: "Divya Thomas",
    phone: "9543210987",
    device: "Vivo V25",
    issue: "Software Issue",
    status: "Checking",
    date: "2025-01-11",
    eta: "2025-01-12",
    notes: "Phone stuck in boot loop, flashing firmware",
  },
];

export const orders = [
  {
    id: "ORD-001",
    customer: "Rahul Sharma",
    phone: "9876543210",
    items: [{ name: "Fast Charge Adapter", qty: 1, price: 899 }],
    total: 899,
    status: "Delivered",
    date: "2025-01-08",
  },
  {
    id: "ORD-002",
    customer: "Priya Nair",
    phone: "9123456789",
    items: [{ name: "Tempered Glass", qty: 2, price: 149 }],
    total: 298,
    status: "Processing",
    date: "2025-01-10",
  },
  {
    id: "ORD-003",
    customer: "Arun Kumar",
    phone: "9988776655",
    items: [{ name: "Wireless Earbuds", qty: 1, price: 1499 }],
    total: 1499,
    status: "Shipped",
    date: "2025-01-11",
  },
  {
    id: "ORD-004",
    customer: "Meera Pillai",
    phone: "9765432109",
    items: [{ name: "USB-C Cable", qty: 3, price: 299 }],
    total: 897,
    status: "Pending",
    date: "2025-01-11",
  },
];

export const customers = [
  {
    id: 1,
    name: "Rahul Sharma",
    phone: "9876543210",
    email: "rahul@email.com",
    repairs: 2,
    orders: 3,
    joined: "2024-06-01",
  },
  {
    id: 2,
    name: "Priya Nair",
    phone: "9123456789",
    email: "priya@email.com",
    repairs: 1,
    orders: 1,
    joined: "2024-08-15",
  },
  {
    id: 3,
    name: "Arun Kumar",
    phone: "9988776655",
    email: "arun@email.com",
    repairs: 3,
    orders: 2,
    joined: "2024-05-20",
  },
  {
    id: 4,
    name: "Meera Pillai",
    phone: "9765432109",
    email: "meera@email.com",
    repairs: 1,
    orders: 1,
    joined: "2024-11-10",
  },
  {
    id: 5,
    name: "Suresh Menon",
    phone: "9654321098",
    email: "suresh@email.com",
    repairs: 2,
    orders: 0,
    joined: "2024-09-05",
  },
];

export const testimonials = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "iPhone User",
    text: "Got my cracked screen fixed in under 2 hours. Amazing service and genuine parts used!",
    rating: 5,
    avatar: "RS",
  },
  {
    id: 2,
    name: "Priya Nair",
    role: "Samsung User",
    text: "WhatsApp updates kept me informed throughout the repair. Very professional team.",
    rating: 5,
    avatar: "PN",
  },
  {
    id: 3,
    name: "Arun Kumar",
    role: "OnePlus User",
    text: "Affordable pricing and quick turnaround. Highly recommend Kattayil Stores to everyone!",
    rating: 4,
    avatar: "AK",
  },
];

export const statusSteps = [
  "Request Received",
  "Inspection",
  "Waiting for Parts",
  "Repair In Progress",
  "Completed",
  "Delivered",
];

export const statusColors = {
  Pending:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  Checking: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  "Waiting for Parts":
    "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  Repairing:
    "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  Completed:
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Delivered: "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300",
  Processing:
    "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Shipped:
    "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
};
