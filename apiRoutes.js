import express from 'express';
import client from './db.js';

const router=express.Router();


//search for a product
router.get('/search', async(req,res)=>{
    const {name} =req.query;

    if (!name){
        return res.status(400).json({
            error: '"Name" is required to search.'
        })
    }
    try {
        // ILIKE for case sensitive matches
      const result = await client.query(
      'SELECT * FROM products WHERE productName ILIKE $1 ORDER BY productId ASC',
      [`%${name}%`]
    );
    res.json(result.rows);
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
})
// 2. CREATE - Add a new product
router.post('/', async (req, res) => {
  const { productName, quantity, price, remarks } = req.body;
  try {
    const result = await client.query(
      'INSERT INTO products (productName, quantity, price, remarks) VALUES ($1, $2, $3, $4) RETURNING *',
      [productName, quantity, price, remarks]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. READ ALL - Get all products
router.get('/', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM products ORDER BY productId ASC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. READ ONE - Get a single product by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await client.query('SELECT * FROM products WHERE productId = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. UPDATE - Update product details completely
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { productName, quantity, price,remarks } = req.body;
  try {
    const result = await client.query(
      'UPDATE products SET productName = $1, quantity = $2, price = $3, remarks=$4 WHERE productId = $5 RETURNING *',
      [productName, quantity, price,remarks, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 6. DELETE - Remove a product
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await client.query('DELETE FROM products WHERE productId = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully', product: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;