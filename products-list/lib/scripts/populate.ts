import fetch from 'node-fetch';
import { products } from '../../data/products';
//import { headers } from '../constants';

const createEndpoint = 'https://v26apwuidf.execute-api.us-east-1.amazonaws.com/dev/products';
const method = 'post';
const headers = {'Content-Type': 'application/json'};
//const createPromises = products.map();

sendJsonPost(createEndpoint, products[1]).then(console.info);


export async function sendJsonPost(url: string, data: object ): Promise<object> {
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