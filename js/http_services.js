function makeServiceCall(methodType, url, async = true, data = null) {
    return new Promise(function (resolve, reject) //On failure calls reject , on success calls resolve
    {
        let xhr = new XMLHttpRequest();
        xhr.onload = function () {
            console.log(methodType + " State Change Called. " + " RS : " + xhr.readyState + " Status : " + xhr.status);
            if (xhr.readyState == 4) //Connection closed
            {
                if (xhr.status == 200 || xhr.status == 201) // 200 : Data Is Retreived , 201 : Data Is Created
                {
                    resolve(xhr.responseText);
                } else if (xhr.status >= 400) {
                    reject({
                        status: xhr.status,
                        statusText: xhr.statusText
                    });
                    // console.log("XHR Failed");
                    console.log("Handle 400 Client Error Or 500 server error at : " + showTime());
                }
            }
        }
            xhr.onerror = function(){
                reject({
                    status: this.status,
                    statusText: xhttp.statusText
                });
            }; //before(or after) the http connection is happening if there are any errors it gets handled here
        xhr.open(methodType, url, async);
        if (data) {
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(data));
        } else
            xhr.send();
    });

}