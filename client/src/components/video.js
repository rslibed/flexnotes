import React, { Component } from 'react';
import '../assets/css/video.css'
import axios from 'axios';
import { connect } from 'react-redux';
import Results from './results';
import VideoContainer from './video-container';
import { getResultStyles, getOpacityDisplay, toggleResults, getVideoResults, setVideoUrl, updateBinderArray } from '../actions';
import { Field, reduxForm } from 'redux-form';
import VideoModal from './video-modal';

const API_KEY = 'AIzaSyCGMjVZZ0fUy-XXyU7TTUCCZJUIosTjnXI';
class Video extends Component {
    search (values) {
        if (!values.video) {
            return;
        }
        console.log("VALUES FROM SEARCH: ", values);
        var ROOT_URL = 'https://www.googleapis.com/youtube/v3/search';
        var params = {
          part: 'snippet',
          key: API_KEY,
          q: values.video,
          type: 'video',
          maxResults: 50,
          playerVars: {rel: 0}
        };
        var self = this;
        var videos = [];
        axios.get(ROOT_URL, { params: params })
          .then(function(response) {
              videos = [];
              const listOfVideoInfo = response.data.items;
              for (var listOfVideoInfoIndex = 0; listOfVideoInfoIndex < listOfVideoInfo.length; listOfVideoInfoIndex++) {
                  const vidObject = {
                      videoTitle: listOfVideoInfo[listOfVideoInfoIndex].snippet.title,
                      videoId: listOfVideoInfo[listOfVideoInfoIndex].id.videoId,
                      url: 'https://www.youtube.com/embed/' + listOfVideoInfo[listOfVideoInfoIndex].id.videoId,
                      description: listOfVideoInfo[listOfVideoInfoIndex].snippet.description,
                      channelTitle: listOfVideoInfo[listOfVideoInfoIndex].snippet.channelTitle,
                      channelId: listOfVideoInfo[listOfVideoInfoIndex].snippet.channelId,
                      thumbnails: listOfVideoInfo[listOfVideoInfoIndex].snippet.thumbnails
                  };
                  videos.push(vidObject);
              }
              self.props.getVideoResults(videos);
          })
          .catch(function(error) {
            console.error(error);
          });
    }
     componentWillMount() {
        let { tab_arr_obj } = this.props.binderObj;
        let { interface_obj } = this.props;
        
        if (tab_arr_obj) {
        let tabArrLength = tab_arr_obj.length;
        let tabIndex = null;
        let pageIndex = null;
        for (let i = 0; i < tabArrLength; i++) {
            if (interface_obj.tab_id === tab_arr_obj[i]._id) {
                //console.log('tabid = interface id at index:', i);
                tabIndex = i;
                break;
            }
        }
        const { page_arr_obj } = tab_arr_obj[tabIndex];
        for (let i = 0; i < tabArrLength; i++) {
            if (interface_obj.page_id === page_arr_obj[i]._id) {
                pageIndex = i;
                break;
            }
        }
        if (!page_arr_obj[pageIndex].video) {
            return;
        } else {
            this.props.setVideoUrl(page_arr_obj[pageIndex].video[0].videoURL, interface_obj);
        }
    } else {
        console.log("DOES NOT WORK");
    }
    }
    componentWillReceiveProps(nextProps) {
        debugger;
        if(nextProps.interface_obj.sent_to_db) {
            this.props.updateBinderArray();
        } else {
        let { tab_arr_obj } = nextProps.binderObj;
        let { interface_obj } = nextProps;
        
        if (tab_arr_obj) {
        let tabArrLength = tab_arr_obj.length;
        let tabIndex = null;
        let pageIndex = null;
        for (let i = 0; i < tabArrLength; i++) {
            if (interface_obj.tab_id === tab_arr_obj[i]._id) {
                //console.log('tabid = interface id at index:', i);
                tabIndex = i;
                break;
            }
        }
        const { page_arr_obj } = tab_arr_obj[tabIndex];
        for (let i = 0; i < tabArrLength; i++) {
            if (interface_obj.page_id === page_arr_obj[i]._id) {
                pageIndex = i;
                break;
            }
        }
        if (!page_arr_obj[pageIndex].video) {
            return;
        } else {
            this.props.setVideoUrl(page_arr_obj[pageIndex].video[0].videoURL, interface_obj);
        }
    } else {
        console.log("DOES NOT WORK");
    }
}
    }
    renderInput ({input}) {
        console.log(input);
        return (    
            <input {...input} id="query" placeholder="Search on Youtube..." className="form-control"/>
        )
    }
    render() {
        return (
            <div className="main">
                <VideoModal/>
                <div style={this.props.opacityContainer} className="opacity"></div>
                <div style={this.props.resultsStyles} className="results-container sidebar col-xs-4 pull-right">
                    <form onSubmit={this.props.handleSubmit(this.search.bind(this))} id="search-input-container" className="search-button-input input-group col-xs-12">
                        <Field name="video" component={this.renderInput} />
                        <span className="input-group-btn">
                            <button id="search-button" className="btn btn-primary">
                                <span className="glyphicon glyphicon-search"></span>
                            </button>
                            <button className="btn btn-danger" onClick={ () => {
                    this.props.getResultStyles(this.props.resultsStyles, this.props.toggleResultsBool)
                    this.props.getOpacityDisplay(this.props.opacityContainer, this.props.toggleResultsBool)
                }}><span className="glyphicon glyphicon-chevron-right"></span></button>
                        </span>
                    </form>
                    <Results results={this.props.videoResults} />
                </div>
                <div id="video-wrapper" className="video-wrapper">
                    <VideoContainer />
                </div>
            </div>
        );
    }
}

Video = reduxForm({
    form: 'search-item'
})(Video);

function mapStateToProps (state) {
    return {
        pastedVideoUrl: state.videoResults.videoLink,
        videoResults: state.video.results,
        playlist: state.video.videoList,
        resultsStyles: state.video.resultsStyles,
        opacityContainer: state.video.opacityDisplay,
        toggleResultsBool: state.video.toggleResults,
        interface_obj: state.interface,
        binderObj: state.binder.binderObj,
    }
}

export default connect(mapStateToProps, { getResultStyles, getOpacityDisplay, toggleResults, getVideoResults, setVideoUrl, updateBinderArray })(Video);