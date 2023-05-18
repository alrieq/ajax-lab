const clientId = "9bc1e0d31e5fdb0";

var defaultAlbumId = 'Jfni3';

function requestAlbumXHR() {
    let albumId = document.getElementById("albumIdField").value;
    let resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";
    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == 200) {
            //processAlbumRequest(req.responseText);
            let response = JSON.parse(req.responseText);
            for (item of response.data) {
              let imgElem = document.createElement("img");
              imgElem.src = item.link;
      
              resultDiv.appendChild(imgElem);
            }
        }else if (req.readyState == 4 && req.status != 200) {
            console.log(req.status + " Error with the imgur API: ", req.responseText);
        }
    }
    req.open('GET', 'https://api.imgur.com/3/album/' + albumId + '/images', true); // true for asynchronous     
    req.setRequestHeader('Authorization', 'Client-ID ' + clientId);
    req.send();
}


function requestAlbumFetch() {
    let albumId = document.getElementById("albumIdField").value;
    let resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
  
    fetch(
      `https://api.imgur.com/3/album/${albumId}&client_id=${clientId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        for (item of result.data) {
          let imgElem = document.createElement("img");
          imgElem.src = item.link;
  
          resultDiv.appendChild(imgElem);
        }
      })
      .catch((error) => console.log("error", error));
  }
  
  async function requestAlbumAsyncAwait() {
    let albumId = document.getElementById("albumIdField").value;
    let resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    try {
      const req = await fetch(
        `https://api.imgur.com/3/album/${albumId}&client_id=${clientId}`,
        requestOptions
      );
      const res = await req.json();
      for (item of res.data) {
        let imgElem = document.createElement("img");
        imgElem.src = item.link;
  
        resultDiv.appendChild(imgElem);
      }
    } catch (e) {
      console.log("error", e);
    }
  }
// function processAlbumRequest(response_text) {
//     var respObj = JSON.parse(response_text);
//     for (item of respObj.data.slice(0, 10)){
//         console.log(item)
//         requestImage(item.id);
//     }
// }

// function requestImage(imageHash) {
//     var req = new XMLHttpRequest();
//     req.onreadystatechange = function () {
//         if (req.readyState == 4 && req.status == 200) {
//             processImageRequest(req.responseText);
//         }
//         else if (req.readyState == 4 && req.status != 200) {
//             console.log("Error with the imgur API");
//         }
//     }
//     req.open("GET", "https://api.imgur.com/3/image/" + imageHash, true); // true for asynchronous
//     req.setRequestHeader('Authorization', 'Client-ID ' + clientId);
//     req.send();
// }

// function processImageRequest(response_text) {
//     var respObj = JSON.parse(response_text);
//     let imgElem = document.createElement("img");
//     imgElem.src = respObj.data.link;
//     //imgElem.referrerpolicy="no-referrer";
//     document.body.appendChild(imgElem);
// }
