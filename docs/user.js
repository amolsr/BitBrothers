module.exports = {
    openapi: '3.0.1',
    info: {
        version: '1.0.0',
        title: 'Bit Brothers',
        contact: {
            name: 'Amol Saini',
            email: 'amol.saini567@gmail.com'
        }
    },
    servers: [{
        url: 'http://localhost:3000/',
        description: 'Local server'
    },
    // {
    //   url: 'https://api_url_testing',
    //   description: 'Testing server'
    // },
    {
        url: 'https://bit-brothers.herokuapp.com/',
        description: 'Production server'
    }
    ],
    tags: [{
        name: 'User API'
    }],
    paths: {
        '/api/users': {
            post: {
                tags: ['User API'],
                description: 'Create User',
                operationId: 'addUser',
                parameters: [{
                    name: 'name',
                    in: 'body',
                    schema: {
                        type: 'string'
                    },
                    required: true
                },
                {
                    name: 'email',
                    in: 'body',
                    schema: {
                        type: 'string'
                    },
                    required: true
                },
                {
                    name: 'password',
                    in: 'body',
                    schema: {
                        type: 'string',
                        minimum: 8
                    },
                    required: true
                },
                {
                    name: 'mobile',
                    in: 'body',
                    schema: {
                        type: 'number',
                        minimum: 10
                    },
                    required: true
                }
                ],
                responses: {
                    '200': {
                        description: 'User is created',
                        content: {
                            'application/json': {
                                schema: {
                                    type: "object",
                                    properties: {
                                        result: {
                                            type: "object",
                                            $ref: '#/components/schemas/User'
                                        }
                                    }
                                }
                            }
                        }
                    },
                    '422': {
                        description: 'Missing parameters',
                        content: {
                            'application/json': {
                                schema: {
                                    error: {
                                        type: 'object',
                                        properties: {
                                            error: {
                                                type: 'string'
                                            }
                                        }
                                    }
                                },
                                example: {
                                    "error": "\"email\" must be a valid email"
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    components: {
        schemas: {
            User: {
                type: 'object',
                properties: {
                    _id: {
                        type: 'string',
                        example: "$2b$10$GE3Ck0WROXwrSew0kD2nBup11rGrfoVl5TNTY0ETML968wCXqEZzm"
                    },
                    name: {
                        type: 'string',
                        example: "Amol Saini"
                    },
                    email: {
                        type: 'string',
                        example: "amol@gmail.com"
                    },
                    mobile: {
                        type: 'number',
                        example: 9876543210
                    },
                    password: {
                        type: 'string',
                        example: "$2b$10$GE3Ck0WROXwrSew0kD2nBup11rGrfoVl5TNTY0ETML968wCXqEZzm"
                    },
                    createdAt: {
                        type: "string",
                        example: "2020-05-13T06:17:37.592Z"
                    },
                    updatedAt: {
                        type: "string",
                        example: "2020-05-13T06:17:37.592Z"
                    }
                }
            }
        }
    }
};