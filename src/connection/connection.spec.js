
import connection from '.'

describe('test connection', () => {

  test('set env', () => {
    connection.setEnvironment(connection.ENVIRONMENT_TYPES.STAGING)
    expect(connection.environment).not.toBe(undefined)
    expect(connection.environment).toBe(connection.requests[connection.ENVIRONMENT_TYPES.STAGING])
  })

  test('get connection with env param', () => {
    expect(connection.init({ apiKey: '1234', environment: connection.ENVIRONMENT_TYPES.STAGING })).not.toBe(undefined)
    expect(connection.init()).toHaveProperty('environment')
    expect(connection.environment).toBe(connection.requests[connection.ENVIRONMENT_TYPES.STAGING])
  })

  test('get connection', () => {
    const conn = connection.init({ apiKey: '1234'})
    expect(conn).not.toBe(undefined)
    expect(conn).toHaveProperty('environment')
    console.log(conn.environment)
    console.log(connection.requests[connection.ENVIRONMENT_TYPES.PRODUCTION])
    expect(conn.environment).toBe(connection.requests[connection.ENVIRONMENT_TYPES.PRODUCTION])
  })
})

