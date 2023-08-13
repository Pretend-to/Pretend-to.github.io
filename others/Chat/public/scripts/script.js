const chatWindow = document.querySelector('.chat-window');
const chatInput = document.querySelector('.chat-input input');
const statusElement = document.querySelector('.status');
const submitButton = document.querySelector('.chat-function button[type="submit"]');
const resetSessionButton = document.querySelector('.chat-function button[type="reset"]');
const submitNameButton = document.querySelector('.chat-function button[type="setname"]');
const clearScreenButton = document.querySelector('.chat-upsidebar button[type="clean"]');


function commit(message, username,session_id) {
  const url = 'https://pi.fcip.top:2888/v1/chat';
  const data = {
    session_id: session_id,
    username: username,
    message: message
  };

  console.log(data)

  statusElement.textContent = '对方正在输入......';

  localStorage.setItem('temperSessionid', session_id);

  window.onload = () => {
    const cachedChatHistory = localStorage.getItem('chatHistory');
    if (cachedChatHistory) {
      console.log("找到历史记录");
      chatWindow.innerHTML = cachedChatHistory;
    }
    scrollChatWindowToBottom();
    statusElement.textContent = 'FCIP GPT';
  };


  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        console.error('Failed to send message');
      }
    })
    .then(data => {
      if (data) {
        const result = data.result;
        const messages = data.message;

        if (result === 'DONE') {
          messages.forEach(msg => {
            const parsedHtml = parseMarkdown(msg);
            const messageElement = document.createElement('li');
            messageElement.classList.add('chat-message', 'received');
            messageElement.innerHTML = msg;
            //chatWindow.appendChild(parsedHtml);
            //console.log("以markdown格式渲染")
            chatWindow.appendChild(messageElement);
            scrollChatWindowToBottom();
          });

          // Update chat history cache
          localStorage.setItem('chatHistory', chatWindow.innerHTML);
        } else {
          console.error('Failed to get valid response');
        }
      }
      statusElement.textContent = 'FCIP GPT';
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function parseMarkdown(markdownText) {
  return marked(markdownText);
}

function sendMessage() {
  const message = chatInput.value;
  const username = chatInput.getAttribute('data-username');

  const messageElement = document.createElement('li');
  messageElement.classList.add('chat-message', 'sent');

  const formattedMessage = message.replace(/\n/g, '\n\n');
  messageElement.textContent = formattedMessage;

  chatWindow.appendChild(messageElement);
  commit(message, username,getsessionId());
  scrollChatWindowToBottom();

  // Clear input field
  chatInput.value = '';
}

function resetSession() {
  const message = "重置会话";
  const username = chatInput.getAttribute('data-username');

  const messageElement = document.createElement('li');
  messageElement.classList.add('chat-message', 'sent');

  const formattedMessage = message.replace(/\n/g, '\n\n');
  messageElement.textContent = formattedMessage;

  localStorage.removeItem('temperSessionId');

  chatWindow.appendChild(messageElement);
  commit("变成赛博AI", username,getsessionId);
  scrollChatWindowToBottom();

  // Clear input field
  chatInput.value = '';
}

function systemMessage(str){
  const messageElement = document.createElement('li');
  messageElement.classList.add('system-message');
  messageElement.innerHTML = str;
  chatWindow.appendChild(messageElement);
  scrollChatWindowToBottom();
}

function clearScreen() {
  chatWindow.innerHTML = ''; // Clear chat window
  scrollChatWindowToBottom();

  // Clear chat history cache
  localStorage.removeItem('chatHistory');
  //localStorage.removeItem('temperSessionId');
}

function generateRandomId() {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let id = 'sk-';
  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters.charAt(randomIndex);
  }
  return id;
}

submitButton.addEventListener('click', (e) => {
  e.preventDefault();
  sendMessage();
});

chatInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && e.ctrlKey) {
    e.preventDefault();
    sendMessage();
  }
});

resetSessionButton.addEventListener('click', (e) => {
  e.preventDefault();
  resetSession();
});

submitNameButton.addEventListener('click', (e) => {
  e.preventDefault();
  const username = chatInput.value.trim();
  chatInput.setAttribute('data-username', username);
  // Clear input field
  chatInput.value = '';
  systemMessage("成功设置名称为" + username);
});

clearScreenButton.addEventListener('click', (e) => {
  e.preventDefault();
  clearScreen();
});

function getsessionId() {
  let session_id = localStorage.getItem('temperSessionId');
  if (!session_id) {
    session_id = generateRandomId(); // 生成随机的 session_id
    console.log("未检测到缓存，使用随机ID");
    localStorage.setItem('temperSessionId', session_id);
  }
  console.log("sessionid:" + session_id);
  return session_id;
}

// Scroll chat window to the bottom
function scrollChatWindowToBottom() {
  window.scrollTo(0, document.body.scrollHeight);
}

chatInput.focus();
