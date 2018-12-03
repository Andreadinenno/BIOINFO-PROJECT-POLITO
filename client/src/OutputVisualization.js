import React, { Component } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { Menu, Header, Button, Table, Dropdown } from "semantic-ui-react";
import * as jsPDF from 'jspdf';
import saveAs from 'file-saver';
import axios from "axios";

class OutputVisualization extends Component {
  constructor(props) {
    super(props); //proprietà passate ai componenti

    this.state = {
      //1: [MIM, TS, TC, MS, AS, IEX, I5P, IMS, ISN, I3P, INS, IOS, ISS, IPS, ICS, MSD, MIM],
      activeItem: "Statistics",
      downloadId: this.props.tagFile,
      speciesName: "",
      logOutput: this.props.data.data.log,
      showPlot: false,
      chartOutput: this.props.data.data.alig,
      error: "",
      singleMIMATO: "",
      chartData: {
        labels: [
          "Perfect Match",
          "Iso5p",
          "Multiple Mismatch",
          "Single Mismatch",
          "Iso3p",
          "Iso5p-Iso3p-Snp",
          "Iso5p-Iso3p-MultiSnp",
          "Iso5p-MultiSnp",
          "Iso5p-Snp",
          "Iso5p-Iso3p",
          "Iso3p-MultiSnp",
          "Iso3p-Snp"
        ],
        datasets: [
          {
            type: "line",
            label: "Tag Count",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            yAxisID: "r",
            borderWidth: 1,
            borderColor: "#000",
            pointRadius: 4,
            pointHitRadius: 15 //il raggio che attiva l'etichetta se ci passi sopra col mouse
          }
        ]
      }
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.downloadPDF = this.downloadPDF.bind(this);
    this.downloadOutputFiles = this.downloadOutputFiles.bind(this);
    this.renderDownloadButtons = this.renderDownloadButtons.bind(this);
  }

  logMessages = ["Load time of input files (Sec)", "Tags used for IsomiR-SEA alignment", "Tags discarded", "IsomiR-SEA alignment Time (Sec)", "Num Total Tag Seqs", "Num Total Reads Seqs", "Num Align Tag Seqs", "Num Align Mir Seqs", "Dynamic Programming on PremiR alignment Time (Sec)", "Num Align discarded Tag Seqs", "Num Align discarded Tag on PreMir Seqs", "Total Time (Sec)"];

  //new mimato empty object
  Mimato(label, numMimato){
    return {
      label:label, //mimato
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      backgroundColor: this.setColour(numMimato),
      borderWidth: 1,
      borderColor: "#777",
      hoverBorderWidth: 3,
      hoverBorderColor: "#000",
      yAxisID: "l"
    }
  }

  setColour(numMimato){

    var setOfColour = [];

  		var r = (Math.random() * 255) + 1;
  		var g = (Math.random() * 255) + 1;
  		var b = (Math.random() * 255) + 1;

  		var str = "rgba(" + r.toFixed(0) + "," + g.toFixed(0) + "," + b.toFixed(0) + ", 1)";

      for(let i=0; i<12; i++)
  		   setOfColour.push(str);

      return setOfColour;
  	}


  //handle the tab click
  handleItemClick(clickedItem, event) {
    console.log(clickedItem);
    this.setState({ activeItem: clickedItem });
  }

  handleChange(event){
    this.setState({singleMIMATO: event.target.value});
    event.preventDefault();
  }

  handleSubmit(event) {

    var id = this.state.singleMIMATO;
    var array = id.split(",");
    console.log("\narray :" + array);
    var numOfMimat = array.length;
    let chartData = { ...this.state.chartData};

    //re-empty the datasets by keeping only the tag count object
    //but i need also to empty the tags
    var tagCount = chartData.datasets[0];
    tagCount.data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    chartData.datasets = [];
    chartData.datasets.push(tagCount);

    var isMimato = false;
    var missingMimato = [];
    this.setState({error: ""});

    for(let i = 0; i < numOfMimat; i++){
      var thisMimatoMatched = false;
      var countTotal = 0;
      //qua accedo a t e in piu devo andare a scrivere chartData.datasets[i].label = array[i]
      //cioè passo nome del mimato alla label, l'indice del tag count invece è 10 cioè l'ultimo campo del dataset

      //create a new chart object for a new stack pass the label as value
      var newMimato = this.Mimato(array[i].trim(), numOfMimat);

      for (let [key, value] of Object.entries(this.state.chartOutput)) {
        if(value[0] === array[i].trim() || value[16].split(" ")[0].substr(4) === array[i].trim()){
          isMimato = true; //i found a match so i'm drawing a chart
          thisMimatoMatched = true;
          countTotal++;


          var spName = value[16].split(" ")[2] + " " + value[16].split(" ")[3];
          this.setState({speciesName : spName});

          //exact
          if(value[5] === "T"){
            newMimato.data[0] ++;
            chartData.datasets[0].data[0] += value[2];
          }
          else{

            //isomir 5p
            if(value[6] !==0 && value[7] === 'F' && value[8] === 'F' && value[9] === 0){
              newMimato.data[1] ++;
              chartData.datasets[0].data[1] += value[2];
            }
            //isomir multiple mismatch
            if(value[6] === 0 && value[7] === 'T' && value[8] === 'F' && value[9] === 0){
              newMimato.data[2] ++;
              chartData.datasets[0].data[2] += value[2];
            }
            //isomir single mismatch
            if(value[6] === 0 && value[7]==='F' && value[8] === 'T' && value[9] === 0){
              newMimato.data[3] ++;
              chartData.datasets[0].data[3] += value[2];
            }
            //isomir 3p
            if(value[6] === 0 && value[7]==='F' && value[8] === 'F' && value[9] !==0){
              newMimato.data[4] ++;
              chartData.datasets[0].data[4] += value[2];
            }
            //Iso5p-Iso3p-Snp
            if(value[6] !==0 && value[7]==='F' && value[8] === 'T' && value[9] !==0){
              newMimato.data[5] ++;
              chartData.datasets[0].data[5] += value[2];
            }
            //Iso5p-Iso3p-MultiSnp
            if(value[6] !==0 && value[7]==='T' && value[8] === 'F' && value[9] !==0){
              newMimato.data[6] ++;
              chartData.datasets[0].data[6] += value[2];
            }
            //Iso5p-MultiSnp
            if(value[6] !==0 && value[7]==='T' && value[8] === 'F' && value[9] === 0){
              newMimato.data[7] ++;
              chartData.datasets[0].data[7] += value[2];
            }
            //Iso5p-Snp
            if(value[6] !==0 && value[7]==='F' && value[8] === 'T' && value[9] === 0){
              newMimato.data[8] ++;
              chartData.datasets[0].data[8] += value[2];
            }
            //Iso5p-Iso3p
            if(value[6] !==0 && value[7]==='F' && value[8] === 'F' && value[9] !==0){
              newMimato.data[9] ++;
              chartData.datasets[0].data[9] += value[2];
            }
            //Iso3p-MultiSnp
            if(value[6] === 0 && value[7]==='T' && value[8] === 'F' && value[9] !==0){
              newMimato.data[10] ++;
              chartData.datasets[0].data[10] += value[2];
            }
            //Iso3p-Snp
            if(value[6] === 0 && value[7]==='F' && value[8] === 'T' && value[9] !==0){
              newMimato.data[11] ++;
              chartData.datasets[0].data[11] += value[2];
            }
          }
        }
      }

      //I'm converting the quantity of counts in percentage with respect to the total
      for(let k = 0; k < 12; k++){

        let percentage = (newMimato.data[k] * 100 / countTotal).toFixed(2);
        newMimato.data[k] = percentage;
      }

      //push the mimato only if matched
      if(thisMimatoMatched){
        chartData.datasets.push(newMimato);
      }
      else{
        missingMimato.push(newMimato.label);
      }
    }

    if(isMimato){
      this.setState({chartData, showPlot: true });
    }
    if(missingMimato.length > 0){
      var error = "List of unmatched inputs: " + missingMimato;
      this.setState({error});
    }




    event.preventDefault();
  }

  downloadPDF(event){
    event.preventDefault();
    var canvas = document.querySelector('#plot_1');
  	//creates image
  	var canvasImg = canvas.toDataURL("image/png", 1.0);

  	//creates PDF from img
  	var doc = new jsPDF('landscape');
  	doc.setFontSize(25);
  	doc.addImage(canvasImg, 'PNG', 10, 10, 280, 150 );
  	doc.save('canvas.pdf');
  }

  downloadOutputFiles(filename, event){

    axios
      .get("/api/download/",{
          params: {
            id: this.state.downloadId,
            file: filename
          }
        })
      .then(result => {

        //pipe the stream into the files
        var blob = new Blob([result.data],{type : 'text/plain'});
        var file = new File([blob], filename, {type: 'text/plain'});
        saveAs(file, filename);

      })
      .catch(error => {
        console.log(error);
      });

    event.preventDefault();
  }

  renderDownloadButtons(){
    return(
      <Button.Group color='teal'>
        <Button>Download Output File</Button>
        <Dropdown floating button className='icon'>
          <Dropdown.Menu>
            <Dropdown.Item text='Stats Log' onClick={this.downloadOutputFiles.bind(this,"align.log")}/>
            <Dropdown.Item text='Tag Mir.gff' onClick={this.downloadOutputFiles.bind(this,"tagMir-all.gff")} />
            <Dropdown.Item text='Tag Mir.tab' onClick={this.downloadOutputFiles.bind(this,"tagMir-all.tab")}/>
            <Dropdown.Item text='Tag PreMir.gff' onClick={this.downloadOutputFiles.bind(this,"tagPrxMir-all.gff")}/>
            <Dropdown.Item text='Tag PreMir.tab' onClick={this.downloadOutputFiles.bind(this,"tagPrxMir-all.tab")}/>
          </Dropdown.Menu >
        </Dropdown>
      </Button.Group>
    )
  }
  renderMenu() {
    return (
      <Menu tabular size="large" style={{ marginBottom: "35px" }}>
        <Menu.Item
          name="Statistics"
          key="Statistics"
          active={this.state.activeItem === "Statistics"}
          onClick={this.handleItemClick.bind(this, "Statistics")}
        />
        <Menu.Item
          name="Charts"
          key="Charts"
          active={this.state.activeItem === "Charts"}
          onClick={this.handleItemClick.bind(this, "Charts")}
        />
      </Menu>
    );
  }

  renderLogTable(){
    return this.logMessages.map( (message, index) => {
      return(
      <Table.Row>
        <Table.Cell><b>{message}</b></Table.Cell>
        <Table.Cell>{this.state.logOutput[index+1]} </Table.Cell>
      </Table.Row>
      )
    });
  }

  render() {
    if (this.state.activeItem === "Statistics") {
      return (
        <div style={{ padding: "10px", marginTop: "20px" }} key="container">
          <Header
            as="h4"
            style={{
              width: "auto",
              marginRight: "20px",
              display: "inline-block"
            }}
          >
            You can either check the output statistics or play with plots in the
            other tab
          </Header>
          {this.renderMenu()}
          <Table singleLine key="teal" size="large">
          <Table.Body>
          {this.renderLogTable()}
          </Table.Body>
          </Table>
        </div>
      );
    } else {
      if(this.state.showPlot){
        return (
        <div style={{ padding: "10px", marginTop: "20px" }} key="container">
          {this.renderMenu()}
          <Header
            as="h5"
            style={{
              width: "auto",
              color: "red"
            }}
          >{this.state.error}</Header>

          <h5 style={{align: "center"}}>Insert one or multiple miRNAID, divided by ' , ' (ex MIMAT0000070 or miR-17-5p)</h5>
            <form onSubmit={this.handleSubmit}>
                <input
                  type="text"
                  onChange={this.handleChange}
                />
              <Button color="teal" size="medium" primary
                type="Submit"
                value="Submit"
              >Plot</Button>
              <Button color="teal" size="medium" primary
                onClick = {this.downloadPDF}
              >Download as PDF</Button>
              {this.renderDownloadButtons()}
            </form>

          <Bar
            id="plot_1"
            data={this.state.chartData}
            options={{
              title: {
                display: true,
                text: "Isoforms Distribution of " + this.state.speciesName,
                fontSize: 25
              },
              layout: {
                padding: {
                  left: 50,
                  right: 0,
                  bottom: 0,
                  top: 0
                }
              },
              scales: {
                yAxes: [
                  {
                    id: "l",
                    position: "left",
                    type: "linear",
                    stacked : true,
                    scaleLabel: {
                      labelString: "# of miRNA",
                      display: true,
                      fontColor: "#000",
                      fontSize: 15,
                      padding: 20, //distanza dall'asse
                    }
                  },
                  {
                    id: "r",
                    position: "right",
                    type: "linear",
                    scaleLabel: {
                      labelString: "Tag Count",
                      display: true,
                      fontColor: "#000",
                      fontSize: 15,
                      padding: 20
                    }
                  }
                ],
                xAxes: [{
                    		stacked : true,

                    	}]
              }
            }}
          />
        </div>
      );
      }
      else{
        return (
        <div style={{ padding: "10px", marginTop: "20px" }} key="container">
          {this.renderMenu()}
          <Header
            as="h5"
            style={{
              width: "auto",
              color: "red"
            }}
          >{this.state.error}</Header>
          <h5>Insert one or multiple miRNAID, divided by ' , ' (ex MIMAT0000070 or miR-17-5p)</h5>
            <form onSubmit={this.handleSubmit}>
                <input
                  type="text"
                  onChange={this.handleChange}
                />
              <Button color="teal" size="medium" primary
                type="Submit"
                value="Submit"
              >Plot</Button>
              {this.renderDownloadButtons()}
            </form>
          </div>
        );
      }
    }
  }
}

export default OutputVisualization;
