import React, { Component } from 'react';

class AlumniListForm extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      values: {
        email: '',
        fname: '',
        lname: ''
      }
    }
  }

  handleChange(event) {
    var self = this;
    return function(key) {
      self.setState( { [key]: event.target.value });
    }
  }

  render() {
    var handleChange = this.handleChange;

    return <div style={{ padding: '5px 192px' }}>
      <link href="//cdn-images.mailchimp.com/embedcode/classic-10_7.css"
        rel="stylesheet" type="text/css" />
      <style type="text/css" dangerouslySetInnerHTML={{ __html:
          '#mc_embed_signup{background:#fff; clear:left; font:14px ' +
          'Helvetica,Arial,sans-serif; }' }} />

      <div id="mc_embed_signup">
        <form action={'https://ktuh.us20.list-manage.com/' +
          'subscribe/post?u=d11f9e013b05e39a41621b85c&amp;id=0a80e1649b'}
        method="post" id="mc-embedded-subscribe-form"
        name="mc-embedded-subscribe-form" className="validate"
        target="_blank" noValidate>
          <div id="mc_embed_signup_scroll">
            <h2>Subscribe to the KTUH Alumni List!</h2>
            <div className="indicates-required">
              <span className="asterisk">*</span> indicates required
            </div>
            <div className="mc-field-group">
              <label htmlFor="mce-EMAIL">{'Email Address  '}
                <span className="asterisk">*</span>
              </label>
              <input type="email"
                onChange={(e) => { handleChange(e)('email'); }}
                value={this.state.email} name="EMAIL"
                className="required email" id="mce-EMAIL" />
            </div>
            <div className="mc-field-group">
              <label htmlFor="mce-FNAME">First Name </label>
              <input type="text" onChange={(e) => { handleChange(e)('fname'); }}
                value={this.state.fname}
                name="FNAME" className="" id="mce-FNAME" />
            </div>
            <div className="mc-field-group">
              <label htmlFor="mce-LNAME">Last Name </label>
              <input type="text" value={this.state.lname} name="LNAME"
                className="" id="mce-LNAME"
                onChange={(e) => { handleChange(e)('lname'); }} />
            </div>
            <div id="mce-responses" className="clear">
              <div className="response" id="mce-error-response"
                style={{ display: 'none' }}></div>
              <div className="response" id="mce-success-response"
                style={{ display: 'none' }}></div>
            </div>
            <div style={{ visibility: 'hidden', position: 'absolute',
              left: -'5000px' }} aria-hidden="true">
              <input type="text"
                name="b_d11f9e013b05e39a41621b85c_0a80e1649b"
                tabIndex="-1" value="" />
            </div>
            <div className="clear">
              <input type="submit" value="Subscribe" name="subscribe"
                id="mc-embedded-subscribe" className="button" />
            </div>
          </div>
        </form>
      </div>
      <script type='text/javascript'
        src='//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js'>
      </script>
      <script type='text/javascript' dangerouslySetInnerHTML={{ __html:
'(function($) {window.fnames = new Array(); ' +
'window.ftypes = new Array();fnames[0]="EMAIL"; ' +
'ftypes[0]="email";fnames[1]="FNAME";ftypes[1]="text";fnames[2]="LNAME"; '+
'ftypes[2]="text";fnames[3]="ADDRESS";ftypes[3]="address";' +
'fnames[4]="PHONE";ftypes[4]="phone";}(jQuery));' +
'var $mcj = jQuery.noConflict(true);' }} />
    </div>
  }
}

export default AlumniListForm;
