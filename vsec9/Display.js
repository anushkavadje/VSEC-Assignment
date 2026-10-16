function Display({ name, city, age, mobile, email, college }) {
  return (
    <div>
      <h2>Student Details</h2>

      <h3>Name: {name}</h3>
      <h3>City: {city}</h3>
      <h3>Age: {age}</h3>
      <h3>Mobile Number: {mobile}</h3>
      <h3>Email Address: {email}</h3>
      <h3>College Name: {college}</h3>
    </div>
  );
}

export default Display;
