import { injectable } from 'inversify';
import { Castor, ICastor } from '../models/castor';

// Клас-репозиторій для роботи з бобрами
// Анотація injectable дозволяє впровадити цей репозиторій через IoC контейнер
@injectable()
export class CastorRepository {
    // Метод для отримання всіх бобрів з бази даних
    public async findAll(): Promise<ICastor[]> {
        return Castor.find();
    }

    // Метод для пошуку бобріви за унікальним ідентифікатором
    public async findById(id: string): Promise<ICastor | null> {
        return Castor.findById(id);
    }

    // Метод для створення нової бобріви в базі даних
    public async create(castorData: ICastor): Promise<ICastor> {
        const castor = new Castor(castorData);
        return castor.save();
    }

    // Метод для видалення бобрів за ідентифікатором
    public async delete(id: string): Promise<boolean> {
        const result = await Castor.findByIdAndDelete(id);
        return result !== null;
    }

    // Метод для повного оновлення даних про бобра (заміна всіх полів)
    public async update(id: string, castorData: ICastor): Promise<ICastor | null> {
        return Castor.findByIdAndUpdate(id, castorData, { new: true });
    }

    // Метод для часткового оновлення даних про бобра (оновлення лише вказаних полів)
    public async patch(id: string, castorData: Partial<ICastor>): Promise<ICastor | null> {
        return Castor.findByIdAndUpdate(id, { $set: castorData }, { new: true });
    }
}
