export function sanitizeInput(input) {
  //need to add more sanitization later

  console.log(input);
  if (input === "") {
    return false;
  }
  return true;
}
