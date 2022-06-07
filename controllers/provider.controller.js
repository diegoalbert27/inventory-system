import Provider from "../models/provider.model.js"

export const getProviders = async (req, res) => {
  try {
    const providers = await Provider.find()
    return res.json({ providers })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

export const createProvider = async (req, res) => {
  try {
    const { name, rif, phone, address } = req.body
    const savedProvider = await Provider.save({ name, rif, phone, address })
    return res.json({ message: 'New provider added', provider: savedProvider.insertId })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

export const editProvider = async (req, res) => {
  const { id } = req.params
  try {
    const editProvider = await Provider.findByIdAndUpdate(Number(id), req.body)
    
    if (!editProvider) 
      return res.status(404).json({ message: "Provider Not Found" });
    
    return res.json({ message: 'Provider updating' })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

export const getProvider = async (req, res) => {
  const { id } = req.params
  try {
    const provider = await Provider.findById(Number(id))
    
    if (!provider) 
      return res.status(404).json({ message: "Provider Not Found" });
    
    return res.json({ provider: provider.shift() })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}
