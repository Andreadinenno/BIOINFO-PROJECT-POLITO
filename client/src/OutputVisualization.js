import React, { Component } from "react";
import {Bar, Line, Pie} from 'react-chartjs-2';



class OutputVisualization extends Component {
	
	constructor(props) {

    	super(props); //proprietà passate ai componenti

    	this.state = {
      	//MIM: [TS, TC, MS, AS, IEX, I5P, IMS, ISN, I3P, INS, IOS, ISS, IPS, ICS, MSD],
      		MIM: ["MIMATO", "CAAAGUGCUUACAGUGCAGGUAG", 1418, "CAAAGUGCUUACAGUGCAGGUAG", 23, true, 0, false, false, 0, false, true, true, true, true, 1],
      		data: this.props.data,
      		value : '',
      		chartData:{
      			labels:['Perfect Match', 'Iso5p', 'Iso3p', 'Single Mismatch', 'Multiple Mismatch'],
        		datasets: [
        		{
	            	label: '# of miRNA',
	            	data: [61, 18, 30, 30, 50],
	            	backgroundColor: [
		                'rgba(255, 99, 132, 0.8)',
			            'rgba(54, 162, 235, 0.8)',
			            'rgba(255, 206, 86, 0.8)',
			            'rgba(75, 192, 192, 0.8)',
			            'rgba(153, 102, 255, 0.8)',
			            'rgba(255, 159, 64, 0.8)',
			            'rgba(255, 99, 132, 0.8)'
	            	],
	            	borderWidth : 1,
	            	borderColor : '#777',
	            	hoverBorderWidth : 3,
	            	hoverBorderColor : '#000',
	            	yAxisID: 'l',
	            	

        		},{
        			type: 'line',
        			label: 'Tag Count',
        			data: [1000, 2000, 3000, 2000, 4000, 7000],
        			yAxisID: 'r',
        			borderWidth : 1,
        			borderColor : '#000',
        			pointRadius: 4,
        			pointHitRadius: 15 //il raggio che attiva l'etichetta se ci passi sopra col mouse
        			
        			
        		}
        		]

      	}

    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    console.log(this.props.data);
  	
  	}

  	handleChange(event) {
    	this.setState({value: event.target.value});
  	}

  	handleSubmit(event) {
  	
  		if(this.state.value == this.state.MIM[0]){
    		alert('A name was submitted: ' + this.state.value);
    	}else{
    		alert('Error.');
    	}
    	event.preventDefault();
  	}



  	render() {

	    return (
	    	<div>
		    	<h1>Statistics:
		    		<p style={{ padding: "10px", fontSize:"20px" }}><br/>
		    					Load time of input files (Sec) = 0.223220 <br/>
		    					INFO: Tags used for IsomiR-SEA alignment = 4400<br/>
								INFO: Tags discarded = 898<br/>
								IsomiR-SEA alignment Time (Sec) = 1.805113<br/>
								INFO: Num Total Tag Seqs = 5298<br/>
								INFO: Num Total Reads Seqs = 20448<br/>
								INFO: Num Align Tag Seqs = 2580<br/>
								INFO: Num Align Mir Seqs = 7165<br/>
								Dynamic Programming on PremiR alignment Time (Sec) = 0.001409<br/>
								INFO: Num Align discarded Tag Seqs = 2580<br/>
								INFO: Num Align discarded Tag on PreMir Seqs = 7165<br/>
								Total Time (Sec) = 2.181545<br/>
					</p>
			    </h1>

			    <h2>Insert miRNA ID:

			    	<form onSubmit={this.handleSubmit}>
	        			<label style ={{ padding: "10px", fontSize:"20px" }}>
	          				miRNA ID:
	          				<input type="text" value={this.state.value} onChange={this.handleChange} />
	        			</label>
	       				<input type="Submit" value="Submit" style = {{ fontSize: "40px"}} />
	      			</form>
				</h2>

		        <Bar
			        data = {this.state.chartData}
			        options = {{
			        	title : {
			        		display : true,
			        		text: 'Isoforms Distribution',
			        		fontSize : 25

			        	},
			        	legend:{ //in realtà legend non serve
			        	
			        		display : true,
			        		position : 'top'
			        	},
			        	layout:{
			        		padding:{
			        		left : 50,
			        		right : 0,
			        		bottom : 0,
			        		top : 0
			        		}
			        	},
			        	scales:{
			        		yAxes: [{
			        			id : 'l',
			        			position : 'left',
			        			scaleLabel : {
			        				labelString : '# of miRNA',
			        				display : true,
			        				fontColor : '#000',
			        				fontSize : 15,
			        				padding : 20 //distanza dall'asse
			        			}
                		
                    		},{
                    			id : 'r',
                    			position : 'right',
                    			scaleLabel : {
			        				labelString : 'Tag Count',
			        				display : true,
			        				fontColor : '#000',
			        				fontSize : 15,
			        				padding : 20
			        			}
                    		}],
                    	},

			        }}
	        	/>

	        	


		</div>    
    )
  }
}

export default OutputVisualization;

