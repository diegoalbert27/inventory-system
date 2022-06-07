import Customer from "../models/customer.model.js"

export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find()
    return res.json({ customers })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

export const createCustomer = async (req, res) => {
  try {
    const { name, cedula, address, phone, email } = req.body
    const savedCustomer = await Customer.save({ name, cedula, address, phone, email })
    return res.json({ message: 'New customer added', customer: savedCustomer.insertId })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

export const editCustomer = async (req, res) => {
  const { id } = req.params
  try {
    const editCustomer = await Customer.findByIdAndUpdate(Number(id), req.body)
    
    if (!editCustomer) 
      return res.status(404).json({ message: "Customer Not Found" });
    
    return res.json({ message: 'Customer updating' })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

export const getCustomer = async (req, res) => {
  const { id } = req.params
  try {
    const customer = await Customer.findById(Number(id))
    
    if (!customer) 
      return res.status(404).json({ message: "Customer Not Found" });
    
    return res.json({ customer: customer.shift() })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}
