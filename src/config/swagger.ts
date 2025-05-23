// Експорт специфікації Swagger/OpenAPI для документації про API
export const swaggerSpec = {
    // Версія специфікації OpenAPI
    openapi: '3.0.0',
    // Загальна інформація про API
    info: {
        title: 'API Сайту про Бобрів',
        version: '1.0.0',
        description: 'Документація API для Сайту про Бобрів',
    },
    // Налаштування серверів для тестування API
    servers: [
        {
            url:
                process.env.CODESPACE_NAME !== undefined
                    ? `https://${process.env.CODESPACE_NAME}-5000.app.github.dev`
                    : 'http://localhost:5000',
            description: 'Development server',
        },
    ],
    // Визначення роутерів API та операцій з ними
    paths: {
        '/api/castors': {
            // GET запит для отримання всіх бобрів
            get: {
                summary: 'Отримати всіх бобрів',
                responses: {
                    '200': {
                        description: 'Список всіх бобрів',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: { $ref: '#/components/schemas/Castor' },
                                },
                            },
                        },
                    },
                },
            },

            // POST запит для створення нового бобра
            post: {
                summary: 'Створити нового бобра',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/Castor' },
                        },
                    },
                },
                responses: {
                    '201': {
                        description: "Створений об'єкт бобра",
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Castor' },
                            },
                        },
                    },
                },
            },
        },

        // Операції для конкретного бобра за ID
        '/api/castors/{id}': {
            // GET запит для отримання бобра за ID
            get: {
                summary: 'Отримати бобра за ID',
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: { type: 'string' },
                        description: 'ID бобра',
                        waterDepth: '',
                    },
                ],
                responses: {
                    '200': {
                        description: "Об'єкт бобра",
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Castor' },
                            },
                        },
                    },
                    '404': { description: 'Бобра не знайдено' },
                },
            },

            // PUT запит для повного оновлення бобра за ID
            put: {
                summary: 'Повністю оновити бобра',
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: { type: 'string' },
                        description: 'ID бобра',
                        waterDepth: '',
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/Castor' },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: "Оновлений об'єкт бобра",
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Castor' },
                            },
                        },
                    },
                    '404': { description: 'Бобра не знайдено' },
                },
            },
            // PATCH запит для часткового оновлення бобра за ID
            patch: {
                summary: 'Частково оновити бобра',
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: { type: 'string' },
                        description: 'ID бобра',
                        waterDepth: '',
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/Castor' },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: "Оновлений об'єкт бобра",
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Castor' },
                            },
                        },
                    },
                    '404': { description: 'Бобра не знайдено' },
                },
            },
            // DELETE запит для видалення даних про бобра за ID
            delete: {
                summary: 'Видалити дані про бобра',
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: { type: 'string' },
                        description: 'ID бобра',
                        waterDepth: '',
                    },
                ],
                responses: {
                    '200': { description: 'Повідомлення про успішне видалення' },
                    '404': { description: 'Бобра не знайдено' },
                },
            },
        },
    },

    // Визначення компонентів для повторного використання
    components: {
        // Схеми даних
        schemas: {
            // Схема об'єкта Бобер
            Castor: {
                type: 'object',
                required: ['name', 'age', 'height', 'weight', 'gender'],
                properties: {
                    name: {
                        type: 'string',
                        description: "Ім'я бобра",
                    },
                    age: {
                        type: 'number',
                        description: 'Вік бобра у роках',
                    },
                    height: {
                        type: 'number',
                        description: 'Висота бобра в сантиметрах',
                    },
                    weight: {
                        type: 'number',
                        description: 'Вага бобра в кілограмах',
                    },
                    gender: {
                        type: 'string',
                        enum: ['male', 'female'],
                        description: 'Стать бобра',
                    },
                    description: {
                        type: 'string',
                        description: "Опис бобра (необов'язкове поле)",
                    },
                    waterDepth: {
                        type: 'string',
                        description: 'Глибина водойми, метри',
                    },
                },
            },
        },
    },
};
