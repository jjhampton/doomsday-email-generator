import React from "react";
import moment from "moment";
import "./Email.css";

class Email extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      copySuccess: "",
      emailText: this.props.asteroids.length
        ? this.getDoomsdayEmail(this.props.asteroids)
        : this.getSafeEmail()
    };
  }

  copyToClipboard = e => {
    this.textArea.select();
    document.execCommand("copy");
    e.target.focus();
    this.setState({ copySuccess: "Copied!" });
  };

  getDoomsdayEmail = asteroids => {
    const opening = `
        Dear Boss,

        I won't be at work today. The following 'Potentially Hazardous' asteroids have a chance to collide with earth: 
    `;

    const asteroidDetails = asteroids
      .map(x => {
        const utcDate = moment
          .utc(new Date(x.close_approach_data[0].close_approach_date))
          .format("MMM D, YYYY");

        debugger;

        return `
            Asteroid Name: ${x.name}
            Minimum Diameter: ${
              x.estimated_diameter.meters.estimated_diameter_min
            } meters
            Close Approach Date: ${utcDate}
            Speed: ${
              x.close_approach_data[0].relative_velocity.miles_per_hour
            } MPH
        `;
      })
      .join("\n");

    const closing = `
        We're all gonna die!!! 🔥🔥🔥 You can't fire me, I quit!
        
        Sincerely, 
        
        Your favorite employee
    `;

    return `
        ${opening}
        ${asteroidDetails}
        ${closing}    
    `;
  };

  getSafeEmail = () => {
    return `
        Dear Boss, 

        Looks like humanity will survive today. There are no 'Potentially Hazardous' asteroids on the way. See you at work!

        Sincerely, 

        Your favorite employee 
    `;
  };

  render() {
    return (
      <div>
        <textarea
          className="emailText"
          ref={textarea => (this.textArea = textarea)}
          value={this.state.emailText}
          readOnly
        />
        <div>
          <button onClick={this.copyToClipboard}>Copy to Clipboard</button>
          <small>{this.state.copySuccess}</small>
        </div>
      </div>
    );
  }
}

export default Email;
