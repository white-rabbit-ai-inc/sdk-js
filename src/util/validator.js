
import jsonSchema from 'jsonschema'

const validateData = (schema, data) => {
    // console.log('validate data')
    let validator = new jsonSchema.Validator();

    let validateResult = validator.validate(data, schema)
    // console.log(validateResult);

    if (validateResult.errors.length !== 0) {
        console.error(`validation errors exist:\n${validateResult}`)
    }
    return validateResult.errors.length === 0
}

export default validateData;
