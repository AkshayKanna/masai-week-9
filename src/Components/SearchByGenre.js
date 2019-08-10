import React from "react";
// import styles from "./SearchByGenre.module.css"
import axios from "axios"

class SearchByGenre extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={
            genre:[],
            input_value:"",
            bring:false,
            raw : []
        }
    }

    handleInput=(e)=>{
        this.setState({
            input_value:e.target.value,
            bring:false
        })
    }

    componentDidMount(){
        axios({
			method: 'get',
    		url: 'https://raw.githubusercontent.com/masai-school/assignments-data/master/data/dummy/json/movies_collections.json',
		})
		.then((response) =>{
            console.log(response.data)
			this.setState({
                 genre:response.data
                // genre_details:response.data.filter((element)=>{
                //     return element.genre === this.state.detail;
                // }).map((element)=>{
                //     return element
                // })
			});	
        // })
        // .then((response) =>{
        //     console.log(response.data)
        //     let genre_details=response.data.filter((item)=> {
        //         return item.genre === this.state.input_value;
        //     }).map((item)=>{
        //         return item
        //     })
        //     console.log(genre_details)
            // this.setState({t
                // genre_details:response.data.filter((item)=> {
                //     return item.genre === "Action";
                // }).map((item)=>{
                //     return item
                // })
            // });           
        })
		.catch((err) => alert(err))
    }

   

    // handleInput= e => 
    //     this.setState({
    //     [e.target.name]:e.target.value
    // })

    onSubmit =()  =>{
        this.setState({
            bring:true
        })
    }

    render()
    {
        console.log(this.state.input_value)
        // console.log(this.state.genre_details)
        // var gg=[]
        // if(this.state.bring)
        // {
        //     let input = this.state.input_value
        
        //     var json=this.state.genre
            
        //     for (var i=0;i < json.length; i++) 
        //     {
        //         if(input=== json[i].genre)
        //         {
        //             gg.push(json[i])	
        //         }		
        //     }
        //     this.setState({
        //         bring : false,
        //         raw : gg
        //     })
        // }

        // if(this.state.bring)
        // {
        //     this.setState({
        //         bring : false,
        //     })
        // }

        console.log(this.state.raw) 
        
        return(
            <div>
                <div style={{ background: "#673AB7"}} className="jumbotron jumbotron-fluid ">
                    <div className="container">
                        <h1 className="display-4">Open Movie Database Using React And Bootstrap</h1>
                    </div>
                </div>

                <form className="form-inline col-sm-2 col-md-7 ">
                    <div className="form-group mx-sm-3 mb-2 ">
                        <label for="genre" className="sr-only">Search By Genre</label>
                        <input type="text" name="input_value" class="form-control" id="genre" placeholder="Search .." value={this.state.input_value} onChange={this.handleInput} />
                    </div>
                    <button type="button" class="btn btn-primary mb-2" onClick={this.onSubmit}>Search</button>
                </form>

                {this.state.bring  ?(
                    <div className="container">
                        <div class = "row " >
                            { this.state.genre.map((genre) => {
                                if(genre.genre===this.state.input_value)
                                {
                                    return (
                                    <div class = "card col-lg-3 col-md-4 col-sm-3 mt-4 ml-2" key = {genre.id}>
                                        <div class="card-body">
                                            <h3 class="card-title text-dark" > {genre.title}</h3><br />
                                            <h5 class="card-subtitle "> GENRE: {genre.genre}</h5>
                                            <h5 class="card-subtitle "> YEAR: {genre.year}</h5>
                                            <h5 class="card-subtitle "> BOX_OFFICE: {genre.box_office}</h5>
                                            <br />
                                        </div>
                                    </div>
                                    );
                                }
                                })
                            }
                        </div>
                    </div>
                    ) : null}
            </div>
        );
    }
} 
export default SearchByGenre