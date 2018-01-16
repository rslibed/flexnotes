
let fakeData =
  {
    _id: { $oid: 'someRandomNumberMongoDBAssings' },
    googleId: 103970352561814947806,
    userName: 'JOhn Hong',
    binder_arr_obj: [
      {
        _id: { $oid: 'someRandomNumberMongoDBAssings' },
        binder_count: 1,
        binder_name: 'Binder1',
        binder_color: 'red',
        tab_arr_obj: [
          {
            _id: { $oid: 'someRandomNumberMongoDBAssings' },
            tab_count:1,
            tab_color: 'blue',
            tab_name: 'Tab1',
            page_arr_obj: [
              {
              page_arr_obj :[ 
                {
                  page_count: 1,
                  page_color: 'white',
                  page_name: 'Page1',
                  page_date: '',
                  calendar : {
                      cal_url : String
                  },
                  lecture_slides : {
                     lec_id : ''
                  },
                  notes: {
                    document: {
                      nodes: [
                        {
                          kind: "text",
                          leaves: [
                            {
                              text: "This is editable "
                            },
                            {
                              text: "rich",
                              marks: [
                                {
                                  type: "bold"
                                }
                              ]
                            },
                          ]
                        }
                      ] 
                  }
                },
                video: [
                  {
                    _id: { $oid: 'someRandomNumberMongoDBAssings' },
                      videoTitle: "king of the hills",
                      videoId: "Ukg_U3CnJWI",
                      videoURL: "adfadsfa.com"
                  }
                ],
                panel_dimensions: {
                  lecture_Panel: {
                    top_left_panel_height: Number,
                    top_left_panel_width: Number,
					          top_right_panel_height: Number,
					          number_of_panels: Number
                  },
                  video_Panel: {
                    width: String,
                    height: String
                  },
                  note_Panel: {
                    width: String,
                    height: String
                  },
                  meister_Panel: {
                    width: String,
                    height: String
                  }
                }
              }
            ]
          }
        ],
      }
    ]
  }

module.exports = JSON.stringify(fakeData);