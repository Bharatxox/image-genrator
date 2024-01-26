const input = document.getElementById("text");
const button = document.getElementById("btn");
const cont = document.querySelector(".container");
const showMore = document.getElementById("showMore");
let page = 1;

button.addEventListener('click',fetchImage);
showMore.addEventListener('click',fetchImage);

function fetchImage(e){
    console.log(e);
    if (e.target.id === 'btn') {
        cont.innerHTML = '';
        page = 1;
    }
    let inputData = input.value;
    page += 1;
    let accessKey = "aK-nAo7OdXTdidKA5L2zxuIfI63-ZHl9-vfPyLAHUJ4";
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    fetch(url)
        .then(
            (response) => response.json()
        )
        .then(
            (parsedResponse) => {
                // console.log(parsedResponse);
                const result = parsedResponse.results;
                for (let i=0; i<result.length; i++) {
                    console.log(result[i]);
                    const eachImage = result[i].urls.raw;
                    // create the element fig and img
                    const image = document.createElement('img');
                    const figure = document.createElement('figure');
                    const heading = document.createElement('div');
                    const text = document.createElement('p');
                    // add css to heading and p
                    heading.classList.add('heading')
                    // set the attribute of the image
                    image.setAttribute('src',eachImage);
                    text.innerHTML = result[i].alt_description;
                    // append the child into fig and cont
                    figure.append(image);
                    figure.append(heading);
                    heading.append(text);
                    cont.append(figure);
                }
            }
        )
        .catch(error => {
            console.error('Error fetching image:', error);
        });
}