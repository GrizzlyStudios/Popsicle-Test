//JavaScript Document
//                   --Variables--
//  ** Upgrades **
//Suns
let sunUpgradeCost = 2;
let sunClicks = 0;
let sunAmount = 0;
let sunCPS = 0;
//Seagulls
let seaGullUpgradeCost = 12;
let SeaGullCPS = 0
let seaGullClicks = 0;
let seagullAmount = 0;
//Dogs
let dogUpgradeCost = 156;
let dogCPS = 0;
let dogClicks = 0;
let dogAmount = 0;
//Popsicle Stand
let popsicleStandUpgradeCost = 1246;
let popsicleStandCPS = 0;
let popsicleStandClicks = 0;
let popsicleStandAmount = 0;
//Bigger Popsicle
let PopsicleUpgradeCost = 15;
let PopsicleLevel = 1;
let maxPopsicleLevel = 3;
let pointsPerPopsicle = 1;
//Bigger Wings
let biggerWingsUpgradeCost = 150;                                              
let SeaGullLevel = 1;
//
//  **Popsicles and Clicks**
//total popsicles accumulated in all time
let popsicles = 0;
//total amount of popsicles spent
let popsiclesSpent = 0;
//total amount of popsicles
let popsicleNumber = 0;
//Mouse Clicks
let Clicks = 0;
//sunClicks and clicks combined
let AllClicks = 0;
//All Clicks By Towers (not mouse and not sun)
let AllTowerClicks = 0;
//Height of popsicle 1-10
let heightMultiplier = 10;
//Complicated math stuff
let level = 5;
let levelUp = 0;
//Color of popsicle
let hue = 0;
//
//  **Miscellaneous**
var showingUpgrades = false;
let Name = "Change Name Here";
var userInput = document.getElementById("newName").value;
let showingSettings = false;
//frame resize
let height = (heightMultiplier / 10) * 0.73 * window.innerHeight + "px";
//
//  **Game-Loop and Background-Loop**
let l = undefined;
//webworker var (background loop)
var w;


//                   --Functions--
//  **Background-Loop and Game-Loop Dependencies**
//runs game loop
function startGameLoop() {
    l = setInterval(gameLoop, 16);
}
//
//runs background loop
function startWebworker() {
    w = new Worker("Scripts/BackgroundLoop.js");
}
//
//stops game loop
function stopGameLoop() {
    clearInterval(l);
    l = null;
}
//
//stops background loop
function stopWebWorker() {
    w.terminate();
    w = undefined;
}
//
//  **Upgrades**
//called when sun is upgraded. Idly "melts" popsicle 
function upgradeSun() {
    if (sunUpgradeCost <= popsicleNumber) {
        sunAmount += 1;
        sunCPS += 0.00333333333334;
        sunAmount += 1;
        popsiclesSpent += sunUpgradeCost;
        sunUpgradeCost = Math.ceil(sunUpgradeCost * 1.15);
        levelUp = (Math.floor(((AllClicks)) / 10) * pointsPerPopsicle);
    }
}
//
//called when dog is upgraded. Idly upticks popsicle value
function upgradedog() {
    if (dogUpgradeCost <= popsicleNumber) {
        dogCPS += 0.1333333333336;
        dogAmount += 1;
        popsiclesSpent += dogUpgradeCost;
        dogUpgradeCost = Math.ceil(dogUpgradeCost * 1.15);
    }
}
//
//called when "bigger wings" has been upgraded. Increases points gained per seagull
function biggerWings() {
    if (biggerWingsUpgradeCost <= popsicleNumber) {
        SeaGullLevel += 1;
        popsiclesSpent += biggerWingsUpgradeCost;
        biggerWingsUpgradeCost = Math.ceil(Math.pow(biggerWingsUpgradeCost, 1.32));
    }
}
//
//called when "bigger popsicle" has been upgraded. Increases points gained per popsicle
function upgradePopsicle() {
    if (PopsicleUpgradeCost <= popsicleNumber) {
        PopsicleLevel += 1;
        pointsPerPopsicle = pointsPerPopsicle * 2;
        popsiclesSpent += PopsicleUpgradeCost;
        PopsicleUpgradeCost = Math.ceil(Math.pow(PopsicleUpgradeCost, 1.45));
        levelUp = (Math.floor(((AllClicks)) / 10) * pointsPerPopsicle);
    }
}
//
//called when "seagull" has been upgraded. Idly upticks popsicle value
function upgradeSeaGull() {
    if (seaGullUpgradeCost <= popsicleNumber) {
        seagullAmount += 1;
        SeaGullCPS += 0.0166666666667;
        popsiclesSpent += seaGullUpgradeCost;
        seaGullUpgradeCost = Math.ceil(1.16 * seaGullUpgradeCost);
    }

}
//
//called when "popsicle stand" has been upgraded. Idly upticks popsicle value
function upgradepopsicleStand() {
    if (popsicleStandUpgradeCost <= popsicleNumber) {
        popsicleStandCPS += 1.0666666664;
        popsicleStandAmount += 1;
        popsiclesSpent += popsicleStandUpgradeCost;
        popsicleStandUpgradeCost = Math.ceil(popsicleStandUpgradeCost * 1.15);
    }
}
//
//  **Show Divs (Ex. Upgrades-Div and Settings-Div)**
//shows and hides the shop
function show() {
    if (showingUpgrades == false) {
        document.getElementById("UpgradesDiv").style.visibility = "visible";
        showingUpgrades = true;
    } else {
        document.getElementById("UpgradesDiv").style.visibility = "hidden";
        showingUpgrades = false;
    }
}
//
//shows and hides settings
function showSettings() {
    if (showingSettings == false) {
        document.getElementById("SettingsDiv").style.visibility = "visible";
        showingSettings = true;
    } else {
        document.getElementById("SettingsDiv").style.visibility = "hidden";
        showingSettings = false;
    }
}
//
//shows and hides name change overlay
function showOverlay() {
    document.getElementById("overlay").style.display = "block";
}
//
//hides change name overlay
function hideOverlay() {
    document.getElementById("overlay").style.display = "none";
}
//
//  **Game Saves**
//inputs saved values into the variables
function loadGame() {
    var savedGame = JSON.parse(localStorage.getItem("gameSave"));
    if (typeof savedGame.popsicleStandAmount !== "undefined") {
        popsicleStandAmount = savedGame.popsicleStandAmount;
    }
    if (typeof savedGame.popsicleStandClicks !== "undefined") {
        popsicleStandClicks = savedGame.popsicleStandClicks;
    }
    if (typeof savedGame.popsicleStandUpgradeCost !== "undefined") {
        popsicleStandUpgradeCost = savedGame.popsicleStandUpgradeCost;
    }
    if (typeof savedGame.popsicleStandCPS !== "undefined") {
        popsicleStandCPS = savedGame.popsicleStandCPS;
    }

    if (typeof savedGame.SeaGullLevel !== "undefined") {
        SeaGullLevel = savedGame.SeaGullLevel;
    }
    if (typeof savedGame.Name !== "undefined") {
        Name = savedGame.Name;
    }
    if (typeof savedGame.sunCPS !== "undefined") {
        sunCPS = savedGame.sunCPS;
    }
    if (typeof savedGame.SeaGullCPS !== "undefined") {
        SeaGullCPS = savedGame.SeaGullCPS;
    }
    if (typeof savedGame.seagullAmount !== "undefined") {
        seagullAmount = savedGame.seagullAmount;
    }
    if (typeof savedGame.PopsicleLevel !== "undefined") {
        PopsicleLevel = savedGame.PopsicleLevel;
    }
    if (typeof savedGame.sunAmount !== "undefined") {
        sunAmount = savedGame.sunAmount;
    }
    if (typeof savedGame.Clicks !== "undefined") {
        Clicks = savedGame.Clicks;
    }
    if (typeof savedGame.sunClicks !== "undefined") {
        sunClicks = savedGame.sunClicks;
    }
    if (typeof savedGame.AllClicks !== "undefined") {
        AllClicks = savedGame.AllClicks;
    }
    if (typeof savedGame.seaGullClicks !== "undefined") {
        seaGullClicks = savedGame.seaGullClicks;
    }
    if (typeof savedGame.AllTowerClicks !== "undefined") {
        AllTowerClicks = savedGame.AllTowerClicks;
    }
    if (typeof savedGame.heightMultiplier !== "undefined") {
        heightMultiplier = savedGame.heightMultiplier;
    }
    if (typeof savedGame.level !== "undefined") {
        level = savedGame.level;
    }
    if (typeof savedGame.hue !== "undefined") {
        hue = savedGame.hue;
    }
    if (typeof savedGame.pointsPerPopsicle !== "undefined") {
        pointsPerPopsicle = savedGame.pointsPerPopsicle;
    }
    if (typeof savedGame.PopsicleUpgradeCost !== "undefined") {
        PopsicleUpgradeCost = savedGame.PopsicleUpgradeCost;
    }
    if (typeof savedGame.sunUpgradeCost !== "undefined") {
        sunUpgradeCost = savedGame.sunUpgradeCost;
    }
    if (typeof savedGame.seaGullUpgradeCost !== "undefined") {
        seaGullUpgradeCost = savedGame.seaGullUpgradeCost;
    }
    if (typeof savedGame.levelUp !== "undefined") {
        levelUp = savedGame.levelUp;
    }
    if (typeof savedGame.popsicles !== "undefined") {
        popsicles = savedGame.popsicles;
    }
    if (typeof savedGame.popsiclesSpent !== "undefined") {
        popsiclesSpent = savedGame.popsiclesSpent;
    }
    if (typeof savedGame.popsicleNumber !== "undefined") {
        popsicleNumber = savedGame.popsicleNumber;
    }
    if (typeof savedGame.sunAmount !== "undefined") {
        sunAmount = savedGame.sunAmount;
    }
    if (typeof savedGame.biggerWingsUpgradeCost !== "undefined") {
        biggerWingsUpgradeCost = savedGame.biggerWingsUpgradeCost;
    }
    if (typeof savedGame.dogAmount !== "undefined") {
        dogAmount = savedGame.dogAmount;
    }
    if (typeof savedGame.dogClicks !== "undefined") {
        dogClicks = savedGame.dogClicks;
    }
    if (typeof savedGame.dogUpgradeCost !== "undefined") {
        dogUpgradeCost = savedGame.dogUpgradeCost;
    }
    if (typeof savedGame.dogCPS !== "undefined") {
        dogCPS = savedGame.dogCPS;
    }

    document.getElementById("name").innerHTML = Name
    w.postMessage({
        sunCPS: sunCPS,
        dogCPS: dogCPS,
        SeaGullCPS: SeaGullCPS,
        sunClicks: sunClicks,
        dogClicks: dogClicks,
        AllTowerClicks: AllTowerClicks,
        popsicleStandCPS: popsicleStandCPS,
        popsicleStandClicks: popsicleStandClicks,
        SeaGullLevel: SeaGullLevel
    })
}
//
//saves current variable states to local storage
function saveGame() {
    var gameSave = {
        dogAmount: dogAmount,
        dogClicks: dogClicks,
        dogUpgradeCost: dogUpgradeCost,
        dogCPS: dogCPS,
        popsicleStandAmount: popsicleStandAmount,
        popsicleStandClicks: popsicleStandClicks,
        popsicleStandUpgradeCost: popsicleStandUpgradeCost,
        popsicleStandCPS: popsicleStandCPS,
        SeaGullLevel: SeaGullLevel,
        Name: Name,
        Clicks: Clicks,
        sunClicks: sunClicks,
        AllClicks: AllClicks,
        seagullAmount: seagullAmount,
        sunAmount: sunAmount,
        PopsicleLevel: PopsicleLevel,
        seaGullClicks: seaGullClicks,
        AllTowerClicks: AllTowerClicks,
        heightMultiplier: heightMultiplier,
        level: level,
        levelUp: levelUp,
        sunCPS: sunCPS,
        SeaGullCPS: SeaGullCPS,
        hue: hue,
        pointsPerPopsicle: pointsPerPopsicle,
        PopsicleUpgradeCost: PopsicleUpgradeCost,
        seaGullUpgradeCost: seaGullUpgradeCost,
        sunUpgradeCost: sunUpgradeCost,
        popsicles: popsicles,
        popsiclesSpent: popsiclesSpent,
        popsicleNumber: popsicleNumber,
        sunAmount: sunAmount,
        biggerWingsUpgradeCost: biggerWingsUpgradeCost
    }
    localStorage.setItem("gameSave", JSON.stringify(gameSave))
}
//
//clears local storage and resets variables
function clearSave() {
    //stop all loops
    stopGameLoop();
    stopWebWorker();
    //clear old data
    localStorage.clear();
    //set vars to defualt
    Name = "Change Name Here";
    biggerWingsUpgradeCost = 150;
    dogAmount = 0;
    dogClicks = 0;
    dogUpgradeCost = 156;
    dogCPS = 0;
    popsicleStandAmount = 0;
    popsicleStandClicks = 0;
    popsicleStandUpgradeCost = 1246;
    popsicleStandCPS = 0;
    Clicks = 0;
    sunClicks = 0;
    AllClicks = 0;
    seagullAmount = 0;
    PopsicleLevel = 1;
    SeaGullLevel = 1;
    sunAmount = 0;
    seaGullClicks = 0;
    AllTowerClicks = 0;
    heightMultiplier = 10;
    level = 5;
    levelUp = 0;
    hue = 0;
    pointsPerPopsicle = 1;
    PopsicleUpgradeCost = 15;
    sunUpgradeCost = 2;
    seaGullUpgradeCost = 12;
    popsicles = 0;
    popsiclesSpent = 0;
    popsicleNumber = 0;
    sunAmount = 0;
    showingUpgrades = false;
    sunCPS = 0;
    SeaGullCPS = 0;
    //save new (defualt) values
    saveGame();
    //start all loops
    startWebworker();
    startGameLoop();
    //load new (defualt) data
    loadGame();
}
//
//  **Micellaneous**
//resizes popsicle to correct size
function resize() {
    height = (heightMultiplier / 10) * 0.63 * window.innerHeight + "px";

    //apply height vars
    document.getElementById("PopsicleTop").style.setProperty('--height', height);
}
//
//spawns seagulls in the background
function spawnseagullAmount() {
    var img = document.createElement('img');
    document.getElementById('body').appendChild(img);
}
//
//Shows +1 popsicle every time popsicle gets to bottom
function popsiclePopup() {
    var img = document.createElement('img');
    img.id = "popsiclePopup";
    img.src = "./Images/+.png";
    img.classList.add("unSelectable");
    img.classList.add("popsiclePopup");
    img.style.position = "absolute";
    img.style.left = "55vw";
    img.style.top = "50vh";
    img.style.transform = "translate(0vmin, 0vmin)";
    img.style.zIndex = "1000";
    img.style.height = "5vmin";
    img.style.opacity = "1";
    document.getElementById('body').appendChild(img);
    setTimeout(function () {
        img.style.height = "15vmin";
    }, 1);
    setTimeout(function () {
        img.style.transform = "translate(20vmin, -20vmin)";
    }, 1);
    setTimeout(function () {
        img.style.height = "7vmin";
    }, 1000);
    setTimeout(function () {
        img.parentNode.removeChild(img);
    }, 2000);
    setTimeout(function () {
        img.style.opacity = "0";
    }, 1000);
}
//
//lets user choose the name of their popsicle stand
function setNewName() {
    userInput = document.getElementById("newName").value;
    document.getElementById("name").innerHTML = userInput;
    Name = document.getElementById("name").value;
}
//
//called when popsicle clicked
function clickFunction() {
    Clicks += 1;
    level = (AllClicks) - (Math.floor(((AllClicks)) / 10) * 10);
    heightMultiplier = 10 - level;
    popsicleNumber = (AllTowerClicks + popsicles) - popsiclesSpent;
    document.getElementById("PopsiclesNumber").innerHTML = "$" + popsicleNumber;
    if ((Math.floor((AllClicks) / 10) * pointsPerPopsicle) > levelUp) {
        hue = (hue + Math.random() * 360);
        document.getElementById("PopsicleTop").style.setProperty('--hue', hue + "deg");
        document.getElementById("PopsicleStickIn").style.setProperty('--hueStick', hue + "deg");
        if (popsicles <= 0) {
            levelUp = (Math.floor(((AllClicks)) / 10) * pointsPerPopsicle);
        } else {
            levelUp = (Math.floor(((AllClicks)) / 10) * pointsPerPopsicle);
        }

        popsicles += pointsPerPopsicle;
    }

    resize();
}

//                   --Called On Start--
//start loops
startGameLoop();
startWebworker();
//load saved data
loadGame();
//hide shop on start
document.getElementById("UpgradesDiv").style.visibility = "hidden";
document.getElementById("SettingsDiv").style.visibility = "hidden";
document.addEventListener('contextmenu', event => event.preventDefault());

//                   --Game Loop--
//called every frame (60 fps)
//handles basic functions and inputs
function gameLoop() {
    AllClicks = Clicks + sunClicks;
    level = (AllClicks) - (Math.floor(((AllClicks)) / 10) * 10);
    heightMultiplier = 10 - level;
    popsicleNumber = (AllTowerClicks + popsicles) - popsiclesSpent;
    document.getElementById("PopsiclesNumber").innerHTML = "$" + popsicleNumber;
    document.getElementById("PopsicleTop").style.setProperty('--hue', hue + "deg");
    document.getElementById("PopsicleTop").src = "Images/Popsicle Top " + Math.min(PopsicleLevel, maxPopsicleLevel) + ".png";
    document.getElementById("PopsicleStickIn").src = "Images/Popsicle Stick " + Math.min(PopsicleLevel, maxPopsicleLevel) + ".png";
    document.getElementById("PopsicleStick").src = "Images/Popsicle Stick Bottom " + Math.min(PopsicleLevel, maxPopsicleLevel) + ".png";
    document.getElementById("PopsicleStickIn").style.setProperty('--hueStick', hue + "deg");
    document.title = (popsicleNumber == 1) ? (popsicleNumber + " popsicle - Popsicle Licker Clicker") : (popsicleNumber + " popsicles - Popsicle Licker Clicker");

    if ((Math.floor(((AllClicks)) / 10) * pointsPerPopsicle) > levelUp) {
        popsiclePopup();
        hue = (hue + Math.random() * 360);
        document.getElementById("PopsicleTop").style.setProperty('--hue', hue + "deg");
        document.getElementById("PopsicleStickIn").style.setProperty('--hueStick', hue + "deg");
        if (popsicles <= 0) {
            levelUp = (Math.floor(((AllClicks)) / 10) * pointsPerPopsicle);
        } else {
            levelUp = (Math.floor(((AllClicks)) / 10) * pointsPerPopsicle);
        }

        popsicles += pointsPerPopsicle;
    }

    resize();
    saveGame();

    w.onmessage = function (e) {
        sunClicks = e.data.sunClicks;
        AllTowerClicks = e.data.AllTowerClicks;
        dogClicks = e.data.dogClicks;
        popsicleStandClicks = e.data.popsicleStandClicks;
    }

    w.postMessage({
        sunCPS: sunCPS,
        dogCPS: dogCPS,
        SeaGullCPS: SeaGullCPS,
        popsicleStandCPS: popsicleStandCPS,
        SeaGullLevel: SeaGullLevel
    })

    //set the cost banners to the cost of each upgrade
    document.getElementById("PopsiclePriceP").innerHTML = "$" + PopsicleUpgradeCost;
    document.getElementById("SunPriceP").innerHTML = "$" + sunUpgradeCost;
    document.getElementById("SeaGullPriceP").innerHTML = "$" + seaGullUpgradeCost;
    document.getElementById("BiggerWingsPriceP").innerHTML = "$" + biggerWingsUpgradeCost;
    document.getElementById("DogPriceP").innerHTML = "$" + dogUpgradeCost;
    document.getElementById("PopsicleStandPriceP").innerHTML = "$" + popsicleStandUpgradeCost;
}