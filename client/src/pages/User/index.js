import withLayout from "../../hoc/withLayout";


const User = (props) => {


  const onChange = (e) => {
    console.log(e.target.value)
  }
  return (
    <>
      <h1>Users</h1>
      <div>
        <form >
          <label>Name</label>
          <input type="text" onChange={onChange} name="name" />
          <label>Last Name</label>
          <input type="text" onChange={onChange} name="lastName" />
          <label>Birthday</label>
          <input type="date" onChange={onChange} name="birthday" />
          <label>Country</label>
          <input type="text" onChange={onChange} name="country" />
          <label>Profile Picture</label>
          <input type="file" onChange={onChange} name="profilePicture" />
          <label>Email</label>
          <input onChange={onChange} name="email" />

          <button type="button">Change Password</button>
          <button type="submit">Save Changes</button>
        </form>

        <h1>My Playlists</h1>
        <h1>My Songs</h1>
        <h1>My Friends</h1>
      </div>
    </>
  );
};

export default withLayout(User);
