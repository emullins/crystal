$(document).ready(function () {

	var playerMatchingNumber = 0;
	var randomNum = randomNumGen();
	var wins = 0;
	var losses = 0;
	var crystals = randomNumCrystals();
	
	function randomNumCrystals() {
        return {
            black: {
                value: Math.floor(Math.random() * 12) + 1,
                imageUrl: "assets/photos/black.jpg"
            },
            blue: {
                value: Math.floor(Math.random() * 12) + 1,
                imageUrl: "assets/photos/blue.jpg"
            },
            red: {
                value: Math.floor(Math.random() * 12) + 1,
                imageUrl: "assets/photos/red.jpg"
            },
            yellow: {
                value: Math.floor(Math.random() * 12) + 1,
                imageUrl: "assets/photos/yellow.jpg"
            }
        };
    }

    function randomNumGen() {
        return Math.floor(Math.random() * 101) + 20;
    }

    function newGame() {
        playerMatchingNumber = 0;
        crystals = randomNumCrystals();
        
        randomNum = randomNumGen();
        $("#random-area").text("Number to achieve: " + randomNum);
    }
	
	function updateDom(didUserWin) {
        $("#record-area").empty();

        if (didUserWin === true) {
            $("#record-area").append($("<p>").text("Previous game: Win"));
            newGame();
            renderMatchingNumber();
        }

       else if (didUserWin === false) {
            $("#record-area").append($("<p>").text("Previous game: Loss"));
            newGame();
            renderMatchingNumber();
        }

        var wSpan = $("<span>").text(wins);
        var lSpan = $("<span>").text(losses);
        var pWins = $("<p>").text("Wins: ");
        var pLosses = $("<p>").text("Losses: ");
        pWins.append(wSpan);
        pLosses.append(lSpan);
        $("#record-area").append(pWins);
        $("#record-area").append(pLosses);
    }

 	function renderCrystals() {
        for (var key in crystals) {
            var crystalDiv = $("<div class='crystals-button' data-name='" + key + "'>");
            var crystalImg = $("<img alt='image' class='crystal-img'>").attr("src", crystals[key].imageUrl);
            
            crystalDiv.append(crystalImg);
            $("#crystal-area").append(crystalDiv);
        }
    }

    function updateMatchingNumber(crystal) {

       playerMatchingNumber += crystals[crystal.attr("data-name")].value;
    }

    function renderMatchingNumber() {
        var scoreNumDiv = $("<div id='score-number'>").text(playerMatchingNumber);
        $("#score-area").html();
        $("#score-area").html(scoreNumDiv);
    }

    newGame();
    updateDom();
    renderCrystals();
    renderMatchingNumber();

    $(".crystals-button").on("click", function (event) {

    	updateMatchingNumber($(this));
        renderMatchingNumber();

        if (playerMatchingNumber === randomNum) {

           alert(" You win!")
            wins++;
            newGame();
            updateDom(true);
        }
        else if (playerMatchingNumber > randomNum) {
            alert(" you lose! Try again.")
            losses++;
            newGame();
            updateDom(false);
        }
    });
});