const MARKET_CATEGORIES = {
  BUSINESS_AND_INDUSTRIAL: { name: "Business & Industrial", sub: [ "Other Business & Industrial", "Industrial Kitchen Supplies", "Storage Containers", "Industrial Shelving & Racking" ] },
  VEHICLES: { name: "Vehicles", sub: [ "Vehicle Parts, Tires, & Accessories", "Cars & Trucks", "RVS, Campers & Trailers", "Motorcycles", "Boats & Watercraft", "ATVs & Snowmobiles", "Heavy Equipment", "Other", "Classic Cars", "Automotive Services" ] },
  HOME_APPLIANCES: { name: "Home Appliances", sub: [ "Refrigerators", "Appliances Miscellaneous", "Stoves, Ovens & Ranges", "Coffee Makers", "Microwaves & Cookers", "Vacuums", "Washers & Dryers", "Heaters, Humidifiers & Dehumidifiers", "Processors, Blenders & Juicers", "Dishwashers", "Toasters & Toaster Ovens", "Freezers", "Irons & Garment Steamers" ] },
  HOME_INDOOR: { name: "Home Indoor", sub: [ "Indoor Miscellaneous", "Sales", "Decoration, Arts & Collectibles", "Bedding", "Indoor Lighting & Fans", "Kitchen & Dining Wares", "Rugs, Carpets & Runners", "Window Treatments", "Storage & Organization", "Bathwares", "Holiday, Event & Seasonal", "Fireplace & Firewood" ] },
  RENOVATION_IMPROVEMENT_MATERIALS_SUPPLIES: { name: "Renovation, Improvement Materials & Supplies", sub: [ "Hardware, Nails & Screws", "Plumbing, Sinks, Toilets & Showers", "Painting & Paint Supplies", "Heating, Cooling & Air", "Floors & Walls", "Renovation, Improvement Materials & Supplies Miscellaneous", "Windows, Doors & Trim", "Cabinets & Countertops", "Electrical", "Roofing" ] },
  OUTDOOR_AND_GARDEN: { name: "Outdoor & Garden", sub: [ "Patio & Garden Furniture", "Plants, Fertilizer & Soil", "BBQs & Outdoor Cooking", "Hot Tubs & Pools", "Outdoor Décor", "Outdoor Miscellaneous", "Outdoor Tools & Storage", "Lawnmowers & Leaf Blowers", "Outdoor Lighting", "Decks & Fences", "Snowblowers", "Garage Doors & Openers" ] },
  FURNITURE: { name: "Furniture", sub: [ "Couches & Futons", "Desks", "Chairs & Recliners", "Beds & Mattresses", "Dressers & Wardrobes", "Dining Tables & Sets", "Furniture Miscellaneous", "Other Tables", "Coffee Tables", "TV Tables & Entertainment Units", "Bookcases & Shelving Units", "Hutches & Display Cabinets", "Multi-item" ] },
  CLOTHING_AND_APPAREL: { name: "Clothing & Apparel", sub: [ "Women's - Tops & Outerwear", "Kids & Youth", "Men's", "Women's - Shoes", "Men's Shoes", "Women's - Dresses & Skirts", "Women's - Bags & Wallets", "Clothing & Apparel Miscellaneous", "Women's - Bottoms", "Women's - Other", "Multi-item", "Costumes", "Wedding", "Women's - Maternity" ] },
  SPORTING_GOODS_EXERCISE: { name: "Sporting Goods & Exercise", sub: [ "Exercise Equipment", "Fishing, Camping & Outdoors", "Sporting Goods, Exercise & Apparel Miscellaneous", "Tennis & Racquet", "Golf", "Water Sports", "Hockey", "Skates & Blades", "Skateboard", "Ski", "Paintball", "Snowboard", "Soccer", "Baseball & Softball", "Basketball", "Football", "Lacrosse", "Curling" ] },
  COMPUTERS: { name: "Computers", sub: [ "Printers, Scanners & Fax", "Computers Miscellaneous", "Laptop Accessories", "Cables & Connectors", "Networking", "System Components", "Mice, Keyboards & Webcams", "Monitors", "iPad & Tablet Accessories", "Services (Training & Repair)", "Speakers, Headsets & Mics", "Flash Memory & USB Sticks", "Software", "Servers", "Laptops", "Desktop Computers", "iPads & Tablets" ] },
  PHONES: { name: "Phones", sub: [ "Cell Phones", "Cell Phone Accessories", "Cell Phone Services", "Home Phones & Answering Machines", "Phones Miscellaneous" ] },
  ELECTRONICS: { name: "Electronics", sub: [ "Cameras & Camcorders", "CDs, DVDs & Blu-ray", "TVs & Video", "Audios" ] },
  TOOLS: { name: "Tools", sub: ["Power Tools", "Tools Miscellaneous", "Hand Tools", "Ladders & Scaffolding", "Tool Storage & Benches", "Hardware Tools"] },
  BABY_ITEMS: { name: "Baby Items", sub: ["Strollers, Carriers & Car Seats", "Other", "Feeding & High Chairs", "Toys", "Cribs", "Clothing - 12-18 Months", "Playpens, Swings & Saucers", "Clothing - 6-9 Months", "Clothing-0-3 Months", "Clothing-3-6 Months", "Multi-item", "Bathing & Changing", "Clothing-18-24 Months", "Clothing - 9-12 Months", "Clothing - 4T", "Gates, Monitors & Safety", "Clothing - 3T", "Clothing - 2T", "Clothing - 5T", "Clothing - Preemie"] },
  BIKES: { name: "Bikes", sub: ["Road", "Mountain", "eBike", "Kids", "Clothing, Shoes & Accessories", "Bikes Miscellaneous", "Cruiser, Commuter & Hybrid", "Frames & Parts", "BMX", "Fixie (Single Speed)"] },
  MUSICAL_INSTRUMENTS: { name: "Musical Instruments", sub: ["Guitars", "Amps & Pedals", "Drums & Percussion", "Pianos & Keyboards", "Pro Audio & Recording Equipment", "String", "Musical Instruments Miscellaneous", "Performance & DJ Equipment", "Woodwind", "Brass"] },
  VIDEO_GAMES_CONSOLES: { name: "Video Games & Consoles", sub: ["Older Generation", "Sony Playstation 4", "Nintendo Wii", "XBOX One", "PC Games", "Sony Playstation 3", "XBOX 360", "Nintendo DS", "Nintendo Switch", "Video Games & Consoles Miscellaneous", "Sony Playstation 5", "Xbox Series X & S", "Nintendo Wii U", "Sony PSP & Vita"] },
  PETS: { name: "Pets", sub: ["Supplies", "Accessories", "Cats & Kittens for Rehoming", "Dogs & Puppies for Rehoming", "Livestock", "Fish for Rehoming", "Birds for Rehoming", "Animal & Pet Services", "Small Animals for Rehoming", "Equestrian & Livestock Accessories", "Reptiles & Amphibians for Rehoming", "Horses & Ponies for Rehoming", "Lost & Found", "Pets Miscellaneous", "Other Pets for Rehoming", "Registered Shelter / Rescue"] },
  REAL_ESTATE: { name: "Real Estate", sub: ["For Sale", "For Rent", "Real Estate Services"] },
  SERVICES: { name: "Services", sub: ["Skilled Trades", "Other", "Cleaners & Cleaning", "Health & Beauty", "Tutors & Languages", "Childcare & Nanny", "Entertainment", "Wedding", "Music Lessons", "Photography & Video", "Travel & Vacations", "Fitness & Personal Trainer", "Moving & Storage", "Food & Catering", "Financial & Legal", "Digital Marketing and Digital Ads", "Web Development", "SEO", "Video Editing", "AI", "Web Design", "Automation"] },

  EMPLOYMENT: { name: "Employment", sub: ["Skilled Trades", "Other", "Cleaners & Cleaning", "Health & Beauty", "Tutors & Languages", "Childcare & Nanny", "Entertainment", "Wedding", "Music Lessons", "Photography & Video", "Travel & Vacations", "Fitness & Personal Trainer", "Moving & Storage", "Food & Catering", "Financial & Legal", "IT", "Developer", "Digital Marketing", "Marketing"] },
  COMMUNITY: { name: "Community", sub: ["Other", "Rideshare", "Classes & Lessons", "Activities & Groups", "Artists & Musicians", "Events", "Lost & Found", "Friendship & Networking", "Sports Teams", "Long Lost Relationships Missed Connections Volunteers"] },
  PROPERTY_RENTALS: { name: "Property Rentals", sub: ["Canada", "USA", "Mexico", "Other Countries", "Caribbean"] },
  JEWELLERY_WATCHES: { name: "Jewellery & Watches", sub: [] },
  FAMILY_ITEMS: { name: "Family Items", sub: [] },
  OFFICE_SUPPLIES: { name: "Office Supplies", sub: [] },
  HEALTH_SPECIAL_NEEDS: { name: "Health & Special Needs", sub: [] },
  TICKETS: { name: "Tickets", sub: [] },
  CRAFTS: { name: "Crafts", sub: [] },
  OTHER: { name: "Other", sub: [] },
  FREE: { name: "Free", sub: [] },
  BOOKS: { name: "Books", sub: [] },
  TOYS_TANGIBLE_GAMES: { name: "Toys & Tangible Games", sub: [] }
}

module.exports = MARKET_CATEGORIES