import { db } from '../db/client';
import { fruits } from '../db/schema';
import { AppError } from '../utils/AppError';

// Sample fruits data
const sampleFruits = [
  { name: 'Apple', color: 'Red', price: '1.50' },
  { name: 'Banana', color: 'Yellow', price: '0.80' },
  { name: 'Orange', color: 'Orange', price: '1.20' },
  { name: 'Grape', color: 'Purple', price: '2.00' },
  { name: 'Strawberry', color: 'Red', price: '3.50' },
  { name: 'Kiwi', color: 'Green', price: '2.80' },
];

export async function getAllFruits() {
  try {
    // First, check if we have fruits in the database
    const existingFruits = await db
      .select({
        id: fruits.id,
        name: fruits.name,
        color: fruits.color,
        price: fruits.price,
        createdAt: fruits.createdAt,
      })
      .from(fruits);

    // If no fruits exist, seed the database with sample data
    if (existingFruits.length === 0) {
      console.log('No fruits found, seeding database with sample data...');
      
      const insertedFruits = await db
        .insert(fruits)
        .values(sampleFruits)
        .returning({
          id: fruits.id,
          name: fruits.name,
          color: fruits.color,
          price: fruits.price,
          createdAt: fruits.createdAt,
        });

      return insertedFruits;
    }

    return existingFruits;
  } catch (error: any) {
    console.error('Error fetching fruits:', error);
    throw new AppError('Failed to fetch fruits', 500);
  }
}