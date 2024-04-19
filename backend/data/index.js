import mongoose from "mongoose";

export const admin = [
  {
    _id: new mongoose.Types.ObjectId(),
    username: "admin",
    password: "12345678",
    email: "admin@hotmail.com",
    role: "a",
  },
];

export const categories = [
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Headphones",
    image: "https://m.media-amazon.com/images/I/312Gw7w4CVL.jpg",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Laptops",
    image:
      "https://961souq.com/cdn/shop/files/Cyborg-15-A12V_fdc3fbbe-d4d0-4d0e-a244-37b332771e07.jpg?v=1700906246",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Mice",
    image:
      "https://assets2.razerzone.com/images/da10m/carousel/razer-death-adder-gallery-12.png",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Keyboards",
    image:
      "https://961souq.com/cdn/shop/files/k3000-keyboard_grande.jpg?v=1683727488",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Monitors",
    image:
      "https://961souq.com/cdn/shop/products/LC27G55TQBMXUE-1.jpg?v=1679569860",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Computers",
    image:
      "https://961souq.com/cdn/shop/products/gaming-desktop-offer-1.jpg?v=1678969649",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Consoles",
    image:
      "https://www.ammancart.com/cdn/shop/files/61JbCra_7GL._SL1500_1000x1000_bf71886a-ef95-4bbe-acc4-83f43d90b7ad.jpg?v=1686553629",
  },
];

export const products = [
  // {
  //   _id: new mongoose.Types.ObjectId(),
  //   name: "Razer BlackShark V2 X",
  //   description:
  //     "Razer BlackShark V2 X - Black Multi-Platform Wired Esports Headset",
  //   price: 60,
  //   quantity: 25,
  //   category: "Headphones",
  //   image: "https://i.ebayimg.com/images/g/cmwAAOSwBlVisJld/s-l1200.webp",
  //   favorites: 15,
  // },
  // {
  //   _id: new mongoose.Types.ObjectId(),
  //   name: "Bose Headphones",
  //   description: "Bose Noise Cancelling Headphones 700 - White",
  //   price: 350,
  //   quantity: 8,
  //   category: "Headphones",
  //   image:
  //     "https://cdn11.bigcommerce.com/s-sp9oc95xrw/images/stencil/1280x1280/products/9012/48029/1559120447_IMG_1192163__72012.1668238210.jpg?c=2",
  //   favorites: 25,
  // },
  // {
  //   _id: new mongoose.Types.ObjectId(),
  //   name: "HyperX Cloud Stinger",
  //   description: "HyperX Cloud Stinger - Gaming Headset - PS4-PS5-XBOX-PC",
  //   price: 50,
  //   quantity: 30,
  //   category: "Headphones",
  //   image:
  //     "https://cdn11.bigcommerce.com/s-sp9oc95xrw/images/stencil/1280x1280/products/4363/27685/51gsly0T0fL._AC_SL1000___82828.1621601300.jpg?c=2",
  //   favorites: 40,
  // },
  // {
  //   _id: new mongoose.Types.ObjectId(),
  //   name: "Razer Orochi V2",
  //   description: "Razer Orochi V2 - Black",
  //   price: 75,
  //   quantity: 20,
  //   category: "Mice",
  //   image:
  //     "https://www.nextstore.com.kw/media/catalog/product/cache/1913860e7352e75eb6626835cd95d7bd/r/z/rz01-03730100-r3g1-01.jpg",
  //   favorites: 22,
  // },
  // {
  //   _id: new mongoose.Types.ObjectId(),
  //   name: "MSI Optix 27 Inch",
  //   description: "MSI Optix 27 Inch MAG274QRF-QD WQHD, 1ms, 165Hz Refresh Rate",
  //   price: 550,
  //   quantity: 10,
  //   category: "Monitors",
  //   image: "https://m.media-amazon.com/images/I/81fKAwb6LdL.jpg",
  //   favorites: 44,
  // },
  // {
  //   _id: new mongoose.Types.ObjectId(),
  //   name: "Sony Playstation 5",
  //   description: "Sony Playstation 5 - Disk Edition",
  //   price: 500,
  //   quantity: 28,
  //   category: "Consoles",
  //   image:
  //     "https://www.ammancart.com/cdn/shop/files/61JbCra_7GL._SL1500_1000x1000_bf71886a-ef95-4bbe-acc4-83f43d90b7ad.jpg?v=1686553629",
  //   favorites: 52,
  // },
  // {
  //   _id: new mongoose.Types.ObjectId(),
  //   name: "Sony Playstation 5",
  //   description:
  //     "Sony PS5® Console - Marvel's Spider-Man 2 Limited Edition Bundle",
  //   price: 600,
  //   quantity: 5,
  //   category: "Consoles",
  //   image:
  //     "https://961souq.com/cdn/shop/files/Sony-PS5_-Console-_-Marvel_s-Spider-Man-2-Limited-Edition-Bundle_grande.jpg?v=1701103613",
  //   favorites: 55,
  // },
  // {
  //   _id: new mongoose.Types.ObjectId(),
  //   name: "Asus ROG Strix G17",
  //   description:
  //     "Asus ROG Strix G17 - 17.3-Inch - Ryzen 9 7845HX - 16GB Ram - 1TB SSD - RTX 4070 8GB",
  //   price: 2200,
  //   quantity: 8,
  //   category: "Laptops",
  //   image: "https://961souq.com/cdn/shop/files/G713PI-G17.jpg?v=1689076330",
  //   favorites: 60,
  // },
  // {
  //   _id: new mongoose.Types.ObjectId(),
  //   name: "Logitech M190",
  //   description: "Logitech M190 FULL-SIZE WIRELESS MOUSE",
  //   price: 20,
  //   quantity: 32,
  //   category: "Mice",
  //   image:
  //     "https://961souq.com/cdn/shop/files/Logitech-M190-Full-Size-Wireless-Mouse_grande.jpg?v=1692626525",
  //   favorites: 10,
  // },
  // {
  //   _id: new mongoose.Types.ObjectId(),
  //   name: "Asus tuf f17",
  //   description:
  //     "ASUS TUF F17 - 17.3-Inch - Core I9-13900H - 16GB Ram - 512GB SSD - RTX 4060 8GB - 3 Years Warranty",
  //   price: 1100,
  //   quantity: 7,
  //   category: "Laptops",
  //   image:
  //     "https://961souq.com/cdn/shop/files/ASUS---TUF-Gaming-F15-15.6_-Laptop---Intel-Core-i7---16GB-Memory---NVIDIA-GeForce-RTX-3060---1TB-SSD---Eclipse-Gray.jpg?v=1698306772",
  //   favorites: 65,
  // },
  // {
  //   _id: new mongoose.Types.ObjectId(),
  //   name: "Gaming Desktop",
  //   description:
  //     "Gaming Desktop Offer - Core I5-13400F - 16GB Ram - 1TB SSD - RTX 3080 12GB",
  //   price: 1300,
  //   quantity: 5,
  //   category: "Computers",
  //   image:
  //     "https://961souq.com/cdn/shop/products/desktop-offer-3_grande.jpg?v=1678974978",
  //   favorites: 56,
  // },
  // {
  //   _id: new mongoose.Types.ObjectId(),
  //   name: "Asus ROG Strix",
  //   description: "Asus ROG Strix XG27VQ 27 Inch 144Hz Curved Gaming Monitor",
  //   price: 400,
  //   quantity: 9,
  //   category: "Monitors",
  //   image:
  //     "https://961souq.com/cdn/shop/products/2_46bb0fd7-2ab2-4b89-bd3f-1ab984eb52dc_grande.jpg?v=1649410751",
  //   favorites: 27,
  // },
  // {
  //   _id: new mongoose.Types.ObjectId(),
  //   name: "Gaming Desktop",
  //   description:
  //     "Gaming Desktop Offer - Core I5-12400F - 16GB Ram - 512GB SSD - RTX 3050 8GB",
  //   price: 800,
  //   quantity: 11,
  //   category: "Computers",
  //   image:
  //     "https://961souq.com/cdn/shop/products/gaming-desktop-offer-1.jpg?v=1678969649",
  //   favorites: 34,
  // },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Asus ROG Strix",
    description: "Asus ROG Strix Scope NX TKL Moonlight White Keyboard",
    price: 120,
    quantity: 6,
    category: "Keyboards",
    image:
      "https://961souq.com/cdn/shop/products/ROG-Strix-Scope-NX-TKL-Moonlight-White-2.jpg?v=1651219080",
    favorites: 26,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Lenovo Legion K500",
    description:
      "Lenovo Legion K500 RGB Mechanical Gaming Keyboard (US English)",
    price: 75,
    quantity: 6,
    category: "Keyboards",
    image:
      "https://961souq.com/cdn/shop/products/Lenovo-Legion-K500-RGB-Mechanical-Gaming-Keyboard-_US-English_-3_medium.jpg?v=1651675680",
    favorites: 16,
  },
];
