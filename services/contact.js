import db from '../db.js'; 

export const findPrimaryContact = async (email, phoneNumber) => {
    // console.log(email)
    // console.log(phoneNumber)
  try {
    const query = `
      SELECT *
      FROM contacts
      WHERE (email = $1 OR phonenumber = $2) AND linkprecedence = 'primary'
    `;
    const result = await db.query(query, [email, phoneNumber]);
    if (!result || !result.rows || result.rows.length === 0) {
        
        console.error('No primary contact found');
        return null;
      } else {
        
        
        return result.rows;
        
      }
  } catch (error) {
    console.error('Error finding primary contact:', error);
    throw error;
  }
};

export const findSecondaryContacts = async (email, phoneNumber) => {
  try {
    const query = `
      SELECT *
      FROM contacts
      WHERE (email = $1 OR phonenumber = $2) AND (linkprecedence = 'secondary' OR linkprecedence = 'primary')
    `;
    const result = await db.query(query, [email, phoneNumber]);
    return result.rows;
  } catch (error) {
    console.error('Error finding secondary contacts:', error);
    throw error;
  }
};

export const createPrimaryContact = async (email, phoneNumber) => {
  try {
    const query = `
      INSERT INTO contacts (phonenumber, email, linkprecedence)
      VALUES ($1, $2, 'primary')
      RETURNING *
    `;
    const result = await db.query(query, [phoneNumber, email]);
    return result.rows[0];
  } catch (error) {
    console.error('Error creating primary contact:', error);
    throw error;
  }
};

export const createSecondaryContact = async (email, phoneNumber, linkedId) => {
  try {
    const query = `
      INSERT INTO contacts (phonenumber, email, linkedid, linkprecedence)
      VALUES ($1, $2, $3, 'secondary')
      RETURNING *
    `;
    const result = await db.query(query, [phoneNumber, email, linkedId]);
    return result.rows[0];
  } catch (error) {
    console.error('Error creating secondary contact:', error);
    throw error;
  }
};

export const getDetails = async(Id) => {
  try {
    const query = `
      SELECT *
      FROM contacts
      WHERE (linkedid = $1)
    `;
    const result = await db.query(query, [Id]);
    return result.rows;
  } catch (error) {
    console.error('Error getting details:', error);
    throw error;
  }
};

// Function to update an existing contact to secondary
export const updateContactToSecondary = async (contactId) => {
    try {
      const query = `
        UPDATE contacts
        SET linkPrecedence = 'secondary'
        WHERE id = $1
      `;
      await db.query(query, [contactId]);
    } catch (error) {
      console.error('Error updating contact to secondary:', error);
      throw error;
    }
  };

export const updateLinkedId = async (contactId,linkedid) => {
  try {
    const query = `
      UPDATE contacts
      SET linkedid= $1
      WHERE id = $2
    `;
    await db.query(query, [linkedid, contactId]);
  } catch (error) {
    console.error('Error updating contact link precedence:', error);
    throw error;
  }

};

export const updateNewLinkedId = async (linkedid,contactid) => {
  try {
    const query = `
      UPDATE contacts
      SET linkedid= $1
      WHERE linkedid = $2
    `;
    await db.query(query, [linkedid,contactid]);
  } catch (error) {
    console.error('Error updating contact link precedence:', error);
    throw error;
  }

};

export const getAllDetails = async (linkedid) => {
  try {
    const query = `
      SELECT *
      FROM contacts
      WHERE (linkedid = $1)
    `;
    const result = await db.query(query, [Id]);
    return result.rows;
  } catch (error) {
    console.error('Error getting details:', error);
    throw error;
  }

};
export const updateContactLinkPrecedence = async (contactId, linkPrecedence) => {
    try {
      const query = `
        UPDATE contacts
        SET linkPrecedence = $1
        WHERE id = $2
      `;
      await db.query(query, [linkPrecedence, contactId]);
    } catch (error) {
      console.error('Error updating contact link precedence:', error);
      throw error;
    }
  };
  