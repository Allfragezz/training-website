import { Router, Request, Response } from 'express';
import { container } from '../config/container';
import { CastorRepository } from '../repositories/CastorRepository';

// Створюємо новий роутер Express
const router = Router();
// Отримуємо екземпляр репозиторію бобрів з контейнера інверсії залежностей
const castorRepository = container.get(CastorRepository);

// Роутер для HTTP метода GET / - отримання всіх записів бобрів
router.get('/', (async (_req: Request, res: Response) => {
    try {
        // Отримуємо всі записи бобрів з бази даних через репозиторій
        const castors = await castorRepository.findAll();
        res.json(castors);
    } catch (error) {
        // Обробка помилки
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        res.status(500).json({ message: errorMessage });
    }
}) as unknown as (req: Request, res: Response) => void);

// Роутер для HTTP метода GET /:id - отримання запису одного бобра за ідентифікатором
router.get('/:id', (async (req: Request, res: Response) => {
    try {
        // Пошук бобра за ідентифікатором
        const castor = await castorRepository.findById(req.params.id);
        if (castor) {
            res.json(castor);
        } else {
            // Якщо бобер не знайдений, повертаємо 404 помилку
            res.status(404).json({ message: 'Запис бобра не знайдено' });
        }
    } catch (error) {
        // Обробка помилки
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        res.status(500).json({ message: errorMessage });
    }
}) as unknown as (req: Request, res: Response) => void);

// Роутер для HTTP метода POST / - створення нового запису бобра
router.post('/', (async (req: Request, res: Response) => {
    try {
        // Створюємо новий запис бобріви з даних запиту
        const newCastor = await castorRepository.create(req.body);
        // Повертаємо статус 201 (Created) і дані створеного бобра
        res.status(201).json(newCastor);
    } catch (error) {
        // Обробка помилки
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        res.status(400).json({ message: errorMessage });
    }
}) as unknown as (req: Request, res: Response) => void);

// Роутер для HTTP метода PUT /:id - повне оновлення запису бобра
router.put('/:id', (async (req: Request, res: Response) => {
    try {
        // Перевірка наявності всіх обов'язкових полів для PUT запиту
        const requiredFields = ['name', 'age', 'height', 'weight', 'gender'];
        const missingFields = requiredFields.filter(field => !(field in req.body));

        // Якщо є відсутні поля, повертаємо помилку 400 Bad Request
        if (missingFields.length > 0) {
            return res.status(400).json({
                message: `Відсутні обов'язкові поля: ${missingFields.join(', ')}`,
            });
        }

        // Оновлюємо бобрів з вказаним ID
        const castor = await castorRepository.update(req.params.id, req.body);
        if (castor) {
            return res.json(castor);
        } else {
            // Якщо бобер не знайдений, повертаємо 404 помилку
            return res.status(404).json({ message: 'Запис бобра не знайдено' });
        }
    } catch (error) {
        // Обробка помилки
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        return res.status(400).json({ message: errorMessage });
    }
}) as unknown as (req: Request, res: Response) => void);

// Роутер для HTTP метода PATCH /:id - часткове оновлення запису бобра
router.patch('/:id', (async (req: Request, res: Response) => {
    try {
        // Часткове оновлення запису бобрів - передаються лише ті поля, які потрібно змінити
        const castor = await castorRepository.patch(req.params.id, req.body);
        if (castor) {
            res.json(castor);
        } else {
            // Якщо бобер не знайдений, повертаємо 404 помилку
            res.status(404).json({ message: 'Запис бобра не знайдено' });
        }
    } catch (error) {
        // Обробка помилки
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        res.status(400).json({ message: errorMessage });
    }
}) as unknown as (req: Request, res: Response) => void);

// Роутер для HTTP метода DELETE /:id - видалення запису бобра
router.delete('/:id', (async (req: Request, res: Response) => {
    try {
        // Видаляємо дані про бобра за ID
        const castor = await castorRepository.delete(req.params.id);
        if (castor) {
            // У разі успіху повертаємо повідомлення про видалення
            res.json({ message: 'Запис про бобра видалено' });
        } else {
            // Якщо бобер не знайдена, повертаємо 404 помилку
            res.status(404).json({ message: 'Запис про бобра не знайдено' });
        }
    } catch (error) {
        // Обробка помилки
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        res.status(500).json({ message: errorMessage });
    }
}) as unknown as (req: Request, res: Response) => void);

export default router;
