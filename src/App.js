import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    selectedFile: null
  }

  onChangeHandler = event => {

    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    })

    console.log(event.target.files[0])

  }

  onClickHandler = () => {

    //here a signed url generated using gsutil 
    //gsutil signurl -m PUT service_account.json gs://<bucket>/file.png

    const url = "https://storage.googleapis.com/<bucket>/file.png.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=gitlab-ci%<Project>.iam.gserviceaccount.com%2F20200521%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20200521T175304Z&X-Goog-Expires=36000&X-Goog-SignedHeaders=content-type%3Bhost&X-Goog-Signature=<Signature>"

    const data = new FormData()
    data.append('file', this.state.selectedFile)

    var xhr = new XMLHttpRequest();

    xhr.open('PUT', url, true);
    xhr.setRequestHeader("Content-type", "application/octet-stream");
    

    xhr.onload = function (response) {
      console.log('on-load', response);
    };

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {

        if (xhr.status === 200) {
          console.log("Status OK")

        } else {
          console.log("Status not 200")
        }
      }
    };

    xhr.onerror = function (response) {
      console.log("Response error", response)
    };

    xhr.upload.onprogress = function (evt) {
      // For uploads
      if (evt.lengthComputable) {
        var percentComplete = parseInt((evt.loaded / evt.total) * 100);
        console.log("progress", percentComplete)

      }
    }
    xhr.send(data);

  }

  render() {
    return (
      <div className="App">

        <input type="file" name="file" onChange={this.onChangeHandler} />
        <button type="button" class="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button>

      </div>
    );
  }

}

export default App;
