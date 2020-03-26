import React from 'react';
import './App.scss';
import htmlToImage from 'html-to-image';
import { saveAs } from 'file-saver';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      verified: true,
      showImageError: false,
      profilePicture: null,
    }
    this.handleFileInput = this.handleFileInput.bind(this);
    this.exportImage = this.exportImage.bind(this);
  }

  handleFileInput(event) {
    if (event && event.target && event.target.files && event.target.files.length === 1 && event.target.files[0].type.includes("image")) {
        if (this.state.profilePicture) URL.revokeObjectURL(this.state.profilePicture);
        let img = URL.createObjectURL(event.target.files[0])
        this.setState({showImageError: false, profilePicture: img});
        return;
    }

    this.setState({showImageError: true});
  }

  exportImage() {
    var node = document.getElementById('tweet');
    htmlToImage.toPng(node)
      .then(function (dataUrl) {
        saveAs(dataUrl, "mock-tweet.png");
      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error);
      });
  }

  componentWillUnmount() {
    if (this.state.profilePicture) URL.revokeObjectURL(this.state.profilePicture);
  }

  render() {
    return (
      <div className="app app-dark">
        <div className="title">Make a Tweet</div>
        <div className="description">Spoof a tweet from a user, export it as an image</div>
        <div className="tweet-form-container">
          <div id="tweet" className="tweet-form">
            <div className="tweet-header">
              <div className="tweet-user-photo">
                <img src={this.state.profilePicture || "https://pbs.twimg.com/profile_images/874276197357596672/kUuht00m_bigger.jpg"} alt="pic"/>
              </div>
              <div className="tweet-user-identifiers">
                <div contentEditable="true" suppressContentEditableWarning={true} spellCheck="false" className="tweet-user-name">
                  Donald J. Trump
                  {!this.state.verified ||
                  <svg aria-label="Verified account" fill="rgb(255, 255, 255)" viewBox="0 0 24 24" className="tweet-verified-icon"><g><path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"></path></g></svg>
                  }
                  </div>
                <div contentEditable="true" suppressContentEditableWarning={true} spellCheck="false" className="tweet-user-handle">@realDonaldTrump</div>
              </div>
              <div className="tweet-dropdown-arrow">
                <svg className="tweet-dropdown-icon" fill="rgb(136, 153, 166)" viewBox="0 0 24 24"><g><path d="M20.207 8.147c-.39-.39-1.023-.39-1.414 0L12 14.94 5.207 8.147c-.39-.39-1.023-.39-1.414 0-.39.39-.39 1.023 0 1.414l7.5 7.5c.195.196.45.294.707.294s.512-.098.707-.293l7.5-7.5c.39-.39.39-1.022 0-1.413z"></path></g></svg>
              </div>
            </div>
            <div contentEditable="true" suppressContentEditableWarning={true} className="tweet-post-message" spellCheck="false">
              You can click here and edit me, as well as the name, handle, date, device, likes, and retweets. Don't forget about the picture too!
            </div>
            <div className="tweet-post-info">
              <div className="tweet-post-date">
                <div className="tweet-post-date-time" contentEditable="true" suppressContentEditableWarning={true}>2:08 PM</div>
                <div className="tweet-post-date-separator">·</div>
                <div className="tweet-post-date-mdy" contentEditable="true" suppressContentEditableWarning={true}>Mar 24, 2020</div>
                <div className="tweet-post-date-separator">·</div>
              </div>
              <div className="tweet-post-device" contentEditable="true" suppressContentEditableWarning={true}>Twitter for iPhone</div>
            </div>
            <div className="tweet-stats-content">
              <div className="tweet-stats-retweets">
                <span className="bold-text" contentEditable="true" suppressContentEditableWarning={true} spellCheck="false">16.8k</span>
                Retweets
              </div>
              <div className="tweet-stats-likes">
                <span className="bold-text" contentEditable="true" suppressContentEditableWarning={true} spellCheck="false">78.5k</span>
                Likes
              </div>
            </div>
            <div className="tweet-footer-content">
              <div className="tweet-footer-comment-button">
                <svg viewBox="0 0 24 24" fill="rgb(136, 153, 166)" className="r-4qtqp9 r-yyyyoo r-50lct3 r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1srniue"><g><path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"></path></g></svg>
              </div>
              <div className="tweet-footer-retweet-button">
                <svg viewBox="0 0 24 24" fill="rgb(136, 153, 166)" className="r-4qtqp9 r-yyyyoo r-50lct3 r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1srniue"><g><path d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z"></path></g></svg>
              </div>
              <div className="tweet-footer-like-button">
                <svg viewBox="0 0 24 24" fill="rgb(136, 153, 166)" className="r-4qtqp9 r-yyyyoo r-50lct3 r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1srniue"><g><path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"></path></g></svg>
              </div>
              <div className="tweet-footer-export-button">
                <svg viewBox="0 0 24 24" fill="rgb(136, 153, 166)" className="r-4qtqp9 r-yyyyoo r-50lct3 r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1srniue"><g><path d="M17.53 7.47l-5-5c-.293-.293-.768-.293-1.06 0l-5 5c-.294.293-.294.768 0 1.06s.767.294 1.06 0l3.72-3.72V15c0 .414.336.75.75.75s.75-.336.75-.75V4.81l3.72 3.72c.146.147.338.22.53.22s.384-.072.53-.22c.293-.293.293-.767 0-1.06z"></path><path d="M19.708 21.944H4.292C3.028 21.944 2 20.916 2 19.652V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 .437.355.792.792.792h15.416c.437 0 .792-.355.792-.792V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 1.264-1.028 2.292-2.292 2.292z"></path></g></svg>
              </div>
              {/* <div className="tweet-footer-analytics"></div> */}
            </div>
          </div>
        {/* <img className="referenceImage" src="./examplepng.png" alt="example"/> */}
        </div>
        <div className="controls-container">
          <div className="title controls-title">Options:</div>
          <div className="controls-list">
            <div className="verified-button">
              <input type="button" value="Verified" className={`btn${this.state.verified ? " toggled" : ""}`} onClick={() => this.setState({verified: !this.state.verified})}/>
            </div>
            <div className="file-upload-button">
              <span>Change Img: </span>
              <input type="file" accept="image/png, image/jpeg, image/jpg" className={`btn`} onChange={(e) => this.handleFileInput(e)}/>
              {!this.state.showImageError || <div className="error-text">There was a problem uploading this image</div>}
            </div>
            <div className="image-export-button">
              <input type="button" value="Download Image" className={`btn`} onClick={() => this.exportImage()}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}