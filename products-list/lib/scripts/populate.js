const products = [
  {
    count: 10,
    description: 'Forklift with Pallet',
    price: 4,
    title: 'Lego Technic 30655',
  },
  {
    count: 10,
    description: 'Dump Truck',
    price: 9.99,
    title: 'Lego Technic 42147',
  },
  {
    count: 10,
    description: 'Snow Groomer',
    price: 9.99,
    title: 'Lego Technic 42148',
  },
  {
    count: 10,
    description: 'Monster Jam Dragon',
    price: 19.99,
    title: 'Lego Technic 42149',
  },
  {
    count: 10,
    description: 'Monster Jam Monster Mutt Dalmatian',
    price: 19.99,
    title: 'Lego Technic 42150',
  },
];

const createEndpoint = 'https://j9qub2jznd.execute-api.us-east-1.amazonaws.com/dev/products';
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