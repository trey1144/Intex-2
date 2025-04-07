import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function CreateAccount() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    const newUser = {
      firstName,
      lastName,
      email,
      phone,
      age,
      gender,
      password,
    };

    console.log('New user:', newUser);
    // TODO: Send data to backend
  };

  return (
    <>
      <Header />
      <h2>Create An Account</h2>
      <form onSubmit={handleSubmit}>
        <strong>First Name: </strong>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <strong>Last Name: </strong>
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <strong>Email: </strong>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <strong>Phone Number: </strong>
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <strong>Age: </strong>
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
          required
        />
        <strong>Gender: </strong>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
        >
          <option value="">Select Gender</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="other">Other</option>
        </select>
        <strong>Password: </strong>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <strong>Confirm Password: </strong>
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" style={{ marginTop: '10px' }}>
          Create Account
        </button>
      </form>
      <Footer />
    </>
  );
}

export default CreateAccount;
