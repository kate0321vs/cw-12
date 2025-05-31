import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import Activity from "./models/Activity";

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection("users");
        await db.dropCollection("artists");
        await db.dropCollection("albums");
        await db.dropCollection("tracks");
    } catch (e) {
        console.log("Collections were not present, skipping drop...");
    }

    const [User1, User2] = await User.create({
        email: "user1@gmail.com",
        password: "password",
        role: "user",
        displayName: "Emily Johnson",
        token: crypto.randomUUID()
    }, {
        email: "admin@gmail.com",
        password: "password",
        role: "admin",
        displayName: "Tom Bradley",
        token: crypto.randomUUID()
    });

    await Activity.create({
        title: "Cooking Basics",
        image: "fixtures/CookingBasics.jpg",
        description: "Description: Discover the joy of home cooking with this beginner-friendly course. We'll explore essential kitchen tools, learn how to prep ingredients properly, and master simple yet delicious recipes that anyone can cook. Whether you're new to the kitchen or just want to sharpen your skills, this activity will help you build a strong foundation and enjoy the process of creating meals from scratch.",
        isPublished: true,
        user: User1,
    }, {
        title: "Hiking Adventures",
        image: "fixtures/HikingAdventures.jpg",
        description: "Description: Ready to reconnect with nature? This activity takes you through some of the most beautiful hiking trails, teaching you how to plan your trip, pack smartly, and stay safe on the trail. Along the way, you’ll learn about local wildlife, navigation techniques, and how to leave no trace. Whether it’s a short walk or a full-day hike, you’ll be well-prepared and inspired to explore.",
        isPublished: true,
        user: User1,
    }, {
        title: "Digital Photography",
        image: "fixtures/DigitalPhotography.jpg",
        description: "Description: Learn to capture the world through your lens in this hands-on photography class. We'll cover camera settings, lighting principles, composition techniques, and post-editing basics. Whether you're using a DSLR or just your phone, you’ll gain practical skills to elevate your photos and tell powerful visual stories. Perfect for travelers, creatives, or anyone curious about photography.",
        isPublished: false,
        user: User1,
    }, {
        title: "Home Gardening",
        image: "fixtures/HomeGardening.jpg",
        description: "Description: Turn your living space into a thriving garden, no matter the size. Learn about soil health, plant selection, watering schedules, and sustainable gardening practices. From herbs on your windowsill to vegetables in your backyard, this course is perfect for beginners looking to connect with nature and enjoy the fruits (and veggies) of their labor.",
        isPublished: true,
        user: User2,
    }, {
        title: "Basic Drawing Skills",
        image: "fixtures/BasicDrawingSkills.jpg",
        description: "Description: Learn how to draw from observation and imagination in this welcoming art class. We’ll start with simple shapes and work our way up to full sketches, exploring shading, perspective, and figure drawing. Great for beginners who want to develop their artistic side and build confidence through creativity. No prior experience needed — just a pencil and curiosity.",
        isPublished: true,
        user: User2,
    }, {
        title: "Fitness at Home",
        image: "fixtures/FitnessatHome.jpg",
        description: "Description: Stay active and energized with fun and effective workouts that you can do from the comfort of your home. This course covers bodyweight exercises, stretching routines, and simple cardio drills. No gym or special equipment required. Whether your goal is to stay fit, relieve stress, or just move more, this class will help you build healthy habits that stick.",
        isPublished: false,
        user: User2,
    });

    await db.close()
};

run().catch(console.error);