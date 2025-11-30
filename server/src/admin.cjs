const mysql = require('mysql2');
const bcrypt = require('bcrypt');

// --- CONFIGURATION ---
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'Nita041007',   // change to your DB password
  database: 'Domra_data', // change to your DB name
  port: 3306
};

const tableName = 'User'; // adjust if your table name differs

// --- ADMIN DATA ---
const adminEmail = 'admin@gmail.com';
const adminPassword = 'admin123'; // plain text, will be hashed
const adminFirstName = 'Nita';
const adminLastName = 'Admin';

async function seedAdmin() {
  const connection = mysql.createConnection(dbConfig);

  try {
    // hash password
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    // build record
    const record = {
      firstName: adminFirstName,
      lastName: adminLastName,
      email: adminEmail,
      password: hashedPassword,
      role: 'admin',
      status: 'verified',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // SQL insert
    const sql = `
      INSERT INTO \`${tableName}\`
      (firstName, lastName, email, password, role, status, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      record.firstName,
      record.lastName,
      record.email,
      record.password,
      record.role,
      record.status,
      record.createdAt,
      record.updatedAt
    ];

    connection.query(sql, values, (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          console.log('ℹ️ Admin already exists:', adminEmail);
        } else {
          console.error('❌ Error inserting admin:', err.sqlMessage);
        }
      } else {
        console.log(`✅ Admin user seeded successfully: ${adminEmail}`);
      }
      connection.end();
    });
  } catch (error) {
    console.error('❌ Failed to seed admin:', error);
    connection.end();
  }
}

seedAdmin();
