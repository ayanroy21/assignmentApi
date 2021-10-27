import React from 'react';

export default class CallApiApp extends React.Component {
  state = {
    options: [],
    loading:false
  };

  fetchAPIData =(from=this.state.options.length)=>{
    if(this.state.loading){
      return;
    }
    this.setState({loading:true});
    try {
      const formData =
      {
        "filter": {
          "feedName": [
            "Cybersecurity"
          ]
        },
        from
      };

      const payLoad = {
        method: "POST",

        followRedirects: true,
        muteHttpExceptions: true,
        body: JSON.stringify(formData),

        headers: {
          "accessToken": "74ca2a2c-153f-40e5-9283-d7d83edd2d40",
          "cache-control": "no-cache",
          "X-Request-Source": 'avc',
          "Content-Type":
            'application/json'
        }
      };
      const response = fetch('https://tracxn.com/api/2.2/companies', payLoad);
      console.log(response);
      response.then(res =>
        res.json()).then(d => {
          let data = d.result;
          if (data) {
            this.setState((prevState) => ({ options: prevState.options.concat(data),loading:false}));

          }
          console.log(this.state.options);
        })

    } catch (error) {
      console.log(error);
      
    }
  };

  componentDidMount() {
    
    this.fetchAPIData();

    window.addEventListener('scroll',() => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        // from =this.state.options.length;
        this.fetchAPIData();
        
         console.log("you're at the bottom of the page");
         
      }
   });
  }
  

  render() {
    const { options } = this.state;

    return (
      <div>

        <div className="container">
          <div className="container-body">
            <table>
              <tr>
                <th>Company Name</th><th>Founder Year</th><th>Description</th><th>Location</th>
              </tr>

              {options.map(({ id,name, foundedYear, description: { short } = {}, location: { city } = {} }) => {
                return <tr key={id}><td>{name}</td><td>{foundedYear}</td><td>{short}</td><td>{city}</td></tr>;
              })}



            </table>
          </div>
        </div>


      </div>
    );
  }
}
