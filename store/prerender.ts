// prerender.ts
import { writeFileSync } from 'fs';

// Simulate fetching product IDs from a database or API
const productIds = ['1', '2', '3', '4']; // Replace with real fetch logic if needed

const routes = productIds.map(id => `/product/${id}`);

writeFileSync('static.routes.txt', routes.join('\n'));

console.log('Generated routes for prerendering:', routes);
