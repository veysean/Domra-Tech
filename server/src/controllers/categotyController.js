import db from "../models/index.js";


/**
 * @swagger
 * tags:
 *   - name: Category
 *     description: Category management
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Retrieve all categories
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   categoryId:
 *                     type: integer
 *                     example: 1
 *                   categoryName:
 *                     type: string
 *                     example: "AI & Machine Learning"
 *                   description:
 *                     type: string
 *                     example: "Topics related to artificial intelligence and machine learning."
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Retrieve a single category by ID
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The category ID
 *     responses:
 *       200:
 *         description: A single category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 categoryId:
 *                   type: integer
 *                   example: 1
 *                 categoryName:
 *                   type: string
 *                   example: "AI & Machine Learning"
 *                 description:
 *                   type: string
 *                   example: "Topics related to artificial intelligence and machine learning."
 *       404:
 *         description: Category not found
 *       500:
 *         description: Server error
 */


export const getAllCategories = async (req, res) => {
  try {
    const categories = await db.Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching all categories:', error);
    res.status(500).json({ error: 'Failed to fetch category data.' });
  }
};


export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await db.Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ error: 'Category not found.' });
    }

    res.status(200).json(category);
  } catch (error) {
    console.error('Error fetching category by ID:', error);
    res.status(500).json({ error: 'Failed to fetch category data.' });
  }
};


// export const getAllCategories = async (req, res) => {
//   try {
//     const { categoryId } = req.query;

//     const whereClause = categoryId ? { categoryId } : {};

//     const categories = await db.Category.findAll({ where: whereClause });

//     res.status(200).json(categories);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch category data.' });
//   }
// };
