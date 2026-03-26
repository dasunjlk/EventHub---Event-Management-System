import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Event from './models/Event.js';

dotenv.config();

const events = [
  {
    title: "Neon Beats Music Festival",
    date: new Date("2026-04-15T18:00:00Z"),
    location: "Colombo, Sri Lanka",
    category: "Music",
    ticket_price: 2500,
    available_tickets: 500,
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80",
    description: "Experience the ultimate music festival under the neon lights of Colombo. Featuring world-class DJs, live bands, and an unforgettable atmosphere. Neon Beats brings together the finest artists from across Asia for a night you will never forget. Enjoy multiple stages, food stalls, art installations, and more."
  },
  {
    title: "TechSpark Conference 2026",
    date: new Date("2026-05-10T09:00:00Z"),
    location: "Kandy, Sri Lanka",
    category: "Tech",
    ticket_price: 3500,
    available_tickets: 300,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    description: "The premier technology conference in Sri Lanka, bringing together innovators, developers, and entrepreneurs. Featuring keynote talks on AI, blockchain, cloud computing, and startup ecosystems. Network with industry leaders and attend hands-on workshops to level up your skills."
  },
  {
    title: "Canvas & Craft Art Exhibition",
    date: new Date("2026-04-28T10:00:00Z"),
    location: "Galle, Sri Lanka",
    category: "Art",
    ticket_price: 800,
    available_tickets: 200,
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80",
    description: "A stunning exhibition showcasing the works of over 50 local and international artists. From oil paintings and watercolours to digital art and sculptures, Canvas & Craft celebrates the full spectrum of human creativity. Held in the historic Galle Fort, this is an experience for all art lovers."
  },
  {
    title: "Future Minds Education Summit",
    date: new Date("2026-06-02T08:30:00Z"),
    location: "Negombo, Sri Lanka",
    category: "Education",
    ticket_price: 1500,
    available_tickets: 400,
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80",
    description: "Join educators, students, and policymakers at the Future Minds Education Summit. Covering topics such as ed-tech innovation, curriculum reform, inclusive learning, and student mental health. This one-day summit features panel discussions, workshops, and a startup pitch competition focused on education."
  },
  {
    title: "Hands-On Web Dev Workshop",
    date: new Date("2026-04-20T10:00:00Z"),
    location: "Colombo, Sri Lanka",
    category: "Workshop",
    ticket_price: 1200,
    available_tickets: 60,
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=800&q=80",
    description: "A full-day intensive workshop covering modern web development from scratch. Topics include HTML, CSS, JavaScript, React, and deployment with Vercel. Suitable for beginners and intermediate developers alike. Bring your laptop and leave with a fully deployed web project!"
  },
  {
    title: "Sunset Jazz Evening",
    date: new Date("2026-05-25T17:30:00Z"),
    location: "Mirissa, Sri Lanka",
    category: "Music",
    ticket_price: 3000,
    available_tickets: 80,
    image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800&q=80",
    description: "Unwind with an intimate evening of live jazz music on the beautiful Mirissa beach. Featuring seasoned jazz musicians, craft cocktails, and a spectacular ocean sunset. Limited seating ensures an exclusive and memorable experience for every guest."
  },
  {
    title: "Startup Pitch Night",
    date: new Date("2026-06-15T19:00:00Z"),
    location: "Colombo, Sri Lanka",
    category: "Tech",
    ticket_price: 500,
    available_tickets: 250,
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80",
    description: "Watch the next generation of Sri Lankan entrepreneurs pitch their startup ideas to a panel of top investors and venture capitalists. Exciting presentations, expert feedback, and incredible networking opportunities make this a must-attend for anyone in the startup ecosystem."
  },
  {
    title: "Photography Masterclass",
    date: new Date("2026-05-05T09:00:00Z"),
    location: "Ella, Sri Lanka",
    category: "Workshop",
    ticket_price: 2200,
    available_tickets: 30,
    image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&q=80",
    description: "A two-day photography masterclass set amidst the breathtaking landscapes of Ella. Led by award-winning photographer Dinesh Perera, participants will learn composition, lighting, portrait and landscape photography, and post-production editing. All skill levels welcome."
  }
];

const seedDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/eventhub');
    console.log(`Connected to MongoDB: ${conn.connection.host}`);
    
    // Clear existing events to prevent duplicates, if you prefer not to clear them you can remove this
    await Event.deleteMany({});
    console.log('Cleared existing events');

    await Event.insertMany(events);
    console.log('Database seeded with 8 dummy events!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error.message);
    process.exit(1);
  }
};

seedDB();
