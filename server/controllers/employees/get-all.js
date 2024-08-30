const Account = require('../../models/Account')
const { signToken } = require('../../middlewares/jsonwebtoken')

/* app.get(`/api/product`, async (req, res) => {
  let products = await Product.find();
  return res.status(200).send(products);
}); */

async function getAllEmployees(request, response, next) {
  try {
    const employees = await Account.find({ role: 'employee' })

    response.status(200).json({
      message: 'Accounts fetched',
      data: employees
    })
  } catch (error) {
    console.error(error)
    response.status(500).send()
  }
}

module.exports = getAllEmployees