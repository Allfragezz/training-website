import { Schema, model } from 'mongoose';

// Інтерфейс для об'єкта "Бобер"
interface ICastor {
    name: string; // Ім'я боброви
    age: number; // Вік бобріви у роках
    height: number; // Висота бобріви в сантиметрах
    weight: number; // Вага бобріви в кілограмах
    gender: 'male' | 'female'; // Стать бобріви: 'male' - самець, 'female' - самка
    description?: string; // Опис бобріви (необов'язкове поле)
    waterDepth: string; // Глибина водойми, метри
    dateAdded: Date; // Дата додавання запису до бази даних
}

// Схема MongoDB для моделі "Бобер"
const castorSchema = new Schema<ICastor>({
    name: {
        type: String,
        required: true, // Поле є обов'язковим
    },
    age: {
        type: Number,
        required: true, // Поле є обов'язковим
    },
    height: {
        type: Number,
        required: true, // Поле є обов'язковим
    },
    weight: {
        type: Number,
        required: true, // Поле є обов'язковим
    },
    gender: {
        type: String,
        required: true, // Поле є обов'язковим
        enum: ['male', 'female'], // Допустимі значення: 'male' або 'female'
    },
    description: String, // Необов'язкове текстове поле
    dateAdded: {
        type: Date,
        default: Date.now, // Значення за замовчуванням - поточна дата і час
    },
    waterDepth: {
        type: String,
        required: true, // Поле є обов'язковим
    },
});

// Створення моделі Mongoose на основі схеми
export const Castor = model<ICastor>('Castor', castorSchema);
export type { ICastor }; // Експортуємо інтерфейс для використання в інших файлах
