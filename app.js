const supabaseUrl = 'https://uegwqhqnbgtfiutytmcx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlZ3dxaHFuYmd0Zml1dHl0bWN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwMTI0MjQsImV4cCI6MjA2ODU4ODQyNH0.Oyj5bbNmXbkwpi-lZsoPZxGZ-r9gYj9IR2PCNa3tRAA';
const client = supabase.createClient(supabaseUrl, supabaseKey);

let signup = document.getElementById("signupForm")
let signin = document.getElementById("signinForm")
let main = document.getElementById("main")
// let titletext = document.getElementById("title")
// let description = document.getElementById("description")


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
      <input type="text" id="title" placeholder="Write title here....">
      <h3>Description</h3>
      <textarea id="description" placeholder="Write your Description here....."></textarea>
        <input type="file" name="" id="file">
      <button id="post" onclick="uploadPost()">Post</button>
    </div>`
}
// function uploadPost(){
//   main.style.display='none'
// }

async function uploadPost() {
  let titlevalu = document.getElementById("title").value;
  let descriptionvalu = document.getElementById("description").value;

  let imagefile = document.getElementById('file')

  let file = imagefile.files[0]
  let filename = Date.now() + "-" + file.name
  console.log(file, filename);

  // const avatarFile = event.target.files[0]
const { data, error:uploaderror } = await client
  .storage
  .from('postimage')
  .upload(`public/${filename}`, file, {
    cacheControl: '3600',
    upsert: false
  })

  if (uploaderror) {
    console.log(uploaderror);
    
  }else{
    console.log("upload image " , data);
    
  }

  const { data:fetchimage } = client
  .storage
  .from('postimage')
  .getPublicUrl(`public/${filename}`)

  let imageurldata =  fetchimage.publicUrl
 console.log(imageurldata);
 
  // console.log(titlevalu , descriptionvalu);

const { error } = await client
  .from('post')
  .insert({ title:  titlevalu , description: descriptionvalu , imageurl:imageurldata })

  if (error) {
    console.log(error);
    
  }else{
    console.log("sucess upload");
    
  }

}


async function adminshowpost() {

  

  const { data, error } = await client
  .from('post')
  .select()

  if (error) {
    console.log(error);
    
  }else{
    console.log(data);
    
    main.innerHTML = ""

    data.forEach(postitem => {
      // let imageurl = postitem.imageurldata
      // console.log(imageurl);
      
       main.innerHTML += `
         <img src="${postitem.imageurl}" alt="">
       <h1>${postitem.title}</h1>
       <p>${postitem.description}</p>
       `
    });
  }
}
adminshowpost()






 
