// FireTR-v2 Operational System

// Open Source Project

// FireInc Company 2024

setInterval(() => {
  let date = new Date();

  let hours = date.getHours()
  let minutes = date.getMinutes()
  hours.toString()
  minutes.toString()

  let time1 = hours + ":" + minutes
  const timeEl = document.getElementById("navbar-right")
  timeEl.innerText = time1

  // var iframe = document.getElementById("ifr")
  // var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

  // if (!isDesktopWindowAlreadyCreated) {
    
  //   var brightnessRange = iframeDocument.getElementById("Brightness")
  //   console.log(brightnessRange)
  //   desktop.style.filter = `brightness(${brightnessRange.value}%)`
  // }
}, 100)

function isDesktopWindowAlreadyCreated () {
  const desktopWindows = document.querySelectorAll(".desktopWindow")
  if (desktopWindows.length > 0) {
    return true
  } else {
    return false
  }
} 

function createWindow (event) {
  if (isDesktopWindowAlreadyCreated()) {
    const Dwindow = document.getElementsByClassName("desktopWindow")
    Dwindow[0].remove()
    
  }
  let target = event.target
  let appIcon = null
  if (target.classList.contains('appIcon')) {
    appIcon = target.parentElement
  } else {
    appIcon = target
  }
  const app = appIcon.getAttribute('data-app')
  console.log('Application:', app)

  const element = document.createElement("div")
  element.classList.add("desktopWindow")
  const windowInner = `
  
  <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; background-color: rgba(0, 0, 0, 0.900); height: 30px;">
    <h4 style="margin-left: 10px;">${app}</h4>
    <button id="windowClosingButton" style="margin-right: 10px;">X</button>
  </div>
  <iframe src="apps/${app}.html" id="ifr" sandbox="allow-same-origin allow-scripts" frameborder="0" style="width: 100%; height: calc(100% - 30px);"></iframe>
  
  `

  
  
  element.innerHTML = windowInner
  element.style.width = "600px"
  element.style.height = "400px"
  const desktop = document.getElementById("desktop")
  desktop.appendChild(element)

  const windowClButton = document.getElementById("windowClosingButton")

  windowClButton.addEventListener("click", () => {
    const Dwindow = document.getElementsByClassName("desktopWindow")
    Dwindow[0].remove()
  })
}

let isLaunchOpened = false

function closeOrOpenLaunchWindow() {
  const launchWin = document.getElementById("launch")

  if (isLaunchOpened == false) {
    launchWin.style.display = "block"
    isLaunchOpened = true
  } else {
    launchWin.style.display = "none"
    isLaunchOpened = false
  }
}


function updateDesktopStyle () {
  document.getElementById("desktop").style.width = window.innerWidth + "px"
  document.getElementById("desktop").style.height = window.innerHeight + "px"
  const appIconDivs = document.getElementsByClassName("appIconDiv")
  for (let appIconDiv of appIconDivs) {
    appIconDiv.style.width = (window.innerWidth / 16) + "px"
    appIconDiv.style.height = (window.innerWidth / 16) + "px"
  }
}

const appIconDivs = document.getElementsByClassName("appIconDiv")
for (let appIconDiv of appIconDivs) {
  appIconDiv.addEventListener("click", createWindow)
}

window.addEventListener("resize", updateDesktopStyle)
document.addEventListener("DOMContentLoaded", updateDesktopStyle)
