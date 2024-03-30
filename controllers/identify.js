
import { findPrimaryContact,findSecondaryContacts,createPrimaryContact,getDetails,updateLinkedId,updateNewLinkedId ,updateContactToSecondary,updateContactLinkPrecedence, createSecondaryContact } from '../services/contact.js';

export const identifyContact = async (req, res) => {
  const { email, phoneNumber } = req.body;
  try {
    let consolidatedContact;

    const primaryContact = await findPrimaryContact(email, phoneNumber);
    const secondContact = await findSecondaryContacts(email, phoneNumber);
    // console.log(primaryContact)

    if (primaryContact) {
      const oldestPrimaryContact = findOldestPrimaryContact(primaryContact);
      const secondaryContacts = await findSecondaryContacts(email, phoneNumber);
      const allContacts = await getDetails(primaryContact[0].id);
      consolidatedContact = {
        primaryContatctId: primaryContact[0].id,
        // emails: [primaryContact[0].email, ...secondaryContacts.map(contact => contact.email)],
        // phoneNumbers: [primaryContact[0].phonenumber, ...secondaryContacts.map(contact => contact.phonenumber)],
        // secondaryContactIds: secondaryContacts.map(contact => contact.id)
        emails: [primaryContact[0].email, ...allContacts.map(contact => contact.email)],
        phoneNumbers: [primaryContact[0].phonenumber, ...allContacts.map(contact => contact.phonenumber)],
        secondaryContactIds: allContacts.map(contact => contact.id)
      };

      const secondaryContactIds = await Promise.all(primaryContact
                .filter(contact => contact.id !== oldestPrimaryContact.id) // Exclude the oldest contact
                .map(async (contact) => {
                  await updateContactLinkPrecedence(contact.id, 'secondary');
                  await updateLinkedId(contact.id,oldestPrimaryContact.id);
                  // await updateNewLinkedId(contact.id,oldestPrimaryContact.id);
                  return contact.id;
                }));
      
      const updateLinkedIdS = await Promise.all(secondContact
        .filter(contact => contact.id !== oldestPrimaryContact.id) // Exclude the oldest contact
                .map(async (contact) => {
                  await updateNewLinkedId(oldestPrimaryContact.id,contact.linkedid);
                  return contact.id;
                }));
    } else if(secondContact.length>0){

      const seconderyContact = await findSecondaryContacts(email, phoneNumber)
      // console.log(seconderyContact)
      // console.log("hi")
        function getID(res) {
          if (res[0].linkedid === null) {
              return res[1].linkedid;
          } else {
              return res[0].linkedid;
          }
      }
      
      
      let ID = getID(secondContact);
      
      // console.log(secondContact)
      // console.log(ID)
      const newSecondaryContact = await createSecondaryContact(email, phoneNumber, ID);
      const details = await getDetails(ID)
        
        consolidatedContact={
          primaryContatctId:ID,
          // emails: [...details.map(contact => contact.email),...secondContact.map(contact => contact.email)],
          emails: [...details.map(contact => contact.email)],
          // phoneNumbers: [...details.map(contact => contact.phonenumber), ...secondContact.map(contact => contact.phonenumber)],
          phoneNumbers: [...details.map(contact => contact.phonenumber)],
          // secondaryContactIds:[...details.map(contact => contact.id) ,...secondContact.map(contact => contact.id)],
          secondaryContactIds:[...details.map(contact => contact.id)  ],
        }
        console.log(...details.map(contact => contact.id));
        console.log("hi")
        console.log(...secondContact.map(contact => contact.id));
      // If primary contact doesn't exist, create a new primary contact
      
    }
    else {
      const newPrimaryContact = await createPrimaryContact(email, phoneNumber);
      consolidatedContact = {
        primaryContatctId: newPrimaryContact.id,
        emails: [newPrimaryContact.email],
        phoneNumbers: [newPrimaryContact.phonenumber],
        secondaryContactIds: []
      };

    }



    // Check if there are any new details to create a secondary contact
    if (primaryContact) {
      
        const isNewEmail = primaryContact.email !== email;
        const isNewPhoneNumber = primaryContact.phonenumber !== phoneNumber;
    
        if (isNewEmail || isNewPhoneNumber) {
        // Create a new secondary contact with the updated details
        const newSecondaryContact = await createSecondaryContact(email, phoneNumber, primaryContact[0].id);
        // console.log(primaryContact.id)
        consolidatedContact.secondaryContactIds.push(newSecondaryContact.id);
        }
    }

    res.status(200).json({ contact: consolidatedContact });
  } catch (error) {
    console.error('Error identifying contact:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
// // Function to find the oldest primary contact among an array of contacts
const findOldestPrimaryContact = (contacts) => {
  return contacts.reduce((oldest, current) => (oldest.id < current.id ? oldest : current));
};

