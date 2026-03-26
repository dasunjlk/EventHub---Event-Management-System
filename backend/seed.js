const dummyEvents = [
  {
    title: "Neon Beats Music Festival",
    date: "2026-04-15",
    location: "Colombo, Sri Lanka",
    category: "Music",
    price: 2500,
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80",
    description: "Experience the ultimate music festival under the neon lights of Colombo. Featuring world-class DJs, live bands, and an unforgettable atmosphere. Neon Beats brings together the finest artists from across Asia for a night you will never forget. Enjoy multiple stages, food stalls, art installations, and more.",
    seats: 500,
  },
  {
    title: "TechSpark Conference 2026",
    date: "2026-05-10",
    location: "Kandy, Sri Lanka",
    category: "Tech",
    price: 3500,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    description: "The premier technology conference in Sri Lanka, bringing together innovators, developers, and entrepreneurs. Featuring keynote talks on AI, blockchain, cloud computing, and startup ecosystems. Network with industry leaders and attend hands-on workshops to level up your skills.",
    seats: 300,
  },
  {
    title: "Canvas & Craft Art Exhibition",
    date: "2026-04-28",
    location: "Galle, Sri Lanka",
    category: "Art",
    price: 800,
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80",
    description: "A stunning exhibition showcasing the works of over 50 local and international artists. From oil paintings and watercolours to digital art and sculptures, Canvas & Craft celebrates the full spectrum of human creativity. Held in the historic Galle Fort, this is an experience for all art lovers.",
    seats: 200,
  },
  {
    title: "Future Minds Education Summit",
    date: "2026-06-02",
    location: "Negombo, Sri Lanka",
    category: "Education",
    price: 1500,
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80",
    description: "Join educators, students, and policymakers at the Future Minds Education Summit. Covering topics such as ed-tech innovation, curriculum reform, inclusive learning, and student mental health. This one-day summit features panel discussions, workshops, and a startup pitch competition focused on education.",
    seats: 400,
  },
  {
    title: "Hands-On Web Dev Workshop",
    date: "2026-04-20",
    location: "Colombo, Sri Lanka",
    category: "Workshop",
    price: 1200,
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=800&q=80",
    description: "A full-day intensive workshop covering modern web development from scratch. Topics include HTML, CSS, JavaScript, React, and deployment with Vercel. Suitable for beginners and intermediate developers alike. Bring your laptop and leave with a fully deployed web project!",
    seats: 60,
  },
  {
    title: "Sunset Jazz Evening",
    date: "2026-05-25",
    location: "Mirissa, Sri Lanka",
    category: "Music",
    price: 3000,
    image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800&q=80",
    description: "Unwind with an intimate evening of live jazz music on the beautiful Mirissa beach. Featuring seasoned jazz musicians, craft cocktails, and a spectacular ocean sunset. Limited seating ensures an exclusive and memorable experience for every guest.",
    seats: 80,
  },
  {
    title: "Startup Pitch Night",
    date: "2026-06-15",
    location: "Colombo, Sri Lanka",
    category: "Tech",
    price: 500,
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80",
    description: "Watch the next generation of Sri Lankan entrepreneurs pitch their startup ideas to a panel of top investors and venture capitalists. Exciting presentations, expert feedback, and incredible networking opportunities make this a must-attend for anyone in the startup ecosystem.",
    seats: 250,
  },
  {
    title: "Photography Masterclass",
    date: "2026-05-05",
    location: "Ella, Sri Lanka",
    category: "Workshop",
    price: 2200,
    image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&q=80",
    description: "A two-day photography masterclass set amidst the breathtaking landscapes of Ella. Led by award-winning photographer Dinesh Perera, participants will learn composition, lighting, portrait and landscape photography, and post-production editing. All skill levels welcome.",
    seats: 30,
  },
];

const seedDB = async () => {
  for (const event of dummyEvents) {
    const payload = {
      title: event.title,
      description: event.description,
      date: new Date(`${event.date}T10:00:00Z`).toISOString(),
      location: event.location,
      category: event.category,
      ticket_price: event.price,
      available_tickets: event.seats,
      image: event.image
    };

    try {
      const res = await fetch('http://localhost:5000/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        console.log(`Successfully added: ${event.title}`);
      } else {
        console.error(`Failed to add ${event.title}:`, await res.text());
      }
    } catch (err) {
      console.error(`Error adding ${event.title}:`, err.message);
    }
  }
  console.log('Seeding complete!');
};

seedDB();
