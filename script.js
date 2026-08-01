//document.write("hello")
//vkBridge.send("VKWebAppInit", {});
getServerTime();
let ads_showed = false;
console.log("a")
const numbersText = [
  "один",
  "два",
  "три",
  "четыре",
  "пять",
  "шесть",
  "семь",
  "восемь",
  "девять",
  "десять"
];

document.getElementById("LOL").onclick = () => {
	document.getElementById("LOL").style.display = "none"
}
fonts_ready = async () => {
	fonts = await document.fonts.ready.then(() => {
  // All required fonts are loaded and ready to be used.
  console.log("All document fonts are ready!");
  return true
  // You can now safely manipulate elements or perform actions that depend on font metrics.
  // For example, trigger an animation or update layout.
}).catch(error => {
  console.error("Error loading fonts:", error);
  return false
});
	return fonts
}

function initSound(letter){

	createjs.Sound.registerSound(`./sound/${letter}.mp3`,'letterSound',4)
	
}



initGame = async () => {
	await vkBridge.send("VKWebAppInit", {});
	document.getElementById("LOL").style.display = "none"
	createjs.Sound.registerPlugins([createjs.HTMLAudioPlugin])
	show_baner()
	vk_id = await get_id()
	console.log(vk_id)

}

initGame()


let count = Number(localStorage.count);

if (count === undefined || isNaN(count)){
	count = 0;

}
document.getElementById("current_score").innerText = `Счёт : ${count}`

let number_ask = 1


document.getElementById('order_select').onclick = async () =>{
	number_ask = 1
	document.getElementById('menu').style.display = "none";
	document.getElementById('body').style.display = "flex";
	show_ask()

}

document.getElementById('random_select').onclick = async () =>{
	number_ask = 1
	document.getElementById('menu').style.display = "none";
	document.getElementById('body').style.display = "flex";
	randomAsk()

}


document.getElementById('back_button').onclick = async () =>{
	document.getElementById('body').style.display = "none";
	document.getElementById('menu').style.display = "flex";

}


show_ask = async () =>{
	if (number_ask === 11) {
		number_ask -= 10
	}
	initSound(number_ask-1)
	document.getElementById("ask").onclick = () => {
		createjs.Sound.play('letterSound')
	}

	document.getElementById("ask").innerText = numbersText[number_ask-1]
	let answers_arr = [0,1,2]
	let stateAnswer = getRandomIntInclusive(0,2)
	answers_arr.splice(stateAnswer, 1)
	let randomAnswer2 = getRandomIntInclusive(1,10)
	let randomAnswer3 = getRandomIntInclusive(1,10)
	let stageAnswer2 = true
	let stageAnswer3 = true
	if (randomAnswer2 === number_ask) {
		while (stageAnswer2){
			if (randomAnswer2 === number_ask){
				randomAnswer2 = getRandomIntInclusive(1,10);
			}else{
				stageAnswer2 = false;
			}

		}
	}

	if (randomAnswer3 === number_ask || randomAnswer3 === randomAnswer2) {
		while (stageAnswer3){
			if (randomAnswer3 === number_ask || randomAnswer3 === randomAnswer2) {
				while (stageAnswer3){
					if (randomAnswer3 === number_ask || randomAnswer3 === randomAnswer2){
						randomAnswer3 = getRandomIntInclusive(1,10);
					}else{
						stageAnswer3 = false;
					}

				}
			}			
		}
	}


	console.log(number_ask,randomAnswer2, randomAnswer3)
	console.log(answers_arr)
	document.getElementsByClassName("button")[stateAnswer].innerText = number_ask;
	document.getElementsByClassName("button")[stateAnswer].onclick = () => {
		number_ask++;
		show_ask();
		count++;
		localStorage.count = count;
		document.getElementById("header").innerText = "Правильно"
		document.getElementById("current_score").innerText = `Счёт : ${count}`
		animateGoodAnswer(document.getElementsByClassName("button")[stateAnswer])
		//playsound
		//changecolors
	}
	document.getElementsByClassName("button")[answers_arr[0]].innerText = randomAnswer2;
	document.getElementsByClassName("button")[answers_arr[0]].onclick = () => {
		document.getElementById("header").innerText = "Неправильно"
		animateBadAnswer(document.getElementsByClassName("button")[answers_arr[0]])
		//playsound
	}	
	document.getElementsByClassName("button")[answers_arr[1]].innerText = randomAnswer3;
	document.getElementsByClassName("button")[answers_arr[1]].onclick = () => {
		document.getElementById("header").innerText = "Неправильно"
		animateBadAnswer(document.getElementsByClassName("button")[answers_arr[1]])
		//playsound
	}
}



randomAsk = () => {
	number_ask = getRandomIntInclusive(1,10)
	initSound(number_ask-1)
	document.getElementById("ask").innerText = numbersText[number_ask-1]
	document.getElementById("ask").onclick = () => {
		createjs.Sound.play('letterSound')
	}
	let answers_arr = [0,1,2]
	let stateAnswer = getRandomIntInclusive(0,2)
	answers_arr.splice(stateAnswer, 1)
	let randomAnswer2 = getRandomIntInclusive(1,10)
	let randomAnswer3 = getRandomIntInclusive(1,10)
	let stageAnswer2 = true
	let stageAnswer3 = true
	if (randomAnswer2 === number_ask) {
		while (stageAnswer2){
			if (randomAnswer2 === number_ask){
				randomAnswer2 = getRandomIntInclusive(0,9);
			}else{
				stageAnswer2 = false;
			}

		}
	}

	if (randomAnswer3 === number_ask || randomAnswer3 === randomAnswer2) {
		while (stageAnswer3){
			if (randomAnswer3 === number_ask || randomAnswer3 === randomAnswer2) {
				while (stageAnswer3){
					if (randomAnswer3 === number_ask || randomAnswer3 === randomAnswer2){
						randomAnswer3 = getRandomIntInclusive(0,9);
					}else{
						stageAnswer3 = false;
					}

				}
			}			
		}
	}


	console.log(number_ask,randomAnswer2, randomAnswer3)
	console.log(answers_arr)
	document.getElementsByClassName("button")[stateAnswer].innerText = number_ask;
	document.getElementsByClassName("button")[stateAnswer].onclick = () => {
		number_ask++;
		count++;
		localStorage.count = count;
		randomAsk();
		document.getElementById("header").innerText = "Правильно"
		document.getElementById("current_score").innerText = `Счёт : ${count}`
		animateGoodAnswer(document.getElementsByClassName("button")[stateAnswer])
		//playsound
		//changecolors
	}
	document.getElementsByClassName("button")[answers_arr[0]].innerText = randomAnswer2;
	document.getElementsByClassName("button")[answers_arr[0]].onclick = () => {
		document.getElementById("header").innerText = "Неправильно"
		animateBadAnswer(document.getElementsByClassName("button")[answers_arr[0]])
		//playsound
	}	
	document.getElementsByClassName("button")[answers_arr[1]].innerText = randomAnswer3;
	document.getElementsByClassName("button")[answers_arr[1]].onclick = () => {
		document.getElementById("header").innerText = "Неправильно"
		animateBadAnswer(document.getElementsByClassName("button")[answers_arr[1]])
		//playsound
	}
}



animateGoodAnswer = (btn) => {
		btn.style.backgroundColor = "#32CD32"; 
		document.getElementById("ask").style.backgroundColor = "#32CD32"; 
		setTimeout(function(){
			btn.style.backgroundColor = "#FFF";
			document.getElementById("ask").style.backgroundColor = "#38dfd0"; 
							
		  									}, 100)
}
animateBadAnswer = (btn) => {
		btn.style.backgroundColor = "#F77"; 
		document.getElementById("ask").style.backgroundColor = "#F77"; 
		setTimeout(function(){
			btn.style.backgroundColor = "#FFF";
			document.getElementById("ask").style.backgroundColor = "#38dfd0"; 
							
		  									}, 100)
}

function getRandomIntInclusive(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1)) + minCeiled; 
}


document.getElementById('buy_subscribe').onclick = async () => {
	await open_pay_windows(vk_id)
}