//!TODO : must register user after policy check

const tds = document.getElementsByClassName("td");
const inputs = document.getElementsByClassName("input");
const input_ID = document.getElementById("input_ID");
const input_PW = document.getElementById("input_PW");
const input_PWCheck = document.getElementById("input_PWCheck");
const btn_checkID = document.getElementById("btn_checkID");
const btn_next = document.getElementById("btn_next");

let tics = 0;
let isIDAvil = false;

// check if ID exsists in DB
btn_checkID.addEventListener("click", async () => {
  if (!input_ID.value || input_ID.value.length < 3) return;
  const data = {
    type: "checkID",
    reqID: input_ID.value,
  };
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  const req = await fetch("/api/users", options);
  const res = await req.json();

  console.log(res);

  if (res.body == "avil") {
    isIDAvil = true;
    input_ID.style.color = "green";
  } else {
    isIDAvil = false;
    input_ID.style.color = "red";
  }

  btn_checkID.style.border = "none";
});

input_ID.addEventListener("input", () => {
  isIDAvil = false;
});

btn_next.addEventListener("click", async (e) => {
  // make sure there is no blanks
  console.log(1);
  Array.from(inputs).forEach((input) => {
    if (!input.value && input.value < 3) {
      input.style.border = "2px red solid";
      return;
    } else {
      input.style.border = "none";
    }
  });
  console.log(2);
  if (!isIDAvil) {
    btn_checkID.style.border = "2px red solid";
    return;
  } else {
    btn_checkID.style.border = "none";
  }
  console.log(3);
  if (input_PW.value != input_PWCheck.value) {
    input_PW.style.borderTop = "2px red solid";
    input_PW.style.borderLeft = "2px red solid";
    input_PW.style.borderRight = "2px red solid";

    input_PWCheck.style.borderBottom = "2px red solid";
    input_PWCheck.style.borderLeft = "2px red solid";
    input_PWCheck.style.borderRight = "2px red solid";
    return;
  }
  console.log(4);

  const data = {
    type: "addUser",
    reqUserInfo: {
      ID: input_ID.value,
      PW: input_PW.value,
    },
  };
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  fetch("/api/users", options)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.body == "successfully added user to DB!") {
        tics++;
      }
    });
});
