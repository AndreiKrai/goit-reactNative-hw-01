const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "db/contacts.json");

const rewriteContacts = async (contacts) => {
  //   await fs.writeFile(contactsPath, JSON.stringify(contacts)); this one is works but
  //   for goodloking JSON file we have to use nxt:
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  return contacts.find((contact) => contact.id === contactId) || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();

  const newContactsList = contacts.filter(
    (contact) => contact.id !== contactId
  );
  await rewriteContacts(newContactsList);
  return "contact deleted" || null;
};

const addContact = async (data) => {
  const contacts = await listContacts();
  const newContact = { id: nanoid(), ...data };
  contacts.push(newContact);
  await rewriteContacts(contacts);
  return newContact || null;
};
module.exports = { listContacts, getContactById, addContact, removeContact };
// const fileOperations = async ({ action, id, title, author }) => {
//   switch (action) {
//     case "read":
//       const file = await fs.readFile(filepath, "utf-8");
//       console.log(file);
//       break;
//     case "add":
//       const resultOffAdd = await fs.appendFile(filepath, data);
//       //   "utf-8"  не потрібен, без нього повертається буфер,як і треба
//       console.log(resultOffAdd);
//       break;
//     case "replace":
//       const resultOffReplace = await fs.writeFile(filepath, data);
//       console.log(resultOffReplace);
//       break;
//   }
// };
// // fileOperations("./db/text.txt", "add", "\nя добавив текст");
// fileOperations("./db/text.txt", "replace", "that's new file");
// fileOperations("./db/text.txt", "read");
