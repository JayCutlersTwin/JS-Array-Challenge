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

var emailAndImage = [];


// Functions/ Event Listeners
actionBtn.addEventListener('click', function(){
    actionBtn.style.display = "none";
    right.style.display = "none";
    arrayHolder.style.display = "none";
    emailDiv.style.display = "block";

    document.getElementById('FLEXED').innerHTML = '';
});

// Add email Validation
submitEmailBtn.addEventListener('click', validate);

// function for email Validation
function validEmail(email) {
  const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return re.test(email);
}

function validate() {
    const email = emailInput.value.toLowerCase();

    if (validEmail(email)) {
        emailInput.style.borderColor = "#F0AA89";
        emailDiv.style.display = "none";
        imageDiv.style.display = "block";
        profileArr.push(email);
        imageDiv.style.left = 'calc(50% - (268px /2))';
        console.log("valid email");
        // console.log("email ID's: ", profileArr);
    } else {
        emailInput.style.borderColor = "red";
        alert("Email is invalid please try another!");
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
        profileDiv.src = `https://picsum.photos/id/${picID}/300`;
        imageIDArr.push(picID);
    }).catch(error => console.log("An error has occured", error));
};

refreshBtn.addEventListener('click', generateImage);

const pushImageID = () => {
    let theLastID = imageIDArr.pop();
    lastIDs.push(theLastID);
    // console.log("popped ID's: ",lastIDs);
    imageDiv.style.display = 'none';
    actionBtn.style.display = 'block';
    right.style.display = 'block';
    showProfilePic.style.display = 'none';
    submitImageBtn.style.display = 'none';
}

submitImageBtn.addEventListener('click', pushImageID);

// New display and link email/images


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


// var addToSection = () => {
//
//     var container = document.getElementById("FLEXED");
//     const emailHeader = document.createElement("h5");
//     const imageCon = document.createElement("img");
//
//     for (var a = 0; a < emailAndImage.length; a++) {
//         container.appendChild(emailHeader);
//         emailHeader.innerHTML = `${groups}`;
//         console.log(emailAndImage[email])
//         container.appendChild(imageCon);
//         imageCon.src = `https://picsum.photos/id/${lastIDs[b]}/300`
//     }
// }
//
// submitImageBtn.addEventListener('click', addToSection);

// class EmailAndImage {
//     constructor(email, image) {
//         this.email = email;
//         this.image = image;
//     }
// }
//
// var addToSection = () => {
//
//     var container = document.getElementById("FLEXED");
//     const seperateDivs = document.createElement("div");
//     const emailHeader = document.createElement("h5");
//     const imageCon = document.createElement("img");
//
//     for (var i = 0; i < profileArr.length; i++) {
//         if (emailInput.value === profileArr[i]) {
//             container.appendChild(seperateDivs);
//             seperateDivs.appendChild(emailHeader);
//             emailHeader.innerHTML = `${profileArr[i]}`;
//             console.log(profileArr[i])
//             seperateDivs.appendChild(imageCon);
//             imageCon.src = `https://picsum.photos/id/${lastIDs[i]}/300`
//         }
//     }
// }
//
// submitImageBtn.addEventListener('click', addToSection);


const linkEmailImage = () => {
    let emailPop = profileArr.pop();
    let IDPop = lastIDs.pop();
    emailAndImage.push({email: `${emailPop}`, id: `${IDPop}`}); //pushes email and img to another array

    var email_to_values = emailAndImage.reduce(function (obj, item) {
        obj[item.email] = obj[item.email] || [];
        obj[item.email].push(item.id);
        return obj;
    }, {});

    var G = Object.keys(email_to_values).map(function (key) {
        return {email: key, id: email_to_values[key]};
    });
    console.log("Profiles: " + JSON.stringify(G, null, 4));

    //create elements

    var container = document.getElementById("FLEXED");

    for (var b = 0; b < G.length; b++) {
        if (G[b]['email'] === G[b]['email']) {
            const seperateDivs = document.createElement("div");
            const emailHeader = document.createElement("h5");
            container.appendChild(seperateDivs);
            seperateDivs.appendChild(emailHeader);
            emailHeader.innerHTML = G[b].email;

            for (var i = 0; i < G[b]['id'].length; i++) {
                const imageCon = document.createElement("img");
                seperateDivs.appendChild(imageCon);
                imageCon.src = `https://picsum.photos/id/${G[b]['id'][i]}/300`;
            }
        }
    }
}

submitImageBtn.addEventListener('click', linkEmailImage);
