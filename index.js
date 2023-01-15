const contactsOperations = require("./contacts.js");
const { program } = require("commander");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contactsOperations.listContacts();
      console.table(allContacts);
      break;
    case "get":
      const oneContact = await contactsOperations.getContactById(id);
      console.log(oneContact);
      break;
    case "add":
      const newContact = await contactsOperations.addContact({
        name,
        email,
        phone,
      });
      console.log(newContact);
      break;
    case "remove":
      const removedContact = await contactsOperations.removeContact(id);
      console.log(removedContact);
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};
// console.log("hello, i'm working");
// invokeAction({ action: "list" });
// invokeAction({ action: "getOne", id: "1" });
// invokeAction({
//   action: "addContact",
//   name: "Andrei",
//   email: "as@mail.com",
//   phone: "05055555555",
// });
// invokeAction({ action: "removeContact", id: "YSA3yCRrZyXcJffiJHMrX" });

// there we use "commander" for work from console => $ node index -a 'getAll'
program
  .option("-a,--action <type>")
  .option("-i,--id <type>")
  .option("-e,--email <type>")
  .option("-p,--phone <type>")
  .option("-n,--name <type>");

program.parse();
const options = program.opts();
invokeAction(options);
