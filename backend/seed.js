// seed.js
const mongoose = require("mongoose");
const User = require("./models/User");
const Gig = require("./models/Gig");
const Conversation = require("./models/Conversation");
const Message = require("./models/Message");
const Order = require("./models/Order");
const Review = require("./models/Review");
const dotenv = require("dotenv");
dotenv.config();
const bcrypt = require("bcrypt");

// اتصال به MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error(err));

const seed = async () => {
  try {
    // پاک کردن داده‌های قبلی
    await User.deleteMany();
    await Gig.deleteMany();
    await Conversation.deleteMany();
    await Message.deleteMany();
    await Order.deleteMany();
    await Review.deleteMany();

    // ---------- Users ----------
    const users = [
      {
        username: "Anna",
        email: "anna@example.com",
        password: "123456",
        isSeller: true,
        image: "https://i.pravatar.cc/150?img=1",
        desc: "Experienced digital artist",
        phone: "09120000001",
      },
      {
        username: "David",
        email: "david@example.com",
        password: "123456",
        isSeller: false,
        image: "https://i.pravatar.cc/150?img=2",
        desc: "Looking for custom AI art",
        phone: "09120000002",
      },
      {
        username: "Lily",
        email: "lily@example.com",
        password: "123456",
        isSeller: true,
        image: "https://i.pravatar.cc/150?img=3",
        desc: "AI Illustrator and designer",
        phone: "09120000003",
      },
    ];
    const hashing = users.map( (user) => {
      const hash =  bcrypt.hashSync(user.password, 10);
      return { ...user, password: hash };
    });
    const createdUsers = await User.insertMany(hashing);
    console.log("✅ Users seeded");

    // ---------- Gigs ----------
    const gigs = [
      {
        userId: createdUsers[0]._id.toString(),
        title: "AI Portrait Illustration",
        description: "I will create a stunning AI-generated portrait",
        category: "Graphics & Design",
        price: 59.99,
        cover: "https://picsum.photos/400/300?random=1",
        images: [
          "https://picsum.photos/400/300?random=2",
          "https://picsum.photos/400/300?random=3",
        ],
        shortTitle: "AI Portrait",
        shortDescription: "Beautiful AI-generated portraits",
        deliveryTime: 2,
        revisionNumber: 3,
        features: ["High quality", "Custom style", "Fast delivery"],
        sales: 12,
      },
      {
        userId: createdUsers[2]._id.toString(),
        title: "AI Landscape Art",
        description: "I will create a vivid AI-generated landscape",
        category: "Graphics & Design",
        price: 79.99,
        cover: "https://picsum.photos/400/300?random=4",
        images: [
          "https://picsum.photos/400/300?random=5",
          "https://picsum.photos/400/300?random=6",
        ],
        shortTitle: "AI Landscape",
        shortDescription: "Stunning AI landscapes for projects",
        deliveryTime: 3,
        revisionNumber: 2,
        features: ["High resolution", "Custom themes"],
        sales: 5,
      },
    ];

    const createdGigs = await Gig.insertMany(gigs);
    console.log("✅ Gigs seeded");

    // ---------- Conversations ----------
    const conversations = [
      {
        id: createdUsers[0]._id + createdUsers[1]._id,
        sellerId: createdUsers[0]._id.toString(),
        buyerId: createdUsers[1]._id.toString(),
        readBySeller: true,
        readByBuyer: false,
        lastMessage: "Hi! Can you create a portrait for me?",
      },
    ];

    const createdConversations = await Conversation.insertMany(conversations);
    console.log("✅ Conversations seeded");

    // ---------- Messages ----------
    const messages = [
      {
        conversationId: createdConversations[0]._id.toString(),
        userId: createdUsers[1]._id.toString(),
        description: "Hi! Can you create a portrait for me?",
      },
      {
        conversationId: createdConversations[0]._id.toString(),
        userId: createdUsers[0]._id.toString(),
        description: "Sure! I can do it in 2 days.",
      },
    ];

    await Message.insertMany(messages);
    console.log("✅ Messages seeded");

    // ---------- Orders ----------
    const orders = [
      {
        gigId: createdGigs[0]._id.toString(),
        image: createdGigs[0].cover,
        title: createdGigs[0].title,
        price: createdGigs[0].price,
        sellerId: createdGigs[0].userId,
        buyerId: createdUsers[1]._id.toString(),
        isCompleted: true,
        payment_intent: "test_12345",
      },
    ];

    await Order.insertMany(orders);
    console.log("✅ Orders seeded");

    // ---------- Reviews ----------
    const reviews = [
      {
        gigId: createdGigs[0]._id.toString(),
        userId: createdUsers[1]._id.toString(),
        star: 5,
        description: "Amazing work! Highly recommended.",
      },
      {
        gigId: createdGigs[1]._id.toString(),
        userId: createdUsers[1]._id.toString(),
        star: 4,
        description: "Beautiful landscapes!",
      },
    ];

    await Review.insertMany(reviews);
    console.log("✅ Reviews seeded");

    console.log("🎉 All data seeded successfully!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
