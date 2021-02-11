export const surveyResultPath = {
  put: {
    security: {
      apiKeyAuth: []
    },
    tags: ['Enquetes'],
    summary: 'API criar a resposta de uma enquete',
    parameters: {
      in: 'path',
      name: 'surveyId',
      required: true,
      schema: {
        type: 'string'
      }
    },
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/saveSurveyParams'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/surveyResult'
            }
          }
        }
      },
      400: {
        $ref: '#/components/badRequest'
      },
      401: {
        $ref: '#/components/unauthorized'
      },
      404: {
        $ref: '#/components/notFound'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
