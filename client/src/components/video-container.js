import React, { Component } from 'react';
import { connect } from 'react-redux';
import { playVideo, grabVideoUrl, addVideoUrl, addToPlaylist, toggleModal } from '../actions';

class VideoContainer extends Component {
    render () {
    return ( 
            <div id="video-container" className="video-container">
                <div className="row mb-2">
                    <div className="col-xs-8">
                        <input className="pastedVideoInput form-control" type="text" placeholder="Please copy and paste YouTube URL..."/>
                    </div>
                    <button className="btn btn-success mr-1" onClick={ () => {
                        this.props.grabVideoUrl();
                        this.props.playVideo();
                        this.props.toggleModal(this.props.deleteModalStyle)
                    }}>Save Video</button>
                </div>
                <div className="video-embed-wrapper"></div>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        pastedVideoUrl: state.videoResults.videoLink,
        binderTabPageIds: state.interface,
        playlist: state.videoResults.playlist,
        deleteModalStyle: state.video.deleteModal,
        videoTitle: state.video.videoTitle
    }
}

export default connect(mapStateToProps, { playVideo, grabVideoUrl, addToPlaylist, toggleModal })(VideoContainer)