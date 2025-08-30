import db from "../models/index.js";

/**
 * @swagger
 * tags:
 *   - name: Category
 *     description: Category management for admin privilege only
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

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - categoryName
 *               - description
 *             properties:
 *               categoryName:
 *                 type: string
 *                 example: "Data Science"
 *               description:
 *                 type: string
 *                 example: "Topics related to data analysis and statistics."
 *     responses:
 *       201:
 *         description: Category created successfully
 *       500:
 *         description: Server error

 * /categories/{id}:
 *   put:
 *     summary: Update a category by ID
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryName:
 *                 type: string
 *                 example: "Updated Category Name"
 *               description:
 *                 type: string
 *                 example: "Updated description."
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       404:
 *         description: Category not found
 *       500:
 *         description: Server error

 *   delete:
 *     summary: Delete a category by ID
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 *       500:
 *         description: Server error
 */

export const createCategory = async (req, res) => {
  try {
    const { categoryName, description } = req.body;
    const newCategory = await db.Category.create({ categoryName, description });
    res.status(201).json(newCategory);
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ error: 'Failed to create category.' });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { categoryName, description } = req.body;
    const category = await db.Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ error: 'Category not found.' });
    }

    category.categoryName = categoryName || category.categoryName;
    category.description = description || category.description;
    await category.save();

    res.status(200).json(category);
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ error: 'Failed to update category.' });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await db.Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ error: 'Category not found.' });
    }

    await category.destroy();
    res.status(200).json({ message: 'Category deleted successfully.' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ error: 'Failed to delete category.' });
  }
};
