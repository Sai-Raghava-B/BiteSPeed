// import db from '../db.js'; // Assuming you have a database connection

// export const findPrimaryContact = async (email, phoneNumber) => {
//   try {
//     const query = `
//       SELECT *
//       FROM contact
//       WHERE (email = $1 OR phoneNumber = $2) AND linkPrecedence = 'primary'
//     `;
//     const result = await db.query(query, [email, phoneNumber]);
//     return result.rows[0];
//   } catch (error) {
//     console.error('Error finding primary contact:', error);
//     throw error;
//   }
// };

// export const findSecondaryContacts = async (email, phoneNumber) => {
//   try {
//     const query = `
//       SELECT *
//       FROM contact
//       WHERE (email = $1 OR phoneNumber = $2) AND linkPrecedence = 'secondary'
//     `;
//     const result = await db.query(query, [email, phoneNumber]);
//     return result.rows;
//   } catch (error) {
//     console.error('Error finding secondary contacts:', error);
//     throw error;
//   }
// };

// import db from '../db.js'; // Assuming you have a database connection

// export default class Contact {
//   static async findPrimary(email, phoneNumber) {
//     try {
//       const query = `
//         SELECT *
//         FROM contacts
//         WHERE (email = $1 OR phoneNumber = $2) AND linkPrecedence = 'primary'
//       `;
//       const result = await db.query(query, [email, phoneNumber]);
//       return result.rows[0];
//     } catch (error) {
//       console.error('Error finding primary contact:', error);
//       throw error;
//     }
//   }

//   static async findSecondary(email, phoneNumber) {
//     try {
//       const query = `
//         SELECT *
//         FROM contacts
//         WHERE (email = $1 OR phoneNumber = $2) AND linkPrecedence = 'secondary'
//       `;
//       const result = await db.query(query, [email, phoneNumber]);
//       return result.rows;
//     } catch (error) {
//       console.error('Error finding secondary contacts:', error);
//       throw error;
//     }
//   }

//   static async createPrimary(email, phoneNumber) {
//     try {
//       const query = `
//         INSERT INTO contacts (phoneNumber, email, linkPrecedence)
//         VALUES ($1, $2, 'primary')
//         RETURNING *
//       `;
//       const result = await db.query(query, [phoneNumber, email]);
//       return result.rows[0];
//     } catch (error) {
//       console.error('Error creating primary contact:', error);
//       throw error;
//     }
//   }

//   static async createSecondary(email, phoneNumber, linkedId) {
//     try {
//       const query = `
//         INSERT INTO contacts (phoneNumber, email, linkedId, linkPrecedence)
//         VALUES ($1, $2, $3, 'secondary')
//         RETURNING *
//       `;
//       const result = await db.query(query, [phoneNumber, email, linkedId]);
//       return result.rows[0];
//     } catch (error) {
//       console.error('Error creating secondary contact:', error);
//       throw error;
//     }
//   }
// }
