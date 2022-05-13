//JavaScript Document
let sunClicks = 0;
let sunCPS = 0;
let seaGullCPS = 0;
let AllTowerClicksDecimal = 0;
let AllTowerClicks = 0;
let seaGullLevel = 1;
let dogClicks =  0;
let dogCPS = 0;
let popsicleStandClicks =  0;
let popsicleStandCPS = 0;

onmessage = function(e) {
 sunCPS = e.data.sunCPS;
 seaGullCPS = e.data.seaGullCPS;
	dogCPS = e.data.dogCPS;
	popsicleStandCPS = e.data.popsicleStandCPS;
if (e.data.popsicleStandClicks != undefined){
    popsicleStandClicks = e.data.popsicleStandClicks;
  }

  if (e.data.sunClicks != undefined){
    sunClicks = e.data.sunClicks;
  }
  if (e.data.AllTowerClicks != undefined){
    AllTowerClicksDecimal = e.data.AllTowerClicks;
  }
  if (e.data.seaGullLevel != undefined){
    seaGullLevel = e.data.seaGullLevel;
  }
if (e.data.dogClicks != undefined){
    dogClicks = e.data.dogClicks;
  }
}

function timedCount() {
  sunClicks += sunCPS;
	dogClicks += dogCPS;
  popsicleStandClicks += popsicleStandCPS;                         
  AllTowerClicksDecimal += seaGullCPS * seaGullLevel;
  AllTowerClicks = (Math.floor(AllTowerClicksDecimal / seaGullLevel) * seaGullLevel)+ Math.floor(dogClicks) + Math.floor(popsicleStandClicks);
  postMessage({ 
		sunClicks: sunClicks,
	  dogClicks: dogClicks,
		AllTowerClicks: AllTowerClicks,  
	  popsicleStandClicks: popsicleStandClicks
	});
  setTimeout("timedCount()", 16);
}

timedCount();