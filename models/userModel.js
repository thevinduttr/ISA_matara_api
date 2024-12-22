// Hardcoded users data (No bcrypt, plain text password)
const users = [
    {
      id: 1,
      email: 'admin@ISA.com',
      password: 'ISA@Matara2005', // Plain text password
    }
  ];
  
  // Function to find a user by email
  function findUserByEmail(email) {
    return users.find(user => user.email === email);
  }
  
  // Function to check if passwords match (plain text comparison)
  function validatePassword(password, storedPassword) {
    return password === storedPassword;
  }
  
  module.exports = { findUserByEmail, validatePassword };
  