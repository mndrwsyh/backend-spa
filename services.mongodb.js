use("spa");

db.createCollection("services");

db.services.insertMany([
  {
    name: "Nail Clipping",
    price: 20,
    duration: 0.5,
    description: " Nail clipping and paw moisturizing to keep paws healthy.",
  },
  {
    name: "Bath & Blow Dry",
    price: 99.99,
    duration: 2,
    description:
      "Refreshing baths using gentle, skin-friendly products to ensure your pets comfort.",
  },
  {
    name: "Coat Care",
    price: 150,
    duration: 3,
    description:
      "Brushing to remove tangles and loose hair, deshedding treatments, and coat conditioning.",
  },
  {
    name: "Ear Cleaning",
    price: 120,
    duration: 1,
    description: "Gentlest cleaning to remove debris and prevent buildup.",
  },
]);
