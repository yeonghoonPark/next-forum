export default function Signin() {
  return (
    <div>
      <h4>회원가입</h4>
      <form action='/api/signin/new' method='POST'>
        <label htmlFor='userId'>
          아이디
          <input name='user_id' type='text' id='userId' />
        </label>
        <br />
        <label htmlFor='userPassword'>
          비밀번호
          <input name='user_password' type='password' id='userPassword' />
        </label>
        <button type='submit'>확인</button>
      </form>
    </div>
  );
}
