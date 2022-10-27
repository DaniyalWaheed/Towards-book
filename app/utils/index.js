const validateModel = async (model) => {
  try {
    await model.validate();

    const obj = model.toObject();
    delete obj._id;

    return obj;
  } catch ({ errors }) {
    const errorsList = Object.keys(errors).map((field) => {
      return {
        key: field,
        value: errors[field].message,
      };
    });
    console.log(errorsList);
    // throw new BusinessError(
    //   MISSING_ATTRIBUTES,
    //   "Invalid data provided",
    //   errorsList
    // );
  }
};

module.exports = {
  validateModel,
};
