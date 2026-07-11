      function timeUpdate() {
      var currentTime = new Date().toLocaleString();
      var timeText = document.querySelector("#timebarElement");
      timeText.innerHTML = currentTime
      }
      setInterval(timeUpdate, 1000);

// Make the DIV element draggable:
dragElement(document.getElementById("welcome"));

// Step 1: Define a function called `dragElement` that makes an HTML element draggable.
function dragElement(element) {
  // Step 2: Set up variables to keep track of the element's position.
  var initialX = 0;
  var initialY = 0;
  var currentX = 0;
  var currentY = 0;

  // Step 3: Check if there is a special header element associated with the draggable element.
  if (document.getElementById(element.id + "header")) {
    // Step 4: If present, assign the `dragMouseDown` function to the header's `onmousedown` event.
    // This allows you to drag the window around by its header.
    document.getElementById(element.id + "header").onmousedown = startDragging;
  } else {
    // Step 5: If not present, assign the function directly to the draggable element's `onmousedown` event.
    // This allows you to drag the window by holding down anywhere on the window.
    element.onmousedown = startDragging;
  }

  // Step 6: Define the `startDragging` function to capture the initial mouse position and set up event listeners.
  function startDragging(e) {
    e = e || window.event;
    e.preventDefault();
    // Step 7: Get the mouse cursor position at startup.
    initialX = e.clientX;
    initialY = e.clientY;
    // Step 8: Set up event listeners for mouse movement (`elementDrag`) and mouse button release (`closeDragElement`).
    document.onmouseup = stopDragging;
    document.onmousemove = dragElement;
  }

  // Step 9: Define the `elementDrag` function to calculate the new position of the element based on mouse movement.
  function dragElement(e) {
    e = e || window.event;
    e.preventDefault();
    // Step 10: Calculate the new cursor position.
    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;
    // Step 11: Update the element's new position by modifying its `top` and `left` CSS properties.
    element.style.top = (element.offsetTop - currentY) + "px";
    element.style.left = (element.offsetLeft - currentX) + "px";
  }

  // Step 12: Define the `stopDragging` function to stop tracking mouse movement by removing the event listeners.
  function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

var welcomeScreen = document.querySelector("#welcome")
function closeWindow(element) {
  if (element) {
    element.style.display = "none"
  }
}
function openAllWindows() {
  document.querySelectorAll(".welcome").forEach(function(windowElement) {
    openWindow(windowElement);
  });
}
var welcomeScreenClose = document.querySelector("#welcomeclose")

var welcomeScreenOpen = document.querySelector("#welcomeopen")

welcomeScreenClose.addEventListener("click", function() {
  closeWindow(welcomeScreen);
});

welcomeScreenOpen.addEventListener("click", function() {
  openAllWindows();
});


var selectedIcon = undefined

function selectIcon(element) {
  if (element) {
    element.classList.add("selected");
    selectedIcon = element
  }
} 

function deselectIcon(element) {
  if (element) {
    element.classList.remove("selected");
  }
  selectedIcon = undefined
} 

function handleIconTap(element, windowElement) {
  if (!element || !windowElement) {
    return;
  }

  if (element.classList.contains("selected")) {
    deselectIcon(element);
    closeWindow(windowElement);
  } else {
    selectIcon(element);
    openWindow(windowElement);
  }
}

dragElement(document.querySelector("#textpad"))

var textpadScreen = document.querySelector("#textpad")
var textpadIcon = document.querySelector("#textpadicon")

var textpadScreenClose = document.querySelector("#textpadclose")

textpadScreenClose.addEventListener("click", () => closeWindow(textpadScreen));

if (textpadIcon) {
  textpadIcon.addEventListener("click", () => {
    handleIconTap(textpadIcon, textpadScreen);
  });
}

var biggestIndex = 1;
var topBar = document.querySelector("#top")

function handleWindowTap(element) {
  biggestIndex++;  // Increment biggestIndex by 1
  element.style.zIndex = biggestIndex;
  topBar.style.zIndex = biggestIndex + 1;
}

function addWindowTapHandling(element) {
  if (element) {
    element.addEventListener("mousedown", () => handleWindowTap(element));
  }
}

function openWindow(element) {
  if (element) {
    element.style.display = "flex";
    biggestIndex++;  // Increment biggestIndex by 1
    element.style.zIndex = biggestIndex;
    topBar.style.zIndex = biggestIndex + 1;
  }
}

// Add click handling to bring windows to front
addWindowTapHandling(welcomeScreen);
addWindowTapHandling(textpadScreen);



var content = [
  {
    title: "TeXtpad bottombar",
    date: "Welcome",
    content: `
        <h1 style="margin: 4px; color: rgb(16, 255, 28)">TeXtpad</h1>
        <img style="width: 128px; height: 128px; border-radius: 16px; object-fit: cover;" src="./textpad.png"/>
        <p>Hello <strong>user</strong>! This is a simple text editor, like notepad, but in KuuppaOS (except it doesn't support multiple notes)</p>
        <textarea style="width: 256px; height: 128px; resize: none;" id="textarea" autofocus spellcheck="false"></textarea>
      `
  }


  ,{
    title: "Sample Text",
    date: "11/07/2026",
    content: `
        <p>
          KuuppaOS is the best :D
        </p>
      `
  }
];

function attachTextpadEditor() {
  const textarea = document.getElementById('textarea');
  if (!textarea) {
    return;
  }

  const savedText = localStorage.getItem('myTextareaContent');
  if (savedText !== null) {
    textarea.value = savedText;
  }

  textarea.oninput = function() {
    localStorage.setItem('myTextareaContent', textarea.value);
  };
}

function setTextpadContent(index) {
  var textpadContent = document.querySelector("#textpadContent");
  if (!textpadContent || !content[index]) {
    return;
  }

  textpadContent.innerHTML = content[index].content;
  attachTextpadEditor();
}

function addToBottomBar(index) {
  var bottomBar = document.querySelector("#bottomBar");
  if (!bottomBar || !content[index]) {
    return;
  }

  var note = content[index];
  var newDiv = document.createElement("div");
  newDiv.style.cssText = "background-color: rgb(231, 25, 25); width: 220px; padding: 10px; border-radius: 8px; cursor: pointer;";
  newDiv.innerHTML = `
    <p style="margin: 0px;">${note.title}</p>
    <p style="font-size: 12px; margin: 0px;">${note.date}</p>
  `;
  newDiv.addEventListener("click", function() {
    setTextpadContent(index);
  });

  bottomBar.appendChild(newDiv);
}

setTextpadContent(0);

for (let i = 0; i < content.length; i++) {
  addToBottomBar(i);
}

