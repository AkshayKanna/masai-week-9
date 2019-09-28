import React from "react";
import styles from "./SearchByGenre.module.css"
import axios from "axios"
import { thisExpression } from "@babel/types";

class SearchByGenre extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={
            genre:[],
            input_value:"",
            bring:false,
            raw : [],
            select : "",
            visible:20,
        }
        this.loadMore=this.loadMore.bind(this)
    }

    loadMore(){
        this.setState((prev) =>{
            return{visible:prev.visible+20};
        });
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
            // console.log(response.data)
			this.setState({
                 genre:response.data
                //  .filter((genre)=>{
                //      return genre.genre === this.state.select;
                //  }).map((genre) =>{
                //      return genre;
                //  })
			});	          
        })
		.catch((err) => alert(err))
    }

    onSubmit =()  =>{
        this.setState({
            bring:true     
        })
    }

    render()
    {
        console.log(this.state.input_value)
        console.log(this.state.genre) 
        
        return(
            <div>
                <div className="jumbotron jumbotron-fluid " style={{background: "linear-gradient(to left, #30cfd0 0%, #330867 100%"}}>
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

                {/* <form className={styles.align}>
                    <div className="form-row align-items-center">
                        <div className="col-auto my-1">
                            <label className="mr-sm-2 sr-only " for="inlineFormCustomSelect">Preference</label>
                                <select onClick ={(e) => {
                                    this.setState({
                                        select:e.target.value
                                    })
                                }} className="custom-select mr-sm-2" id="inlineFormCustomSelect">
                                    <option selected>Choose...</option>
                                    <option value="Comedy">Comedy</option>
                                    <option value="Drama">Drama</option>
                                    <option value="Documentary">Documentary</option>
                                    {/* <option value="box_office_desc">High to Low box_office</option> */}
                                {/* </select> */}
                        {/* </div>
                        <div className="col-auto my-1">
                            <button type="button" className="btn btn-primary" onClick ={this.onSubmit}>Search</button>
                        </div>
                    </div> */}
                {/* </form> */} */}

                {this.state.bring  ?(
                    <div className="container">
                        <div className = "row " >
                            { this.state.genre.slice(0,this.state.visible).map((genre) => {
                                if(genre.genre === this.state.input_value)  
                                {
                                    return (
                                    <div className = "card col-lg-3 col-md-4 col-sm-3 mt-3 " key = {genre.id} style={{background:"linear-gradient(to right, #0c3483 0%, #a2b6df 100%, #6b8cce 100%, #a2b6df 100%)",color:"white"}}>
                                        <div class="card-body" className={styles.font} >
                                            <h3 className="card-title" style={{color:"white"}}>{genre.title}</h3><br /> <hr></hr>
                                            <h5 className="card-subtitle "> GENRE: {genre.genre}</h5> <hr></hr>
                                            <h5 className="card-subtitle "> YEAR: {genre.year}</h5> <hr></hr>
                                            <h5 className="card-subtitle "> BOX_OFFICE: {genre.box_office}</h5>
                                            <br />
                                        </div>
                                    </div>
                                    );
                                }
                                })
                            }
                            


                        </div>
                        <div className="text-center"> */}
                            {this.state.visible < this.state.genre.length &&
                                <button onClick={this.loadMore} className="btn btn-primary mt-3" type="button">Load More</button>
                            } 
                        </div>

                        
                    </div>
                    // <div className="container-fluid">
                    //     <div className = "row " >
                    //         { this.state.genre.map((genre) => {
                    //             if(genre.genre === this.state.select)
                    //             {
                    //                 return (
                    //                 <div className = "card col-lg-3 col-md-4 col-sm-3" key = {genre.id} style={{background: "linear-gradient(45deg, #874da2 0%, #c43a30 100%)",minWidth:"1px"}}>
                    //                     <div class="card-body" className={styles.font}>
                    //                         <h3 class="card-title text-dark" > <b>TITLE:{genre.title}</b></h3><br /> <hr></hr>
                    //                         <h5 class="card-subtitle "> GENRE: {genre.genre}</h5> <hr></hr>
                    //                         <h5 class="card-subtitle "> YEAR: {genre.year}</h5> <hr></hr>
                    //                         <h5 class="card-subtitle "> BOX_OFFICE: {genre.box_office}</h5> <hr></hr>
                    //                         <br />
                    //                     </div>
                    //                 </div>
                    //                 );
                    //             }
                    //             })
                    //         }
                    //     </div>
                        /* <div className="text-center">
                            {this.state.visible < this.state.genre.length && 
                                <button onClick={this.loadMore} className="btn btn-primary mt-4 text-center" type="button">Load More</button>
                            }
                        </div> */
                       
                     
                        
                    // </div>

                    ) : null}
            </div>
        );
    }
} 
export default SearchByGenre