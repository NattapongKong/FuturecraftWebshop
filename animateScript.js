//declare Page Elements
var i = 0;
const navBar = document.getElementById("navBar"),
    staffBg = document.getElementById("staffBg"),
    logo = document.getElementById("logo"),
    backgroundImage = document.getElementById("coverImage"),
    section = document.getElementsByTagName("section"),
    floatingCon = document.getElementById("flotingContainer"),
    secOneContent = document.getElementById("secOneContent");

var txt = 'play.juanperfect.xyz'; /* The text */
var speed = 70; /* The speed/duration of the effect in milliseconds */
//declare initial window width and Height
const initialWindowOffset = {
    height: window.innerHeight,
    width: window.innerWidth,
};
//update canvas function for resposive web
function calculatedwindowProperty() {
    windowOffset = window.pageYOffset,
        windowHeight = window.innerHeight,//get Client window Height.
        windowWidth = window.innerWidth
    windownXRatio = windowWidth / initialWindowOffset.width,
        windownYRatio = windowHeight / initialWindowOffset.height,
        yOffsetRatio = windowOffset / this.windowHeight;

    return {
        windownXRatio,
        windownYRatio,
        windowOffset,
        windowHeight,
        windowWidth,
        yOffsetRatio
    }
}
//property object of each Element.
logoProperty = {//initial Property of logo Element
    logoH: logo.clientHeight,
    logoW: logo.clientWidth,
    logoOffset: logo.getBoundingClientRect(),//get the initial offset
    logoFinalHeight: 72, //config the final height in px of logo here used 72 px cuz it will be fit on navbar
    logoPadding: [20, 0], //config the final padding in px of logo [x,y]
    logoCenterPos: function () {//find elem Position of its center.
        YPos = this.logoOffset.top + this.logoH / 2,//get the Y distance of logo element
            XPos = this.logoOffset.left + this.logoW / 2;//get the X distance of logo element
        return {
            XPos, YPos
        };
    },
    calculatedLogoProperty: function (yOffset) {//Calculate The final Position Of The Element
        let scale = 1 - ((1 - (this.logoFinalHeight / this.logoH)) * yOffset),
            xPos = (((this.logoCenterPos().XPos * calculatedwindowProperty().windownXRatio) - ((this.logoW * scale) / 2)) * yOffset) - this.logoPadding[0];
        yPos = (((this.logoCenterPos().YPos * calculatedwindowProperty().windownYRatio) - ((this.logoH * scale) / 2)) * yOffset) - this.logoPadding[1];
        return {
            scale, xPos, yPos
        };
    }
}
function typeWriter() {
    if (i < txt.length) {
        currentChar = txt.charAt(i);
        document.getElementById("txtField").value += currentChar;
        i++;
        setTimeout(typeWriter, speed);
    }
}
function elemOffset(yOffset, y, h) {//styling elem function 
    if (y < h) {//first Section
        logo.style.transform = "translate(-" + logoProperty.calculatedLogoProperty(yOffset, calculatedwindowProperty().windownYRatio, null).xPos + "px , -" + logoProperty.calculatedLogoProperty(yOffset, null, calculatedwindowProperty().windownYRatio).yPos + "px) scale(" + logoProperty.calculatedLogoProperty(yOffset).scale + ")";
        backgroundImage.style.filter = "blur(" + 20 * yOffset + "px)";
        secOneContent.style.transform = "translate( 0, " + 200 * yOffsetRatio + "px)";
        secOneContent.style.opacity = "" + (1 - yOffset * 3) + "";
        navBar.classList.remove("navToggle");
    }
    else {
        navBar.classList.add("navToggle");
        logo.style.transform = "translate(-" + logoProperty.calculatedLogoProperty(1).xPos + "px , -" + logoProperty.calculatedLogoProperty(1).yPos + "px) scale(" + logoProperty.calculatedLogoProperty(1).scale + ")";
    }

    for (let i = 0; i < section.length; i++) {
        let sectionOffset = y + section[i].getBoundingClientRect().top,
            j = 0;
        if ((section[i].getBoundingClientRect().top >= 0 && section[i].getBoundingClientRect().top <= h / 2) || (section[i].getBoundingClientRect().bottom <= h / 3 && section[i].getBoundingClientRect().bottom >= 0)) {
            section[i].classList.add("secShow" + (i + 1));
            if (i == 4) {
                j += 1
                if (j == 1) {
                    typeWriter();
                }
            }
        }

    }
}

window.addEventListener('scroll', function () {
    elemOffset(calculatedwindowProperty().yOffsetRatio, calculatedwindowProperty().windowOffset, calculatedwindowProperty().windowHeight);
    console.log("huh");
});
window.addEventListener('resize', function () {
    if (window.innerWidth < 1100) {
        location.replace("error.html")
    }
    elemOffset(calculatedwindowProperty().yOffsetRatio, calculatedwindowProperty().windowOffset, calculatedwindowProperty().windowHeight);
});
function scrollFuntion() {
    window.scrollTo({ top: calculatedwindowProperty().windowHeight, behavior: 'smooth' });
}

elemOffset(calculatedwindowProperty().yOffsetRatio, calculatedwindowProperty().windowOffset, calculatedwindowProperty().windowHeight);