export default () => `
<section id="login-form">
<div>
<div><h3>Login</h3><br></div>
<form id="" method="POST" action="">
<div class="login">
<form method="post" action="">
  <p><input type="text" name="login" value="" placeholder="Username or Email"></p>
  <p><input type="password" name="password" value="" placeholder="Password"></p>
  <p class="remember_me">
    <label>
      <input type="checkbox" name="remember_me" id="remember_me">
      Remember me on this computer
    </label>
  </p>
  <p class="submit"><input type="submit" name="commit" value="Login"></p>
</form>
</div>
<div class="login-help">
<p>Forgot your password? <a href="#">Click here to reset it</a>.</p>
</div>
</div>
</form>
</section>
`;
