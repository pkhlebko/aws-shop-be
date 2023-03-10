const products = [
  {
    count: 10,
    description: 'Forklift with Pallet',
    id: 1,
    price: 4,
    title: 'Lego Technic 30655',
    image: 'https://images.brickset.com/sets/images/30655-1.jpg'
  },
  {
    count: 10,
    description: 'Dump Truck',
    id: 2,
    price: 9.99,
    title: 'Lego Technic 42147',
    image: 'https://images.brickset.com/sets/images/42147-1.jpg'
  },
  {
    count: 10,
    description: 'Snow Groomer',
    id: 3,
    price: 9.99,
    title: 'Lego Technic 42148',
    image: 'hhttps://images.brickset.com/sets/large/42148-1.jpg'
  },
  {
    count: 10,
    description: 'Monster Jam Dragon',
    id: 4,
    price: 19.99,
    title: 'Lego Technic 42149',
    image: 'https://images.brickset.com/sets/images/42149-1.jpg'
  },
  {
    count: 10,
    description: 'Monster Jam Monster Mutt Dalmatian',
    id: 5,
    price: 19.99,
    title: 'Lego Technic 42150',
    image: 'https://images.brickset.com/sets/images/42150-1.jpg'
  },
];

const createEndpoint = 'https://v26apwuidf.execute-api.us-east-1.amazonaws.com/dev/products';
const method = 'post';
const headers = {'Content-Type': 'application/json'};
const createPromises = products.map((product) => sendJsonPost(createEndpoint, product));

Promise.allSettled(createPromises).then(console.info)


async function sendJsonPost(url, data) {
  const response = await fetch(url, { method, headers, body: JSON.stringify(data) })
    .then(handleFetchErrors)
    .catch((error) => console.error(error));

  return response.json();
}

function handleFetchErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}