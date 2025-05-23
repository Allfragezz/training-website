import 'reflect-metadata';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/server';
import { Castor } from '../src/models/castor';
import { container } from '../src/config/container';
import { TYPES } from '../src/types/types';
import { IDatabase } from '../src/interfaces/IDatabase';
import { MONGODB_URI } from '../src/config/env';
import mongoose from 'mongoose';

const { expect } = chai;
chai.use(chaiHttp);

// Тести API вебдодатку сайту про бобрів
describe('API вебдодатку сайту про бобрів', () => {
    // Отримуємо екземпляр бази даних з контейнера
    const database = container.get<IDatabase>(TYPES.IDatabase);
    // Створюємо спеціальний URI для тестової бази даних
    const testMongoURI = MONGODB_URI.replace(/\/[^/]*$/, '/castors-test');

    // Перед запуском тестів підключаємось до тестової бази даних
    before(async () => {
        await database.connect(testMongoURI);
        console.log('Підключено до тестової бази даних:', testMongoURI);
    });

    // Після всіх тестів очищуємо базу даних і відключаємося
    after(async () => {
        try {
            // Видаляємо тестову базу даних
            await mongoose.connection.db.dropDatabase();
            console.log('Тестову базу даних "castors-test" успішно видалено');
        } catch (error) {
            // Обробляємо можливі помилки
            console.log(
                'Помилка видалення тестової бази даних:',
                error instanceof Error ? error.message : 'Невідома помилка',
            );
        } finally {
            // В будь-якому разі відключаємося від бази даних
            await database.disconnect();
            console.log('Відключено від тестової бази даних');
        }
    });

    // Тести для перевірки підключення до бази даних
    describe('Підключення до бази даних', () => {
        it('має перевірити підключення до тестової бази даних', () => {
            expect(database.isConnected()).to.be.true;
            expect(database.getConnectionUri()).to.equal(testMongoURI);
            console.log('Підключення до бази даних успішно перевірено');
        });
    });

    // Перед кожним тестом очищуємо колекцію бобрів
    beforeEach(async () => {
        await Castor.deleteMany({});
    });

    // Тести для створення запису про нового бобра (POST-запит)
    describe('POST /api/castors', () => {
        it('має створити запис про нового бобра', done => {
            // Тестові дані бобра
            const castor = {
                name: 'Вухань',
                age: 2,
                height: 30,
                weight: 2.5,
                gender: 'male' as const,
                description: 'Сірий бобер',
                waterDepth: '2 метра',
            };

            // Виконуємо POST-запит для створення запису про бобра
            chai.request(app)
                .post('/api/castors')
                .send(castor)
                .end((err, res) => {
                    if (err !== null && err !== undefined) {
                        return done(err);
                    }
                    // Перевіряємо відповідь
                    expect(res).to.have.status(201);
                    expect(res.body).to.have.property('name', castor.name);
                    expect(res.body).to.have.property('age', castor.age);
                    expect(res.body).to.have.property('height', castor.height);
                    expect(res.body).to.have.property('weight', castor.weight);
                    expect(res.body).to.have.property('gender', castor.gender);
                    expect(res.body).to.have.property('description', castor.description);
                    expect(res.body).to.have.property('dateAdded');
                    expect(res.body).to.have.property('waterDepth', '2 метра');
                    expect(new Date(res.body.dateAdded)).to.be.instanceOf(Date);
                    done();
                });
        });
    });

    // Тести для отримання всіх записів бобрів (GET-запит)
    describe('GET /api/castors', () => {
        it('має отримати всіх бобрів', async () => {
            // Створюємо тестовий запис бобра
            const testCastor = new Castor({
                name: 'Білан',
                age: 3,
                height: 35,
                weight: 3.2,
                gender: 'male',
                description: 'Білий бобер',
                waterDepth: '2 метра',
            });
            await testCastor.save();

            // Виконуємо GET-запит для отримання всіх записів бобрів
            const res = await chai.request(app).get('/api/castors');
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.equal(1);
            expect(res.body[0]).to.have.property('name', 'Білан');
            expect(res.body[0]).to.have.property('gender', 'male');
            expect(res.body[0]).to.have.property('description', 'Білий бобер');
            expect(res.body[0]).to.have.property('dateAdded');
            expect(res.body[0]).to.have.property('waterDepth', '2 метра');
            expect(new Date(res.body[0].dateAdded)).to.be.instanceOf(Date);
        });
    });

    // Тести для отримання запису конкретного бобра за ID (GET-запит)
    describe('GET /api/castors/:id', () => {
        it('має отримати конкретного бобра за id', async () => {
            // Створюємо запис тестового бобра
            const testCastor = new Castor({
                name: 'Косий',
                age: 1,
                height: 25,
                weight: 1.8,
                gender: 'male',
                description: 'Коричневий бобер',
                waterDepth: '2 метра',
            });
            const savedCastor = await testCastor.save();

            // Виконуємо GET-запит для отримання запису бобра за ID
            const res = await chai.request(app).get(`/api/castors/${String(savedCastor._id)}`);
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('name', 'Косий');
            expect(res.body).to.have.property('age', 1);
            expect(res.body).to.have.property('height', 25);
            expect(res.body).to.have.property('weight', 1.8);
            expect(res.body).to.have.property('gender', 'male');
            expect(res.body).to.have.property('description', 'Коричневий бобер');
            expect(res.body).to.have.property('waterDepth', '2 метра');
        });

        it('має повернути 404 для неіснуючого бобра', async () => {
            // Виконуємо GET-запит для неіснуючого ID бобра
            const res = await chai.request(app).get('/api/castors/654321654321654321654321');
            expect(res).to.have.status(404);
        });
    });

    // Тести для повного оновлення запису про бобра (PUT-запит)
    describe('PUT /api/castors/:id', () => {
        it('має повністю оновити запис про бобра', async () => {
            // Створюємо тестового бобра
            const testCastor = new Castor({
                name: 'Оригінальний',
                age: 1,
                height: 25,
                weight: 1.8,
                gender: 'male',
                description: 'Початковий опис',
                waterDepth: '2 метра',
            });
            const savedCastor = await testCastor.save();

            // Дані для оновлення бобра
            const updatedData = {
                name: 'Оновлений',
                age: 2,
                height: 30,
                weight: 2.5,
                gender: 'female',
                description: 'Оновлений опис',
                waterDepth: '3 метра',
            };

            // Виконуємо PUT-запит для повного оновлення запису про бобра
            const res = await chai
                .request(app)
                .put(`/api/castors/${String(savedCastor._id)}`)
                .send(updatedData);

            // Перевіряємо результат
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('name', 'Оновлений');
            expect(res.body).to.have.property('age', 2);
            expect(res.body).to.have.property('height', 30);
            expect(res.body).to.have.property('weight', 2.5);
            expect(res.body).to.have.property('gender', 'female');
            expect(res.body).to.have.property('description', 'Оновлений опис');
            expect(res.body).to.have.property('dateAdded');
            expect(res.body).to.have.property('waterDepth', '3 метра');
            expect(new Date(res.body.dateAdded)).to.be.instanceOf(Date);
        });

        it("має завершитися невдачею при відсутності обов'язкових полів", async () => {
            // Створюємо тестового бобра
            const testCastor = new Castor({
                name: 'Оригінальний',
                age: 1,
                height: 25,
                weight: 1.8,
                gender: 'male',
                description: 'Початковий опис',
                waterDepth: '2 метра',
            });
            const savedCastor = await testCastor.save();

            // Неповні дані для оновлення (відсутні обов'язкові поля)
            const incompleteData = {
                name: 'Оновлений',
                age: 2,
                // height і weight відсутні
                gender: 'female',
                description: 'Оновлений опис',
                waterDepth: '2 метра',
            };

            // Виконуємо PUT-запит з неповними даними
            const res = await chai
                .request(app)
                .put(`/api/castors/${String(savedCastor._id)}`)
                .send(incompleteData);

            // Перевіряємо, що запит завершився з помилкою
            expect(res).to.have.status(400);

            // Перевіряємо, що бобер не змінився
            const unchangedCastor = await Castor.findById(savedCastor._id);
            expect(unchangedCastor).to.have.property('name', 'Оригінальний');
            expect(unchangedCastor).to.have.property('height', 25);
            expect(unchangedCastor).to.have.property('weight', 1.8);
            expect(unchangedCastor).to.have.property('waterDepth', '2 метра');
        });
    });

    // Тести для часткового оновлення запису про бобра (PATCH-запит)
    describe('PATCH /api/castors/:id', () => {
        it('має частково оновити запис про бобра', async () => {
            // Створюємо тестового бобра
            const testCastor = new Castor({
                name: 'Оригінальний',
                age: 1,
                height: 25,
                weight: 1.8,
                gender: 'male',
                description: 'Початковий опис',
                waterDepth: '2 метра',
            });
            const savedCastor = await testCastor.save();

            // Дані для часткового оновлення
            const patchData = {
                name: 'Частково оновлений',
                age: 3,
                description: 'Оновлений опис',
                waterDepth: '3 метра',
            };

            // Виконуємо PATCH-запит
            const res = await chai
                .request(app)
                .patch(`/api/castors/${String(savedCastor._id)}`)
                .send(patchData);

            // Перевіряємо результат
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('name', 'Частково оновлений');
            expect(res.body).to.have.property('age', 3);
            expect(res.body).to.have.property('height', 25);
            expect(res.body).to.have.property('weight', 1.8);
            expect(res.body).to.have.property('gender', 'male');
            expect(res.body).to.have.property('description', 'Оновлений опис');
            expect(res.body).to.have.property('dateAdded');
            expect(res.body).to.have.property('waterDepth', '3 метра');
            expect(new Date(res.body.dateAdded)).to.be.instanceOf(Date);
        });

        it('демонструє різницю між PATCH і PUT з частковими оновленнями', async () => {
            // Створюємо тестового бобра
            const testCastor = new Castor({
                name: 'Оригінальний',
                age: 1,
                height: 25,
                weight: 1.8,
                gender: 'male',
                description: 'Початковий опис',
                waterDepth: '2 метра',
            });
            const savedCastor = await testCastor.save();

            // Ті самі неповні дані, що не спрацювали з PUT, мають працювати з PATCH
            const partialData = {
                name: 'Оновлений',
                age: 2,
                // height і weight навмисно відсутні
                gender: 'female',
                description: 'Оновлений опис',
                waterDepth: '3 метра',
            };

            // Виконуємо PATCH-запит
            const res = await chai
                .request(app)
                .patch(`/api/castors/${String(savedCastor._id)}`)
                .send(partialData);

            // Перевіряємо результат
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('name', 'Оновлений');
            expect(res.body).to.have.property('age', 2);
            expect(res.body).to.have.property('waterDepth', '3 метра');
            // Ці поля мають зберегти свої початкові значення
            expect(res.body).to.have.property('height', 25);
            expect(res.body).to.have.property('weight', 1.8);
            expect(res.body).to.have.property('gender', 'female');
            expect(res.body).to.have.property('description', 'Оновлений опис');
        });
    });

    // Тести для отримання метаданих (HEAD-запит)
    describe('HEAD /api/castors', () => {
        it('має повернути заголовки метаданих', async () => {
            // Виконуємо HEAD-запит
            const res = await chai
                .request(app)
                .head('/api/castors')
                .set('Accept', 'application/json');

            // Перевіряємо статус відповіді
            expect(res).to.have.status(200);

            // Виводимо отримані заголовки
            console.log('Заголовки:');
            console.log('-----------------');
            Object.entries(res.headers).forEach(([key, value]) => {
                console.log(`${key}: ${String(value)}`);
            });

            // Перевіряємо наявність необхідних заголовків
            expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
            expect(res.headers['x-powered-by']).to.equal('Express');
            expect(res.headers['content-length']).to.equal('2');
        });
    });

    // Тести для видалення запису бобра (DELETE-запит)
    describe('DELETE /api/castors/:id', () => {
        it('має видалити запис про бобра', async () => {
            // Створюємо тестового бобра
            const testCastor = new Castor({
                name: 'Стрибунець',
                age: 2,
                height: 28,
                weight: 2.1,
                gender: 'female',
                description: 'Чорний бобер',
                waterDepth: '2 метра',
            });
            const savedCastor = await testCastor.save();

            // Виконуємо DELETE-запит
            const res = await chai.request(app).delete(`/api/castors/${String(savedCastor._id)}`);
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message', 'Запис про бобра видалено');

            // Перевіряємо, що запис про бобра дійсно видалено з бази
            const findCastor = await Castor.findById(savedCastor._id);
            expect(findCastor).to.be.null;
        });
    });
});
