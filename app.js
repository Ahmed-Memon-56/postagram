const supabaseUrl = 'https://uegwqhqnbgtfiutytmcx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlZ3dxaHFuYmd0Zml1dHl0bWN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwMTI0MjQsImV4cCI6MjA2ODU4ODQyNH0.Oyj5bbNmXbkwpi-lZsoPZxGZ-r9gYj9IR2PCNa3tRAA';
const client = supabase.createClient(supabaseUrl, supabaseKey);


let signup = document.getElementById("signupForm")
let signin = document.getElementById("signinForm")
let main= document.getElementById("main")

// ----------------- SHOW FORMS -----------------
function showSignUp() {
  signup.classList.remove("hidden");
  signin.classList.add("hidden");
}

function showSignIn() {
  signin.classList.remove("hidden");
  signup.classList.add("hidden");
}

// ----------------- SIGN UP -----------------
async function signUp() {
  const name = document.getElementById("signupName").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  const { data, error } = await client.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: name },
    },
  });

  if (error) {
    toastr.error(error.message, "Signup Failed");
  } else {
    toastr.success("Signup successful, please login", "Signup");
    setTimeout(showSignIn, 2000);
  }
}

// ----------------- SIGN IN -----------------
async function signIn() {
  const email = document.getElementById("signinEmail").value;
  const password = document.getElementById("signinPassword").value;

  const { data, error } = await client.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    toastr.error(error.message, "Signin Failed");
  } else {
    toastr.success("Login successful", "Signin");
    setTimeout(function () {
      window.location.href = "dashboard.html";
    }, 2000);
  }
}

// ----------------- LOGOUT -----------------
async function logout() {
  await client.auth.signOut();
  toastr.success("Logged out successfully");
  window.location.href = "index.html";
}

// ----------------- TOGGLE PASSWORD -----------------
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

// ----------------- CREATE POST UI -----------------
function post() {
  main.innerHTML = `
    <div class="create-post">
      <h3>Title</h3>
      <input type="text" id="postTitle" placeholder="Write title here....">
      <h3>Description</h3>
      <textarea id="postDescription" placeholder="Write your Description here....."></textarea>
      <input type="file" id="postImage" class="post-pic" accept="image/*">
      <button onclick="uploadPost()">Post</button>
    </div>`;
}

// ----------------- UPLOAD POST -----------------
async function uploadPost() {
  let title = document.getElementById("postTitle").value;
  let description = document.getElementById("postDescription").value;
  let fileInput = document.getElementById("postImage");
  let imageFile = fileInput.files[0];

  const { data: userData } = await client.auth.getUser();
  let full_name = userData.user?.user_metadata?.full_name || "Anonymous";

  let imageUrl = "";
  if (imageFile) {
    const fileName = Date.now() + "-" + imageFile.name;

    // 1️⃣ Upload image to Supabase Storage
    const { error: uploadError } = await client.storage
      .from("post-images") // bucket name
      .upload(fileName, imageFile, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      toastr.error(uploadError.message, "Image Upload Failed");
      return;
    }

    // 2️⃣ Get Public URL (Ye 100% sahi chalega public bucket pe)
    const { data: publicData } = client
      .storage
      .from("post-images")
      .getPublicUrl(fileName);

    imageUrl = publicData.publicUrl;
  }

  // 3️⃣ Insert post in Supabase table
  const { error } = await client
    .from("post")
    .insert([{ 
      title, 
      description, 
      username: full_name, 
      image: imageUrl 
    }]);

  if (error) {
    toastr.error(error.message, "Post Failed");
  } else {
    toastr.success("Post uploaded successfully", "Post");
    loadPosts();
  }
}


// ----------------- LOAD POSTS -----------------
async function loadPosts() {
  const { data, error } = await client
    .from("post")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.log("Error loading posts: ", error.message);
    return;
  }

  main.innerHTML = "";
  data.forEach(post => {
    main.innerHTML += `
      <div class="post-card">
        <h3>${post.title}</h3>
        <p>${post.description}</p>
        ${post.image ? `<img src="${post.image}" style="max-width:200px;">` : ""}
        <small>Posted by: <b>${post.username}</b></small>
      </div>`;
  });
}


