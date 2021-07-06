// Buttons/Divs/Inputs
//Buttons
const actionBtn = document.getElementById("CLICKME");
const refreshBtn = document.getElementById('REFRESH');
const right = document.getElementById('RIGHT');
const left = document.getElementById('LEFT');
const submitImageBtn = document.getElementById('SUBMITIMAGE');
const submitEmailBtn = document.getElementById("SUBMITEMAIL");
//divs
const firstDiv = document.getElementById('FIRSTPAGE');
const arrayHolder = document.getElementById('ARRAYHOLDER')
const emailDiv = document.getElementById("EMAILCONTAINER");
const imageDiv = document.getElementById('IMAGECONTAINER');
const profileDiv = document.getElementById('RANDOMIMAGE');
const showProfilePic = document.getElementById('PROFILEIMAGE');
//Input
const emailInput = document.getElementById('EMAILINPUT');

// Arrays
var profileArr = [];

var imageIDArr = [];

var lastIDs = [];

// Functions/ Event Listeners
actionBtn.addEventListener('click', function(){
    actionBtn.style.display = "none";
    right.style.display = "none";
    arrayHolder.style.display = "none";
    emailDiv.style.display = "block";
});

// Add email Validation
submitEmailBtn.addEventListener('click', validate);

// function for email Validation
function validEmail(email) {
  const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return re.test(email);
}

function validate() {
    const email = emailInput.value;

    if (validEmail(email)) {
        emailInput.style.borderColor = "#F0AA89";
        emailDiv.style.display = "none";
        imageDiv.style.display = "block";
        profileArr.push(email);
        imageDiv.style.left = 'calc(50% - (268px /2))';
        console.log("valid email");
        console.log("email ID's: ",profileArr);
    } else {
        emailInput.style.borderColor = "red";
        console.log("Not a valid email");
    }
  return false;
}

// Fetch Function

const generateImage = () => {
    axios.get('https://picsum.photos/300')
    .then(response => {
        var picID = response.headers['picsum-id'];
        showProfilePic.style.display = "flex";
        submitImageBtn.style.display = "block";
        imageDiv.style.left = "calc(50% - (380px /2))";
        console.log(picID);
        profileDiv.src = `https://picsum.photos/id/${picID}/300`;
        imageIDArr.push(picID);
        console.log("image ID's: ", imageIDArr);
    }).catch(error => console.log("An error has occured", error));
};

refreshBtn.addEventListener('click', generateImage);

const pushImageID = () => {
    let theLastID = imageIDArr.pop();
    lastIDs.push(theLastID);
    console.log("popped ID's: ",lastIDs);
    imageDiv.style.display = 'none';
    actionBtn.style.display = 'block';
    right.style.display = 'block';
    showProfilePic.style.display = 'none';
    submitImageBtn.style.display = 'none';
}


submitImageBtn.addEventListener('click', pushImageID);

// Show emails and images
const moveLeft = () => {
    actionBtn.classList.add('moveLeft');
    right.classList.add('moveLeft');
    left.classList.add('shiftLeft');
    left.classList.add('shiftRightArrow');
    arrayHolder.classList.add('shiftLeft');
    arrayHolder.style.display = 'block';
}
const moveRight = () => {
    actionBtn.classList.remove('moveLeft');
    right.classList.remove('moveLeft');
    left.classList.remove('shiftLeft');
    arrayHolder.classList.remove('shiftLeft');
    left.classList.remove('shiftRightArrow');
    arrayHolder.style.display = 'none';
}
right.addEventListener('click', moveLeft);
left.addEventListener('click', moveRight);

// Pics and email Setup


var addToSection = () => {

    var container = document.getElementById("FLEXED");
    const emailHeader = document.createElement("h5");
    const imageCon = document.createElement("img");

    for (var i = 0; i < profileArr.length; i++) {
        container.appendChild(emailHeader);
        emailHeader.innerHTML = `${profileArr[i]}`;
        console.log(profileArr[i])
        container.appendChild(imageCon);
        imageCon.src = `https://picsum.photos/id/${lastIDs[i]}/300`
    }
}

submitImageBtn.addEventListener('click', addToSection);
