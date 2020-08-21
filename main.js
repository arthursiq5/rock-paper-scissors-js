"use strict";

const Options = (function() {
	function randomizeArray(max){
		return Math.floor(Math.random() * max);
	}

	let Options = {
		rock: {
			option: '[OPTION] ROCK',
			toHtml: '<i class="fas fa-hand-rock"></i> Rock'
		},
		paper: {
			option: '[OPTION] PAPER',
			toHtml: '<i class="fas fa-hand-paper"></i> Paper'
		},
		scissors: {
			option: '[OPTION] SCISSORS',
			toHtml: '<i class="fas fa-hand-scissors"></i> Scissors'
		},
	}

	Options.getOptions = function() {
		return [
			this.rock,
			this.paper,
			this.scissors
		];
	}

	Options.computerPlay = function() {
		let arr = this.getOptions();
		return arr[randomizeArray(arr.length)];
	}

	Options.isPaper = function(option){
		return option.option === this.paper.option;
	}

	Options.isRock = function(option){
		return option.option === this.rock.option;
	}

	Options.isScissors = function(option){
		return option.option === this.scissors.option;
	}

	return Options;
})();

const Game = (function(){
	let tagResult = document.getElementById("result");
	
	const resetTag = () => {
		if(tagResult.classList.contains("alert-danger"))
			tagResult.classList.remove("alert-danger");
		if(!tagResult.classList.contains("alert"))
			tagResult.classList.add("alert");
		if(tagResult.classList.contains("alert-success"))
			tagResult.classList.remove("alert-success");
		if(tagResult.classList.contains("alert-dark"))
			tagResult.classList.remove("alert-dark");
	}

	const victory = (player, comp) => {
		resetTag();
		tagResult.classList.add("alert-success");
		tagResult.innerHTML = `Victory<br> you: ${player.toHtml} x computer: ${comp.toHtml}`;
	}

	const draw = (player, comp) => {
		resetTag();
		tagResult.classList.add("alert-dark");
		tagResult.innerHTML = `Draw<br> you: ${player.toHtml} x computer: ${comp.toHtml}`;	
	}

	const defeat = (player, comp) => {
		resetTag();
		tagResult.classList.add("alert-danger");
		tagResult.innerHTML = `Defeat<br> you: ${player.toHtml} x computer: ${comp.toHtml}`;	
	}

	const isDraw = (playerSelection, computerSelection) => {
		return (Options.isPaper(playerSelection) && Options.isPaper(computerSelection))
			|| (Options.isRock(playerSelection) && Options.isRock(computerSelection))
			|| (Options.isScissors(playerSelection) && Options.isScissors(computerSelection));
	}

	const isVictory = (playerSelection, computerSelection) => {
		return (Options.isPaper(playerSelection) && Options.isRock(computerSelection))
			|| (Options.isRock(playerSelection) && Options.isScissors(computerSelection))
			|| (Options.isScissors(playerSelection) && Options.isPaper(computerSelection));
	}

	const isDefeat = (playerSelection, computerSelection) => {
		return (Options.isRock(playerSelection) && Options.isPaper(computerSelection))
			|| (Options.isScissors(playerSelection) && Options.isRock(computerSelection))
			|| (Options.isPaper(playerSelection) && Options.isScissors(computerSelection));
	}

	class Game {
		playRound(playerSelection, computerSelection){
			if(isDraw(playerSelection, computerSelection)){
				draw(playerSelection, computerSelection);
			}else if(isVictory(playerSelection, computerSelection)){
				victory(playerSelection, computerSelection);
			}else if(isDefeat(playerSelection, computerSelection)){
				defeat(playerSelection, computerSelection);
			}else{
				resetTag();
			}
		}
		play(selection){
			let computer = Options.computerPlay()
			this.playRound(selection, computer);
		}

	}

	return new Game();
})();


window.onload =  function(e){
	let rock = document.getElementById("rock");
	let paper = document.getElementById("paper");
	let scissors = document.getElementById("scissors");

	rock.addEventListener("click", function(event){
		event.preventDefault();
		Game.play(Options.rock);
	});

	paper.addEventListener("click", function(event){
		event.preventDefault();
		Game.play(Options.paper);
	});

	scissors.addEventListener("click", function(event){
		event.preventDefault();
		Game.play(Options.scissors);
	});

};
