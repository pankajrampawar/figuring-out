export function getRandomNumber() {
    // Generate a random decimal between 0 and 1
    const randomDecimal = Math.random();
    
    // Scale the random decimal to the range 1 to 3
    // Math.floor() is used to round down to the nearest integer
    const randomNumber = Math.floor(randomDecimal * 3) + 1;
  
    return randomNumber;
  }
  