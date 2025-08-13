const supabaseUrl = 'https://uegwqhqnbgtfiutytmcx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlZ3dxaHFuYmd0Zml1dHl0bWN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwMTI0MjQsImV4cCI6MjA2ODU4ODQyNH0.Oyj5bbNmXbkwpi-lZsoPZxGZ-r9gYj9IR2PCNa3tRAA';
const client = supabase.createClient(supabaseUrl, supabaseKey);

let signup = document.getElementById("signupForm")
let signin = document.getElementById("signinForm")
let main= document.getElementById("main")
let name=User.User_metadata.full_name

function showSignUp() {
  document.getElementById("signupForm").classList.remove("hidden");
  document.getElementById("signinForm").classList.add("hidden");
}


function showSignIn() {
  document.getElementById("signinForm").classList.remove("hidden");
  document.getElementById("signupForm").classList.add("hidden");
}


async function signUp() {
  const name = document.getElementById("signupName").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  const { data, error } = await client.auth.signUp({
    email: email,
    password: password,
    options: {
      data: { full_name: name },
    },
  });

  if (error) {
    Command: toastr["error"]("signup fail", "signup")

toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": false,
  "progressBar": true,
  "positionClass": "toast-top-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}
  } else {
    Command: toastr["success"]("signup successful", "signup")

    toastr.options = {
      "closeButton": true,
      "debug": false,
      "newestOnTop": false,
      "progressBar": true,
      "positionClass": "toast-top-right",
      "preventDuplicates": false,
      "onclick": null,
      "showDuration": "300",
      "hideDuration": "1000",
      "timeOut": "5000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    }
    setTimeout(function () {
      showSignIn();
    }, 3000);
  }
}

// --------------------------signin funtion---------------------------------------------------//
async function signIn() {
  const email = document.getElementById("signinEmail").value;
  const password = document.getElementById("signinPassword").value;

  const { data, error } = await client.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    Command: toastr["error"]("signin fail", "signin")

toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": false,
  "progressBar": true,
  "positionClass": "toast-top-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}
  } else {
    Command: toastr["success"]("sigin successful", "signin")

    toastr.options = {
      "closeButton": true,
      "debug": false,
      "newestOnTop": false,
      "progressBar": true,
      "positionClass": "toast-top-right",
      "preventDuplicates": false,
      "onclick": null,
      "showDuration": "300",
      "hideDuration": "1000",
      "timeOut": "5000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    }
    setTimeout(function () {
      window.location.href = "dashboard.html";
    }, 3000);
  }
}
function togglePassword(inputId, icon) {
  const input = document.getElementById(inputId);

  if (input.type === "password") {
    input.type = "text";
    icon.classList.remove("fa-eye");
    icon.classList.add("fa-eye-slash");
  } else {
    input.type = "password";
    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye");
  }
}
// --------------------------create post---------------------------------------------------//
async function post() {
  main.innerHTML+=`<div class="create-post">
      <h3>Title</h3>
      <input type="text" id="text" placeholder="Write title here....">
      <h3>Description</h3>
      <textarea id="Description" placeholder="Write your Description here....."></textarea>
      <input type="file" name="" id="pic">
      <button id="post" onclick="uploadPost()">Post</button>
    </div>`
}
function uploadPost(){
  main.style.display='none'
}
 
