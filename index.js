
import { API_KEY, URL } from "./Secret.mjs";
const ulTage = document.querySelector("ul");
const sendChatbtn = document.querySelector(".input-btn");
const chatinput = document.querySelector(".input-text");
const UlTagClassName = ulTage.classList[0];
const ptag = document.querySelector(".hello");
const burger = document.querySelector(".burger");
const deletebtn = document.querySelector(".delete");
// console.log(sendChatbtn)
let userMessage;
const createChatLi = (message, className) => {
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", className);
  let chatContent =
    className == "outgoing"
      ? `
    <span>
    <i class="fa-regular fa-user"></i>
    
    </span>
    <p></p>
`
      : ` 
<span>
<i class="fa-brands fa-discord"></i></span>

<p></p>
 `;

  chatLi.innerHTML = chatContent;
  chatLi.querySelector("p").textContent = message;
  return chatLi;
};

// <i class="fa-solid fa-trash delete"></i>

const getDataFromApi = (incommitMessage) => {
  const messageElement = incommitMessage.querySelector("p");
  // let API_Key = API_KEY;
  // let url = URL;

  console.log("userMessage", userMessage);
  const postDataDetails = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: userMessage,
        },
      ],
    }),
  };
  fetch(URL, postDataDetails)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      messageElement.textContent = data.choices[0].message.content;
    })
    .catch((error) => {
      console.log(error);
      messageElement.textContent =
        "opps! something went wrong please try again.";
    })
    .finally(() => {
      ulTage.scrollTo(0, ulTage.scrollHeight);
    });
};

const handleMessage = () => {
  ptag?.remove();
  ulTage.classList.remove("chatbox-start");
  ulTage.classList.add("chatbox");

  userMessage = chatinput.value?.trim();
  if (!userMessage) return;

  const LiElement = createChatLi(userMessage, "outgoing");
  ulTage.appendChild(LiElement);
  ulTage.scrollTo(0, ulTage.scrollHeight);

  setTimeout(() => {
    let outputMessage = createChatLi("Think...", "incomming");
    ulTage.appendChild(outputMessage);
    ulTage.scrollTo(0, ulTage.scrollHeight);
    // setTimeout(()=>{
    getDataFromApi(outputMessage);
    // },500)
  }, 500);

  // console.log(userMessage)

  chatinput.value = "";
};

sendChatbtn.addEventListener("click", handleMessage);

// console.log(process.env.API_KEY);
